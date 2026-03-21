import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="bg-off-white min-h-screen text-text-body font-open flex flex-col pt-[106px]">
      <Navbar />

      {/* HEADER SECTION */}
      <div className="bg-brand-dark py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ background: 'radial-gradient(circle at top right, #799886, transparent 60%)' }}></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-pure-white mb-6 tracking-tight">Connect With Our Team</h1>
          <p className="text-pure-white/80 max-w-2xl mx-auto text-lg md:text-xl font-medium">Reach out to our corporate and head office contacts for inquiries, support, and personalized pharmaceutical assistance.</p>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COMPONENT: CONTACT DETAILS */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-text-dark mb-6 border-b-2 border-brand-teal inline-block pb-2">Contact Details</h2>
            <p className="text-text-body leading-relaxed mb-4">BlessClaudius Pharmaceuticals Private Limited is an ISO 9001:2015 certified company. We are dedicated to empowering global healthcare through innovation, trust, and excellence, aiming to improve lives with safe, accessible, and effective medical solutions.</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-pure-white shadow-sm border border-border-default flex items-center justify-center rounded-xl text-brand-teal shrink-0 group-hover:bg-brand-teal group-hover:text-pure-white group-hover:-translate-y-1 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-text-dark text-lg mb-2">Phone Lines</h3>
                <p className="text-text-body font-medium hover:text-brand-teal transition-colors cursor-pointer">+91 9996602477</p>
                <p className="text-text-body font-medium hover:text-brand-teal transition-colors cursor-pointer">+91 7494896402</p>
                <p className="text-text-body font-medium hover:text-brand-teal transition-colors cursor-pointer">+91 8770271036 <span className="text-xs font-bold bg-brand-light text-brand-dark px-2 py-0.5 rounded ml-2 uppercase tracking-wide">Help Desk</span></p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-pure-white shadow-sm border border-border-default flex items-center justify-center rounded-xl text-brand-teal shrink-0 group-hover:bg-brand-teal group-hover:text-pure-white group-hover:-translate-y-1 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-text-dark text-lg mb-1">Email Address</h3>
                <p className="text-brand-teal font-semibold hover:text-brand-dark hover:underline transition-all cursor-pointer">info@blessclaudius.com</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-pure-white shadow-sm border border-border-default flex items-center justify-center rounded-xl text-brand-teal shrink-0 group-hover:bg-brand-teal group-hover:text-pure-white group-hover:-translate-y-1 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-text-dark text-lg mb-2">Corporate Office</h3>
                <p className="text-text-muted leading-relaxed font-medium">Plot Number-231, Near Sehnai Garden,<br/>Mathura Road, Faridabad-121004,<br/>Haryana, India</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-pure-white shadow-sm border border-border-default flex items-center justify-center rounded-xl text-brand-teal shrink-0 group-hover:bg-brand-teal group-hover:text-pure-white group-hover:-translate-y-1 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <div className="pt-1">
                <h3 className="font-display font-bold text-text-dark text-lg mb-2">Head Office</h3>
                <p className="text-text-muted leading-relaxed font-medium">Shop Number-2, Khojkipur,<br/>Karshan Road, Ambala,<br/>Haryana, India-133006</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: QUOTE FORM */}
        <div className="lg:col-span-7">
          <div className="bg-pure-white rounded-2xl shadow-cardHover border border-border-default p-8 md:p-12 relative overflow-hidden h-full flex flex-col">
            {/* Soft backdrop accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-light rounded-bl-full z-0 opacity-40"></div>
            
            <div className="relative z-10 flex flex-col flex-1">
              <h2 className="text-[2rem] font-display font-extrabold text-text-dark mb-2 tracking-tight">Get A Free Quote</h2>
              <p className="text-text-muted mb-10 text-[1.0625rem] font-medium">Ready to partner with us? Fill out the details below.</p>
              
              <form className="flex flex-col gap-6 flex-1 justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">First Name *</label>
                    <input type="text" className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all placeholder:text-text-muted/60 font-medium" placeholder="Your First Name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">Last Name *</label>
                    <input type="text" className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all placeholder:text-text-muted/60 font-medium" placeholder="Your Last Name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">Email Address *</label>
                    <input type="email" className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all placeholder:text-text-muted/60 font-medium" placeholder="john@company.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">Phone *</label>
                    <input type="tel" className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all placeholder:text-text-muted/60 font-medium" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">Company *</label>
                    <input type="text" className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all placeholder:text-text-muted/60 font-medium" placeholder="Your Organization Ltd." required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide text-[0.7rem]">Inquiry Reason *</label>
                    <div className="relative">
                      <select className="w-full px-4 py-3.5 bg-off-white rounded-lg border border-border-default focus:border-brand-teal focus:bg-pure-white focus:ring-[1.5px] focus:ring-brand-teal outline-none transition-all appearance-none cursor-pointer text-text-body font-medium" defaultValue="" required>
                        <option value="" disabled>Select a reason...</option>
                        <option value="product">Product Inquiry</option>
                        <option value="quote">Get a Free Quote</option>
                        <option value="partnership">Partnership / Distribution</option>
                        <option value="support">General Support</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <button type="submit" className="w-full bg-brand-teal text-pure-white font-display font-extrabold text-[1.0625rem] py-4 rounded-xl hover:bg-brand-dark transition-all duration-300 hover:-translate-y-[2px] shadow-[0_8px_20px_rgba(43,168,160,0.25)] active:translate-y-0 flex items-center justify-center gap-2 group tracking-wide uppercase">
                    Submit Inquiry
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1.5 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                  <p className="text-center font-medium mt-4 text-[0.8rem] text-text-muted/80">
                    By submitting your information, you agree to our <span className="underline cursor-pointer hover:text-brand-teal">privacy policy</span>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
