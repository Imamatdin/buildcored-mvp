import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Clock,
  CloudOff,
  Zap,
  ChevronDown,
  Cpu,
  Terminal,
  Users,
  Target,
} from "lucide-react";
import { ORCAS_WEEKS, DIFFICULTY_COLORS } from "@/lib/orcas";

export default function Orcas() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const totalProjects = ORCAS_WEEKS.reduce(
    (sum, w) => sum + w.projects.length,
    0
  );

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            v1.5 — LIVE NOW
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            BUILDCORED{" "}
            <span className="text-white/40 font-light">ORCAS</span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-6 leading-relaxed">
            30 Days. 30 Projects. Zero Hardware Required.
          </p>

          <p className="text-sm text-white/30 max-w-xl mx-auto mb-10">
            A daily build challenge that teaches hardware engineering thinking
            through software projects you can run on any laptop.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto mb-10">
            {[
              { icon: Calendar, value: String(totalProjects), label: "Projects" },
              { icon: Zap, value: "4", label: "Weeks" },
              { icon: Clock, value: "~1h", label: "Per Day" },
              { icon: CloudOff, value: "0", label: "Cloud Deps" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] rounded-xl p-4 text-center border border-white/[0.04]"
              >
                <stat.icon className="h-4 w-4 text-white/25 mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground stat-number">
                  {stat.value}
                </div>
                <div className="text-xs text-white/35">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-white/25">
            <Terminal className="h-3.5 w-3.5" />
            Works on Mac, Windows, and Linux. All AI runs locally.
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Who is this for?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Cpu,
                title: "CS Students",
                desc: "Explore hardware without buying dev boards",
              },
              {
                icon: Terminal,
                title: "Software Engineers",
                desc: "Curious about embedded systems, IoT, or robotics",
              },
              {
                icon: Target,
                title: "Interview Prep",
                desc: "Preparing for hardware engineering roles",
              },
              {
                icon: Users,
                title: "Python Developers",
                desc: "Can write basic Python and want to understand how hardware thinks",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="p-2.5 rounded-lg bg-white/[0.04]">
                  <item.icon className="h-5 w-5 text-white/40" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-10 text-center">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Get the brief",
                  desc: "Each morning, receive the day's project with description, stack, and teaching plan.",
                },
                {
                  step: "02",
                  title: "Build it",
                  desc: "45-90 minutes. Every project runs with a single command and produces visible output.",
                },
                {
                  step: "03",
                  title: "Ship it",
                  desc: "Push a working demo to your repository before midnight. That's your proof of shipping.",
                },
                {
                  step: "04",
                  title: "Stay accountable",
                  desc: "2-strike system keeps it real. Squad-based community provides support and motivation.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-2xl font-bold text-white/15 font-mono mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-3 text-center">
              The Curriculum
            </h2>
            <p className="text-sm text-white/35 text-center mb-10 max-w-lg mx-auto">
              {totalProjects} projects across 4 weeks. From easy sensor mapping
              to expert-level integrated systems.
            </p>

            <div className="space-y-4">
              {ORCAS_WEEKS.map((week) => {
                const isExpanded = expandedWeek === week.week;
                return (
                  <div
                    key={week.week}
                    className="rounded-xl border border-white/[0.06] overflow-hidden"
                  >
                    {/* Week header */}
                    <button
                      onClick={() =>
                        setExpandedWeek(isExpanded ? null : week.week)
                      }
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-white/25 shrink-0">
                          WEEK {week.week}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {week.title}
                          </h3>
                          <p className="text-xs text-white/35 mt-0.5">
                            {week.subtitle} — {week.projects.length} projects
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-white/30 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Week content */}
                    {isExpanded && (
                      <div className="border-t border-white/[0.04] px-5 md:px-6 pb-5 md:pb-6">
                        <p className="text-sm text-white/35 py-4">
                          {week.description}
                        </p>

                        <div className="space-y-2">
                          {week.projects.map((project) => (
                            <div
                              key={project.day}
                              className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.03]"
                            >
                              <div className="text-center shrink-0 w-10">
                                <div className="text-xs font-mono text-white/25">
                                  D{String(project.day).padStart(2, "0")}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <h4 className="text-sm font-semibold text-foreground">
                                    {project.title}
                                  </h4>
                                  <span className="text-[10px] font-mono text-white/25 bg-white/[0.04] px-1.5 py-0.5 rounded">
                                    {project.tag}
                                  </span>
                                  <span
                                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                                      DIFFICULTY_COLORS[project.difficulty]
                                    }`}
                                  >
                                    {project.difficulty}
                                  </span>
                                </div>
                                <p className="text-xs text-white/35 leading-relaxed">
                                  {project.description}
                                </p>
                                <p className="text-[11px] text-white/20 mt-1.5 font-mono">
                                  HW: {project.hwConcept}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Difficulty Progression ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Difficulty Progression
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  level: "EASY",
                  days: "D01-03, D07, D17",
                  desc: "Core concepts with guided builds. If you know Python, you'll finish these.",
                },
                {
                  level: "MODERATE",
                  days: "D04-06, D08-09, D11-13, D15, D20-23, D27-28",
                  desc: "Real engineering challenges. You'll need to think, not just follow instructions.",
                },
                {
                  level: "ADVANCED",
                  days: "D10, D14, D16, D18-19, D24-26",
                  desc: "Deep concepts: protocol simulation, firmware analysis, cache architecture.",
                },
                {
                  level: "EXPERT",
                  days: "D29, D30",
                  desc: "Full system integration. Partial completion is expected and acceptable.",
                },
              ].map((item) => (
                <div
                  key={item.level}
                  className={`p-5 rounded-xl border ${DIFFICULTY_COLORS[item.level]} bg-opacity-50`}
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
                  <div className="text-xs font-mono font-bold mb-2">
                    {item.level}
                  </div>
                  <p className="text-[11px] text-white/25 font-mono mb-2">
                    {item.days}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              What you'll learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {[
                {
                  title: "Sensing & Input",
                  topics: "ADC, sensor thresholds, sampling rate, debounce, envelope detection",
                },
                {
                  title: "Signal Processing",
                  topics: "FFT, FIR filters, Butterworth filters, echo cancellation, spectrum analysis",
                },
                {
                  title: "Protocols",
                  topics: "I2C (SDA/SCL timing), UDP/UART framing, Morse encoding, packet loss handling",
                },
                {
                  title: "Embedded Simulation",
                  topics: "PWM duty cycle, register architecture, fetch-decode-execute, memory-mapped I/O",
                },
                {
                  title: "Computer Architecture",
                  topics: "Cache hierarchy (L1/L2), eviction policies, spatial/temporal locality, firmware maps",
                },
                {
                  title: "AI on the Edge",
                  topics: "Quantization, on-device inference, latency budgeting, vision pipelines",
                },
                {
                  title: "Control Systems",
                  topics: "PID control (P/I/D terms), closed-loop feedback, setpoint tracking, error signals",
                },
                {
                  title: "System Design",
                  topics: "Sensor fusion, multi-stage pipelines, ring buffers, DAQ, RTOS concepts",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What You Need ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-white/[0.06] pt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              What you need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                "A laptop (Mac, Windows, or Linux) with a webcam and microphone",
                "Python 3.10+ installed",
                "About 1 hour per day for 30 consecutive days",
                "Willingness to ship imperfect code daily",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="text-xs font-mono text-white/20 mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-white/50">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── v2.0 Teaser ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-12 text-center">
            <p className="text-xs font-mono text-white/25 mb-4">
              COMING NEXT
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              ORCAS v2.0 — Real Hardware
            </h2>
            <p className="text-sm text-white/35 max-w-lg mx-auto mb-2">
              After 30 days of software-first thinking, v2.0 puts real chips in
              your hands. Using a Raspberry Pi Pico W (under $6), common
              sensors, and servos, you'll apply everything you built in software
              to physical hardware.
            </p>
            <p className="text-xs text-white/20">
              The PID controller from Day 23 will drive a real servo. The I2C
              from Day 19 will read a real accelerometer.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-10 md:p-16 text-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Ready to build?
              </h2>
              <p className="text-white/35 mb-8 max-w-md mx-auto text-sm">
                Join the community on Discord and Telegram. Squads of 5,
                mentors, daily support, and the 2-strike system to keep you
                shipping.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://discord.gg/buildcored"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-black bg-white hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/10"
                >
                  Join on Discord
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/showcase"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                >
                  Browse Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
