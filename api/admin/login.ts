import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  getAdminConfig,
  verifyPassword,
  createSessionToken,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password required' });
    }

    const supabase = createSupabaseClient();
    const config = await getAdminConfig(supabase);

    if (!config) {
      return res.status(404).json({ error: 'Admin not configured. Please set up a password first.' });
    }

    const valid = await verifyPassword(password, config.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = createSessionToken();
    return res.json({ token });
  } catch (e: any) {
    console.error('Login error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
