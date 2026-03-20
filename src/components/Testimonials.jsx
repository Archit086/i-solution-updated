import { useState, useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Managing our entire pharma catalogue used to require three separate tools. I-Solution unified everything — products, orders, and compliance — in one clean dashboard.",
    name: "Dr. Ananya Mehta",
    title: "Chief Compliance Officer, MedBridge India",
    role: "Admin User",
    roleColor: "bg-brand-light text-brand-dark",
    avatarBg: "bg-brand-light",
    avatarText: "text-brand-dark",
    initials: "AM",
    stars: 5
  },
  {
    id: 2,
    quote: "The compliance approval workflow is exactly what our authority team needed. Pending reviews queue, one-click approval, and a full audit trail.",
    name: "Rajiv Shukla",
    title: "Regulatory Affairs Director",
    role: "Authority Officer",
    roleColor: "bg-danger-red/10 text-danger-red",
    avatarBg: "bg-danger-red/10",
    avatarText: "text-danger-red",
    initials: "RS",
    stars: 5
  },
  {
    id: 3,
    quote: "As a distributor handling bulk pharmaceutical orders, the stock validation before every submission has saved us from countless fulfilment errors.",
    name: "Prerna Khanna",
    title: "Supply Chain Manager, LifeLink Distributors",
    role: "Distributor",
    roleColor: "bg-accent-soft text-accent-dark",
    avatarBg: "bg-accent-soft",
    avatarText: "text-accent-dark",
    initials: "PK",
    stars: 4
  },
  {
    id: 4,
    quote: "I can browse verified pharmaceutical products, place orders, and track compliance status from one login. It feels built specifically for our workflow.",
    name: "Sumanth Reddy",
    title: "Senior Pharmacist, CurePoint Hospitals",
    role: "Customer",
    roleColor: "bg-[#F3E8FF] text-[#6B21A8]",
    avatarBg: "bg-[#F3E8FF]",
    avatarText: "text-[#6B21A8]",
    initials: "SR",
    stars: 5
  },
  {
    id: 5,
    quote: "The role-based access is genuinely granular. Our admin, authority, and distributor teams each see exactly what they need and nothing more.",
    name: "Nidhi Agarwal",
    title: "IT Head, PharmaNet Solutions",
    role: "Admin User",
    roleColor: "bg-brand-light text-brand-dark",
    avatarBg: "bg-brand-light",
    avatarText: "text-brand-dark",
    initials: "NA",
    stars: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState('idle'); // 'idle' | 'exiting-left' | 'exiting-right' | 'entering-left' | 'entering-right'
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Responsive items count
  const [itemsToShow, setItemsToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1024) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for header stars
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isHovered || animState !== 'idle') return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, animState]);

  const handleNext = () => {
    if (animState !== 'idle') return;
    setAnimState('exiting-left');
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
      setAnimState('entering-right');
      setTimeout(() => setAnimState('idle'), 350);
    }, 350);
  };

  const handlePrev = () => {
    if (animState !== 'idle') return;
    setAnimState('exiting-right');
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setAnimState('entering-left');
      setTimeout(() => setAnimState('idle'), 350);
    }, 350);
  };

  const handleDotClick = (idx) => {
    if (animState !== 'idle' || idx === currentIndex) return;
    const direction = idx > currentIndex ? 'exiting-left' : 'exiting-right';
    const enterDirection = idx > currentIndex ? 'entering-right' : 'entering-left';
    
    setAnimState(direction);
    setTimeout(() => {
      setCurrentIndex(idx);
      setAnimState(enterDirection);
      setTimeout(() => setAnimState('idle'), 350);
    }, 350);
  };

  // Resolve which items are visible based on currentIndex and itemsToShow
  const visibleItems = [];
  if (itemsToShow === 1) {
    visibleItems.push(TESTIMONIALS[currentIndex]);
  } else if (itemsToShow === 2) {
    visibleItems.push(TESTIMONIALS[currentIndex]);
    visibleItems.push(TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length]);
  } else {
    // 3 items shown: Center is currentIndex
    visibleItems.push(TESTIMONIALS[(currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length]);
    visibleItems.push(TESTIMONIALS[currentIndex]);
    visibleItems.push(TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length]);
  }

  // Animation CSS resolution
  const getGridStyle = () => {
    if (animState === 'exiting-left') return { transform: 'translateX(-60px) scale(0.96)', opacity: 0 };
    if (animState === 'exiting-right') return { transform: 'translateX(60px) scale(0.96)', opacity: 0 };
    if (animState === 'entering-right') return { transform: 'translateX(60px) scale(0.96)', opacity: 0 }; // Start point
    if (animState === 'entering-left') return { transform: 'translateX(-60px) scale(0.96)', opacity: 0 }; // Start point
    return { transform: 'translateX(0) scale(1)', opacity: 1 }; // Idle
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 w-full overflow-hidden bg-gradient-to-b from-off-white to-pure-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & RATING WIDGET */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-display font-bold text-[0.72rem] tracking-widest text-brand-teal uppercase mb-3 block">
              Global Pharmaceutical Trust
            </span>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,2.5rem)] text-text-dark leading-[1.2]">
              Trusted by Healthcare<br/>Professionals
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end p-5 bg-pure-white rounded-2xl shadow-sm border border-border-default">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <svg 
                  key={i}
                  className="w-5 h-5 fill-accent-amber"
                  style={{
                    transform: inView ? 'scale(1)' : 'scale(0)',
                    transition: 'transform 500ms cubic-bezier(0.34,1.56,0.64,1)',
                    transitionDelay: `${inView ? i * 80 : 0}ms`
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <div className="font-display font-bold text-[0.9375rem] text-text-dark">4.9/5.0 Average Rating</div>
            <div className="font-body text-text-muted text-[0.7rem] uppercase tracking-wider">(from 200+ verified users)</div>
          </div>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* GRID OF CARDS WITH IDENTICAL CSS TRANSITION ENGINE */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={getGridStyle()}
          >
            {visibleItems.map((item, idx) => {
              // Calculate if this is the center card on Desktop
              const isCenter = itemsToShow === 3 && idx === 1;
              
              return (
                <div 
                  key={`${item.id}-${currentIndex}`} // Force re-render on index cycle to snap styles
                  className={`bg-pure-white border rounded-[20px] p-8 relative flex flex-col h-full transition-all duration-300 ${
                    isCenter 
                      ? 'scale-[1.03] border-brand-teal shadow-[0_24px_64px_rgba(43,168,160,0.12)] z-10' 
                      : 'border-border-default scale-100 z-0 opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-4 left-6 font-serif text-[5rem] leading-none text-brand-light select-none z-0">
                    &ldquo;
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stars specific to testimonial */}
                    <div className="flex gap-[2px] mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < item.stars ? 'fill-accent-amber' : 'fill-border-default'}`} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    <p className="font-body italic text-[0.9375rem] text-text-body leading-[1.8] mb-8 grow">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {/* Author Row */}
                    <div className="flex items-center gap-4 mt-auto">
                      <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0 ${item.avatarBg} ${item.avatarText}`}>
                        {item.initials}
                      </div>
                      <div className="flex flex-col">
                        <div className="font-display font-bold text-[0.9375rem] text-text-dark">
                          {item.name}
                        </div>
                        <div className="font-body text-[0.8125rem] text-text-muted mb-1">
                          {item.title}
                        </div>
                        <span className={`self-start text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.roleColor}`}>
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-between mt-12">
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-brand-teal' : 'w-2 bg-border-default hover:bg-grey-mid'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button 
                onClick={handlePrev}
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-pure-white border border-border-default hover:bg-brand-light hover:border-brand-teal group transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-brand-teal transition-colors">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-pure-white border border-border-default hover:bg-brand-light hover:border-brand-teal group transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted group-hover:text-brand-teal transition-colors">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
