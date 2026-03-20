import { useState, useEffect, useRef } from 'react';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const StatsCell = ({ stat, delay, inView }) => {
  const [count, setCount] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  
  // SVG Arc Math
  const radius = 24.25; // 52px diameter - 3.5px stroke = 48.5px / 2 = 24.25
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = inView 
    ? circumference - (stat.percentage / 100) * circumference 
    : circumference;

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 1600;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easedProgress = easeOutCubic(percentage);
      const currentVal = Math.floor(easedProgress * stat.value);
      
      setCount(currentVal);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(stat.value);
        setShowBurst(true);
        // Clean up burst particle DOM elements visually after they fade
        setTimeout(() => setShowBurst(false), 510);
      }
    };
    
    // Add delay for the staggered count-up if desired, or let it run when inView triggers.
    // The spec says: CELL ENTRANCE staggered per cell. Trigger ONCE.
    // CSS transition handles the entrance staggered. The count logic can start immediately 
    // when CSS entrance starts, or after. Let's start immediately.
    const rAF = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rAF);
  }, [inView, stat.value]);

  return (
    <div 
      className="group flex flex-col items-center justify-center p-6 transition-all duration-200 ease-in hover:bg-off-white hover:rounded-xl hover:scale-105"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 600ms ease-out ${delay}ms`
      }}
    >
      {/* Visual SVG Ring */}
      <div className="relative w-[52px] h-[52px] mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 52 52">
          {/* Track */}
          <circle 
            cx="26" cy="26" r={radius}
            fill="transparent"
            stroke="#EEF0F2"
            strokeWidth="3.5"
            className="transition-all duration-200 group-hover:stroke-[5px]"
          />
          {/* Progress Arc */}
          <circle 
            cx="26" cy="26" r={radius}
            fill="transparent"
            stroke="#2BA8A0"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:stroke-[5px]"
          />
        </svg>

        {/* Particle Bursts (Render only when triggered) */}
        {showBurst && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-amber rounded-full -mt-0.5 -ml-0.5 animate-burstTL"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-amber rounded-full -mt-0.5 -ml-0.5 animate-burstTR"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-amber rounded-full -mt-0.5 -ml-0.5 animate-burstBL"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-amber rounded-full -mt-0.5 -ml-0.5 animate-burstBR"></div>
          </div>
        )}
      </div>

      {/* Number Display */}
      <div className="font-display font-extrabold text-[clamp(2.25rem,4vw,3rem)] leading-none text-brand-mid group-hover:text-brand-dark transition-colors duration-200 relative mb-2">
        {count.toLocaleString()}
        <span className="text-accent-amber">{stat.suffix}</span>
      </div>

      {/* Label & Rule */}
      <div className="font-body font-normal text-[0.875rem] text-text-muted mt-1.5 text-center">
        {stat.label}
        {/* Animated Bottom Rule */}
        <div className="w-[24px] h-[2px] bg-brand-teal mx-auto mt-3 transition-all duration-500 origin-center" style={{
           transform: inView ? 'scaleX(1)' : 'scaleX(0)',
           transitionDelay: '500ms'
        }}></div>
      </div>

    </div>
  );
};

export default function StatsStrip() {
  const [inView, setInView] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // Fires ONCE
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const statsData = [
    { value: 8400, suffix: '+', label: 'Pharmaceutical Products Tracked', percentage: 84 },
    { value: 1200, suffix: '+', label: 'Verified Orders Processed', percentage: 72 },
    { value: 340, suffix: '+', label: 'Compliance Records Approved', percentage: 68 },
    { value: 98, suffix: '.6%', label: 'System Uptime Guaranteed', percentage: 99 },
  ];

  return (
    <section 
      ref={stripRef}
      className="w-full bg-pure-white py-10 lg:py-14 border-t-[3px] border-brand-teal"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-grey-light">
          {statsData.map((stat, i) => (
            <StatsCell key={i} stat={stat} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
