import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    const required = ['email', 'problem_id', 'first_action', 'why_first', 'second_action', 'why_second',
      'third_action', 'signals_data_first', 'wont_do', 'biggest_risk', 'verify_and_rollback',
      'with_more_time', 'attest_original'];

    for (const field of required) {
      if (!body[field] && body[field] !== false) {
        return res.status(400).json({ error: `Missing: ${field}` });
      }
    }

    if (!body.attest_original) {
      return res.status(400).json({ error: 'Must attest original work' });
    }

    for (const [field, max] of Object.entries(LIMITS)) {
      if (body[field] && body[field].length > max) {
        return res.status(400).json({ error: `${field} exceeds ${max} chars` });
      }
    }

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const handle = generateHandle(body.email);

    const { error } = await supabaseAdmin.from('decision_logs').insert({
      email: body.email,
      handle,
      visibility: body.visibility || 'unlisted',
      role_track: body.role_track || null,
      seniority: body.seniority || null,
      time_budget: body.time_budget || null,
      problem_id: body.problem_id,
      problem_title: body.problem_title || null,
      first_action: body.first_action,
      why_first: body.why_first,
      second_action: body.second_action,
      why_second: body.why_second,
      third_action: body.third_action,
      signals_data_first: body.signals_data_first,
      wont_do: body.wont_do,
      biggest_risk: body.biggest_risk,
      verify_and_rollback: body.verify_and_rollback,
      with_more_time: body.with_more_time,
      attest_original: body.attest_original,
      status: 'submitted'
    });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Submission failed' });
    }

    return res.status(200).json({ handle });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
