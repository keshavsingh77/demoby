
import React, { useEffect, useState } from 'react';
import { fetchPostById } from '../services/bloggerService';
import { BloggerPost } from '../types';
import AdUnit from '../components/AdUnit';
import Sidebar from '../components/Sidebar';

interface PostPageProps {
  postId: string;
  categories: string[];
}

const PostPage: React.FC<PostPageProps> = ({ postId, categories }) => {
  const [post, setPost] = useState<BloggerPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setError("Invalid post ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Loading post with ID:", postId);
        const data = await fetchPostById(postId);
        if (data) {
          setPost(data);
        } else {
          setError("Article not found.");
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Unable to load the article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [postId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2"></div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Opening article...</p>
    </div>
  );

  if (error || !post) return (
    <div className="text-center py-32 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">{error || "Article not found"}</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">This story might have been moved or the ID is incorrect. Try returning to the home feed.</p>
      <a href="#/" className="inline-block px-10 py-4 bg-primary text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20">
        Return to Home
      </a>
    </div>
  );

  const date = new Date(post.published).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <article className="flex-grow max-w-full">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            {post.labels?.map(label => (
              <a key={label} href={`#/category/${encodeURIComponent(label)}`} className="px-3 py-1 bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all">
                {label}
              </a>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.05] tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-sm">
               <img src="https://ui-avatars.com/api/?name=Creative+Mind&background=2563eb&color=fff" alt="Creative Mind" className="rounded-full" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-900 tracking-tight">Creative Mind</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{date}</p>
            </div>
          </div>
        </header>

        <AdUnit className="mb-12" />

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed 
            [&>p]:mb-8 [&>img]:rounded-[2rem] [&>img]:shadow-xl [&>img]:my-12 [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tighter [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-12 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] text-center mb-6">Article Continued Below</p>
          <AdUnit />
        </div>

        <div className="mt-16 bg-gray-900 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center text-center md:text-left gap-8 shadow-2xl">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center border-4 border-white/10 shadow-lg shrink-0">
             <img src="https://ui-avatars.com/api/?name=Creative+Mind&background=2563eb&color=fff" alt="Creative Mind" className="rounded-full" />
          </div>
          <div>
            <p className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-2">Author Profile</p>
            <h4 className="text-2xl font-black text-white mb-3 tracking-tight">Creative Mind</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">Dedicated to bringing you the most accurate and up-to-date professional insights. Our goal is to provide value through high-quality research and expert analysis daily.</p>
          </div>
        </div>
      </article>

      <Sidebar categories={categories} />
    </div>
  );
};

export default PostPage;
