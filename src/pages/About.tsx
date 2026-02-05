import { Link } from "react-router-dom";
import { ArrowRight, Code, Lightbulb, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero */}
          <header className="mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              About BUILDCORED
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              An open-source platform for sharing creative engineering solutions
              across disciplines.
            </p>
          </header>

          {/* Mission */}
          <section className="mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                Technical hiring is broken. Resumes reward credentials over
                capability. Take-home projects demand unpaid labor. Whiteboard
                interviews test performance anxiety, not engineering skill.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe the best signal of engineering ability is{" "}
                <span className="text-foreground font-medium">
                  how someone thinks through a real problem
                </span>
                . Not their alma mater. Not their previous company logos. Not
                whether they can invert a binary tree on a whiteboard.
              </p>
              <p className="text-muted-foreground">
                BUILDCORED gives engineers a way to demonstrate their
                problem-solving abilities on realistic scenarios—and gives
                companies a way to discover talented engineers based on how they
                actually think.
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Reasoning Over Credentials
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your thinking process matters more than where you went to school
                  or what companies you've worked for.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Anonymous by Default
                </h3>
                <p className="text-sm text-muted-foreground">
                  Reduce bias by letting your problem-solving speak first.
                  Identity comes later, when there's mutual interest.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Real Problems, Not Puzzles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our scenarios are based on actual situations engineers face—not
                  contrived algorithmic puzzles.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="p-3 rounded-lg bg-secondary text-primary w-fit mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Open Source First
                </h3>
                <p className="text-sm text-muted-foreground">
                  We're building in the open because we believe the engineering
                  community should shape how engineering hiring evolves.
                </p>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Bigger Picture
              </h2>
              <p className="text-muted-foreground mb-4">
                BUILDCORED started as a platform for engineering decision logs,
                but our vision is bigger: an open-source platform for sharing
                creative engineering solutions across all disciplines.
              </p>
              <p className="text-muted-foreground">
                Code algorithms, 3D designs, AI models, MATLAB scripts, CAD
                drawings, robotics projects—we want to be the place where
                engineers of all kinds can showcase how they solve problems.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Want to try it out?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/problems"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
              >
                View Problems
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground border border-border hover:bg-secondary transition"
              >
                Meet the Team
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}
