
import React, { useState } from 'react';
import { NAVBAR_LINKS } from '../constants';
import { BloggerBlog } from '../types';

interface HeaderProps {
  blogInfo?: BloggerBlog;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ blogInfo, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">Daily Update</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
          {NAVBAR_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} className="text-gray-500 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none md:hidden"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-white z-[99] md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 space-y-6 flex flex-col items-center pt-12">
            {NAVBAR_LINKS.map(link => (
              <a 
                key={link.path} 
                href={`#${link.path}`} 
                onClick={() => setIsOpen(false)} 
                className="text-2xl font-black text-gray-900 uppercase tracking-tighter hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="w-12 h-1 bg-primary rounded-full mt-4"></div>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.slice(0, 5).map(cat => (
                 <a 
                  key={cat}
                  href={`#/category/${encodeURIComponent(cat)}`}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-primary hover:text-white transition-all"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
