import { useState, useEffect, useRef } from 'react';

const useLocalParallax = (speed = -0.12) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return offset;
};

// Split text utility for the CTA header word stagger
const SplitWordReveal = ({ text, active }) => {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-[0.25em] gap-y-1 justify-center">
      {words.map((word, i) => {
        const delay = active ? 100 + i * 60 : 0;
        return (
          <span key={i} className="overflow-hidden inline-block pb-1">
            <span
              className="inline-block transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] text-pure-white"
              style={{
                transform: active ? 'translateY(0)' : 'translateY(120%)',
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

export default function CallToAction() {
  const parallaxOffset = useLocalParallax(-0.12);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 overflow-hidden bg-brand-dark"
    >
      {/* 1. MESH GRADIENT ORBS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orb 1: Brand Teal */}
        <div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen animate-orbit1 opacity-60 filter blur-[60px]"
          style={{ background: 'radial-gradient(circle, rgba(43,168,160,0.6) 0%, transparent 70%)' }}
        ></div>
        
        {/* Orb 2: Accent Amber */}
        <div 
          className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full mix-blend-screen animate-orbit2 opacity-80 filter blur-[40px]"
          style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)' }}
        ></div>
        
        {/* Orb 3: Deep Teal */}
        <div 
          className="absolute top-[-10%] right-[30%] w-[500px] h-[500px] rounded-full mix-blend-screen animate-orbit3 filter blur-[50px]"
          style={{ background: 'radial-gradient(circle, rgba(29,122,116,0.8) 0%, transparent 70%)' }}
        ></div>
      </div>

      {/* 2. GRAIN NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="ctaNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#ctaNoise)"/>
        </svg>
      </div>

      {/* 3. PARALLAX GHOST TEXT */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-full text-center"
        style={{ transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))` }}
      >
        <span 
          className="font-display font-extrabold text-[clamp(6rem,15vw,14rem)] whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.04)' }}
        >
          I-SOLUTION
        </span>
      </div>

      {/* 4. TOP MORPHING WAVE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none rotate-180">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[90px]" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path fill="#ffffff">
            <animate 
              attributeName="d" 
              dur="6s" 
              repeatCount="indefinite"
              values="
                M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z;
                M0,60 C320,0 420,120 720,60 C1020,0 1120,120 1440,60 L1440,120 L0,120 Z;
                M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"
            />
          </path>
        </svg>
      </div>

      {/* 5. CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <span 
          className="font-display font-bold text-[0.72rem] tracking-[0.2em] text-pure-white/60 uppercase mb-6 block transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }}
        >
          Get Started Today
        </span>

        {/* Heading */}
        <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.25rem)] text-pure-white leading-[1.15] mb-6">
          <SplitWordReveal text="Your Pharmaceutical Operations, Unified." active={inView} />
        </h2>

        {/* Subtext */}
        <p 
          className="font-body text-[1rem] text-pure-white/75 max-w-[540px] leading-[1.7] mb-10 transition-all duration-700 delay-300"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }}
        >
          Join industry leaders who rely on I-Solution to manage compliance, validate stock, and streamline distribution.
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8 w-full sm:w-auto transition-all duration-700 delay-500"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }}
        >
          {/* Primary CTA */}
          <button className="w-full sm:w-auto bg-accent-amber text-text-dark font-display font-bold text-[1rem] px-10 py-4 rounded-lg shadow-[0_8px_20px_rgba(245,166,35,0.2)] hover:bg-accent-dark hover:shadow-[0_12px_24px_rgba(245,166,35,0.5)] hover:-translate-y-[3px] transition-all duration-300 group flex items-center justify-center gap-2">
            Start Free Trial
            <span className="transform transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[4px]">
              →
            </span>
          </button>

          {/* Ghost CTA */}
          <button className="w-full sm:w-auto bg-pure-white/10 border-[1.5px] border-pure-white/30 backdrop-blur-[8px] text-pure-white font-display font-bold text-[1rem] px-10 py-4 rounded-lg hover:bg-pure-white/20 hover:border-pure-white/60 transition-all duration-300">
            View Documentation
          </button>
        </div>

        {/* Trust Row */}
        <div 
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 transition-all duration-700 delay-700"
          style={{ opacity: inView ? 1 : 0 }}
        >
          {['Free 14-day trial', 'No credit card required', 'Full feature access'].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-brand-light text-[0.8rem] leading-none">✓</span>
              <span className="font-body text-[0.8125rem] text-pure-white/65">{text}</span>
            </div>
          ))}
        </div>

      </div>

      {/* 6. BOTTOM DARK WAVE */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#1A2530" 
            d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

    </section>
  );
}
