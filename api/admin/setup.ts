import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  getAdminConfig,
  setAdminPassword,
  createSessionToken,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    if (!password || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const supabase = createSupabaseClient();
    const existing = await getAdminConfig(supabase);

    if (existing) {
      return res.status(409).json({ error: 'Admin already configured. Use password change instead.' });
    }

    await setAdminPassword(supabase, password);
    const token = createSessionToken();
    return res.json({ token });
  } catch (e: any) {
    console.error('Setup error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
