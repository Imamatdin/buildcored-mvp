import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  verifySessionToken,
  validateShowcaseUrls,
} from '../../lib/admin-auth';

function checkAuth(req: VercelRequest): boolean {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return !!token && verifySessionToken(token);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = createSupabaseClient();

  try {
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
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
