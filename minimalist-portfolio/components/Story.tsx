import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollParagraphProps {
  children?: React.ReactNode;
  className?: string;
}

// A single paragraph component that handles its own fade-in based on scroll position
const ScrollParagraph = ({ children, className = "" }: ScrollParagraphProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 0.9", "start 0.5"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div 
      ref={elementRef}
      style={{ opacity, y }}
      className={`mb-24 md:mb-32 max-w-2xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const Story: React.FC = () => {
  return (
    <section id="story" className="w-full py-24 md:py-40 relative z-10">
      
      {/* Intro Heading */}
      <div className="h-[30vh] flex items-center justify-center mb-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-[12vw] md:text-[8vw] leading-none font-sans text-center tracking-tighter opacity-10"
        >
          Мой Путь
        </motion.h2>
      </div>

      <div className="text-2xl md:text-4xl font-medium leading-[1.4] tracking-tight text-brand-black">
        
        <ScrollParagraph>
          <p>
            Many years ago, I started with a simple idea: 
            <span className="relative inline-block mx-2 align-middle">
              <img src="https://picsum.photos/id/20/40/40" className="rounded-md w-8 h-8 md:w-10 md:h-10 inline-block grayscale hover:grayscale-0 transition-all" alt="Idea" />
            </span>
            that design isn't just about how things look.
          </p>
        </ScrollParagraph>

        <ScrollParagraph>
          <p>
            It's about how things <span className="italic font-serif text-gray-500">work</span>. For a while, the web felt cluttered. 
            Too many sites focused on noise rather than signal.
            <span className="block mt-4 text-gray-400 text-xl md:text-3xl">Notifications. Popups. Complexity.</span>
          </p>
        </ScrollParagraph>

        <ScrollParagraph>
          <p>
            But year after year, users crave simplicity. They want software that feels like it was made for 
            <span className="relative inline-block px-2">
               <span className="relative z-10">them</span>
               <span className="absolute inset-0 bg-yellow-200/50 -rotate-2 rounded-sm z-0"></span>
            </span>
            , not for everyone.
          </p>
        </ScrollParagraph>

        <ScrollParagraph>
          <p>
             That's why I focus on <span className="font-bold">Personal Craftsmanship</span>.
             Freed from corporate templates. Freed from the "one-size-fits-all" mentality.
          </p>
        </ScrollParagraph>

        <ScrollParagraph>
          <p>
             I build digital experiences that respect the user's time and attention.
             <span className="relative inline-block mx-2 align-bottom">
              <img src="https://picsum.photos/id/180/100/60" className="rounded-lg w-20 h-12 md:w-28 md:h-16 inline-block object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110" alt="Work" />
            </span>
             Clean code, fluid animations, and purpose-driven layouts.
          </p>
        </ScrollParagraph>

        <ScrollParagraph>
           <p>
             Because in a world of infinite content, clarity is the only thing that truly stands out.
           </p>
        </ScrollParagraph>

      </div>
      
      {/* Spacer */}
      <div className="h-[20vh]"></div>
    </section>
  );
};