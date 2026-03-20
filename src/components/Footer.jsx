import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full flex flex-col font-open mt-0">
      
      {/* ZONE 1 - NEWSLETTER BAND */}
      <div className="relative bg-gradient-to-br from-[#2BA8A0] to-[#1D7A74] py-16 overflow-hidden w-full">
        {/* Orbs Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] rounded-full mix-blend-screen animate-orbit1 opacity-30 filter blur-[40px] bg-pure-white"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[250px] h-[250px] rounded-full mix-blend-screen animate-orbit2 opacity-30 filter blur-[30px] bg-accent-amber"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="flex flex-col text-center lg:text-left">
            <h3 className="font-display font-extrabold text-[1.5rem] text-pure-white mb-2 leading-snug">
              Stay Updated on I-Solution Releases
            </h3>
            <p className="font-body text-[0.9rem] text-pure-white/70 max-w-md mx-auto lg:mx-0">
              Product updates, compliance news, and platform announcements delivered straight to your inbox.
            </p>
          </div>

          <div className="flex flex-col">
            <form onSubmit={handleSubscribe} className="relative w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 flex flex-col sm:flex-row gap-3">
              <div className="relative w-full transition-all duration-300">
                {!subscribed ? (
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-pure-white/15 border border-pure-white/30 rounded-lg text-pure-white placeholder-pure-white/50 focus:bg-pure-white/25 focus:border-pure-white/70 focus:outline-none transition-all duration-300 font-body text-[0.9375rem] px-5 py-3.5"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-pure-white/10 border border-pure-white/20 rounded-lg text-pure-white font-body text-[0.9375rem] px-5 py-3.5 animate-[fadeIn_300ms_ease-in]">
                    <span className="mr-2 border border-pure-white/40 rounded-full w-5 h-5 flex items-center justify-center text-[0.6rem] bg-pure-white/20">✓</span> 
                    Subscription confirmed
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={subscribed}
                className={`w-full sm:w-auto shrink-0 font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-300 ${
                  subscribed 
                    ? 'bg-[#38A169] text-pure-white cursor-default' 
                    : 'bg-accent-amber text-text-dark hover:bg-accent-dark hover:-translate-y-0.5 shadow-md'
                }`}
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
            
            {!subscribed && (
              <div className="text-center lg:text-right mt-3 text-[0.75rem] text-pure-white/55 flex items-center justify-center lg:justify-end gap-1.5 animate-[fadeIn_300ms_ease-in]">
                <span>✓</span> No spam. Unsubscribe anytime.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ZONE 2 - MAIN FOOTER */}
      <div className="bg-[#1A2530] text-[#718096] py-16 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COL 1 - Brand */}
          <div className="flex flex-col">
            <div className="font-display font-black text-[1.75rem] tracking-tight text-pure-white mb-4 flex items-center">
              I-Solution<span className="text-brand-teal text-[2rem] leading-none">.</span>
            </div>
            <p className="font-body text-[0.875rem] text-pure-white/60 leading-[1.7] max-w-[220px] mb-6">
              Pharmaceutical Management & Compliance — Built for Every Role
            </p>
            <div className="flex items-center gap-2 border border-pure-white/20 bg-pure-white/5 px-2.5 py-1 rounded w-max mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pure-white/80">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-[0.7rem] font-display font-bold text-pure-white tracking-widest uppercase">ISO 9001:2015</span>
            </div>

            {/* Social Row */}
            <div className="flex items-center gap-3">
              {['github', 'linkedin', 'twitter', 'mail'].map((network, i) => (
                <button key={i} className="w-[36px] h-[36px] rounded-full bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-pure-white/60 hover:bg-brand-teal/30 hover:border-brand-teal/50 hover:text-pure-white hover:-translate-y-[2px] transition-all duration-150 group">
                  <div className="w-4 h-4 rounded-sm bg-current opacity-80 group-hover:opacity-100"></div>{/* Placeholder for SVG Icon */}
                </button>
              ))}
            </div>
          </div>

          {/* COL 2 - Platform Links */}
          <div className="flex flex-col">
            <h4 className="font-display font-bold text-[0.72rem] text-pure-white tracking-[0.15em] uppercase mb-6">Platform</h4>
            <ul className="flex flex-col gap-3">
              {['Products', 'Orders', 'Compliance', 'Dashboard', 'API Docs'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-[0.875rem] text-pure-white/60 hover:text-pure-white hover:translate-x-[4px] transition-all duration-150 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 - User Roles */}
          <div className="flex flex-col">
            <h4 className="font-display font-bold text-[0.72rem] text-pure-white tracking-[0.15em] uppercase mb-6">For Teams</h4>
            <ul className="flex flex-col gap-3">
              {['Admin Portal', 'Authority Review', 'Customer Orders', 'Distributor Hub', 'Register Free'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-[0.875rem] text-pure-white/60 hover:text-pure-white hover:translate-x-[4px] transition-all duration-150 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 - Contact */}
          <div className="flex flex-col">
            <h4 className="font-display font-bold text-[0.72rem] text-pure-white tracking-[0.15em] uppercase mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-brand-teal text-[1.25rem] leading-none shrink-0 mt-0.5">📧</span>
                <span className="font-body text-[0.875rem] text-pure-white/60">contact@isolution.io</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-teal text-[1.25rem] leading-none shrink-0 mt-0.5">🕐</span>
                <span className="font-body text-[0.875rem] text-pure-white/60">Monday–Friday, 9AM–6PM IST</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand-teal text-[1.25rem] leading-none shrink-0 mt-0.5">🛡</span>
                <span className="font-body text-[0.875rem] text-pure-white/60">Secure · Compliant · Reliable</span>
              </div>
            </div>

            <button className="mt-8 w-full border border-brand-teal/50 text-brand-teal font-display font-bold text-[0.875rem] py-3 rounded hover:bg-brand-teal/15 transition-colors duration-200">
              Contact Support
            </button>
          </div>

        </div>
      </div>

      {/* ZONE 3 - BOTTOM BAR */}
      <div className="w-full bg-[#111C26] py-5 border-t border-pure-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-body text-[0.8125rem] text-pure-white/40 text-center md:text-left">
            © 2026 I-Solution Platform. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 font-body text-[0.8125rem] text-pure-white/40">
            <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
            <span className="text-pure-white/10 hidden md:block">·</span>
            <a href="#" className="hover:text-brand-teal transition-colors">Terms of Service</a>
            <span className="text-pure-white/10 hidden md:block">·</span>
            <a href="#" className="hover:text-brand-teal transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* FLOATING BACK TO TOP BUTTON */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-[48px] h-[48px] rounded-full bg-brand-teal hover:bg-brand-dark hover:scale-110 hover:shadow-[0_8px_24px_rgba(43,168,160,0.4)] text-pure-white flex items-center justify-center transition-all duration-300 pointer-events-auto ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px] pointer-events-none'}`}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>

    </footer>
  );
}
