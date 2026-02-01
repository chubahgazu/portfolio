import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "ibrakhimmmmm@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {/* Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1400px] h-[85vh] md:h-[90vh] bg-card-bg rounded-[2rem] md:rounded-[3rem] shadow-soft flex flex-col justify-between overflow-hidden border border-white/50"
      >
        {/* Top Bar */}
        <div className="flex justify-between items-start p-6 md:p-10 w-full">
          
          {/* Email Copy Block */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-gray-500 font-medium tracking-wide">
              {email}
            </div>
            <button 
              onClick={handleCopy}
              className="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-input hover:shadow-md transition-all active:scale-95"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400 group-hover:text-black" />}
              <span className="text-xs font-medium text-gray-600 group-hover:text-black">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
            <a href="https://t.me/+zjzVXH5V3zZIMDMy" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Telegram</a>
            <span className="hidden md:inline text-gray-200">/</span>
            <a href="https://youtube.com/@r1chag?si=bCRqQqI8W1DFEXAR" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
            <span className="hidden md:inline text-gray-200">/</span>
            <a href="https://www.instagram.com/r1chag?igsh=MTF3NWVxanNzeTFjZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 -mt-10">
          
          {/* Avatar Group */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <div className="relative inline-block">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10 bg-gray-100"
              >
                <img 
                  src="https://picsum.photos/200" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Name Tag Float */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 left-full ml-4 -translate-y-1/2 whitespace-nowrap bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-50 flex items-center gap-1 z-20"
              >
                <span className="text-[10px] md:text-xs font-semibold text-gray-700">Ibrakhim Magomaev</span>
                <span className="text-yellow-500">👋</span>
              </motion.div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-brand-black leading-[1.1] max-w-5xl mx-auto">
            Идеи. Нейросети. Кейсы.
            <br />
            Чатботы. Автоматизации.
            <br />
            <span className="text-gray-400">Воплощаю идеи с AI</span>
          </h1>

        </div>

        {/* Bottom CTA */}
        <div className="p-10 w-full flex justify-center pb-12 md:pb-16">
           <button className="group flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-full hover:bg-gray-800 transition-all active:scale-95">
              <span className="text-sm font-medium">Latest Shots</span>
              <ArrowUpRight size={16} className="text-white/70 group-hover:text-white transition-colors" />
           </button>
        </div>

      </motion.div>
    </section>
  );
};