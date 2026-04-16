import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Sparkles,
  Cpu,
  Calendar,
  Clock,
  CloudOff,
  Terminal,
  Zap,
  Mail,
  Check,
  Loader2,
} from "lucide-react";
import { useShowcaseProjects } from "@/hooks/useShowcaseProjects";
import ProjectCard, { ProjectCardSkeleton } from "@/components/ProjectCard";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import SplashOverlay from "@/components/SplashOverlay";
import type { Project } from "@/types/showcase";

const ORCAS_WEEKS = [
  { week: 1, title: "Body as Input", desc: "Eyes, fingers, head, and breath become sensors" },
  { week: 2, title: "Local AI Core", desc: "Run intelligence entirely on-device" },
  { week: 3, title: "Signals & Systems", desc: "FFT, filters, PWM, I2C, DAQ" },
  { week: 4, title: "Full Systems", desc: "Real pipelines: sensor in, model out" },
];

const BUTTONDOWN_URL = "https://buttondown.com/api/emails/embed-subscribe/buildcored";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const form = new FormData();
      form.append("email", email);
      const res = await fetch(BUTTONDOWN_URL, { method: "POST", body: form });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-green-400">
        <Check className="h-4 w-4" />
        You're in — we'll keep you posted.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder="you@email.com"
          className="flex-1 rounded-full px-5 py-3 text-sm bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 focus:outline-none focus:border-white/25 transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/10 disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify me"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-2">Something went wrong — try again.</p>
      )}
    </form>
  );
}

const Index = () => {
  const { featured, recent, isLoading } = useShowcaseProjects();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <SplashOverlay />

      <main className="min-h-screen">
        {/* ── Hero ── */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-4xl mx-auto text-center relative">
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                ORCAS v1.5 is live — 30 day challenge running now
              </div>
            </div>

            <h1
              className="fade-in-up text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight mb-6 glow-text"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-white/50">open source for</span>
              <br />
              <span className="text-foreground font-semibold">
                creative engineering
              </span>
            </h1>

            <p
              className="fade-in-up text-base md:text-lg text-white/40 max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Build projects. Learn by doing. Join a community of creative
              engineers shipping real work.
            </p>

            <div
              className="fade-in-up flex flex-col sm:flex-row gap-3 justify-center"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/orcas"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-black bg-white hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/10"
              >
                Join ORCAS Challenge
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/showcase"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </section>

        {/* ── ORCAS Spotlight ── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12 overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-bl-full" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/[0.06]">
                    <Cpu className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      BUILDCORED ORCAS
                    </h2>
                    <p className="text-xs text-white/40 font-mono tracking-wider">
                      v1.5 — LIVE NOW
                    </p>
                  </div>
                </div>

                <p className="text-white/50 max-w-2xl mb-8 leading-relaxed">
                  30 days. 30 projects. Zero hardware required. Learn hardware
                  engineering thinking through software projects you can run on
                  any laptop.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { icon: Calendar, value: "30", label: "Projects" },
                    { icon: Zap, value: "4", label: "Weeks" },
                    { icon: Clock, value: "~1h", label: "Per Day" },
                    { icon: CloudOff, value: "0", label: "Cloud Deps" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.04]"
                    >
                      <stat.icon className="h-4 w-4 text-white/30 mx-auto mb-2" />
                      <div className="text-xl font-bold text-foreground stat-number">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Week overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
                  {ORCAS_WEEKS.map((w) => (
                    <div
                      key={w.week}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span className="text-xs font-mono text-white/30 mt-0.5 shrink-0">
                        W{w.week}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {w.title}
                        </p>
                        <p className="text-xs text-white/35 mt-0.5">
                          {w.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/orcas"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
                  >
                    View Full Curriculum
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-white/30 px-4">
                    <Terminal className="h-3.5 w-3.5" />
                    Works on Mac, Windows, and Linux
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Recent Projects ── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-white/30" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Recent Projects
                </h2>
              </div>
              <Link
                to="/showcase"
                className="text-sm text-white/40 hover:text-white inline-flex items-center gap-1 transition group"
              >
                View all
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && recent.length === 0 && (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
                <Sparkles className="h-8 w-8 text-white/15 mx-auto mb-3" />
                <p className="text-sm text-white/40">
                  Projects are being curated. Check back soon.
                </p>
              </div>
            )}

            {!isLoading && recent.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {recent.slice(0, 6).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={setSelected}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Featured This Week ── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="border-t border-white/[0.06] pt-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <Star className="h-5 w-5 text-white/30" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    Featured This Week
                  </h2>
                </div>
                <Link
                  to="/showcase"
                  className="text-sm text-white/40 hover:text-white inline-flex items-center gap-1 transition group"
                >
                  View showcase
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[1, 2].map((i) => (
                    <ProjectCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {!isLoading && featured.length === 0 && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
                  <Star className="h-8 w-8 text-white/15 mx-auto mb-3" />
                  <p className="text-sm text-white/40">
                    Featured projects are selected weekly. Stay tuned.
                  </p>
                </div>
              )}

              {!isLoading && featured.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <ProjectCard project={featured[0]} onClick={setSelected} />
                  </div>
                  {featured.slice(1, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={setSelected}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02] overflow-hidden">
              {/* Dot grid bg */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Glow accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/[0.02] rounded-full blur-2xl" />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Left — copy */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 w-fit mb-5">
                    <Mail className="h-3 w-3" />
                    Newsletter
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                    This cohort's full.
                    <br />
                    <span className="text-white/40">Next one won't wait.</span>
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                    Get showcase projects delivered to your inbox, plus early
                    access when the next cohort drops.
                  </p>
                  <NewsletterForm />
                </div>

                {/* Right — visual preview */}
                <div className="hidden md:flex flex-col justify-center items-center p-10 border-l border-white/[0.06]">
                  <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-4">
                    What you'll get
                  </p>
                  <div className="space-y-3 w-full max-w-xs">
                    {[
                      { label: "New cohort announcements", icon: Calendar },
                      { label: "Weekly project spotlights", icon: Star },
                      { label: "Community highlights", icon: Sparkles },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                      >
                        <div className="p-2 rounded-lg bg-white/[0.05]">
                          <item.icon className="h-3.5 w-3.5 text-white/40" />
                        </div>
                        <span className="text-xs text-white/50">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ProjectDetailModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default Index;
