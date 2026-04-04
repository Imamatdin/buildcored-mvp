import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  getAdminConfig,
  verifyPassword,
  setAdminPassword,
  verifySessionToken,
  createSessionToken,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify session token
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !verifySessionToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    if (typeof new_password !== 'string' || new_password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const supabase = createSupabaseClient();
    const config = await getAdminConfig(supabase);

    if (!config) {
      return res.status(404).json({ error: 'Admin not configured' });
    }

    const valid = await verifyPassword(current_password, config.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    await setAdminPassword(supabase, new_password);

    // Issue a fresh token after password change
    const newToken = createSessionToken();
    return res.json({ token: newToken, message: 'Password changed successfully' });
  } catch (e: any) {
    console.error('Change password error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
