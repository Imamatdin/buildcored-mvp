import { Star } from "lucide-react";
import { useShowcaseProjects } from "@/hooks/useShowcaseProjects";
import ProjectCard, { ProjectCardSkeleton } from "@/components/ProjectCard";

export default function Showcase() {
  const { projects, isLoading } = useShowcaseProjects();

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
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && projects.length === 0 && (
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
          {!isLoading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
