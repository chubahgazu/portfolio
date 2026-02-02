import React from 'react';

export const StickyHeader: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 pointer-events-none flex justify-center">
      <div className="flex gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-sm pointer-events-auto">
        <button
          onClick={() => scrollToSection('story')}
          className="group cursor-pointer rounded-full px-5 py-2 hover:bg-gray-100 transition-all active:scale-95"
        >
          <span className="text-sm font-body font-medium text-text-secondary group-hover:text-text-primary transition-colors">
            История
          </span>
        </button>
        <button
          onClick={() => scrollToSection('story-cta')}
          className="group cursor-pointer rounded-full px-5 py-2 bg-brand text-white hover:bg-brand-accent transition-all active:scale-95 shadow-md"
        >
          <span className="text-sm font-body font-medium transition-colors">
            Полезно
          </span>
        </button>
      </div>
    </header>
  );
};