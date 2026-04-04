import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function getTokenSecret(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set');
  return key;
}

export function createSupabaseClient(): SupabaseClient {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// --- Password hashing ---

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// --- Session tokens (HMAC-based, no DB lookup needed) ---

export function createSessionToken(): string {
  const exp = Date.now() + TOKEN_EXPIRY_MS;
  const payload = `admin:${exp}`;
  const sig = crypto
    .createHmac('sha256', getTokenSecret())
    .update(payload)
    .digest('hex');
  return `${exp}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const dotIndex = token.indexOf('.');
    if (dotIndex === -1) return false;

    const expStr = token.substring(0, dotIndex);
    const sig = token.substring(dotIndex + 1);
    const exp = parseInt(expStr, 10);

    if (isNaN(exp) || Date.now() > exp) return false;

    const payload = `admin:${expStr}`;
    const expectedSig = crypto
      .createHmac('sha256', getTokenSecret())
      .update(payload)
      .digest('hex');

    // Timing-safe comparison
    if (sig.length !== expectedSig.length) return false;
    return crypto.timingSafeEqual(
      Buffer.from(sig, 'hex'),
      Buffer.from(expectedSig, 'hex')
    );
  } catch {
    return false;
  }
}

// --- Admin config helpers ---

export async function getAdminConfig(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('admin_config')
    .select('id, password_hash')
    .limit(1)
    .single();
  return data;
}

export async function setAdminPassword(supabase: SupabaseClient, password: string) {
  const hash = await hashPassword(password);

  // Upsert: update if exists, insert if not
  const existing = await getAdminConfig(supabase);
  if (existing) {
    const { error } = await supabase
      .from('admin_config')
      .update({ password_hash: hash, updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('admin_config')
      .insert({ password_hash: hash });
    if (error) throw error;
  }
}

// --- URL validation ---

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validateShowcaseUrls(body: Record<string, any>): string | null {
  for (const field of ['image_url', 'repo_url', 'live_url']) {
    if (body[field] && !isValidUrl(body[field])) {
      return `Invalid URL for ${field}`;
    }
  }
  return null;
}
