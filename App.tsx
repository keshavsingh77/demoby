
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { fetchBlogInfo, fetchPosts } from './services/bloggerService';
import { BloggerBlog, PageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import StandardPage from './pages/StandardPage';
import SafeLinkPage from './pages/SafeLinkPage';
import VerifyPage from './pages/VerifyPage';

const BottomNav: React.FC = () => {
  const items = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: '#/' },
    { name: 'Explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', path: '#/' },
    { name: 'Topics', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', path: '#/' },
    { name: 'Account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', path: '#/' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-3 z-[999] md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {items.map(item => (
        <a key={item.name} href={item.path} className="flex flex-col items-center space-y-1 group">
          <div className="p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
            </svg>
          </div>
          <span className="text-[9px] font-black text-gray-400 group-hover:text-primary uppercase tracking-tighter">{item.name}</span>
        </a>
      ))}
    </nav>
  );
};

const AppContent: React.FC = () => {
  const [blogInfo, setBlogInfo] = useState<BloggerBlog | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const initApp = async () => {
      try {
        const info = await fetchBlogInfo();
        setBlogInfo(info);
        const postData = await fetchPosts();
        const allLabels = new Set<string>();
        postData.items?.forEach(post => post.labels?.forEach(label => allLabels.add(label)));
        setCategories(Array.from(allLabels));
      } catch (error) {
        console.error("Initialization failed", error);
      }
    };
    initApp();
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header blogInfo={blogInfo} categories={categories} />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full md:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home blogInfo={blogInfo} categories={categories} />} />
          <Route path="/about" element={<StandardPage type={PageType.ABOUT} />} />
          <Route path="/contact" element={<StandardPage type={PageType.CONTACT} />} />
          <Route path="/privacy" element={<StandardPage type={PageType.PRIVACY} />} />
          <Route path="/disclaimer" element={<StandardPage type={PageType.DISCLAIMER} />} />
          <Route path="/terms" element={<StandardPage type={PageType.TERMS} />} />

          <Route path="/post/:id" element={<PostRouteWrapper categories={categories} />} />
          <Route path="/category/:label" element={<CategoryRouteWrapper categories={categories} />} />
          <Route path="/safe-link" element={<SafeLinkPage />} />
          <Route path="/verify/:token" element={<VerifyPage />} />

          <Route path="*" element={<Home blogInfo={blogInfo} categories={categories} />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

const PostRouteWrapper = ({ categories }: { categories: string[] }) => {
  const { id } = useParams<{ id: string }>();
  // Component will re-render when 'id' changes
  return <PostPage postId={id || ''} categories={categories} />;
};

const CategoryRouteWrapper = ({ categories }: { categories: string[] }) => {
  const { label } = useParams<{ label: string }>();
  return <CategoryPage label={label || ''} categories={categories} />;
};

const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <AppContent />
    </HashRouter>
  );
};

export default App;
