
import React from 'react';
import { FOOTER_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10 flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Daily Update</h3>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            Delivering modern perspectives and the latest insights through high-performance headless architecture.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          {['Facebook', 'Twitter', 'Instagram'].map(social => (
            <button key={social} className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all shadow-sm">
              <div className="w-4 h-4 bg-current rounded-sm"></div>
            </button>
          ))}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="#/" className="btn-footer">Home</a>
          {FOOTER_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} className="btn-footer">{link.name}</a>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">
            © 2024 Daily Update Blog Services. All rights reserved.
          </p>
          <div className="flex justify-center items-center space-x-2 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
            <span>Powered by</span>
            <span className="bg-gray-200 px-1.5 py-0.5 rounded">Blogger API</span>
            <span>ID: 6924208631263306852</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
