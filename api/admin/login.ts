import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  getAdminByEmail,
  verifyPassword,
  createJwt,
} from './_auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password required' });
    }

    const supabase = createSupabaseClient();
    const admin = await getAdminByEmail(supabase, email.toLowerCase().trim());

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await verifyPassword(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createJwt(admin.email);
    return res.json({ token });
  } catch (e: any) {
    console.error('Login error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
