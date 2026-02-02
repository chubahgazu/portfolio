import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CopyCode } from './ui/copy-code-button';
import { Magnetic } from './ui/magnetic';

export const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "ibrakhimmmmm@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center pt-24 pb-8">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-auto min-h-[75vh] bg-brand-secondary/5 rounded-[2rem] border border-brand-secondary/10 flex flex-col justify-between overflow-hidden backdrop-blur-sm"
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Top Bar */}
        <div className="relative flex justify-between items-start p-6 md:p-10 w-full z-10">

          {/* Email Copy Block */}
          <div className="flex items-center gap-3">
            <CopyCode
              code="ibrakhimmmmm@gmail.com"
              className="bg-white border border-brand-secondary/10 shadow-sm pl-2 pr-1 py-1 w-auto h-auto rounded-full gap-2"
            />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-sm font-heading font-medium text-text-secondary">
            <a href="https://t.me/+zjzVXH5V3zZIMDMy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Telegram</a>
            <a href="https://youtube.com/@r1chag?si=bCRqQqI8W1DFEXAR" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">YouTube</a>
            <a href="https://www.instagram.com/r1chag?igsh=MTF3NWVxanNzeTFjZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Instagram</a>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 -mt-10 z-10">

          {/* Avatar Group */}
          <div className="mb-8 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-soft bg-gray-100">
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="absolute -bottom-2 -right-2 bg-white px-4 py-1.5 rounded-full shadow-md border border-brand-secondary/10 flex items-center gap-2">
                <span className="text-xs font-bold font-heading text-text-primary">Ibrakhim</span>
                <span className="text-xs text-text-secondary">Magomaev</span>
              </div>
            </motion.div>
          </div>

          {/* Headline */}
          {/* Headline */}
          {/* Headline */}
          <h1 className="font-heading font-medium text-5xl md:text-7xl lg:text-8xl tracking-tight text-text-primary leading-[1] max-w-5xl mx-auto">
            <span className="relative inline-block px-2 -ml-2 mr-1"><span className="absolute inset-0 bg-yellow-300/40 -skew-x-6 rounded-lg" /> <span className="relative">Идеи</span></span>. Нейросети. <span className="text-brand-accent">Кейсы</span>.
            <br />
            Чатботы. Автоматизации.
          </h1>

          <p className="mt-8 text-lg md:text-xl text-text-secondary font-body max-w-2xl">
            Воплощаю идеи с <span className="text-brand-accent">AI</span>
          </p>

        </div>

        {/* Bottom CTA */}
        <div className="relative p-10 w-full flex justify-center pb-12 md:pb-16 z-10">
          <Magnetic intensity={0.2} springOptions={{ stiffness: 26.7, damping: 5, mass: 0.5 }}>
            <button className="group flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-full hover:bg-brand-accent transition-all duration-300 shadow-lg hover:shadow-brand-accent/25 active:scale-95">
              <span className="text-base font-body font-medium">Latest Shots</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Magnetic>
        </div>

      </motion.div>
    </section>
  );
};