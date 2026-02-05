import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Eye, Trophy } from "lucide-react";

export default function Engineers() {
  return (
    <main className="min-h-screen bg-background pt-20 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
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
          <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center mb-12">
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
        </div>
      </main>
  );
}
