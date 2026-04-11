import { useEffect } from "react";
import { X, ExternalLink, GithubIcon, Star, User } from "lucide-react";
import type { Project } from "@/types/showcase";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-md px-4 py-12 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-card border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-black/80 transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        {project.image_url && (
          <div className="relative w-full bg-white/[0.02] border-b border-white/[0.06]">
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-auto max-h-[60vh] object-contain"
            />
            {project.featured && (
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-xs font-medium text-white">
                <Star className="h-3 w-3 fill-white" />
                Featured
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {!project.image_url && project.featured && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-white mb-4">
              <Star className="h-3 w-3 fill-white" />
              Featured
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            {project.title}
          </h2>

          {/* Author */}
          {project.author_name && (
            <div className="flex items-center gap-2 text-sm text-white/50 mb-5">
              <User className="h-3.5 w-3.5" />
              <span>
                by <span className="text-white/80">{project.author_name}</span>
              </span>
            </div>
          )}

          {/* Description (full, no clamp) */}
          <p className="text-[15px] text-white/65 leading-relaxed whitespace-pre-line mb-6">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {(project.repo_url || project.live_url) && (
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-white/[0.06]">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-white/90 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition"
                >
                  <GithubIcon className="h-4 w-4" />
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
