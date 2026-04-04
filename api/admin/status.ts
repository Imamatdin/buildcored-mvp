import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createSupabaseClient, getAdminConfig } from '../../lib/admin-auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createSupabaseClient();
    const config = await getAdminConfig(supabase);
    return res.json({ configured: !!config });
  } catch (e: any) {
    console.error('Admin status error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
