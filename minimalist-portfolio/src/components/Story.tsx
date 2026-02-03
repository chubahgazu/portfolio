import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ExternalLink } from 'lucide-react';

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
      className={`mb-24 md:mb-32 max-w-3xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FloatingIcons = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Generate random icons
  // We use stable random numbers to avoid re-renders on hydration
  const icons = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const isLeft = i % 2 === 0;
      const emoji = Math.random() > 0.5 ? '🤖' : '📺';
      return {
        id: i,
        emoji,
        // Position: left side (0-15%) or right side (85-100%)
        left: isLeft ? `${Math.random() * 10}%` : `${85 + Math.random() * 10}%`,
        // Start Y position scattered through the section
        top: `${(i / 25) * 100}%`,
        // Random size - increased as requested (0.8 to 2.3)
        scale: 0.8 + Math.random() * 1.5,
        // Random rotation speed
        rotateSpeed: (Math.random() - 0.5) * 360,
        // Parallax speed factor (some move faster than others)
        speed: 0.5 + Math.random() * 1.5,
        // Delay for appearance
        delay: Math.random() * 0.5
      };
    });
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
      {icons.map((icon) => (
        <FloatingIcon
          key={icon.id}
          {...icon}
          parentY={y}
        />
      ))}
    </div>
  );
};

interface FloatingIconProps {
  id: number;
  emoji: string;
  left: string;
  top: string;
  scale: number;
  rotateSpeed: number;
  speed: number;
  delay: number;
  parentY: any; // Using any for MotionValue to avoid deep type import issues, but we know it's a number motion value
}

const FloatingIcon = ({ emoji, left, top, scale, rotateSpeed, speed, parentY, delay }: FloatingIconProps) => {
  // Parallax effect unique to this icon
  // We combine the parent's scroll progress with individual speed factors
  const y = useTransform(parentY, (latest: number) => latest * speed);

  return (
    <motion.div
      style={{
        left,
        top,
        y,
        scale,
      }}
      initial={{ opacity: 0, rotate: 0 }}
      whileInView={{
        opacity: [0, 0.6, 0.6, 0],
        rotate: rotateSpeed
      }}
      transition={{
        opacity: { duration: 1, delay },
        rotate: { duration: 3, repeat: Infinity, ease: "linear" }
      }}
      className="absolute text-4xl select-none filter blur-[1px] opacity-60"
    >
      {emoji}
    </motion.div>
  );
};

export const Story: React.FC = () => {
  const scrollToStart = () => {
    const element = document.getElementById('story-start');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="story" className="w-full py-16 md:py-40 relative z-10 overflow-hidden">
      <FloatingIcons />

      {/* Intro Heading */}
      <div className="h-[20vh] flex flex-col items-center justify-center mb-10 md:mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[15vw] md:text-[8vw] font-heading font-medium text-center tracking-tight text-brand/5 select-none leading-none"
        >
          Мой путь
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl text-text-secondary font-medium -mt-4 md:-mt-8"
        >
          от интереса к действию
        </motion.p>
      </div>

      <div className="text-lg md:text-3xl font-medium leading-[1.6] md:leading-[1.5] tracking-tight text-text-primary relative z-10">

        {/* Hero-block Content */}
        <ScrollParagraph className="text-center">
          <p className="mb-6 md:mb-8">
            Я работаю с нейросетями<br />
            не потому что это модно.<br />
            <span className="text-text-primary font-bold">А потому что это работает.</span>
          </p>
          <p className="text-base md:text-xl text-text-secondary mb-6 md:mb-8">
            С 2023 года.<br />
            От первых диалогов с ChatGPT 3.5<br />
            до реальных продуктов и автоматизаций.
          </p>
          <p className="text-base md:text-xl text-text-secondary mb-8 md:mb-12">
            Без магии.<br />
            Без инфо-шума.<br />
            Через понимание и действие.
          </p>

          <button
            onClick={scrollToStart}
            className="inline-flex items-center gap-2 text-sm md:text-base px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-text-primary"
          >
            Посмотреть путь
            <ArrowDown size={16} />
          </button>
        </ScrollParagraph>

        <div id="story-start" className="w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-32 opacity-50" />

        {/* Block 1 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 1. Начало</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Любопытство</h3>
          <p className="mb-6">
            Я в нейросетях с момента появления ChatGPT 3.5.
            Тогда это не было рынком.
            Не было индустрией.
          </p>
          <p className="text-text-secondary mb-6">
            Это был сырой инструмент.
            Я просто общался с ИИ.
            Проверял границы.
            Смотрел, как он думает.
          </p>
          <p className="text-text-secondary border-l-2 border-gray-200 pl-4">
            Без курсов.
            Без хайпа.
            Без обещаний быстрых денег.
          </p>
          <p className="mt-6 font-medium">
            Любопытство — искра.<br />
            Огонь начинается позже.
          </p>
        </ScrollParagraph>

        {/* Block 2 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 2. Направление</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Понимание</h3>
          <p className="mb-6">
            Потом появился Midjourney.
            Затем — другие инструменты.
          </p>
          <p className="mb-6">
            И стало ясно:<br />
            <span className="bg-yellow-100 px-1 rounded">нейросети — это новый язык.</span><br />
            И рынок будет говорить на нём.
          </p>
          <p className="text-text-secondary">
            Пока одни спорили
            «пузырь это или нет»,
            я учился думать через ИИ,
            а не просто нажимать кнопки.
          </p>
        </ScrollParagraph>

        {/* Block 3 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 3. Теория</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Знаний было много</h3>
          <p className="mb-6 text-xl">За это время я прошёл:</p>
          <ul className="list-none space-y-2 text-text-secondary text-lg md:text-xl mb-8">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent/50" /> 2 курса по Instagram и Reels</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent/50" /> YouTube Shorts</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent/50" /> Wildberries</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent/50" /> P2P</li>
          </ul>
          <p className="text-text-secondary mb-6">
            Стратегии. Воронки. Алгоритмы. Психология внимания.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <p className="font-medium text-text-primary">
              Информации — много.<br />
              <span className="text-red-500">Результатов — нет, если не действуешь.</span>
            </p>
          </div>
        </ScrollParagraph>

        {/* Block 4 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 4. Осознание</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Неприятная правда</h3>
          <p className="mb-6">
            Можно пройти десятки курсов.
            Можно знать больше всех.
          </p>
          <p className="mb-6 text-xl font-bold">
            Но если ты не действуешь —<br />
            ты никто на рынке.
          </p>
          <p className="text-text-secondary mb-6">
            Знание без действия — балласт.<br />
            Действие без знания — хаос.
          </p>
          <p className="bg-brand text-white inline-block px-3 py-1 rounded-lg transform -rotate-1">
            Результат даёт только связка.
          </p>
          <p className="mt-8 text-text-secondary text-lg">
            Сегодня каждый что-то знает.<br />
            Но единицы воплощают.
          </p>
        </ScrollParagraph>

        {/* Block 5 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 5. Подход</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Как я работаю</h3>
          <p className="mb-6 text-text-secondary">
            Я не продаю волшебные кнопки.
            Я не обещаю лёгких денег.
          </p>
          <p className="mb-6">Я работаю на пересечении:</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm md:text-base">нейросетей</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm md:text-base">контента</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm md:text-base">маркетингового мышления</span>
            <span className="px-4 py-2 bg-gray-100 rounded-full text-sm md:text-base">реального применения</span>
          </div>
          <p className="font-bold text-xl">
            Мой фокус — результат.<br />
            <span className="text-text-secondary font-normal">Не имитация движения.</span>
          </p>
        </ScrollParagraph>

        {/* Block 6 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 6. Доказательства</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Не слова. Факты.</h3>
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-sm bg-black text-white px-2 py-1 rounded">02.02.2026</span>
          </div>
          <p className="mb-6 font-medium">
            Этот сайт полностью создан с помощью нейросетей.
          </p>
          <p className="mb-4 text-text-secondary">Дальше:</p>
          <ul className="space-y-2 mb-8 text-lg font-medium">
            <li className="flex items-center gap-2 text-brand-accent"><ArrowRight size={18} /> ещё 3 сайта</li>
            <li className="flex items-center gap-2 text-brand-accent"><ArrowRight size={18} /> 3 чат-бота</li>
            <li className="flex items-center gap-2 text-brand-accent"><ArrowRight size={18} /> 3 автоматизации</li>
          </ul>
          <div className="p-6 bg-brand-secondary/5 border border-brand-secondary/10 rounded-2xl">
            <p className="mb-2">Не «когда-нибудь».</p>
            <p className="mb-4">А чтобы было что показать.</p>
            <p className="font-bold">Экспертность без артефактов — это шум. Навык должен быть виден.</p>
          </div>
        </ScrollParagraph>

        {/* Block 7 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 7. Мотивация</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Зачем мне это</h3>
          <p className="text-4xl md:text-5xl font-bold text-gray-200 mb-8">
            Я устал.
          </p>
          <p className="mb-6">
            Устал видеть, как людям продают:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-8 pl-2">
            <li>сотни промтов за деньги</li>
            <li>PDF с «секретами ИИ»</li>
            <li>иллюзию понимания</li>
          </ul>
          <p className="mb-6">
            Особенно новичкам.
            Для них эти списки —
            <span className="block mt-2 font-serif italic text-2xl text-gray-400">как квантовая физика на китайском.</span>
          </p>
        </ScrollParagraph>

        {/* Block 8 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 8. Ошибка</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Которую я прошёл сам</h3>
          <p className="mb-6 text-text-secondary">
            Раньше я тоже думал:
            нейросети «и так всё понимают».
          </p>
          <p className="mb-6">
            Что нужно просто дать ей команду.
          </p>
          <p className="text-xl font-bold text-red-500 mb-8">
            Это не так.
          </p>
          <div className="space-y-4 text-text-secondary mb-8">
            <p>Нейросеть:</p>
            <ul className="space-y-2 border-l-2 border-red-200 pl-4">
              <li>— не слышит тебя так, как ты думаешь</li>
              <li>— не понимает контекст автоматически</li>
              <li>— не читает твои мысли</li>
            </ul>
          </div>
          <p className="font-medium">
            Без понимания ты всегда упрёшься в потолок.
          </p>
        </ScrollParagraph>

        {/* Block 9 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 9. Что я даю</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">И почему бесплатно</h3>
          <p className="mb-6">
            Здесь я дам тебе бесплатные уроки.
          </p>
          <p className="mb-8 font-medium">
            Не про промты.<br />
            А про <span className="text-brand-accent">понимание</span> нейросетей.
          </p>
          <ul className="space-y-4 text-text-secondary mb-8">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
              как ИИ интерпретирует смысл
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
              почему одинаковые запросы дают разный результат
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
              как говорить с нейросетью, чтобы она работала на тебя
            </li>
          </ul>
          <p className="text-xl font-heading font-medium">
            Понимание сильнее любых хаков.
          </p>
        </ScrollParagraph>

        {/* Block 10 */}
        <ScrollParagraph>
          <span className="text-sm font-bold tracking-widest uppercase text-brand-accent mb-2 block">Блок 10. Результат</span>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">Что ты получишь</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold mb-4 text-gray-500">Минимум:</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li>— ускорение рутинных задач</li>
                <li>— быстрый поиск и анализ</li>
                <li>— меньше хаоса</li>
                <li>— больше контроля</li>
              </ul>
            </div>
            <div className="p-6 bg-brand text-white rounded-2xl shadow-lg shadow-brand/20">
              <h4 className="font-bold mb-4 text-white/80">Максимум:</h4>
              <p className="text-lg leading-relaxed">
                ты начнёшь думать вместе с нейросетью,
                а не просто пользоваться ей.
              </p>
            </div>
          </div>
        </ScrollParagraph>

        {/* Final CTA */}
        <ScrollParagraph className="text-center mt-32">
          <div id="story-cta" className="scroll-mt-32">
            <h3 className="text-3xl md:text-5xl font-heading font-medium mb-8">
              Я не обещаю лёгкий путь.<br />
              <span className="text-brand-accent">Но обещаю честный.</span>
            </h3>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
              Если тебе близок принцип
              «сначала понять — потом масштабировать» —
              ты по адресу.
            </p>

          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 rounded-full bg-brand text-white font-medium text-lg hover:bg-brand-accent transition-all shadow-lg hover:shadow-brand-accent/25 active:scale-95 w-full md:w-auto">
              Начать с бесплатных уроков
            </button>
            <button className="px-8 py-4 rounded-full bg-white border border-gray-200 text-text-primary font-medium text-lg hover:bg-gray-50 transition-all active:scale-95 w-full md:w-auto flex items-center justify-center gap-2">
              Посмотреть проекты
              <ArrowRight size={20} />
            </button>
          </div>
        </ScrollParagraph>

      </div>
    </section>
  );
};