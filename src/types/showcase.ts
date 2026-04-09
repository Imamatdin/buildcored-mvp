export interface Project {
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
