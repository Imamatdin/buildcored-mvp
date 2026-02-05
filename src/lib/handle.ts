import crypto from 'crypto';

const adjectives = ['Latency', 'Resilient', 'Async', 'Distributed', 'Cached', 'Indexed', 'Parallel', 'Atomic', 'Eventual', 'Consistent', 'Sharded', 'Replicated', 'Fault', 'Load', 'Queue', 'Stream', 'Batch', 'Pipeline', 'Circuit', 'Retry'];
const animals = ['Llama', 'Falcon', 'Otter', 'Badger', 'Raven', 'Panda', 'Wolf', 'Hawk', 'Fox', 'Bear', 'Lynx', 'Crane', 'Viper', 'Shark', 'Eagle', 'Cobra', 'Tiger', 'Bison', 'Moose', 'Whale'];

export function generateHandle(email: string): string {
  const normalized = email.trim().toLowerCase();
  const hash = crypto.createHash('sha256').update(normalized).digest();
  const adj = adjectives[hash[0] % adjectives.length];
  const animal = animals[hash[1] % animals.length];
  const num = ((hash[2] << 8) | hash[3]) % 10000;
  return `${adj} ${animal} #${num.toString().padStart(4, '0')}`;
}
