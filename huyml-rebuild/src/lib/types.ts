export type Media = {
  type: string;
  src: string;
  width: number;
  height: number;
  title?: string;
  poster?: string;
  /** 本地视频在网格悬停时播放的轻量版本 */
  previewVideo?: string;
  /** 网格卡片的显示比例（如 "4 / 5"），不填则按原始宽高 */
  cardRatio?: string;
  /** 点开预览时的最大显示高度（px），用于低分辨率素材 */
  maxHeight?: number;
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
