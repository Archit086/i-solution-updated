import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-off-white min-h-screen text-text-body font-open flex flex-col pt-[106px]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-brand-dark py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ background: 'radial-gradient(circle at top left, #799886, transparent 60%)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-light/10 border border-brand-teal/30 text-brand-teal text-xs font-bold tracking-widest uppercase mb-4">About Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-pure-white mb-6 tracking-tight">Quality-Driven<br/>Pharma Innovators</h1>
          <p className="text-pure-white/80 max-w-2xl mx-auto text-lg md:text-xl font-medium">Delivering trusted, ethical, and globally compliant healthcare solutions.</p>
        </div>
      </div>

      {/* INTRODUCTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark mb-6 leading-tight">BlessClaudius Pharmaceuticals Private Limited</h2>
            <p className="text-text-body text-lg leading-relaxed mb-6 font-medium">
              We are a dynamic and reputable name in the healthcare industry, recognized for our commitment to quality, innovation, and ethical practices. 
            </p>
            <p className="text-text-body leading-relaxed mb-8">
              We specialize in the marketing, supply, export, and third-party manufacturing of a broad spectrum of Pharmaceutical, Nutraceutical, Ayurvedic, and Surgical products. With ISO 9001:2015 certification, our systems and operations are structured to meet international quality management standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-pure-white border border-border-default px-4 py-2 rounded-full text-sm font-bold text-brand-teal shadow-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                ISO 9001:2015
              </span>
              <span className="bg-pure-white border border-border-default px-4 py-2 rounded-full text-sm font-bold text-brand-teal shadow-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                FSSAI Licensed
              </span>
              <span className="bg-pure-white border border-border-default px-4 py-2 rounded-full text-sm font-bold text-brand-teal shadow-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Udyam Registered
              </span>
            </div>
          </div>
          <div className="relative">
            {/* Visual Block Representation */}
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-brand-light flex items-center justify-center">
                 <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2BA8A0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-8 -left-8 bg-pure-white p-6 rounded-2xl shadow-cardHover border border-border-default max-w-[200px] hidden md:block animate-[layerBump_3s_ease-in-out_infinite_alternate]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <span className="font-display font-bold text-xl text-text-dark">100%</span>
              </div>
              <p className="text-sm text-text-muted font-medium">WHO-GMP Certified Facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE PILLARS */}
      <div className="bg-pure-white py-16 md:py-24 border-y border-border-default">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text-dark mb-4">Our Core Foundations</h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">Maintaining compliance with regulatory bodies like DCGI, FSSAI, and AYUSH while prioritizing responsible business conduct.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-off-white p-8 rounded-2xl border border-border-default hover:border-brand-teal transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-pure-white rounded-xl flex items-center justify-center text-brand-teal mb-6 shadow-sm border border-border-default group-hover:bg-brand-teal group-hover:text-pure-white transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 className="font-display font-bold text-xl text-text-dark mb-3">Quality-Driven Production</h3>
              <p className="text-text-muted leading-relaxed">From sourcing high-grade raw materials to cutting-edge manufacturing techniques, we emphasize excellence at every stage in tablet, capsule, and syrup production.</p>
            </div>

            <div className="bg-off-white p-8 rounded-2xl border border-border-default hover:border-brand-teal transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-pure-white rounded-xl flex items-center justify-center text-brand-teal mb-6 shadow-sm border border-border-default group-hover:bg-brand-teal group-hover:text-pure-white transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="font-display font-bold text-xl text-text-dark mb-3">Healthcare Commitment</h3>
              <p className="text-text-muted leading-relaxed">We support the medical fraternity providing precise, research-based information to empower doctors, pharmacists, and consultants to make well-informed decisions.</p>
            </div>

            <div className="bg-off-white p-8 rounded-2xl border border-border-default hover:border-brand-teal transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-pure-white rounded-xl flex items-center justify-center text-brand-teal mb-6 shadow-sm border border-border-default group-hover:bg-brand-teal group-hover:text-pure-white transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="font-display font-bold text-xl text-text-dark mb-3">Ethical Business Practices</h3>
              <p className="text-text-muted leading-relaxed">Ethics and transparency are central. We prioritize responsible business conduct across our massive marketing and distribution networks globally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MISSION, VISION, VALUES */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-4 mb-4 text-accent-amber">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                <h2 className="text-3xl font-display font-bold text-text-dark">Our Mission</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To be a globally respected pharmaceutical company known for innovation, quality, and ethical business practices.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To contribute significantly to improving global health by delivering affordable and effective medicines.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To expand our presence across domestic and international markets with a strong portfolio of trusted products.</p>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4 text-accent-amber">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <h2 className="text-3xl font-display font-bold text-text-dark">Our Vision</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To develop, market, and supply high-quality pharmaceutical, nutraceutical, and ayurvedic products that meet international standards.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To foster long-term relationships with healthcare professionals, partners, and distributors through trust and transparency.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-brand-teal font-bold text-lg">•</div>
                  <p className="text-text-body leading-relaxed">To continuously invest in research, innovation, and technology to improve patient outcomes.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-dark p-10 md:p-12 rounded-3xl text-pure-white relative overflow-hidden shadow-2xl h-fit">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pure-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
            
            <h2 className="text-3xl font-display font-bold mb-8 relative z-10 flex items-center gap-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Core Values
            </h2>
            
            <div className="flex flex-col gap-8 relative z-10">
              <div className="group">
                <h3 className="text-xl font-display font-bold text-brand-teal mb-2 group-hover:text-pure-white transition-colors">Integrity</h3>
                <p className="text-pure-white/80 leading-relaxed group-hover:text-pure-white transition-colors">We conduct our business with the highest ethical standards and transparency.</p>
              </div>
              <div className="w-full h-px bg-pure-white/10"></div>
              
              <div className="group">
                <h3 className="text-xl font-display font-bold text-brand-teal mb-2 group-hover:text-pure-white transition-colors">Quality</h3>
                <p className="text-pure-white/80 leading-relaxed group-hover:text-pure-white transition-colors">We are committed to delivering products that ensure safety, efficacy, and compliance.</p>
              </div>
              <div className="w-full h-px bg-pure-white/10"></div>
              
              <div className="group">
                <h3 className="text-xl font-display font-bold text-brand-teal mb-2 group-hover:text-pure-white transition-colors">Innovation</h3>
                <p className="text-pure-white/80 leading-relaxed group-hover:text-pure-white transition-colors">We embrace innovation to develop better, faster, and more accessible healthcare solutions.</p>
              </div>
              <div className="w-full h-px bg-pure-white/10"></div>
              
              <div className="group">
                <h3 className="text-xl font-display font-bold text-brand-teal mb-2 group-hover:text-pure-white transition-colors">Responsibility</h3>
                <p className="text-pure-white/80 leading-relaxed group-hover:text-pure-white transition-colors">We prioritize patient well-being, environmental care, and comprehensive social responsibility.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
}
