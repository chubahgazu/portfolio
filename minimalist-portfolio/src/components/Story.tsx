import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles, Zap, Brain, Target, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

// --- Components ---

const TimelineItem = ({
  children,
  index,
  icon: Icon,
  label
}: {
  children: React.ReactNode;
  index: number;
  icon?: React.ElementType;
  label: string;
}) => {
  const isEven = index % 2 === 0;
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [isEven ? -50 : 50, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div ref={elementRef} className={`relative flex items-center justify-between md:justify-center w-full mb-20 md:mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>

      {/* Center Line Marker */}
      <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-brand border-[3px] border-white rounded-full z-20 shadow-[0_0_0_4px_rgba(0,0,0,0.05)] transform -translate-x-1/2">
        {Icon && (
          <div className="absolute -top-3 -right-3 md:-right-8 md:-top-4 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-brand-accent">
            <Icon size={18} />
          </div>
        )}
      </div>

      {/* Content Side */}
      <motion.div
        style={{ opacity, x, scale }}
        className={`w-[calc(100%-60px)] ml-12 md:ml-0 md:w-[42%] bg-white p-8 rounded-2xl  border border-gray-100/50 shadow-sm relative group hover:border-gray-200 transition-colors duration-300`}
      >
        <span className="absolute -top-3 left-6 px-3 py-1 bg-brand text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-sm">
          {label}
        </span>
        {children}
      </motion.div>

      {/* Empty Side for layout balance on Desktop */}
      <div className="hidden md:block w-[42%]" />
    </div>
  );
};

const FloatingIcons = () => {
  // ... (Keep existing implementation or simplify)
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block opacity-30">
      {/* Simplified background elements */}
      <motion.div style={{ y }} className="absolute top-[10%] left-[5%] text-6xl opacity-10 blur-[2px]">💡</motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }} className="absolute top-[30%] right-[10%] text-6xl opacity-10 blur-[1px]">🧠</motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }} className="absolute top-[60%] left-[10%] text-6xl opacity-10 blur-[3px]">🚀</motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }} className="absolute top-[80%] right-[5%] text-6xl opacity-10 blur-[1px]">⚡️</motion.div>
    </div>
  )
};


export const Story: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.1", "end 0.9"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToStart = () => {
    const element = document.getElementById('story-start');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="story" className="w-full py-20 md:py-32 relative z-10 overflow-hidden bg-bg-primary" ref={containerRef}>
      <FloatingIcons />

      {/* Intro Heading */}
      <div className="flex flex-col items-center justify-center mb-16 md:mb-32 relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-100/50 shadow-sm text-brand text-sm font-medium"
        >
          <Sparkles size={16} className="text-brand-accent" />
          <span>История развития</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-heading font-medium tracking-tight text-brand leading-[0.9] mb-8"
        >
          Мой путь
        </motion.h2>

        <motion.div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xl md:text-3xl font-heading text-text-primary leading-tight">
            Я работаю с нейросетями не потому что это модно. <br />
            <span className="text-brand-accent">А потому что это работает.</span>
          </p>
          <p className="text-lg text-text-secondary font-body leading-relaxed">
            С 2023 года. От первых диалогов с ChatGPT 3.5 до реальных продуктов.
            Без магии. Без инфо-шума.
          </p>
        </motion.div>

        <div className="mt-12">
          <button
            onClick={scrollToStart}
            className="group p-4 rounded-full bg-white border border-gray-200 hover:border-brand-accent transition-colors shadow-sm"
          >
            <ArrowDown size={20} className="text-gray-400 group-hover:text-brand-accent animate-bounce" />
          </button>
        </div>
      </div>

      <div id="story-start" className="w-full max-w-[1000px] mx-auto px-4 md:px-6 relative z-10">

        {/* THE LINE */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 transform md:-translate-x-1/2">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-brand-accent via-purple-500 to-brand-accent"
          />
        </div>

        {/* 1. Curiosity */}
        <TimelineItem index={0} label="Начало" icon={Lightbulb}>
          <h3 className="text-2xl font-heading font-bold mb-4">Любопытство</h3>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Я в нейросетях с момента появления ChatGPT 3.5. Тогда это не было индустрией.
            Это был сырой инструмент. Я просто общался с ИИ, проверял границы, смотрел, как он думает.
          </p>
          <div className="text-sm font-medium text-brand-secondary/70 border-l-2 border-brand-accent/20 pl-4 py-1">
            «Без курсов. Без хайпа. Без обещаний быстрых денег.»
          </div>
        </TimelineItem>

        {/* 2. Understanding */}
        <TimelineItem index={1} label="Осознание" icon={Brain}>
          <h3 className="text-2xl font-heading font-bold mb-4">Новый язык</h3>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Появился Midjourney. Затем — другие инструменты. Стало ясно: нейросети — это новый язык, и рынок будет говорить на нём.
          </p>
          <p className="p-4 bg-gray-50 rounded-xl text-sm font-medium text-text-primary">
            Пока одни спорили «пузырь это или нет», я учился думать через ИИ, а не просто нажимать кнопки.
          </p>
        </TimelineItem>

        {/* 3. Theory (Mistakes) */}
        <TimelineItem index={2} label="Опыт" icon={AlertTriangle}>
          <h3 className="text-2xl font-heading font-bold mb-4">Информационный шум</h3>
          <p className="mb-4 text-text-secondary">
            Я изучил всё: Instagram, Reels, YouTube Shorts, WB, P2P.
            Стратегии, воронки, алгоритмы.
          </p>
          <p className="text-lg font-medium text-red-500 mb-2">
            Но информации много, а результатов — нет.
          </p>
          <p className="text-sm text-text-secondary">
            Знание без действия — балласт. Действие без знания — хаос.
          </p>
        </TimelineItem>

        {/* 4. Approach */}
        <TimelineItem index={3} label="Метод" icon={Target}>
          <h3 className="text-2xl font-heading font-bold mb-4">Как я работаю</h3>
          <p className="mb-6 text-text-secondary">
            Я не продаю волшебные кнопки. Я работаю на пересечении:
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Нейросети', 'Контент', 'Маркетинг', 'Практика'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          <p className="font-bold text-lg">
            Мой фокус — результат. <span className="text-gray-400 font-normal">Не имитация движения.</span>
          </p>
        </TimelineItem>

        {/* 5. Proof */}
        <TimelineItem index={4} label="Факты" icon={CheckCircle}>
          <h3 className="text-2xl font-heading font-bold mb-4">Не слова</h3>
          <div className="mb-6">
            <p className="font-medium mb-2">Этот сайт создан с AI.</p>
            <p className="text-sm text-text-secondary">Как и ещё 3 сайта, 3 чат-бота и 3 автоматизации.</p>
          </div>
          <div className="bg-brand text-white p-5 rounded-xl shadow-lg shadow-brand/10">
            <p className="text-sm italic opacity-90">
              «Экспертность без артефактов — это шум. Навык должен быть виден.»
            </p>
          </div>
        </TimelineItem>

        {/* 6. Motivation / Error */}
        <TimelineItem index={5} label="Инсайт" icon={Zap}>
          <h3 className="text-2xl font-heading font-bold mb-4">Главная ошибка</h3>
          <p className="text-text-secondary mb-4 leading-relaxed">
            Раньше я думал: нейросети «и так всё понимают». Что нужно просто дать команду.
          </p>
          <p className="text-brand-accent font-bold mb-4 text-lg">Это не так.</p>
          <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside">
            <li>ИИ не слышит тебя так, как ты думаешь</li>
            <li>Не понимает контекст автоматически</li>
            <li>Не читает твои мысли</li>
          </ul>
        </TimelineItem>

        {/* 7. Value */}
        <TimelineItem index={6} label="Польза" icon={Sparkles}>
          <h3 className="text-2xl font-heading font-bold mb-4">Почему бесплатно?</h3>
          <p className="mb-6 text-text-secondary">
            Я устал видеть, как новичкам продают сотни промтов. Здесь я дам тебе бесплатные уроки про <span className="text-brand-accent font-bold">понимание</span>.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-900">Как ИИ интерпретирует смысл</span>
            </div>
            <div className="p-3 bg-green-50 rounded-lg flex gap-3 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-900">Как говорить с нейросетью</span>
            </div>
          </div>
        </TimelineItem>

        {/* End of Line */}
        <div className="absolute left-6 md:left-1/2 bottom-0 w-4 h-4 bg-brand rounded-full transform -translate-x-1/2 z-20" />

      </div>

      {/* FINAL CTA */}
      <div id="story-cta" className="relative z-10 max-w-4xl mx-auto px-4 mt-20 md:mt-32 text-center scroll-mt-32">
        <h3 className="text-4xl md:text-6xl font-heading font-medium mb-8 leading-tight">
          Я не обещаю лёгкий путь. <br />
          <span className="text-brand-accent">Но обещаю честный.</span>
        </h3>
        <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Если тебе близок принцип «сначала понять — потом масштабировать», ты по адресу.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-full bg-brand text-white font-medium text-lg hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/25 active:scale-95">
            Начать с бесплатных уроков
          </button>
          <button className="px-8 py-4 rounded-full bg-white border border-gray-200 text-text-primary font-medium text-lg hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            Посмотреть проекты
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

    </section>
  );
};