import { useEffect, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

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
    <main className="min-h-screen overflow-y-auto">
      <Navbar />

      <section className="min-h-screen pt-28">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Project <span className="text-primary">Showcase</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The best open source projects built by our community. Curated
              picks that demonstrate creative engineering at its finest.
            </p>
          </header>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-secondary" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-full" />
                    <div className="h-4 bg-secondary rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Coming Soon
              </h2>
              <p className="text-muted-foreground">
                We're curating the best projects. Check back soon.
              </p>
            </div>
          )}

          {/* Project Grid */}
          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className={`group bg-card border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 ${
                    project.featured
                      ? "border-primary/50 ring-1 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Image */}
                  {project.image_url && (
                    <div className="h-48 overflow-hidden bg-secondary">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="flex items-center gap-1 text-primary text-xs font-medium mb-3">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Author */}
                    {project.author_name && (
                      <p className="text-xs text-muted-foreground mb-4">
                        by{" "}
                        <span className="text-foreground">
                          {project.author_name}
                        </span>
                      </p>
                    )}

                    {/* Tags */}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          <Github className="h-4 w-4" />
                          Repo
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
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
