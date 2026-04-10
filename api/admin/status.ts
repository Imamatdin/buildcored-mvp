import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check required env vars first so we get a clear error instead of a crash
  const missing: string[] = [];
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');
  if (missing.length > 0) {
    return res.status(500).json({
      error: `Missing env vars: ${missing.join(', ')}`,
    });
  }

  try {
    // Lazy-import so module-load errors land in this catch, not in FUNCTION_INVOCATION_FAILED
    const { createSupabaseClient, authenticateRequest, getAnyAdmin } = await import(
      '../_lib/admin-auth'
    );

    const supabase = createSupabaseClient();

    const authHeader = req.headers.authorization;
    if (authHeader) {
      const admin = await authenticateRequest(authHeader, supabase);
      if (!admin) {
        return res.status(401).json({ ok: false });
      }
      return res.json({ ok: true, email: admin.email });
    }

    const existing = await getAnyAdmin(supabase);
    return res.json({ configured: !!existing });
  } catch (e: any) {
    console.error('Admin status error:', e);
    return res.status(500).json({
      error: e?.message || 'Server error',
      stack: e?.stack?.split('\n').slice(0, 3).join(' | '),
    });
  }
}
