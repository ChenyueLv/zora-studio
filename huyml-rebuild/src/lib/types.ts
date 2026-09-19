export type Media = {
  type: string;
  src: string;
  width: number;
  height: number;
  title?: string;
  poster?: string;
  /** 本地视频在网格悬停时播放的轻量版本 */
  previewVideo?: string;
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
