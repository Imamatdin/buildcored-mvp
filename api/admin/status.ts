import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Stage 1: env vars check
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

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
        const { data } = await supabase
          .from('admins')
          .select('id, email')
          .eq('email', payload.email)
          .single();
        if (!data) return res.status(401).json({ ok: false });
        return res.json({ ok: true, email: payload.email });
      } catch {
        return res.status(401).json({ ok: false });
      }
    }

    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (error) {
      return res.status(500).json({ stage: 'supabase-query', error: error.message });
    }

    return res.json({ configured: !!data && data.length > 0 });
  } catch (e: any) {
    return res.status(500).json({
      stage: 'runtime',
      error: e?.message || 'Server error',
      stack: e?.stack?.split('\n').slice(0, 3).join(' | '),
    });
  }
}
