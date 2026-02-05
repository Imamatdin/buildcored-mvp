export interface Problem {
  id: number;
  title: string;
  track: string;
  prompt: string;
  questions: { name: string; label: string; max: number }[];
}

export const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "PROBLEM #1 — BACKEND / FULL-STACK ENGINEER",
    track: "Backend/Full-Stack",
    prompt: `You inherit a payment processing system handling $2M/day. For the past week, latency spikes to 3+ seconds during peak hours (2–4pm), causing 2–3% of transactions to timeout.

You have:
• 2 weeks
• One junior engineer (started 3 months ago)
• No budget for new infrastructure
• Access to logs, metrics, and the codebase

The situation:
• CEO wants a fix before a board meeting in 10 days
• CTO wants root cause understood before any fix ships
• The on-call engineer who knew the system best quit last month`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 2,
    title: "PROBLEM #2 — FRONTEND ENGINEER",
    track: "Frontend",
    prompt: `Your company's checkout page has a 23% cart abandonment rate on mobile. Analytics show users drop off at the payment form. The PM says "just make it faster." The designer says "we need a complete redesign." You have data showing the form takes 4 taps too many.

You have:
• 1 week before Black Friday (biggest sales day)
• React codebase, no TypeScript, 200+ components
• Designer available for 2 hours total
• Cannot change the backend or payment provider

The situation:
• Marketing already announced "seamless mobile checkout"
• Last sprint's "quick fix" broke Safari and took 3 days to debug
• The PM wants to add Apple Pay; the CTO says "no new features until stability"`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 3,
    title: "PROBLEM #3 — SRE / PLATFORM / DEVOPS ENGINEER",
    track: "SRE/DevOps",
    prompt: `Your main database is at 89% disk capacity and growing 2% per day. You have ~5 days before writes start failing. The database holds user data for 2M active users.

You have:
• No budget approved yet (finance review takes 2 weeks minimum)
• One junior SRE (hasn't done a production migration before)
• Current infra: single Postgres instance, no read replicas, daily backups only
• 4 hours of approved maintenance window per month (already used 2 hours)

The situation:
• Engineering wants to archive old data; Legal says "we must retain everything for 7 years"
• A migration to bigger instance requires 2+ hours downtime
• The last "quick storage fix" corrupted an index and caused a 6-hour outage
• CEO asks: "Why didn't we plan for this?"`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 4,
    title: "PROBLEM #4 — MOBILE ENGINEER (iOS / Android)",
    track: "Mobile",
    prompt: `Your app's average rating dropped from 4.6 to 3.8 stars over 2 weeks. Reviews mention "battery drain" and "app crashes when backgrounded." The CEO is panicking because a competitor just hit 4.9 stars.

You have:
• 5 days until the App Store threatens removal for crash rate >2%
• Current crash rate: 3.1% (was 0.4% before last release)
• Crashlytics shows crashes in 12 different files, no clear pattern
• The release included a new "background sync" feature the PM insisted on

The situation:
• Rolling back removes the background sync feature that 3 enterprise clients are already using
• The engineer who built background sync is on paternity leave
• QA has no automated tests; they test on 2 devices (iPhone 14, Pixel 7)
• Android crashes are 4x higher than iOS`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 5,
    title: "PROBLEM #5 — DATA / ML ENGINEER",
    track: "Data/ML",
    prompt: `Your recommendation model's click-through rate dropped 35% over 6 weeks. Nobody changed the model. Product says "users are just bored." Data team says "the data looks fine." But revenue from recommendations is down $400k/month.

You have:
• 2 weeks to diagnose and fix (board meeting)
• Access to training data, feature pipelines, and model weights
• One data analyst (strong SQL, no ML experience)
• Model was trained 8 months ago; no retraining pipeline exists

The situation:
• Product launched a new "category" 2 months ago with different data format
• The original ML engineer documented nothing and left
• Sales is promising clients "AI-powered personalization" in contracts being signed this week
• Your manager asks: "Is this a data problem or a model problem?"`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 6,
    title: "PROBLEM #6 — SECURITY ENGINEER",
    track: "Security",
    prompt: `Your security scanner flags a critical vulnerability (CVE score 9.8) in a library used by your authentication service. The patch requires upgrading from Node 14 to Node 18. Your auth service hasn't been updated in 2 years.

You have:
• 72 hours before security audit (failing = losing enterprise contract worth $2M/year)
• No staging environment for auth service (was "temporary" 18 months ago)
• One backend engineer available (not the original author)
• 50+ microservices depend on this auth service

The situation:
• The quick fix (WAF rule) blocks the exploit but also blocks 5% of legitimate logins
• A full upgrade last year broke SSO for 3 days and caused customer churn
• Compliance requires patching critical CVEs within 30 days; you're at day 25
• CTO asks: "Can we just accept the risk until after the audit?"`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 7,
    title: "PROBLEM #7 — QA / TEST ENGINEER",
    track: "QA/Test",
    prompt: `The team wants to ship a major feature Friday. It's Wednesday. You've found a bug that corrupts user data 1 in 500 times—but only in a specific sequence of actions that takes 15 minutes to reproduce. The PM says "that's an edge case, ship it."

You have:
• 48 hours until the release deadline
• No automated tests for this feature (team "didn't have time")
• Bug repro steps documented, but dev says "works on my machine"
• One dev available to fix, but they didn't write this code

The situation:
• Sales promised this feature to a client going live Monday
• The last time QA blocked a release, the PM complained to the VP
• The corrupted data bug would affect ~200 users per day based on traffic
• The feature passed all unit tests and manual test cases`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What signals/data do you check first? What are you trying to learn?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you verify success? What's your rollback plan?", max: 350 },
      { name: "with_more_time", label: "If you had 2 more weeks, what would you do differently?", max: 280 },
    ],
  },
  {
    id: 8,
    title: "PROBLEM #8 — ENGINEERING MANAGER",
    track: "Engineering Manager",
    prompt: `Your best engineer (Staff level, 4 years at company) just told you privately: "I got an offer for 40% more. I'll stay if I get promoted to Principal and work on the ML project instead of maintenance." Your team owns critical maintenance. You have no budget for backfill.

You have:
• 1 week before they need an answer
• No Principal roles currently approved (headcount freeze)
• The ML team already has a waitlist of engineers wanting to transfer
• This engineer is the only one who understands the legacy billing system

The situation:
• Losing them means 6+ months of knowledge transfer to someone new
• Their current work is "boring" but critical—billing processes $10M/month
• HR says matching salary is "not possible" outside of promotion
• Two junior engineers on your team look up to this person; if they leave, juniors might too`,
    questions: [
      { name: "first_action", label: "What do you do this week?", max: 350 },
      { name: "why_first", label: "Why this approach?", max: 280 },
      { name: "second_action", label: "What do you do this month?", max: 350 },
      { name: "why_second", label: "Why this timeline?", max: 280 },
      { name: "third_action", label: "How do you handle the conversation with the engineer?", max: 350 },
      { name: "signals_data_first", label: "What information do you gather before responding?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you protect the team if they leave anyway?", max: 350 },
      { name: "with_more_time", label: "What systemic changes would prevent this situation?", max: 280 },
    ],
  },
  {
    id: 9,
    title: "PROBLEM #9 — JUNIOR / ENTRY-LEVEL ENGINEER",
    track: "Junior/Entry-Level",
    prompt: `You just joined a team 3 weeks ago. Your first real task: add a "forgot password" feature to the app. The spec is one paragraph and says "follow the existing auth patterns." You look at the auth code and it's 2,000 lines with no comments.

You have:
• 1 week deadline
• The senior who assigned this is on vacation, back in 5 days
• Slack access to the team, but they seem very busy
• You found a tutorial online that does something similar

The situation:
• You're not sure if the reset link should expire in 15 minutes or 24 hours (spec doesn't say)
• The existing code uses a pattern you've never seen; you don't know if it's clever or wrong
• You don't want to ask "dumb questions" but you're stuck
• There's a PR from 6 months ago that added "password reset" but was never merged—no comments why`,
    questions: [
      { name: "first_action", label: "What's the first thing you do?", max: 280 },
      { name: "why_first", label: "Why this first?", max: 280 },
      { name: "second_action", label: "What's the second thing you do?", max: 280 },
      { name: "why_second", label: "Why this second?", max: 280 },
      { name: "third_action", label: "What's the third thing you do?", max: 280 },
      { name: "signals_data_first", label: "What information do you need to unblock yourself?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you know when you're done? How do you get feedback?", max: 350 },
      { name: "with_more_time", label: "What would you do differently if you had more experience?", max: 280 },
    ],
  },
  {
    id: 10,
    title: "PROBLEM #10 — PRODUCT ENGINEER / GENERALIST",
    track: "Product/Generalist",
    prompt: `You're the only engineer on a 5-person startup. The founder says: "Our competitor launched AI-powered search. We need it too, or we lose the fundraise. Demo to investors in 10 days."

You have:
• A working product with PostgreSQL full-text search (it works, just not "AI")
• $200/month budget for any new services
• No ML experience, but you've used OpenAI APIs before
• 10 days, no other engineering help

The situation:
• The founder wants "real AI" but can't explain what that means
• Your full-text search actually returns good results; users don't complain
• A proper vector search implementation would take 4-6 weeks to do right
• You could fake it with GPT-4 reranking results, but it would add 2-3 seconds latency`,
    questions: [
      { name: "first_action", label: "What do you build?", max: 350 },
      { name: "why_first", label: "Why this approach?", max: 280 },
      { name: "second_action", label: "How do you manage the founder's expectations?", max: 350 },
      { name: "why_second", label: "Why this communication strategy?", max: 280 },
      { name: "third_action", label: "What's your 10-day plan?", max: 350 },
      { name: "signals_data_first", label: "What do you need to understand before building?", max: 280 },
      { name: "wont_do", label: "What do you explicitly NOT do? Why?", max: 450 },
      { name: "biggest_risk", label: "Biggest risk in your approach + how you mitigate it", max: 350 },
      { name: "verify_and_rollback", label: "How do you demo this to investors?", max: 350 },
      { name: "with_more_time", label: "What would you build with 2 more months?", max: 280 },
    ],
  },
];

export function getProblemById(id: number): Problem | undefined {
  return PROBLEMS.find((p) => p.id === id);
}
