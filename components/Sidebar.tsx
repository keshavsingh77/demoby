
import React from 'react';
import AdUnit from './AdUnit';
import { BloggerBlog } from '../types';

interface SidebarProps {
  blogInfo?: BloggerBlog;
  categories: string[];
  recentPosts?: Array<{ id: string; title: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ blogInfo, categories, recentPosts }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
      {/* About Widget */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold mb-4 border-b pb-2">About The Blog</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {blogInfo?.description || "Welcome to our professional platform where we share the latest insights, trends, and tutorials in modern technology and lifestyle."}
        </p>
      </section>

      {/* Categories Widget */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold mb-4 border-b pb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a 
              key={cat} 
              href={`#/category/${encodeURIComponent(cat)}`}
              className="px-3 py-1 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded text-xs transition-colors border border-gray-100"
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* Ad Widget */}
      <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center mb-4">Advertisement</p>
        <AdUnit style={{ display: 'block', height: '250px' }} />
      </section>

      {/* Recent Posts */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-bold mb-4 border-b pb-2">Recent Articles</h4>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <a href={`#/post/${post.id}`} className="text-sm font-medium hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
};

export default Sidebar;
