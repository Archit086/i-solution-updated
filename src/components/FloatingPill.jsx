import { useEffect, useRef } from 'react';

export default function FloatingPill({ size = 60, scrollMult = 0.08, style, className = "" }) {
  const ref = useRef(null);
  
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        
        // Skip on mobile or reduced motion
        const isMobileOrReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768;
        if(isMobileOrReducedMotion) {
          ref.current.style.transform = `translateY(0px) rotate(0deg)`;
        } else {
          ref.current.style.transform = `translateY(${window.scrollY * scrollMult}px) rotate(${window.scrollY * 0.05}deg)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollMult]);

  return (
    <div ref={ref} className={`absolute opacity-20 pointer-events-none ${className}`} style={style}>
      <div style={{ width: size, height: size * 0.42 }} className="pill-mini" />
    </div>
  );
}
