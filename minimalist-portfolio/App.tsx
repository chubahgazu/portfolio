import React from 'react';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Footer } from './components/Footer';
import { StickyHeader } from './components/StickyHeader';

export default function App() {
  return (
    <div className="relative min-h-screen bg-brand-grey text-brand-black selection:bg-brand-black selection:text-white overflow-x-hidden">
      <StickyHeader />
      
      <main className="flex flex-col items-center w-full">
        {/* The Card Hero Section based on screenshot */}
        <Hero />
        
        {/* The Wabi-style Storytelling Section */}
        <Story />
      </main>

      {/* Footer / Waitlist Section */}
      <Footer />
    </div>
  );
}