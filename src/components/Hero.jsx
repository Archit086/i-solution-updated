import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    bg: 'linear-gradient(145deg, #0a1f1d 0%, #1D7A74 60%, #2BA8A0 100%)',
    badge: '✦ TRUSTED BY HEALTHCARE PROFESSIONALS',
    title: 'Pharmaceutical Management, Reimagined',
    subtitle: 'One platform for products, orders, compliance and every role in between.',
  },
  {
    bg: 'linear-gradient(145deg, #1a1200 0%, #D4881A 60%, #F5A623 100%)',
    badge: '✦ COMPLIANCE MADE EFFORTLESS',
    title: 'Compliance Without Complexity',
    subtitle: 'From pending reviews to approved records — your entire compliance workflow automated.',
  },
  {
    bg: 'linear-gradient(145deg, #0D1F2D 0%, #1A2530 60%, #2BA8A0 100%)',
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
              className={`inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHighlight ? 'text-accent-amber' : 'text-pure-white'}`}
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
  
  // 3D Pill rotation state
  const pillRef = useRef(null);
  const satARef = useRef(null);
  const satBRef = useRef(null);
  const satCRef = useRef(null);
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
          
          // Main Pill
          if (pillRef.current) {
            const ry = sy * 0.14;
            const rx = sy * 0.035;
            const rz = sy * 0.018;
            pillRef.current.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg)`;
          }

          // Satellites
          if (satARef.current) satARef.current.style.transform = `translateY(${sy * 0.07}px) rotate(25deg)`;
          if (satBRef.current) satBRef.current.style.transform = `translateY(${sy * 0.16}px) rotate(-15deg)`;
          if (satCRef.current) satCRef.current.style.transform = `translateY(${sy * 0.22}px) rotate(45deg)`;

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
    <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-brand-dark flex items-center justify-center">
      
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
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.055]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-100">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%)'
      }}></div>

      {/* 3D SCENE CONTAINER */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ perspective: '1000px' }}>
        
        {/* Satellites */}
        <div ref={satARef} className="absolute top-[15%] left-[10%] opacity-15 overflow-hidden rounded-full animate-floatSatA" style={{ width: 90, height: 36, background: 'linear-gradient(160deg, #5BBFB9, #2BA8A0)', transform: 'rotate(25deg)' }}></div>
        <div ref={satBRef} className="absolute bottom-[20%] right-[15%] opacity-12 overflow-hidden rounded-full animate-floatSatB" style={{ width: 60, height: 24, background: 'linear-gradient(160deg, #F8C35A, #D4881A)', transform: 'rotate(-15deg)' }}></div>
        <div ref={satCRef} className="absolute top-[30%] right-[25%] opacity-10 overflow-hidden rounded-full animate-floatSatC" style={{ width: 45, height: 18, background: 'linear-gradient(160deg, #5BBFB9, #2BA8A0)', transform: 'rotate(45deg)' }}></div>

        {/* Centerpiece Wrapper (handles the CSS float idle animation) */}
        <div className="absolute left-1/2 md:left-[60%] lg:left-[65%] top-1/2 -translate-x-1/2 -translate-y-1/2 animate-floatPill">
          {/* Inner Ref (handles the JS scroll rotation) */}
          <div ref={pillRef} className="relative w-[220px] md:w-[300px] h-[88px] md:h-[120px] flex transform-style-3d">
            
            {/* Left Teal Half */}
            <div className="w-1/2 h-full rounded-l-[120px] relative overflow-hidden" style={{
              background: 'linear-gradient(160deg, #5BBFB9 0%, #2BA8A0 40%, #1D7A74 100%)',
              boxShadow: 'inset -12px 0 30px rgba(0,0,0,0.25), inset 10px 10px 25px rgba(255,255,255,0.2), 0 0 60px rgba(43,168,160,0.4)'
            }}></div>

            {/* Right Amber Half */}
            <div className="w-1/2 h-full rounded-r-[120px] relative overflow-hidden" style={{
              background: 'linear-gradient(160deg, #F8C35A 0%, #F5A623 40%, #D4881A 100%)',
              boxShadow: 'inset 12px 0 30px rgba(0,0,0,0.25), inset -10px 10px 25px rgba(255,255,255,0.15), 0 0 60px rgba(245,166,35,0.35)'
            }}></div>

            {/* Shine Strip */}
            <div className="absolute top-[14px] md:top-[18px] left-[15px] md:left-[20px] w-[190px] md:w-[260px] h-[14px] md:h-[18px] rounded-full filter blur-[4px]" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
            }}></div>

            {/* Bottom Shadow Ellipse */}
            <div className="absolute bottom-[-20px] md:bottom-[-28px] left-1/2 -translate-x-1/2 w-[200px] md:w-[280px] h-[18px] md:h-[24px] rounded-full filter blur-[16px]" style={{
              background: 'rgba(0,0,0,0.25)'
            }}></div>

          </div>
        </div>
      </div>

      {/* HERO FOREGROUND CONTENT */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center h-full">
        <div className="max-w-2xl relative mt-[-10vh] md:mt-0">
          
          {/* Active Badge */}
          <div className="mb-6 min-h-[36px] flex items-center">
            <div 
              className="inline-block bg-pure-white/10 border border-pure-white/25 rounded-full px-4 py-1.5 backdrop-blur-[8px] font-body font-semibold text-[0.72rem] text-pure-white tracking-[0.1em] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left"
              key={`badge-${currentSlide}`}
              style={{
                animation: 'badgeSpringIn 500ms cubic-bezier(0.34,1.56,0.64,1) forwards'
              }}
            >
              {SLIDES[currentSlide].badge}
            </div>
          </div>

          {/* Heading Split Text */}
          <h1 className="relative font-display font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.12] mb-6 min-h-[140px] md:min-h-[160px]">
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
                 className={`absolute top-0 left-0 font-body font-normal text-[1.0625rem] text-pure-white/80 max-w-[500px] leading-[1.75] transition-all duration-600 ease-out ${i === currentSlide ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-[16px] z-0 delay-0'}`}
                 style={{ transitionDelay: i === currentSlide ? '700ms' : '0ms' }}
               >
                 {slide.subtitle}
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
              className="bg-accent-amber text-text-dark px-8 py-3.5 rounded-lg font-bold font-display hover:bg-accent-dark hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(245,166,35,0.45)] group flex items-center gap-2 pointer-events-auto"
            >
              Explore Platform
              <span className="transform transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
            </MagneticButton>
            
            <MagneticButton 
              className="border-[1.5px] border-pure-white/50 text-pure-white bg-pure-white/10 backdrop-blur-md px-8 py-3.5 rounded-lg font-bold font-display hover:bg-pure-white/15 hover:border-pure-white/80 transition-colors flex items-center gap-2 pointer-events-auto"
            >
              See Live Demo
              <span className="inline-block animate-[pulseScale_1.5s_infinite]">▶</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* PROGRESS INDICATOR BAR */}
      <div className="absolute bottom-0 left-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-6 mb-3 flex gap-6">
          {SLIDES.map((_, i) => (
            <div 
              key={`label-${i}`} 
              className={`font-body font-semibold text-[0.65rem] tracking-widest uppercase cursor-pointer transition-colors duration-300 relative ${i === currentSlide ? 'text-pure-white' : 'text-pure-white/50'}`}
              onClick={() => setCurrentSlide(i)}
            >
              Slide 0{i+1}
              {i === currentSlide && (
                <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-brand-teal"></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-[2px] w-full bg-pure-white/20 relative">
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
        <div className="flex flex-col items-center -space-y-2">
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0.2s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg width="18" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[chevronFade_2s_infinite_0.4s]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <span className="font-body text-[0.65rem] text-pure-white/50 tracking-[0.2em] mt-2">SCROLL</span>
      </div>

    </section>
  );
}
