import { useState, useEffect, useRef } from 'react';

const useLocalParallax = (speed = 0.08) => {
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

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const parallaxOffset = useLocalParallax(0.08);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bullets = [
    "Complete JWT authentication with role extraction",
    "Real-time stock validation before every order",
    "Authority-controlled compliance approval workflows"
  ];

  const badges = ["React + Vite", "Django REST", "JWT Auth", "Recharts"];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-16 lg:py-24 overflow-hidden bg-off-white"
    >
      {/* CSS Dot Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]" 
        style={{
          backgroundImage: 'radial-gradient(circle, #2BA8A0 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 relative z-10 items-center">
        
        {/* LEFT COLUMN (Visual Mockup) */}
        <div 
          className="relative w-full max-w-[500px] mx-auto lg:mx-0 transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? `translateX(0) translateY(${-parallaxOffset}px)` : 'translateX(-40px)',
          }}
        >
          {/* Floating Certified Badge */}
          <div className="absolute -top-6 -right-6 lg:-right-10 z-20 bg-pure-white border border-border-default rounded-full shadow-md px-4 py-2 flex items-center gap-2 animate-floatBadge">
            <span className="text-brand-teal font-black text-xs leading-none">✓</span>
            <span className="font-display font-bold text-[0.8rem] text-text-dark">ISO 9001:2015 Certified</span>
          </div>

          {/* Pure CSS Mockup Card */}
          <div className="bg-pure-white rounded-[20px] p-6 shadow-[0_32px_80px_rgba(26,37,48,0.14)] w-full">
            
            {/* Top Browser Bar */}
            <div className="flex items-center gap-2 border-b border-border-default pb-4 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger-red"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-warning-amber"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
              </div>
              <div className="ml-4 h-5 flex-grow bg-off-white rounded-md flex items-center px-3">
                <span className="text-text-muted text-[10px] font-mono opacity-50">https://i-solution.app/dashboard</span>
              </div>
            </div>

            {/* KPI Stat Chips */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {['8,400 Products', '1,200 Orders', '340 Compliant'].map((kpi, i) => (
                <div key={i} className="bg-brand-teal rounded-lg p-3 relative overflow-hidden group">
                  <span className="block font-display font-bold text-[0.7rem] text-pure-white mb-2 leading-tight">
                    {kpi}
                  </span>
                  <div className="w-full h-1 bg-pure-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-pure-white rounded-full animate-pulseWidth origin-left"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Bar Chart */}
            <div className="flex items-end justify-between h-[80px] gap-2 mb-6 border-b border-border-default pb-3">
              {[40, 75, 55, 90, 60].map((h, i) => (
                <div 
                  key={i} 
                  className="w-full bg-brand-light rounded-t-sm transition-all duration-300 hover:bg-brand-teal"
                  style={{
                    height: inView ? `${h}%` : '0%',
                    transition: `height 1000ms ease-out ${i * 100 + 400}ms, background-color 200ms ease`
                  }}
                ></div>
              ))}
            </div>

            {/* Mini Table Rows */}
            <div className="space-y-3">
              {[1, 2, 3].map((row) => (
                <div key={row} className="relative flex items-center justify-between p-2.5 bg-off-white rounded-md overflow-hidden">
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-pure-white/60 to-transparent skew-x-12 animate-shimmerSweep opacity-60"></div>
                  
                  <div className="flex items-center gap-3 relative z-10 w-full">
                    <div className="w-6 h-6 bg-grey-light rounded-sm shrink-0"></div>
                    <div className="flex-grow">
                      <div className="h-2 w-16 bg-grey-mid/20 rounded-full mb-1"></div>
                      <div className="h-1.5 w-10 bg-grey-light/30 rounded-full"></div>
                    </div>
                    {/* Status Dot */}
                    <div className={`w-2 h-2 rounded-full shrink-0 ${row === 2 ? 'bg-warning-amber' : 'bg-brand-teal'}`}></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN (Text) */}
        <div 
          className="transition-all duration-700 ease-out flex flex-col items-start"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transitionDelay: '150ms'
          }}
        >
          {/* Eyebrow */}
          <span className="font-display font-bold text-[0.72rem] tracking-widest text-brand-teal uppercase mb-4 block">
            About I-Solution
          </span>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.25rem)] text-text-dark leading-[1.2] mb-6 relative">
            The Operating System for Modern{' '}
            <span className="relative inline-block whitespace-nowrap">
              Pharmaceutical Management
              {/* Dynamic Wavy Underline */}
              <svg 
                className="absolute left-0 -bottom-2 w-full h-2 stroke-brand-teal overflow-visible pointer-events-none" 
                preserveAspectRatio="none" 
                viewBox="0 0 100 10"
              >
                <path 
                  d="M0,5 Q12.5,0 25,5 T50,5 T75,5 T100,5" 
                  fill="none" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '120',
                    strokeDashoffset: inView ? '0' : '120',
                    transition: 'stroke-dashoffset 800ms ease-out 500ms'
                  }}
                />
              </svg>
            </span>
          </h2>

          <div className="space-y-4 mb-6">
            <p className="font-body text-[0.9375rem] text-text-body leading-[1.8]">
              We engineered I-Solution from the ground up to eliminate the friction inherent in global pharmaceutical supply chains. By establishing a rigid, transparent framework, we allow manufacturers, distributors, and authorities to collaborate instantaneously.
            </p>
            <p className="font-body text-[0.9375rem] text-text-body leading-[1.8]">
              It&apos;s not just inventory management. It&apos;s a verifiable audit trail designed to meet and exceed ISO and FDA compliance standards, delivering peace of mind alongside operational velocity.
            </p>
          </div>

          {/* Animated Bullet Points */}
          <ul className="flex flex-col gap-3 mb-10 w-full">
            {bullets.map((bullet, i) => (
              <li 
                key={i} 
                className="flex items-start gap-3 transition-all duration-500 ease-out"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(20px)',
                  transitionDelay: `${inView ? (i * 80 + 400) : 0}ms`
                }}
              >
                <div className="shrink-0 w-5 h-5 rounded-full bg-brand-light flex items-center justify-center text-brand-teal mt-0.5">
                  <span className="font-black text-[10px] leading-none mb-[-1px]">✓</span>
                </div>
                <span className="font-display font-semibold text-[0.9rem] text-text-dark leading-snug">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border-default pt-6 mb-8 w-full">
            <button className="bg-brand-teal text-pure-white font-display font-bold text-[0.9375rem] px-8 py-3 rounded-lg shadow-btnGlow hover:-translate-y-1 transition-transform duration-200">
              Learn How It Works
            </button>
            <button className="text-text-muted font-display font-semibold text-[0.9375rem] px-4 py-3 hover:text-brand-teal flex items-center gap-2 group transition-colors">
              View Architecture
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 w-full">
            {badges.map((badge, i) => (
              <span 
                key={i} 
                className="bg-off-white border border-border-default text-text-muted font-body font-semibold text-[0.72rem] px-3 py-1.5 rounded-md hover:bg-brand-light hover:text-brand-teal hover:border-brand-teal transition-all duration-150 cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
