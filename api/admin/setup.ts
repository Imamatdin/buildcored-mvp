import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  getAnyAdmin,
  createAdmin,
  createJwt,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email required' });
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const supabase = createSupabaseClient();
    const existing = await getAnyAdmin(supabase);

    if (existing) {
      return res.status(409).json({ error: 'Admin already configured. Use login instead.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    await createAdmin(supabase, normalizedEmail, password);
    const token = createJwt(normalizedEmail);
    return res.json({ token });
  } catch (e: any) {
    console.error('Setup error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
