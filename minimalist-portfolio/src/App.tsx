import React from 'react';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Footer } from './components/Footer';
import { StickyHeader } from './components/StickyHeader';

import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary selection:bg-brand-accent selection:text-white overflow-x-hidden font-body flex flex-col items-center">
      <StickyHeader />

      <main className="flex-1 w-full max-w-[1400px] px-4 md:px-6 flex flex-col items-center">
        {/* The Card Hero Section */}
        <Hero />

        {/* The Wabi-style Storytelling Section */}
        <Story />
      </main>

      {/* Footer / Waitlist Section */}
      <Footer />
      <Analytics />
    </div>
  );
}