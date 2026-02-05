import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Plugin, ViteDevServer } from 'vite';
import crypto from 'crypto';

const adjectives = ['Latency', 'Resilient', 'Async', 'Distributed', 'Cached', 'Indexed', 'Parallel', 'Atomic', 'Eventual', 'Consistent', 'Sharded', 'Replicated', 'Fault', 'Load', 'Queue', 'Stream', 'Batch', 'Pipeline', 'Circuit', 'Retry'];
const animals = ['Llama', 'Falcon', 'Otter', 'Badger', 'Raven', 'Panda', 'Wolf', 'Hawk', 'Fox', 'Bear', 'Lynx', 'Crane', 'Viper', 'Shark', 'Eagle', 'Cobra', 'Tiger', 'Bison', 'Moose', 'Whale'];

function generateHandle(email: string): string {
  const normalized = email.trim().toLowerCase();
  const hash = crypto.createHash('sha256').update(normalized).digest();
  const adj = adjectives[hash[0] % adjectives.length];
  const animal = animals[hash[1] % animals.length];
  const num = ((hash[2] << 8) | hash[3]) % 10000;
  return `${adj} ${animal} #${num.toString().padStart(4, '0')}`;
}

const LIMITS: Record<string, number> = {
  first_action: 350, why_first: 280, second_action: 350, why_second: 280,
  third_action: 350, signals_data_first: 280, wont_do: 450, biggest_risk: 350,
  verify_and_rollback: 350, with_more_time: 280
};

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return supabaseAdmin;
}

export function apiPlugin(): Plugin {
  return {
    name: 'api-server',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/submit-decision-log', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);

            const required = ['email', 'problem_id', 'first_action', 'why_first', 'second_action', 'why_second',
              'third_action', 'signals_data_first', 'wont_do', 'biggest_risk', 'verify_and_rollback',
              'with_more_time', 'attest_original'];

            for (const field of required) {
              if (!data[field] && data[field] !== false) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: `Missing: ${field}` }));
                return;
              }
            }

            if (!data.attest_original) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Must attest original work' }));
              return;
            }

            for (const [field, max] of Object.entries(LIMITS)) {
              if (data[field] && data[field].length > max) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: `${field} exceeds ${max} chars` }));
                return;
              }
            }

            const handle = generateHandle(data.email);

            const { error } = await getSupabaseClient().from('decision_logs').insert({
              email: data.email,
              handle,
              visibility: data.visibility || 'unlisted',
              role_track: data.role_track || null,
              seniority: data.seniority || null,
              time_budget: data.time_budget || null,
              problem_id: data.problem_id,
              problem_title: data.problem_title || null,
              first_action: data.first_action,
              why_first: data.why_first,
              second_action: data.second_action,
              why_second: data.why_second,
              third_action: data.third_action,
              signals_data_first: data.signals_data_first,
              wont_do: data.wont_do,
              biggest_risk: data.biggest_risk,
              verify_and_rollback: data.verify_and_rollback,
              with_more_time: data.with_more_time,
              attest_original: data.attest_original,
              status: 'submitted'
            });

            if (error) {
              console.error('Supabase error:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Submission failed' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ handle }));
          } catch (err) {
            console.error('API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Register Company (Mock for local dev)
      server.middlewares.use('/api/register-company', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            const { email, company_name } = JSON.parse(body);
            if (!email || !company_name) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Email and Company Name are required' }));
              return;
            }

            const { data, error } = await getSupabaseClient()
              .from('company_tokens')
              .insert({ email, company_name })
              .select('token')
              .single();

            if (error) throw error;

            res.end(JSON.stringify({ token: data.token }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Company View (Mock for local dev)
      server.middlewares.use('/api/company-view', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            const { token } = JSON.parse(body);
            if (!token) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Token required' }));
              return;
            }

            const { data: company, error: tokenError } = await getSupabaseClient()
              .from('company_tokens')
              .select('id, company_name')
              .eq('token', token)
              .single();

            if (tokenError || !company) {
              res.statusCode = 403;
              res.end(JSON.stringify({ error: 'Invalid token' }));
              return;
            }

            const { data: submissions, error: subError } = await getSupabaseClient()
              .from('decision_logs')
              .select('*')
              .order('created_at', { ascending: false });

            if (subError) throw subError;

            res.end(JSON.stringify({ company: company.company_name, submissions }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Request Interview (Mock for local dev)
      server.middlewares.use('/api/request-interview', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
          try {
            const { token, handle } = JSON.parse(body);
            if (!token || !handle) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing fields' }));
              return;
            }

            const { data: company, error: tokenError } = await getSupabaseClient()
              .from('company_tokens')
              .select('*')
              .eq('token', token)
              .single();

            if (tokenError || !company) {
              res.statusCode = 403;
              res.end(JSON.stringify({ error: 'Invalid token' }));
              return;
            }

            await getSupabaseClient().from('interview_requests').insert({
              company_token: token,
              engineer_handle: handle
            });

            // Send email (using Resend)
            if (process.env.ADMIN_EMAIL && process.env.RESEND_API_KEY) {
              const { Resend } = await import('resend');
              const resend = new Resend(process.env.RESEND_API_KEY);

              await resend.emails.send({
                from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
                to: process.env.ADMIN_EMAIL,
                subject: `INTERVIEW REQUEST: ${company.company_name} wants ${handle}`,
                html: `<p>${company.company_name} (${company.email}) wants to interview ${handle}</p>`
              });
            }

            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });
    },
  };
}

