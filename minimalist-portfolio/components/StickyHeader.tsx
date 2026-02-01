import React from 'react';
import { motion } from 'framer-motion';

export const StickyHeader: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-6 flex justify-center md:justify-start">
      <div className="flex gap-2 pointer-events-auto">
        <button 
          onClick={() => scrollToSection('story')}
          className="group cursor-pointer rounded-full px-4 py-2 bg-black/5 hover:bg-black/10 backdrop-blur-sm transition-all active:scale-95"
        >
          <span className="text-xs font-medium text-black/60 group-hover:text-black transition-colors">
            The Story
          </span>
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="group cursor-pointer rounded-full px-4 py-2 bg-black/5 hover:bg-black/10 backdrop-blur-sm transition-all active:scale-95"
        >
          <span className="text-xs font-medium text-black/60 group-hover:text-black transition-colors">
            Contact
          </span>
        </button>
      </div>
    </header>
  );
};