import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Token required' });
        }

        // 1. Validate token
        const { data: company, error: tokenError } = await supabaseAdmin
            .from('company_tokens')
            .select('id, company_name')
            .eq('token', token)
            .single();

        if (tokenError || !company) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        // 2. Fetch submissions
        const { data: submissions, error: submissionsError } = await supabaseAdmin
            .from('decision_logs')
            .select('*')
            .order('created_at', { ascending: false });

        if (submissionsError) {
            console.error('Supabase error:', submissionsError);
            return res.status(500).json({ error: 'Failed to fetch submissions' });
        }

        return res.status(200).json({
            company: company.company_name,
            submissions
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
}
