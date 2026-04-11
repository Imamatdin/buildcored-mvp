import { ExternalLink, GithubIcon, Star } from "lucide-react";
import type { Project } from "@/types/showcase";

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleClick = () => {
    if (onClick) onClick(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative bg-card border rounded-xl overflow-hidden transition-all hover:border-white/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 ${
        onClick ? "cursor-pointer" : ""
      } ${project.featured ? "border-white/15" : "border-border"}`}
    >
      {/* Image */}
      {project.image_url ? (
        <div className="relative h-48 overflow-hidden bg-white/[0.02]">
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {project.featured && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-[10px] font-medium text-white">
              <Star className="h-2.5 w-2.5 fill-white" />
              FEATURED
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-48 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-b border-white/[0.04] flex items-center justify-center">
          <span className="text-white/15 text-xs font-mono uppercase tracking-widest">
            {project.title.slice(0, 2)}
          </span>
          {project.featured && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-[10px] font-medium text-white">
              <Star className="h-2.5 w-2.5 fill-white" />
              FEATURED
            </div>
          )}
        </div>
      )}

      <div className="p-5">
        {/* Title */}
        <h2 className="text-base font-semibold text-foreground mb-1.5 line-clamp-1">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-white/45 mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Author */}
        {project.author_name && (
          <p className="text-xs text-white/35 mb-3">
            by <span className="text-white/60">{project.author_name}</span>
          </p>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[11px] text-white/45"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] text-white/30">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        {(project.repo_url || project.live_url) && (
          <div
            className="flex items-center gap-3 pt-3 border-t border-white/[0.05]"
            onClick={(e) => e.stopPropagation()}
          >
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
        )}
      </div>
    </article>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/[0.03]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/[0.06] rounded w-3/4" />
        <div className="h-3 bg-white/[0.04] rounded w-full" />
        <div className="h-3 bg-white/[0.04] rounded w-2/3" />
      </div>
    </div>
  );
}
