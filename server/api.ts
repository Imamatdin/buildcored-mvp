import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Plugin, ViteDevServer } from 'vite';
import crypto from 'crypto';
import {
  getAdminByEmail,
  getAnyAdmin,
  createAdmin,
  updateAdminPassword,
  verifyPassword,
  createJwt,
  authenticateRequest,
  validateShowcaseUrls,
} from '../lib/admin-auth';

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

      // Register Company
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

      // Company View
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

      // Public: Get showcase projects
      server.middlewares.use('/api/showcase', async (req, res, next) => {
        if (req.method !== 'GET') return next();

        try {
          const { data, error } = await getSupabaseClient()
            .from('showcase_projects')
            .select('*')
            .order('featured', { ascending: false })
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) throw error;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Server error' }));
        }
      });

      // Admin: Status — check auth or check if configured
      server.middlewares.use('/api/admin/status', async (req, res, next) => {
        if (req.method !== 'GET') return next();
        try {
          const supabase = getSupabaseClient();
          const authHeader = req.headers.authorization as string | undefined;

          if (authHeader) {
            const admin = await authenticateRequest(authHeader, supabase);
            if (!admin) {
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false }));
              return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, email: admin.email }));
            return;
          }

          const existing = await getAnyAdmin(supabase);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ configured: !!existing }));
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Server error' }));
        }
      });

      // Admin: Initial setup (email + password)
      server.middlewares.use('/api/admin/setup', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { email, password } = JSON.parse(body);
            if (!email || typeof email !== 'string') {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Email required' }));
              return;
            }
            if (!password || typeof password !== 'string' || password.length < 8) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Password must be at least 8 characters' }));
              return;
            }
            const supabase = getSupabaseClient();
            const existing = await getAnyAdmin(supabase);
            if (existing) {
              res.statusCode = 409;
              res.end(JSON.stringify({ error: 'Admin already configured' }));
              return;
            }
            const normalizedEmail = email.toLowerCase().trim();
            await createAdmin(supabase, normalizedEmail, password);
            const token = createJwt(normalizedEmail);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Admin: Login (email + password)
      server.middlewares.use('/api/admin/login', async (req, res, next) => {
        if (req.method !== 'POST') return next();
        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { email, password } = JSON.parse(body);
            if (!email || !password) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Email and password required' }));
              return;
            }
            const supabase = getSupabaseClient();
            const admin = await getAdminByEmail(supabase, email.toLowerCase().trim());
            if (!admin) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Invalid email or password' }));
              return;
            }
            const valid = await verifyPassword(password, admin.password_hash);
            if (!valid) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Invalid email or password' }));
              return;
            }
            const token = createJwt(admin.email);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Admin: Change password (JWT-protected)
      server.middlewares.use('/api/admin/change-password', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        const supabase = getSupabaseClient();
        const authHeader = req.headers.authorization as string | undefined;
        const auth = await authenticateRequest(authHeader, supabase);
        if (!auth) {
          res.statusCode = 401;
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const { current_password, new_password } = JSON.parse(body);
            if (!current_password || !new_password || new_password.length < 8) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Current and new password required (min 8 chars)' }));
              return;
            }
            const admin = await getAdminByEmail(supabase, auth.email);
            if (!admin) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Admin not found' }));
              return;
            }
            const valid = await verifyPassword(current_password, admin.password_hash);
            if (!valid) {
              res.statusCode = 401;
              res.end(JSON.stringify({ error: 'Current password is incorrect' }));
              return;
            }
            await updateAdminPassword(supabase, auth.email, new_password);
            const newToken = createJwt(auth.email);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token: newToken, message: 'Password changed successfully' }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Admin: CRUD showcase projects (JWT-protected)
      server.middlewares.use('/api/admin/showcase', async (req, res) => {
        const supabase = getSupabaseClient();
        const authHeader = req.headers.authorization as string | undefined;
        const auth = await authenticateRequest(authHeader, supabase);
        if (!auth) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }

        if (req.method === 'GET') {
          try {
            const { data, error } = await supabase
              .from('showcase_projects')
              .select('*')
              .order('display_order', { ascending: true })
              .order('created_at', { ascending: false });

            if (error) throw error;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
          return;
        }

        // Parse body for POST/PUT/DELETE
        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const parsed = body ? JSON.parse(body) : {};

            if (req.method === 'POST') {
              if (!parsed.title || !parsed.description) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Title and description required' }));
                return;
              }

              const urlError = validateShowcaseUrls(parsed);
              if (urlError) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: urlError }));
                return;
              }

              const { data, error } = await supabase
                .from('showcase_projects')
                .insert({
                  title: parsed.title,
                  description: parsed.description,
                  image_url: parsed.image_url || null,
                  repo_url: parsed.repo_url || null,
                  live_url: parsed.live_url || null,
                  tags: parsed.tags || [],
                  author_name: parsed.author_name || null,
                  featured: parsed.featured || false,
                  display_order: parsed.display_order || 0,
                })
                .select()
                .single();

              if (error) throw error;
              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            }

            if (req.method === 'PUT') {
              const { id, ...updates } = parsed;
              if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'ID required' }));
                return;
              }

              const urlError = validateShowcaseUrls(updates);
              if (urlError) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: urlError }));
                return;
              }

              const { data, error } = await supabase
                .from('showcase_projects')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

              if (error) throw error;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            }

            if (req.method === 'DELETE') {
              const url = new URL(req.url || '', 'http://localhost');
              const id = url.searchParams.get('id') || parsed.id;
              if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'ID required' }));
                return;
              }

              const { error } = await supabase
                .from('showcase_projects')
                .delete()
                .eq('id', id);

              if (error) throw error;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
              return;
            }

            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method not allowed' }));
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Server error' }));
          }
        });
      });

      // Request Interview
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
