
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/bloggerService';
import { BloggerPost } from '../types';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

interface CategoryPageProps {
  label: string;
  categories: string[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ label, categories }) => {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadPosts();
  }, [label]);

  const loadPosts = async (token?: string) => {
    try {
      setLoading(true);
      const data = await fetchPosts(token, label);
      if (token) {
        setPosts(prev => [...prev, ...data.items]);
      } else {
        setPosts(data.items || []);
      }
      setNextPageToken(data.nextPageToken);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-gray-100 p-12 rounded-2xl text-center">
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Category</p>
        <h1 className="text-4xl font-black text-gray-900 capitalize">{label}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          {loading && posts.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              {nextPageToken && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={() => loadPosts(nextPageToken)}
                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
              <p className="text-gray-400">No articles found in this category.</p>
            </div>
          )}
        </div>

        <Sidebar categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
