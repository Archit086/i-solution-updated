import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 68);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Alert bar text to repeat for seamless marquee. We render it twice inline to cover wide screens.
  const alertText = "🔒 ISO 9001:2015 Certified Platform  ·  ✅ FSSAI Licensed  ·  📦 Real-time Stock Validation  ·  🚚 Multi-role Order Management  ·  🛡 JWT Secured Authentication  ·  📋 Compliance Workflow Built-in  ·  ";

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-pharma ${scrolled ? 'bg-pure-white/90 backdrop-blur-[16px] shadow-navSticky border-b-transparent' : 'bg-pure-white border-b border-border-default'}`}>
        
        {/* LAYER 1: ALERT TICKER BAR */}
        <div 
          className={`w-full overflow-hidden transition-all duration-300 ease-pharma flex items-center bg-[length:200%_100%] animate-slideGradient`}
          style={{
            backgroundImage: 'linear-gradient(90deg, #1D7A74, #2BA8A0, #1D7A74)',
            maxHeight: scrolled ? '0px' : '38px',
            opacity: scrolled ? 0 : 1,
            height: '38px' // Fixed height before collapse
          }}
        >
          <div className="flex-1 overflow-hidden relative h-full flex items-center">
            {/* The wrapper that smoothly translates -50% to cycle */}
            <div className="flex whitespace-nowrap animate-marquee w-max select-none">
              <span className="font-body font-semibold text-[0.72rem] text-pure-white tracking-[0.04em] pr-4">{alertText}</span>
              <span className="font-body font-semibold text-[0.72rem] text-pure-white tracking-[0.04em] pr-4">{alertText}</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center justify-center pl-4 pr-6 bg-brand-dark/20 h-full border-l border-pure-white/20">
            <button className="text-pure-white text-[0.7rem] font-bold border border-pure-white/30 rounded px-2 py-0.5 hover:bg-pure-white/10 transition-colors bg-pure-white/5 uppercase">
              🌐 EN
            </button>
          </div>
        </div>

        {/* LAYER 2: MAIN NAVBAR */}
        {/* Note the padding adjustment when scrolled 68px -> 56px roughly corresponds to vertically centering in the remaining space */}
        <div className={`w-full px-6 transition-all duration-300 ease-pharma flex items-center justify-between ${scrolled ? 'h-[56px]' : 'h-[68px]'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 ease-pharma" style={{transform: scrolled ? 'scale(0.9)' : 'scale(1)'}}>
              {/* Hexagon Outline */}
              <path d="M14 1L26.1244 8V22L14 29L1.87564 22V8L14 1Z" stroke="#2BA8A0" strokeWidth="2" strokeLinejoin="round"/>
              {/* Central Node & Connectors */}
              <circle cx="14" cy="15" r="3" fill="#2BA8A0" />
              <line x1="14" y1="15" x2="14" y2="4" stroke="#2BA8A0" strokeWidth="1.5" />
              <line x1="14" y1="15" x2="23" y2="20" stroke="#2BA8A0" strokeWidth="1.5" />
              <line x1="14" y1="15" x2="5" y2="20" stroke="#2BA8A0" strokeWidth="1.5" />
              {/* Pulsing Nodes */}
              <circle cx="14" cy="4" r="2" fill="#2BA8A0" className="animate-pulseBreath origin-center" style={{transformBox: 'fill-box'}} />
              <circle cx="23" cy="20" r="2" fill="#2BA8A0" className="animate-pulseBreath origin-center" style={{transformBox: 'fill-box', animationDelay: '0.6s'}} />
              <circle cx="5" cy="20" r="2" fill="#2BA8A0" className="animate-pulseBreath origin-center" style={{transformBox: 'fill-box', animationDelay: '1.2s'}} />
            </svg>
            <span className={`font-display font-extrabold text-[1.4rem] tracking-tight transition-transform duration-300 ease-pharma ${scrolled ? 'scale-[0.9] origin-left' : 'scale-100'}`}>
              <span className="text-brand-teal">I-</span><span className="text-text-dark">Solution</span>
            </span>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Products', 'About', 'Contact'].map((route) => {
              const path = route === 'Home' ? '/' : `/${route.toLowerCase()}`;
              return (
                <NavLink 
                  key={route} 
                  to={path}
                  className={({ isActive }) => `font-display font-bold text-[0.875rem] transition-colors nav-link-underline ${isActive ? 'text-brand-teal active' : 'text-text-body hover:text-brand-teal'}`}
                >
                  {route}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="relative text-text-muted hover:text-brand-teal transition-colors" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {/* Red dot badge pulse */}
              <span className="absolute top-0 right-0 w-[8px] h-[8px] bg-danger-red rounded-full animate-badgePulse transform translate-x-1/2 -translate-y-1/2 shadow-sm"></span>
            </button>
            <div className="h-6 w-px bg-border-default"></div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-brand-teal border-[1.5px] border-brand-teal text-pure-white font-display font-bold text-[0.875rem] py-2 px-6 rounded-md hover:bg-brand-dark hover:border-brand-dark hover:-translate-y-[2px] hover:shadow-btnGlow transition-all duration-200 active:translate-y-0"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className={`md:hidden p-2 rounded-md hover:bg-off-white transition-colors hamburger ${mobileMenuOpen ? 'open' : ''} z-[60]`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center relative">
              {/* Animated via index.css */}
              <span className="hamburger-line w-full absolute top-0"></span>
              <span className="hamburger-line w-full absolute top-1/2 -translate-y-1/2"></span>
              <span className="hamburger-line w-full absolute bottom-0"></span>
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div 
        className={`fixed inset-0 z-[55] pointer-events-none transition-all duration-350 ease-out`}
        style={{
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-text-dark/45 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Drawer panel */}
        <div 
          className={`absolute top-0 right-0 w-[85%] max-w-[320px] h-full bg-pure-white shadow-[-10px_0_20px_rgba(0,0,0,0.05)] flex flex-col pt-24 pb-6 px-6 pointer-events-auto transition-transform duration-[350ms] ease-out will-change-transform`}
          style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
        >
          <nav className="flex flex-col flex-1">
            {['Home', 'Products', 'About', 'Contact'].map((route, i) => {
              const path = route === 'Home' ? '/' : `/${route.toLowerCase()}`;
              return (
                <NavLink 
                  key={route} 
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center h-[56px] border-b border-border-default font-display font-bold text-[1.125rem] transition-all duration-300 ease-out ${isActive ? 'text-brand-teal' : 'text-text-dark hover:text-brand-teal'}`}
                  style={{
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(40px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transitionDelay: mobileMenuOpen ? `${i * 60 + 100}ms` : '0ms'
                  }}
                >
                  {route}
                </NavLink>
              );
            })}
          </nav>
          
          <div className="mt-auto pt-6 flex flex-col gap-3"
            style={{
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileMenuOpen ? 1 : 0,
              transitionDelay: mobileMenuOpen ? `400ms` : '0ms',
              transition: 'all 0.3s ease-out'
            }}
          >
            <button onClick={() => {navigate('/contact'); setMobileMenuOpen(false);}} className="w-full bg-brand-teal text-pure-white font-display font-bold text-[1rem] py-3 px-5 rounded-md hover:bg-brand-dark transition-colors border-[1.5px] border-brand-teal">
              Contact Us
            </button>
          </div>
        </div>
      </div>
{/* Push content down so it doesn't hide behind the navbar initially */}
<div className="pt-[106px]"></div>
    </>
  );
}
