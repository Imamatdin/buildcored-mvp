import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

interface Submission {
    id: string;
    handle: string;
    first_action: string;
    why_first: string;
    second_action: string;
    why_second: string;
    third_action: string;
    signals_data_first: string;
    wont_do: string;
    biggest_risk: string;
    with_more_time: string;
    role_track: string;
    seniority: string;
    time_budget: string;
    created_at: string;
}

export default function CompanyView() {
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [requesting, setRequesting] = useState<string | null>(null); // handle of engineer
    const [requested, setRequested] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await fetch("/api/company-view", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to load submissions");
                }

                setSubmissions(data.submissions);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Access denied or server error");
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            fetchSubmissions();
        }
    }, [token]);

    const handleRequestInterview = async (handle: string) => {
        setRequesting(handle);
        try {
            const response = await fetch("/api/request-interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, handle }),
            });

            if (!response.ok) throw new Error("Failed");

            setRequested((prev) => new Set(prev).add(handle));
        } catch (err) {
            alert("Failed to send request. Please try again.");
        } finally {
            setRequesting(null);
        }
    };

    const nextPair = () => {
        if (currentIndex + 2 < submissions.length) {
            setCurrentIndex((prev) => prev + 2);
        }
    };

    const prevPair = () => {
        if (currentIndex - 2 >= 0) {
            setCurrentIndex((prev) => prev - 2);
        }
    };

    if (loading) return <LoadingSkeleton />;
    if (error) return <ErrorScreen message={error} />;
    if (submissions.length === 0) return <EmptyScreen />;

    const currentPair = submissions.slice(currentIndex, currentIndex + 2);

    return (
        <main className="h-screen overflow-y-auto bg-background p-6">
            <header className="max-w-7xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Payment System Latency</h1>
                    <p className="text-muted-foreground">Showing {currentIndex + 1}-{Math.min(currentIndex + 2, submissions.length)} of {submissions.length} submissions</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={prevPair} disabled={currentIndex === 0}>
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>
                    <Button variant="outline" onClick={nextPair} disabled={currentIndex + 2 >= submissions.length}>
                        Next <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPair.map((sub) => (
                    <div key={sub.id} className="bg-card border border-border rounded-xl p-6 space-y-6 flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-border pb-4">
                            <div>
                                <h2 className="text-xl font-medium text-foreground mb-1">{sub.handle}</h2>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {sub.role_track && <Badge variant="secondary">{sub.role_track}</Badge>}
                                    {sub.seniority && <Badge variant="secondary">{sub.seniority}</Badge>}
                                    {sub.time_budget && <Badge variant="outline">{sub.time_budget}</Badge>}
                                </div>
                            </div>
                            {requested.has(sub.handle) ? (
                                <Button disabled variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                    <CheckCircle className="h-4 w-4 mr-2" /> Requested
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleRequestInterview(sub.handle)}
                                    disabled={requesting === sub.handle}
                                    className="bg-white text-black hover:bg-gray-200"
                                >
                                    {requesting === sub.handle ? "Sending..." : "Request Interview"}
                                </Button>
                            )}
                        </div>

                        {/* Responses */}
                        <div className="space-y-6 flex-1 text-sm leading-relaxed">
                            <Section title="First Action" content={sub.first_action} reasoning={sub.why_first} />
                            <Section title="Checking Signals" content={sub.signals_data_first} />
                            <Section title="Second Action" content={sub.second_action} reasoning={sub.why_second} />
                            <Section title="Third Action" content={sub.third_action} />
                            <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Explicitly NOT Doing</h3>
                                <p className="text-foreground">{sub.wont_do}</p>
                            </div>
                            <Section title="Biggest Risk" content={sub.biggest_risk} />
                            <Section title="With More Time" content={sub.with_more_time} />
                        </div>

                        <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                            Submitted {new Date(sub.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}

function Section({ title, content, reasoning }: { title: string, content: string, reasoning?: string }) {
    if (!content) return null;
    return (
        <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">{title}</h3>
            <p className="text-foreground whitespace-pre-wrap">{content}</p>
            {reasoning && (
                <div className="pl-3 border-l-2 border-primary/20 mt-2">
                    <p className="text-muted-foreground italic">{reasoning}</p>
                </div>
            )}
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6">
                {[1, 2].map(i => (
                    <div key={i} className="h-[80vh] bg-card border border-border rounded-xl p-6 animate-pulse" />
                ))}
            </div>
        </main>
    );
}

function ErrorScreen({ message }: { message: string }) {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
                <p className="text-muted-foreground">{message}</p>
                <Button onClick={() => window.location.href = "/"}>Go Home</Button>
            </div>
        </main>
    );
}

function EmptyScreen() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-foreground">No Submissions Yet</h1>
                <p className="text-muted-foreground">Check back later once candidates start submitting.</p>
            </div>
        </main>
    );
}
