
import React from 'react';
import { BloggerPost } from '../types';
import { extractFirstImage } from '../services/bloggerService';

interface PostCardProps {
  post: BloggerPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const imageUrl = post.images?.[0]?.url || extractFirstImage(post.content) || `https://picsum.photos/seed/${post.id}/600/600`;
  const dateStr = new Date(post.published).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  const getLabelColor = (label?: string) => {
    const l = label?.toLowerCase() || '';
    if (l.includes('tech')) return 'bg-blue-600';
    if (l.includes('design')) return 'bg-indigo-600';
    if (l.includes('work')) return 'bg-blue-500';
    if (l.includes('analytics')) return 'bg-blue-700';
    return 'bg-primary';
  };

  const mainLabel = post.labels?.[0] || 'ARTICLE';

  return (
    <article className="group cursor-pointer">
      <a href={`#/post/${post.id}`} className="block">
        <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl mb-4 bg-gray-100 shadow-sm">
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
          <span className={`absolute bottom-3 left-3 ${getLabelColor(mainLabel)} text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-md shadow-lg`}>
            {mainLabel}
          </span>
        </div>
        <h3 className="text-base font-black leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
          {post.title}
        </h3>
        <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateStr}
        </div>
      </a>
    </article>
  );
};

export default PostCard;
