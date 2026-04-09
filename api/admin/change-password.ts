import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  authenticateRequest,
  getAdminByEmail,
  verifyPassword,
  updateAdminPassword,
  createJwt,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createSupabaseClient();
    const auth = await authenticateRequest(req.headers.authorization, supabase);
    if (!auth) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    if (typeof new_password !== 'string' || new_password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const admin = await getAdminByEmail(supabase, auth.email);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    const valid = await verifyPassword(current_password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    await updateAdminPassword(supabase, auth.email, new_password);
    const newToken = createJwt(auth.email);
    return res.json({ token: newToken, message: 'Password changed successfully' });
  } catch (e: any) {
    console.error('Change password error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
