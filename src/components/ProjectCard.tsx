import { ExternalLink, GithubIcon, Star } from "lucide-react";
import type { Project } from "@/types/showcase";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`group bg-card border rounded-lg overflow-hidden transition-all hover:border-white/20 ${
        project.featured ? "border-white/20" : "border-border"
      }`}
    >
      {/* Image */}
      {project.image_url && (
        <div className="h-44 overflow-hidden bg-white/[0.02]">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
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
            by <span className="text-white/70">{project.author_name}</span>
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
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      <div className="h-44 bg-white/[0.03]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/[0.06] rounded w-3/4" />
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-2/3" />
      </div>
    </div>
  );
}
