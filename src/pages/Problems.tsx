import { Link } from "react-router-dom";
import { ArrowRight, Code, Server, Smartphone, Database, Shield, TestTube, Users, Briefcase, Rocket } from "lucide-react";
import { PROBLEMS } from "@/lib/problems";

const ICONS: Record<number, React.ReactNode> = {
  1: <Server className="h-6 w-6" />,
  2: <Code className="h-6 w-6" />,
  3: <Database className="h-6 w-6" />,
  4: <Smartphone className="h-6 w-6" />,
  5: <Database className="h-6 w-6" />,
  6: <Shield className="h-6 w-6" />,
  7: <TestTube className="h-6 w-6" />,
  8: <Users className="h-6 w-6" />,
  9: <Briefcase className="h-6 w-6" />,
  10: <Rocket className="h-6 w-6" />,
};

export default function Problems() {
  return (
    <main className="min-h-screen bg-background pt-20 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Engineering Decision Problems
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose a problem that matches your expertise. Companies will see your
              reasoning anonymously—show them how you think, not just what you've done.
            </p>
          </header>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROBLEMS.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-secondary text-primary">
                    {ICONS[problem.id]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-primary">
                        #{problem.id}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      {problem.track}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {problem.prompt.split('\n')[0]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <section className="mt-16 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <h3 className="font-medium text-foreground mb-1">Choose a Problem</h3>
                <p className="text-sm text-muted-foreground">
                  Pick the scenario that matches your expertise
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <h3 className="font-medium text-foreground mb-1">Share Your Thinking</h3>
                <p className="text-sm text-muted-foreground">
                  Explain how you'd approach the problem (15-25 min)
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <h3 className="font-medium text-foreground mb-1">Get Discovered</h3>
                <p className="text-sm text-muted-foreground">
                  Companies see your reasoning, not your resume
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
