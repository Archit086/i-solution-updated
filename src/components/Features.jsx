import { useState, useEffect, useRef } from 'react';

const icons = {
  security: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <circle cx="12" cy="10" r="3"></circle>
      <path d="M7 21v-2a4 4 0 014-4h2a4 4 0 014 4v2"></path>
    </svg>
  ),
  analytics: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
      <polyline points="4 12 10 6 15 11 20 2"></polyline>
    </svg>
  ),
  compliance: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200">
      <path d="M9 11l3 3L22 4"></path>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
      <circle cx="18" cy="18" r="3"></circle>
      <path d="M18 21v3"></path>
    </svg>
  ),
  operations: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-200">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="13 2 9 13 15 13 11 22"></polyline>
    </svg>
  )
};

const featureData = [
  {
    iconKey: 'security',
    title: 'Role-Based Access Control',
    tag: 'Security',
    metric: '4 User Roles',
    body: 'Strict permission protocols ensuring that every user only interacts with authorized nodes.',
  },
  {
    iconKey: 'analytics',
    title: 'Real-Time Stock Intelligence',
    tag: 'Analytics',
    metric: 'Live Stock Sync',
    body: 'Predictive inventory processing across multiple distributor hubs autonomously mapped.',
  },
  {
    iconKey: 'compliance',
    title: 'Compliance Automation',
    tag: 'Compliance',
    metric: 'Zero Manual Steps',
    body: 'Verified batch processing with strict adherence to updated global pharmaceutical standards.',
  },
  {
    iconKey: 'operations',
    title: 'Instant Order Processing',
    tag: 'Operations',
    metric: '<2s Processing',
    body: 'Direct institutional pathways bypassing traditional retail friction, accelerating dispatch.',
  }
];

export default function Features() {
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
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-off-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] bg-brand-teal origin-right transition-all duration-500 ease-out" style={{ width: inView ? '40px' : '0' }}></div>
            <span className={`font-display font-bold text-[0.72rem] text-brand-teal tracking-[0.15em] uppercase transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              Why I-Solution
            </span>
            <div className="h-[1px] bg-brand-teal origin-left transition-all duration-500 ease-out" style={{ width: inView ? '40px' : '0' }}></div>
          </div>

          {/* Heading with SVG Underline */}
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.375rem)] text-text-dark max-w-[700px] mx-auto leading-[1.2] mb-6 relative z-10">
            <span className={`block transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>A Platform Built Around</span>
            <span className={`relative inline-block transition-all duration-700 delay-100 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Pharmaceutical Precision
              {/* Dynamic SVG Underline */}
              <svg className="absolute -bottom-2 lg:-bottom-3 left-0 w-full h-3 lg:h-4 pointer-events-none stroke-brand-teal hidden sm:block" preserveAspectRatio="none" viewBox="0 0 200 12">
                <path 
                  d="M2,10 C50,2 150,2 198,8" 
                  fill="none" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '200',
                    strokeDashoffset: inView ? '0' : '200',
                    transition: 'stroke-dashoffset 600ms ease-out 400ms'
                  }}
                />
              </svg>
            </span>
          </h2>

          <p className={`font-body text-[1rem] text-text-body max-w-[580px] mx-auto leading-relaxed transition-all duration-700 delay-300 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Experience institutional-grade control. Designed to handle the complexity of global pharmaceutical supply chains with unmatched transparency and speed.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featureData.map((feature, i) => (
            <div 
              key={i}
              className="group relative bg-pure-white border border-border-default rounded-[16px] p-8 flex flex-col items-start hover:-translate-y-2 selection:bg-brand-light focus-within:ring-2 focus-within:ring-brand-teal focus-within:outline-none"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 700ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 100}ms, border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease`,
                boxShadow: 'var(--hover-shadow)'
              }}
              onMouseEnter={(e) => {
                 e.currentTarget.style.setProperty('--hover-shadow', '0 24px 60px rgba(43,168,160,0.14), 0 4px 16px rgba(26,37,48,0.06)');
                 e.currentTarget.style.borderColor = '#2BA8A0';
              }}
              onMouseLeave={(e) => {
                 e.currentTarget.style.setProperty('--hover-shadow', 'none');
                 e.currentTarget.style.borderColor = '#EEF0F2';
              }}
            >
              {/* Top Animated Accent Bar */}
              <div className="absolute top-[-1px] left-0 h-[3px] bg-brand-teal rounded-t-[16px] w-0 group-hover:w-full transition-all duration-300 ease-out"></div>
              
              <div className="flex justify-between w-full items-start mb-6">
                {/* Icon Container */}
                <div className="w-[72px] h-[72px] rounded-full bg-brand-light flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-pure-white group-hover:animate-wobbleIcon transition-colors duration-200">
                  {icons[feature.iconKey]}
                </div>
                
                {/* Tag Badge */}
                <span className="font-display font-bold text-[0.65rem] tracking-wider uppercase bg-brand-light text-brand-dark px-3 py-1 rounded-full">
                  {feature.tag}
                </span>
              </div>

              {/* Title & Metric Pill */}
              <h3 className="font-display font-bold text-[1.0625rem] text-text-dark mb-3">
                {feature.title}
              </h3>
              
              <div className="inline-flex items-center gap-1.5 bg-accent-soft text-accent-dark px-2.5 py-1 rounded-full font-display font-bold text-[0.72rem] mb-4">
                <span className="text-accent-amber font-black leading-none mt-[-1px]">✓</span> {feature.metric}
              </div>

              {/* Body Text */}
              <p className="font-body text-[0.875rem] text-text-body line-height-[1.75] mb-8 flex-grow">
                {feature.body}
              </p>

              {/* Footer Link */}
              <div className="mt-auto font-display font-semibold text-[0.875rem] text-brand-teal group-hover:text-brand-dark transition-colors duration-200 flex items-center gap-1.5 cursor-pointer">
                Explore Feature 
                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-[6px]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
