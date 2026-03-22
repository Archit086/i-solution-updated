import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SplineScene } from './ui/splite';
import { SmokeCard } from './ui/smoke-card';

const SLIDES = [
  {
    bg: 'linear-gradient(145deg, #F0F4F2 0%, #E8EFEA 100%)', 
    badge: 'LUXURY & COMPLIANCE',
    title: 'MANAGEMENT',
    subtitle: 'One holistic platform for products, orders, compliance, and every role in between.',
  },
  {
    bg: 'linear-gradient(145deg, #EEF2F0 0%, #E2ECE5 100%)', 
    badge: 'EFFORTLESS AUTOMATION',
    title: 'COMPLIANCE',
    subtitle: 'From pending reviews to approved records — serene workflows automated perfectly.',
  },
  {
    bg: 'linear-gradient(145deg, #F3F6F4 0%, #DFE8E3 100%)', 
    badge: 'UNIFIED ECOSYSTEM',
    title: 'SINGULARITY',
    subtitle: 'Admin, Authority, Distributor, Customer — transparency and clarity for all.',
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Parallax functionality based on scroll
  const { scrollY } = useScroll();
  
  // Background parallax: moves slower than the scroll (subtle shift down)
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '25%']);
  
  // Content parallax: moves faster than scroll to create depth and fades out
  const contentY = useTransform(scrollY, [0, 800], ['0%', '-40%']);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Auto-advance slides every 8 seconds (slower for premium feel)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    initial: { scale: 1.05, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 2.2, ease: [0.33, 1, 0.68, 1] } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-off-white">
      
      {/* BACKGROUND GRADIENT CAROUSEL WITH PARALLAX */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
            style={{ background: SLIDES[currentSlide].bg }}
          />
        </AnimatePresence>
      </motion.div>

      {/* RUSTIC NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-100">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* 3D SCENE CONTAINER (RESTORED) */}
      <div className="absolute top-0 right-[-30%] w-[130%] h-full md:right-[-10%] md:w-[70%] z-20 pointer-events-auto flex items-center justify-end grayscale opacity-90 brightness-[1.1] contrast-[0.95]">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full object-cover"
        />
      </div>


      {/* SMOKE EFFECT OVERLAY */}
      <div className="absolute inset-0 z-15 pointer-events-none">
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
               className="col-span-1 lg:col-span-7 flex flex-col items-start text-left mt-20 md:mt-0"
             >
               {/* BADGE */}
               <motion.div
                 custom={1}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="mb-8 font-sans text-[0.65rem] md:text-xs tracking-[0.3em] text-brand-teal font-semibold uppercase"
               >
                 {SLIDES[currentSlide].badge}
               </motion.div>

               {/* MASSIVE SERIF HEADLINE (KALEO STYLE + I-SOLUTION) */}
               <motion.h1
                 custom={2}
                 variants={contentVariants}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 className="font-display font-extrabold text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] text-text-dark tracking-tight"
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
                 className="mt-8 mb-12 font-sans font-medium text-base md:text-xl text-text-body max-w-xl leading-relaxed"
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
                   className="group flex items-center gap-3 px-6 py-4 rounded-full text-text-dark border-2 border-text-dark/10 font-sans font-bold text-sm tracking-widest uppercase transition-all hover:border-brand-teal pointer-events-auto"
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
                className={`transition-colors duration-500 hover:text-brand-teal ${currentSlide === idx ? 'text-brand-dark' : ''}`}
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
    </section>
  );
}
