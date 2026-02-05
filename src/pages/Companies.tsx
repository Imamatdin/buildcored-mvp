import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Companies() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company_name: companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setToken(data.token);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col pt-20 overflow-y-auto">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">
                Review Engineers
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-lg mx-auto">
                See how they solve real problems.
                <br />
                No resumes. Just reasoning.
              </p>
            </div>

            {!success ? (
              <>
                <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-auto w-full backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Inc."
                        required
                        className="bg-background/50 border-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Work Email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="bg-background/50 border-input"
                      />
                    </div>

                    {error && <p className="text-destructive text-sm">{error}</p>}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-lg"
                    >
                      {loading ? "Registering..." : "Get Access"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      We'll generate a unique access token for you instantly.
                    </p>
                  </form>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Already have access?
                    </span>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto w-full backdrop-blur-sm">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const t = (
                        e.currentTarget.elements.namedItem("token") as HTMLInputElement
                      ).value;
                      if (t) window.location.href = `/company/${t}`;
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm text-center text-muted-foreground mb-2">
                        Enter your access token
                      </label>
                      <Input
                        name="token"
                        placeholder="Paste token here..."
                        className="bg-background/50 border-input text-center font-mono"
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      Login
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-auto w-full text-center space-y-6">
                <div className="h-12 w-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-foreground">You're in.</h3>
                  <p className="text-muted-foreground">
                    Use this private link to review submissions.
                    <br />
                    Don't share it outside your hiring team.
                  </p>
                </div>

                <div className="bg-background/50 p-4 rounded-lg border border-border break-all font-mono text-sm relative group">
                  {window.location.origin}/company/{token}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/company/${token}`
                      )
                    }
                  >
                    Copy
                  </Button>
                </div>

                <Button
                  onClick={() => (window.location.href = `/company/${token}`)}
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
