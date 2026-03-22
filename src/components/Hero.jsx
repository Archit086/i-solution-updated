import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SmokeCard } from './ui/smoke-card';
import { AuroraBackground } from './ui/aurora-background';

// Lazy load the heaviest asset (WebGL 3D Model) so it doesn't block the initial page render
const SplineScene = lazy(() => import('./ui/splite').then(m => ({ default: m.SplineScene })));

const SLIDES = [
  {
    badge: 'LUXURY & COMPLIANCE',
    title: 'MANAGEMENT',
    subtitle: 'One holistic platform for products, orders, compliance, and every role in between.',
  },
  {
    badge: 'EFFORTLESS AUTOMATION',
    title: 'COMPLIANCE',
    subtitle: 'From pending reviews to approved records — serene workflows automated perfectly.',
  },
  {
    badge: 'UNIFIED ECOSYSTEM',
    title: 'SINGULARITY',
    subtitle: 'Admin, Authority, Distributor, Customer — transparency and clarity for all.',
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 800], ['0%', '-40%']);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.33, 1, 0.68, 1], 
        delay: custom * 0.15 + 0.5 
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeIn" } }
  };

  return (
    <AuroraBackground>
      
      {/* 3D SCENE CONTAINER (RESTORED & LAZY LOADED WITH CROSSFADE) */}
      <div className="absolute top-0 right-[-30%] w-[130%] h-full md:right-[-10%] md:w-[70%] z-20 pointer-events-auto flex items-center justify-end grayscale brightness-[1.1] contrast-[0.95]">
        
        {/* Loading Spinner */}
        <AnimatePresence>
          {!isSplineLoaded && (
            <motion.div 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-brand-teal border-t-transparent rounded-full animate-spin opacity-40"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Scene */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: isSplineLoaded ? 0.9 : 0 }} 
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full absolute inset-0"
        >
          <Suspense fallback={null}>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full object-cover"
              onLoad={() => setIsSplineLoaded(true)}
            />
          </Suspense>
        </motion.div>
      </div>

      {/* SMOKE EFFECT OVERLAY */}
      <div className="absolute inset-0 z-25 pointer-events-none">
         <SmokeCard />
      </div>

      {/* FOREGROUND CONTENT WITH PARALLAX FADE OUT */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-30 w-full h-full max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col justify-center pointer-events-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
           
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentSlide}
               className="col-span-1 lg:col-span-10 flex flex-col items-start text-left mt-20 md:mt-0"
             >
               {/* BADGE */}
               <motion.div
                 custom={1}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="mb-8 font-sans text-[0.65rem] md:text-xs tracking-[0.3em] text-brand-dark/80 font-semibold uppercase"
               >
                 {SLIDES[currentSlide].badge}
               </motion.div>

               {/* MASSIVE SERIF HEADLINE */}
               <motion.h1
                 custom={2}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="font-serif font-extrabold text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] text-text-dark tracking-widest drop-shadow-sm"
               >
                 {SLIDES[currentSlide].title}
               </motion.h1>

               {/* MINIMALIST SUBTITLE */}
               <motion.p
                 custom={3}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="mt-8 mb-12 font-sans font-medium text-base md:text-xl text-text-body max-w-xl leading-relaxed drop-shadow-sm"
               >
                 {SLIDES[currentSlide].subtitle}
               </motion.p>

               {/* PREMIUM BUTTONS */}
               <motion.div
                 custom={4}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="flex flex-col sm:flex-row items-center gap-6"
               >
                 <button 
                   onClick={() => navigate('/products')}
                   className="group relative px-10 py-4 overflow-hidden rounded-full bg-brand-dark text-pure-white font-sans font-bold text-sm tracking-widest uppercase transition-all hover:bg-brand-teal active:scale-95 shadow-md shadow-brand-dark/20 pointer-events-auto"
                 >
                   Explore Platform
                 </button>
                 
                 <button 
                   onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                   className="group flex items-center gap-3 px-6 py-4 rounded-full text-text-dark border-2 border-text-dark/10 font-sans font-bold text-sm tracking-widest uppercase transition-all hover:border-brand-teal pointer-events-auto backdrop-blur-sm"
                 >
                   <span>See Live Demo</span>
                 </button>
               </motion.div>
             </motion.div>
           </AnimatePresence>

        </div>
      </motion.div>

      {/* BOTTOM METADATA / SCROLL NAV */}
      <motion.div 
         style={{ opacity: contentOpacity }}
         className="absolute bottom-8 w-full z-40 px-6 lg:px-12 pointer-events-none"
      >
        <div className="max-w-[90rem] mx-auto flex justify-between items-end border-t border-text-dark/10 pt-6">
          <div className="font-sans text-[0.65rem] tracking-[0.2em] text-text-body uppercase pointer-events-auto flex gap-6">
            {SLIDES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-colors duration-500 hover:text-brand-dark ${currentSlide === idx ? 'text-brand-dark font-bold' : ''}`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          
          <div className="font-sans text-[0.65rem] tracking-[0.2em] text-text-body uppercase text-right">
            I-Solution<br />
            Est. 2026
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
