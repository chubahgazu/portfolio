import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-between pb-10 pt-20 bg-brand-grey">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6">
        <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-center mb-8 md:mb-12">
          Ready to build
          <br className="hidden md:block" />
          something <span className="italic font-serif text-gray-400">timeless?</span>
        </h2>

        <form className="relative flex flex-col md:flex-row items-center gap-4 w-full max-w-md">
          <div className="relative w-full">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full h-16 px-6 rounded-full bg-white border border-gray-200 shadow-input focus:outline-none focus:ring-2 focus:ring-black/5 text-lg placeholder:text-gray-400"
              required
            />
          </div>
          <button 
            type="button" 
            className="h-16 px-8 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-all flex items-center gap-2 active:scale-95 shadow-lg w-full md:w-auto justify-center whitespace-nowrap"
          >
            Let's Talk
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Bottom Footer Info */}
      <footer className="w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 mt-20 gap-4">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
             <span className="text-white font-bold text-[10px]">I</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://t.me/+zjzVXH5V3zZIMDMy" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Telegram</a>
          <span>•</span>
          <a href="https://youtube.com/@r1chag?si=bCRqQqI8W1DFEXAR" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
          <span>•</span>
          <a href="https://www.instagram.com/r1chag?igsh=MTF3NWVxanNzeTFjZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
        </div>

        <div className="flex items-center gap-1">
          <span>© 2024 Ibrakhim Magomaev.</span>
          <span className="hidden md:inline">All rights reserved.</span>
        </div>
      </footer>
    </section>
  );
};