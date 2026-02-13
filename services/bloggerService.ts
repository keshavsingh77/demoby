
import { BloggerBlog, BloggerPost, BloggerPostList } from '../types';
import { BLOGGER_API_KEY, BLOG_ID } from '../constants';

const BASE_URL = 'https://www.googleapis.com/blogger/v3/blogs';

export const fetchBlogInfo = async (): Promise<BloggerBlog> => {
  const response = await fetch(`${BASE_URL}/${BLOG_ID}?key=${BLOGGER_API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch blog info');
  return response.json();
};

export const fetchPosts = async (pageToken?: string, label?: string): Promise<BloggerPostList> => {
  let url = `${BASE_URL}/${BLOG_ID}/posts?key=${BLOGGER_API_KEY}&maxResults=10`;
  if (pageToken) url += `&pageToken=${pageToken}`;
  if (label) url += `&labels=${encodeURIComponent(label)}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const fetchPostById = async (postId: string): Promise<BloggerPost> => {
  const response = await fetch(`${BASE_URL}/${BLOG_ID}/posts/${postId}?key=${BLOGGER_API_KEY}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

export const extractFirstImage = (content: string): string | null => {
  const div = document.createElement('div');
  div.innerHTML = content;
  const img = div.querySelector('img');
  return img ? img.src : null;
};

export const extractExcerpt = (content: string, length: number = 150): string => {
  const div = document.createElement('div');
  div.innerHTML = content;
  const text = div.textContent || div.innerText || '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};
