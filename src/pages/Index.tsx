import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Eye, Trophy } from "lucide-react";
import ScrollArrow from "@/components/ScrollArrow";

const Index = () => {
  const secondSectionRef = useRef<HTMLElement>(null);

  const scrollToSecondSection = () => {
    secondSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory relative">
      {/* Hero Section */}
      <section className="h-screen snap-start flex flex-col relative shrink-0">
        {/* Logo at top - centered */}
        <div className="pt-16 px-6 flex justify-center">
          <img src="/logo.svg" alt="Buildcored" className="h-64 md:h-72 w-auto" />
        </div>

        {/* Center Text */}
        <div className="flex-1 flex items-center justify-center px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-center max-w-4xl leading-tight tracking-tight">
            <span className="text-muted-foreground">open source for</span>
            <br />
            <span className="text-foreground font-medium">
              creative engineering
            </span>
          </h1>
        </div>

        {/* Scroll Arrow - Bottom Center */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <ScrollArrow onClick={scrollToSecondSection} />
        </div>
      </section>

      {/* Engineers Section - from buildcored-mvp.vercel.app/engineers */}
      <section
        ref={secondSectionRef}
        className="min-h-screen snap-start shrink-0 py-16"
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Hero */}
          <header className="mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Show companies{" "}
              <span className="text-primary">how you think</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Tired of resume black holes? Skip the keyword games. Solve a real
              engineering problem and let your reasoning speak for itself.
            </p>
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
            >
              View All Problems
              <ArrowRight className="h-4 w-4" />
            </Link>
          </header>

          {/* Value Props */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Anonymous by Default
              </h3>
              <p className="text-sm text-muted-foreground">
                Companies see your problem-solving, not your name, school, or past
                companies. Get judged on merit, not pedigree.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                15-25 Minutes, Not 6 Hours
              </h3>
              <p className="text-sm text-muted-foreground">
                No multi-day take-homes. One realistic scenario, your best thinking.
                That's it.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Real Problems, Not Puzzles
              </h3>
              <p className="text-sm text-muted-foreground">
                These are scenarios you'll actually face on the job—production
                issues, stakeholder conflicts, technical tradeoffs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                You Control Your Data
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose public, unlisted, or private visibility. Companies only get
                your email if you accept their interview request.
              </p>
            </div>
          </section>

          {/* Tracks */}
          <section className="mb-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Problems for Every Track
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We have problems for 10 different engineering roles. Pick the one
              that matches your expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { name: "Backend", id: 1 },
                { name: "Frontend", id: 2 },
                { name: "SRE/DevOps", id: 3 },
                { name: "Mobile", id: 4 },
                { name: "Data/ML", id: 5 },
                { name: "Security", id: 6 },
                { name: "QA/Test", id: 7 },
                { name: "Eng Manager", id: 8 },
                { name: "Junior", id: 9 },
                { name: "Product", id: 10 },
              ].map((track) => (
                <Link
                  key={track.id}
                  to={`/problem/${track.id}`}
                  className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-secondary/80 transition"
                >
                  {track.name}
                </Link>
              ))}
            </div>
            <Link
              to="/problems"
              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
            >
              View all problems
              <ArrowRight className="h-3 w-3" />
            </Link>
          </section>

          {/* CTA */}
          <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to show what you can do?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Pick a problem, share your reasoning, and let your thinking open
              doors.
            </p>
            <Link
              to="/problems"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
            >
              Start Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Email Signup Footer */}
          <section className="mt-16 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Ready for more updates?
            </p>
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/buildcored"
              method="post"
              target="popupwindow"
              className="mx-auto flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
              >
                Subscribe
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Index;
