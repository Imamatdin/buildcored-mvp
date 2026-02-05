import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { token, handle } = req.body;

        if (!token || !handle) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 1. Validate token & get company details
        const { data: company, error: tokenError } = await supabaseAdmin
            .from('company_tokens')
            .select('*')
            .eq('token', token)
            .single();

        if (tokenError || !company) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        // 2. Record request in database
        const { error: dbError } = await supabaseAdmin
            .from('interview_requests')
            .insert({
                company_token: token,
                engineer_handle: handle
            });

        if (dbError) {
            console.error('DB Error:', dbError);
            // Continue anyway to send email, it's more important
        }

        // 3. Send email to Admin
        const adminEmail = process.env.ADMIN_EMAIL;
        const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

        if (!adminEmail) {
            console.error('ADMIN_EMAIL not set');
            return res.status(500).json({ error: 'Configuration error' });
        }

        const { data: emailData, error: emailError } = await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            subject: `INTERVIEW REQUEST: ${company.company_name} wants ${handle}`,
            html: `
        <h1>New Interview Request</h1>
        <p><strong>Company:</strong> ${company.company_name} (${company.email})</p>
        <p><strong>Engineer:</strong> ${handle}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <p>Action required: Email the engineer and connect them with ${company.email}.</p>
      `
        });

        if (emailError) {
            console.error('Resend Error:', emailError);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ success: true });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
}
