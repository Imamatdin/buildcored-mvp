import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Problem } from "@/lib/problems";

interface FormData {
  email: string;
  visibility: string;
  role_track: string;
  seniority: string;
  time_budget: string;
  attest_original: boolean;
  [key: string]: string | boolean;
}

interface ProblemFormProps {
  problem: Problem;
}

export default function ProblemForm({ problem }: ProblemFormProps) {
  const [quickInfoOpen, setQuickInfoOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  // Initialize form data with all question fields
  const initialFormData: FormData = {
    email: "",
    visibility: "unlisted",
    role_track: "",
    seniority: "",
    time_budget: "",
    attest_original: false,
  };
  problem.questions.forEach((q) => {
    initialFormData[q.name] = "";
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = () => {
    const allTextFilled = problem.questions.every(
      (q) => formData[q.name] && (formData[q.name] as string).trim().length > 0
    );
    const emailValid = formData.email.includes("@");
    const attested = formData.attest_original;

    const withinLimits = problem.questions.every((q) => {
      const value = formData[q.name] as string;
      return !value || value.length <= q.max;
    });

    return allTextFilled && emailValid && attested && withinLimits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit-decision-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          problem_id: problem.id,
          problem_title: problem.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setHandle(data.handle);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6 pt-20">
          <div className="max-w-xl text-center space-y-6">
            <h1 className="text-3xl font-semibold text-foreground">
              Submitted as{" "}
              <span className="text-primary">{handle}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Companies see your reasoning anonymously.
              <br />
              If they want to interview you, we'll email you.
            </p>
            <Button
              onClick={() => window.location.href = "/problems"}
              className="rounded-full px-6 py-2 text-sm font-medium text-black bg-white hover:bg-white/90"
            >
              View Other Problems
            </Button>
          </div>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-background overflow-y-auto pt-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              {problem.title}
            </h1>
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <pre className="whitespace-pre-wrap text-sm md:text-base text-foreground/90 font-mono leading-relaxed">
                {problem.prompt}
              </pre>
            </div>
            <p className="text-muted-foreground text-sm">
              This takes 15–25 minutes. Privacy-first. Companies compare reasoning,
              not resumes.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quick Info (collapsible) */}
            <Collapsible open={quickInfoOpen} onOpenChange={setQuickInfoOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-full">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    quickInfoOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="text-sm font-medium">
                  Quick Info (optional)
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Role Track
                    </label>
                    <select
                      value={formData.role_track}
                      onChange={(e) => updateField("role_track", e.target.value)}
                      className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Backend">Backend</option>
                      <option value="Frontend">Frontend</option>
                      <option value="SRE">SRE</option>
                      <option value="Security">Security</option>
                      <option value="Fullstack">Fullstack</option>
                      <option value="Mobile">Mobile</option>
                      <option value="ML">ML/Data</option>
                      <option value="QA">QA/Test</option>
                      <option value="EM">Engineering Manager</option>
                      <option value="Product">Product Engineer</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Seniority
                    </label>
                    <select
                      value={formData.seniority}
                      onChange={(e) => updateField("seniority", e.target.value)}
                      className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Student">Student</option>
                      <option value="Junior">Junior (0-2 years)</option>
                      <option value="Mid">Mid (2-5 years)</option>
                      <option value="Senior">Senior (5-8 years)</option>
                      <option value="Staff+">Staff+ (8+ years)</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Time Budget
                    </label>
                    <select
                      value={formData.time_budget}
                      onChange={(e) => updateField("time_budget", e.target.value)}
                      className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="15m">15 minutes</option>
                      <option value="30m">30 minutes</option>
                      <option value="60m">1 hour</option>
                      <option value="2h">2+ hours</option>
                    </select>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Decision Log Questions */}
            <section className="space-y-6">
              <h2 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Decision Log
              </h2>
              {problem.questions.map((question) => {
                const value = formData[question.name] as string;
                const isOverLimit = value.length > question.max;
                return (
                  <div key={question.name}>
                    <label className="block text-sm text-foreground mb-2">
                      {question.label}
                    </label>
                    <Textarea
                      value={value}
                      onChange={(e) => updateField(question.name, e.target.value)}
                      className="bg-card border-border focus:border-muted-foreground min-h-[100px]"
                      placeholder="Your response..."
                    />
                    <p
                      className={`text-xs mt-1 ${
                        isOverLimit ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {value.length} / {question.max}
                    </p>
                  </div>
                );
              })}
            </section>

            {/* Attestation */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="attest"
                checked={formData.attest_original}
                onCheckedChange={(checked) =>
                  updateField("attest_original", checked === true)
                }
              />
              <label
                htmlFor="attest"
                className="text-sm text-foreground cursor-pointer"
              >
                I wrote this myself.
              </label>
            </div>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Contact
              </h2>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  For interview requests only — never shown to companies
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-card border-border focus:border-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => updateField("visibility", e.target.value)}
                  className="w-full bg-card border border-border rounded-lg p-3 text-foreground focus:border-muted-foreground focus:outline-none"
                >
                  <option value="unlisted">Unlisted</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </section>

            {/* Error */}
            {error && <p className="text-destructive text-sm">{error}</p>}

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isValid() || submitting}
              className="w-full bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-zinc-200 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Decision Log"}
            </Button>
          </form>
        </div>
      </main>
  );
}
