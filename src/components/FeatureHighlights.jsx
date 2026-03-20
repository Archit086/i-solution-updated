import { useState, useEffect, useRef } from 'react';

const icons = {
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      {/* Grouping both hands so they rotate together around the center */}
      <g className="origin-[12px_12px] animate-rotateClock">
        <polyline points="12 7 12 12 15 12" />
      </g>
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" className="animate-layerBump" />
      <polyline points="2 12 12 17 22 12" className="animate-layerBump" style={{ animationDelay: '200ms' }} />
      <polyline points="2 17 12 22 22 17" className="animate-layerBump" style={{ animationDelay: '400ms' }} />
    </svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" strokeDasharray="24" strokeDashoffset="24" className="animate-drawCheck" />
    </svg>
  ),
  key: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-oscillateKey">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M11.5 11.5L21 2v4h-4v4h-4v2l-1.5-1.5" />
    </svg>
  )
};

const itemsData = [
  {
    title: '24/7 Audit Trail Logging',
    sub: 'Every action, every role, every timestamp — permanently logged and queryable.',
    iconKey: 'clock'
  },
  {
    title: 'Multi-Level Order Validation',
    sub: 'Stock checked client-side and server-side before any order is confirmed.',
    iconKey: 'layers'
  },
  {
    title: 'Certified Compliance Records',
    sub: 'Authority-reviewed documents with tamper-evident approval chains.',
    iconKey: 'shield'
  },
  {
    title: 'Intelligent Role Permissions',
    sub: 'Granular access control — each user sees exactly their permitted scope.',
    iconKey: 'key'
  }
];

const FeatureItem = ({ item, index, inView }) => {
  // Desktop staggering logic: 
  // index 0 (Left), index 1 (Right)
  // index 2 (Left), index 3 (Right)
  const isLeft = index % 2 === 0;
  
  return (
    <div 
      className="group flex gap-6 w-full relative transition-all duration-200 ease-in"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : `translateX(${isLeft ? '-30px' : '30px'})`,
        transition: `opacity 650ms ease-out ${index * 150}ms, transform 650ms ease-out ${index * 150}ms`
      }}
    >
      {/* Icon Container */}
      <div className="shrink-0 w-[80px] h-[80px] rounded-[20px] bg-gradient-to-br from-brand-light to-off-white group-hover:from-brand-teal group-hover:to-brand-teal border border-border-default flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-all duration-200 ease-out">
        
        <div className="relative z-10 text-brand-teal group-hover:text-pure-white transition-colors duration-200">
          {icons[item.iconKey]}
        </div>
        
        {/* Number Label */}
        <span className="absolute top-2 right-2.5 font-display font-extrabold text-[0.72rem] text-border-default opacity-80 z-10 transition-colors duration-200 mix-blend-multiply group-hover:text-pure-white/20">
          0{index + 1}
        </span>
      </div>

      {/* Text Context */}
      <div className="relative flex flex-col pt-2 pl-3 group">
        {/* Teal Left Border Accent */}
        <div 
          className="absolute left-0 top-1 w-[3px] bg-brand-teal rounded-full group-hover:w-[5px] transition-all duration-200 ease-out"
          style={{
            height: inView ? '100%' : '0px',
            transition: `height 650ms ease-out ${index * 150 + 300}ms, width 200ms ease`
          }}
        ></div>

        <h3 className="font-display font-bold text-[1.125rem] text-text-dark group-hover:text-brand-teal transition-colors duration-200">
          {item.title}
        </h3>
        <p className="font-body text-[0.9rem] text-text-body leading-[1.75] mt-1.5 max-w-[420px]">
          {item.sub}
        </p>
      </div>
    </div>
  );
};

export default function FeatureHighlights() {
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
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-pure-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
          {itemsData.map((item, index) => (
            <FeatureItem key={index} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
