export type Media = {
  type: string;
  src: string;
  width: number;
  height: number;
  title?: string;
  poster?: string;
};
export type Project = {
  title: string;
  slug: string;
  date: string;
  recognition: string;
  role: string;
  roleLabel: string;
  category: string;
  description: string;
  cover: string;
  colors: string[];
  about: string;
  website: string;
  next: string | null;
  media: Media[];
};
