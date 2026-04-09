import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const BCRYPT_ROUNDS = 12;
const JWT_EXPIRY = '24h';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return secret;
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

// --- JWT sessions ---

export function createJwt(email: string): string {
  return jwt.sign({ email }, getJwtSecret(), { expiresIn: JWT_EXPIRY });
}

export function verifyJwt(token: string): { email: string } | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as { email: string };
    if (!payload.email) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

// --- Extract + verify from Authorization header ---

export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}

export async function authenticateRequest(
  authHeader: string | undefined,
  supabase: SupabaseClient
): Promise<{ email: string } | null> {
  const token = extractBearerToken(authHeader);
  if (!token) return null;

  const payload = verifyJwt(token);
  if (!payload) return null;

  // Verify the email still exists in admins table
  const admin = await getAdminByEmail(supabase, payload.email);
  if (!admin) return null;

  return { email: payload.email };
}

// --- Admin helpers ---

export async function getAdminByEmail(supabase: SupabaseClient, email: string) {
  const { data } = await supabase
    .from('admins')
    .select('id, email, password_hash')
    .eq('email', email)
    .single();
  return data;
}

export async function getAnyAdmin(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('admins')
    .select('id, email')
    .limit(1)
    .single();
  return data;
}

export async function createAdmin(supabase: SupabaseClient, email: string, password: string) {
  const hash = await hashPassword(password);
  const { error } = await supabase
    .from('admins')
    .insert({ email, password_hash: hash });
  if (error) throw error;
}

export async function updateAdminPassword(supabase: SupabaseClient, email: string, password: string) {
  const hash = await hashPassword(password);
  const { error } = await supabase
    .from('admins')
    .update({ password_hash: hash, updated_at: new Date().toISOString() })
    .eq('email', email);
  if (error) throw error;
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
