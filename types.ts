
export interface BloggerBlog {
  id: string;
  name: string;
  description: string;
  url: string;
  posts: {
    totalItems: number;
  };
}

export interface BloggerPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  author: {
    displayName: string;
    image: { url: string };
  };
  labels?: string[];
  images?: Array<{ url: string }>;
}

export interface BloggerPostList {
  items: BloggerPost[];
  nextPageToken?: string;
}

export enum PageType {
  HOME = 'home',
  POST = 'post',
  CATEGORY = 'category',
  ABOUT = 'about',
  CONTACT = 'contact',
  PRIVACY = 'privacy',
  DISCLAIMER = 'disclaimer',
  TERMS = 'terms'
}
