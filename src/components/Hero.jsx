import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { SplineScene } from './ui/splite';
import { Typewriter } from './ui/typewriter-text';

const SLIDES = [
  {
    bg: 'linear-gradient(145deg, #F0F4F2 0%, #E8EFEA 100%)',
    badge: '✦ TRUSTED BY HEALTHCARE PROFESSIONALS',
    title: 'Pharmaceutical Management, Reimagined',
    subtitle: 'One platform for products, orders, compliance and every role in between.',
  },
  {
    bg: 'linear-gradient(145deg, #EEF2F0 0%, #E2ECE5 100%)',
    badge: '✦ COMPLIANCE MADE EFFORTLESS',
    title: 'Compliance Without Complexity',
    subtitle: 'From pending reviews to approved records — your entire compliance workflow automated.',
  },
  {
    bg: 'linear-gradient(145deg, #F3F6F4 0%, #DFE8E3 100%)',
    badge: '✦ UNIFIED ECOSYSTEM',
    title: 'Every Role. Every Permission. One System.',
    subtitle: 'Admin, Authority, Distributor, Customer — each sees exactly what they need.',
  }
];

// Split text utility for the Hero header
const SplitTextReveal = ({ text, active }) => {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-[0.3em] gap-y-1">
      {words.map((word, i) => {
        const isHighlight = word.includes('Management') || word.includes('Reimagined');
        const delay = active ? 300 + i * 55 : 0;
        return (
          <span key={i} className="overflow-hidden inline-block pb-2">
            <span
              className={`inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHighlight ? 'text-brand-dark' : 'text-text-dark'}`}
              style={{
                transform: active ? 'translateY(0)' : 'translateY(100%)',
                opacity: active ? 1 : 0,
                transitionDelay: `${delay}ms`,
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max magnetic drift
    const distance = Math.sqrt(x*x + y*y);
    if (distance < 60) {
      setPosition({ x: x * 0.3, y: y * 0.3 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </button>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const scrollIndicatorRef = useRef(null);

  // Auto-advance slides every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Sync progress bar
  useEffect(() => {
    // Reset progress to 0 without transition, then animate to 100% over 5.5s
    setScrollProgress(0);
    const frame = requestAnimationFrame(() => {
      setScrollProgress(100);
    });
    return () => cancelAnimationFrame(frame);
  }, [currentSlide]);

  // Scroll animations via rAF
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          
          // Scroll Indicator fade
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = sy > 80 ? '0' : '1';
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-off-white flex items-center justify-center">
      
      {/* BACKGROUND SLIDES */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div 
            key={index}
            className="absolute inset-0 w-full h-full transition-all duration-700 pointer-events-none"
            style={{
              background: slide.bg,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(1.04)',
              zIndex: isActive ? 1 : 0,
              transitionTimingFunction: isActive ? 'ease-out' : 'ease-in'
            }}
          />
        );
      })}

      {/* GRAIN & VIGNETTE OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-100">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none z-10 hidden"></div>

      {/* 3D SCENE CONTAINER */}
      <div className="absolute top-0 right-[-30%] w-[130%] h-full md:right-[-10%] md:w-[70%] lg:right-[-5%] lg:w-[60%] z-20 pointer-events-auto flex items-center justify-end grayscale opacity-90 brightness-[1.1] contrast-[0.95]">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full object-cover"
        />
      </div>

      {/* HERO FOREGROUND CONTENT */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full pointer-events-none">
        <div className="w-full md:w-[55%] lg:w-[50%] relative mt-[-10vh] md:mt-0 pointer-events-auto">
          
          {/* Active Badge */}
          <div className="mb-6 min-h-[36px] flex items-center">
              <div 
                className="inline-block bg-pure-white border border-border-default shadow-sm rounded-full px-4 py-1.5 font-body font-semibold text-[0.72rem] text-text-dark tracking-[0.1em] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left"
              key={`badge-${currentSlide}`}
              style={{
                animation: 'badgeSpringIn 500ms cubic-bezier(0.34,1.56,0.64,1) forwards'
              }}
            >
              {SLIDES[currentSlide].badge}
            </div>
          </div>

          {/* Heading Split Text */}
          <h1 className="relative font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.12] mb-6 min-h-[160px] md:min-h-[220px]">
            {SLIDES.map((slide, i) => (
              <div key={`h1-${i}`} className={`absolute top-0 left-0 w-full transition-opacity ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                <SplitTextReveal text={slide.title} active={i === currentSlide} />
              </div>
            ))}
          </h1>

          {/* Body Text */}
          <div className="mb-10 relative min-h-[60px] md:min-h-[50px]">
             {SLIDES.map((slide, i) => (
                 <p 
                   key={`p-${i}`} 
                   className={`absolute top-0 left-0 font-body text-[1rem] sm:text-[1.125rem] md:text-xl text-text-body max-w-[500px] leading-[1.75] transition-all duration-600 ease-out ${i === currentSlide ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-[16px] z-0 delay-0'}`}
                 style={{ transitionDelay: i === currentSlide ? '700ms' : '0ms' }}
               >
                {i === currentSlide && (
                  <Typewriter 
                    key={i}
                    text={slide.subtitle}
                    speed={35}
                    delay={2000}
                    loop={false}
                    cursor="|"
                  />
                )}
               </p>
             ))}
          </div>

          {/* CTAs */}
          <div 
            key={`cta-${currentSlide}`}
            className="flex flex-wrap gap-4 opacity-0 translate-y-4 animate-[slideUpFade_600ms_ease-out_900ms_forwards]"
          >
            <MagneticButton 
              onClick={() => navigate('/products')}
              className="bg-brand-dark text-pure-white px-8 py-3.5 rounded-full font-bold font-display hover:bg-brand-teal transition-colors flex items-center gap-2 pointer-events-auto"
            >
              Explore Platform
              <span className="transform transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
            </MagneticButton>
            
            <MagneticButton 
              className="border-[1.5px] border-border-default text-text-dark bg-pure-white px-8 py-3.5 rounded-full font-bold font-display hover:bg-off-white hover:border-brand-teal transition-colors flex items-center gap-2 pointer-events-auto"
            >
              See Live Demo
              <span className="inline-block animate-[pulseScale_1.5s_infinite] text-brand-teal">▶</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* PROGRESS INDICATOR BAR */}
      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 mb-3 flex gap-6">
          {SLIDES.map((_, i) => (
            <div 
              key={`label-${i}`} 
              className={`font-body font-semibold text-[0.65rem] tracking-widest uppercase cursor-pointer transition-colors duration-300 relative ${i === currentSlide ? 'text-brand-dark' : 'text-text-muted'}`}
              onClick={() => setCurrentSlide(i)}
            >
              Slide 0{i+1}
              {i === currentSlide && (
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-teal"></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-[2px] w-full bg-border-default relative">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-teal"
            style={{ 
              width: `${scrollProgress}%`, 
              transition: scrollProgress === 0 ? 'none' : 'width 5500ms linear' 
            }}
          ></div>
        </div>
      </div>

      {/* SCROLL CHEVRONS */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 transition-opacity duration-300 pointer-events-none">
        <div className="flex flex-col items-center -space-y-2 text-text-muted">
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0.2s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0.4s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <span className="font-body text-[0.65rem] text-text-muted tracking-[0.2em] mt-2">SCROLL</span>
      </div>

    </section>
  );
}
