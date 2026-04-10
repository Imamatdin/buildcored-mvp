import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function validateShowcaseUrls(body: Record<string, any>): string | null {
  for (const field of ['image_url', 'repo_url', 'live_url']) {
    if (body[field] && !isValidUrl(body[field])) {
      return `Invalid URL for ${field}`;
    }
  }
  return null;
}

async function authenticate(
  authHeader: string | undefined,
  supabase: SupabaseClient
): Promise<{ email: string } | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(
      authHeader.slice(7),
      process.env.JWT_SECRET!
    ) as { email: string };
    if (!payload.email) return null;
    const { data } = await supabase
      .from('admins')
      .select('id, email')
      .eq('email', payload.email)
      .single();
    if (!data) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
  if (missing.length > 0) {
    return res.status(500).json({ error: `Missing env vars: ${missing.join(', ')}` });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const auth = await authenticate(req.headers.authorization, supabase);
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('showcase_projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.json(data);
    }

    if (req.method === 'POST') {
      const { title, description, image_url, repo_url, live_url, tags, author_name, featured, display_order } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const urlError = validateShowcaseUrls(req.body);
      if (urlError) return res.status(400).json({ error: urlError });

      const { data, error } = await supabase
        .from('showcase_projects')
        .insert({
          title,
          description,
          image_url: image_url || null,
          repo_url: repo_url || null,
          live_url: live_url || null,
          tags: tags || [],
          author_name: author_name || null,
          featured: featured || false,
          display_order: display_order || 0,
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'ID required' });

      const urlError = validateShowcaseUrls(updates);
      if (urlError) return res.status(400).json({ error: urlError });

      const { data, error } = await supabase
        .from('showcase_projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'ID required' });

      const { error } = await supabase
        .from('showcase_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: any) {
    console.error('Admin showcase error:', e);
    return res.status(500).json({ error: e?.message || 'Server error' });
  }
}
