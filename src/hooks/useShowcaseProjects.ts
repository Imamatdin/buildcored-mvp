import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/showcase";

export function useShowcaseProjects() {
  const query = useQuery<Project[]>({
    queryKey: ["showcase-projects"],
    queryFn: () =>
      fetch("/api/showcase")
        .then((r) => r.json())
        .then((d) => (Array.isArray(d) ? d : [])),
    staleTime: 5 * 60 * 1000,
  });

  const featured = query.data?.filter((p) => p.featured) ?? [];
  const recent = query.data?.filter((p) => !p.featured) ?? [];

  return {
    projects: query.data ?? [],
    featured,
    recent,
    isLoading: query.isLoading,
  };
}
