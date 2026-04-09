import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  createSupabaseClient,
  authenticateRequest,
  getAnyAdmin,
} from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createSupabaseClient();

    // If Authorization header present, verify JWT and return ok/401
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const admin = await authenticateRequest(authHeader, supabase);
      if (!admin) {
        return res.status(401).json({ ok: false });
      }
      return res.json({ ok: true, email: admin.email });
    }

    // No auth header: just report whether any admin exists (for setup flow)
    const existing = await getAnyAdmin(supabase);
    return res.json({ configured: !!existing });
  } catch (e: any) {
    console.error('Admin status error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
