import { useEffect, useState } from "react";
import { ExternalLink, GithubIcon, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  repo_url: string | null;
  live_url: string | null;
  tags: string[];
  author_name: string | null;
  featured: boolean;
}

export default function Showcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/showcase")
      .then((r) => r.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen">
      <section className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <header className="mb-14 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Project Showcase
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Curated picks from our community. Creative engineering at its
              finest.
            </p>
          </header>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-44 bg-white/[0.03]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-white/[0.06] rounded w-3/4" />
                    <div className="h-3 bg-white/[0.04] rounded w-full" />
                    <div className="h-3 bg-white/[0.04] rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-24">
              <Star className="h-10 w-10 text-white/20 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-sm text-muted-foreground">
                We're curating the best projects. Check back soon.
              </p>
            </div>
          )}

          {/* Project Grid */}
          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`group bg-card border rounded-lg overflow-hidden transition-all hover:border-white/20 ${
                    project.featured
                      ? "border-white/20"
                      : "border-border"
                  }`}
                >
                  {/* Image */}
                  {project.image_url && (
                    <div className="h-44 overflow-hidden bg-white/[0.02]">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="flex items-center gap-1 text-white/60 text-xs font-medium mb-2.5">
                        <Star className="h-3 w-3" />
                        Featured
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-base font-semibold text-foreground mb-1.5">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Author */}
                    {project.author_name && (
                      <p className="text-xs text-muted-foreground mb-3">
                        by{" "}
                        <span className="text-white/70">
                          {project.author_name}
                        </span>
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-white/[0.06] text-xs text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          Repo
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
