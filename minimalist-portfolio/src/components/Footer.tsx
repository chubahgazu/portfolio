import React from 'react';
import { ArrowRight } from 'lucide-react';
import { StarButton } from './ui/star-button';

export const Footer: React.FC = () => {
  return (
    <section id="contact" className="relative w-full flex flex-col items-center justify-between pb-10 pt-32 bg-bg-primary overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-secondary/5 pointer-events-none" />

      {/* Main Content Removed */}

      {/* Bottom Footer Info */}
      <footer className="w-full max-w-[1400px] px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary mt-32 gap-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold font-heading text-xs">IM</span>
          </div>
          <span className="font-medium text-text-primary">Ibrakhim Magomaev</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <a href="https://t.me/+zjzVXH5V3zZIMDMy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Telegram</a>
          <a href="https://youtube.com/@r1chag?si=bCRqQqI8W1DFEXAR" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">YouTube</a>
          <a href="https://www.instagram.com/r1chag?igsh=MTF3NWVxanNzeTFjZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Instagram</a>
        </div>

        <div className="flex items-center gap-1 opacity-60">
          <span>© 2026</span>
          <span className="hidden md:inline">Все права не защищены</span>
        </div>
      </footer>
    </section>
  );
};