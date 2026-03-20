import { useEffect, useRef } from 'react';

export default function PillHero() {
  const pillRef = useRef(null);
  
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!pillRef.current) return;
        const scrollY = window.scrollY;
        
        // Prevent rotation on reduced motion or mobile
        const isMobileOrReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768;
        if(isMobileOrReducedMotion) {
           pillRef.current.style.transform = `rotateY(0deg) rotateX(0deg) rotateZ(0deg)`;
           return;
        }

        const rotY = scrollY * 0.15;
        const rotX = scrollY * 0.05;
        const rotZ = scrollY * 0.02;
        pillRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scene mx-auto md:ml-auto md:mr-0 z-10 w-[260px] max-w-full">
      <div ref={pillRef} className="pill">
        <div className="pill-left" />
        <div className="pill-right" />
        <div className="pill-shine" />
      </div>
    </div>
  );
}
