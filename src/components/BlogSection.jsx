import { useState, useEffect, useRef } from 'react';

const TICKER_ITEMS = [
  "📦 Stock validation module updated",
  "🛡 Compliance module v2.1 released",
  "🔐 JWT refresh logic hardened",
  "📊 Recharts dashboard upgraded",
  "🚚 Distributor bulk order flow improved"
];

const BLOG_POSTS = [
  {
    id: 1,
    badge: "Product Update",
    date: "15 Mar 2026",
    readTime: "⏱ 3 min read",
    title: "I-Solution 3.0: Unified Pharmaceutical Compliance is Here",
    excerpt: "The massive 3.0 update completely overhauls the compliance dashboard, allowing authorities to approve FDA and ISO documentation directly within standard product workflows rather than relying on external PDFs.",
    authorName: "Ananya Mehta",
    authorInitials: "AM",
    gradient: "from-[#E8F7F6] to-[#B2DFDB]",
    iconColor: "text-brand-teal",
    icon: "📦"
  },
  {
    id: 2,
    badge: "Security",
    date: "02 Mar 2026",
    readTime: "⏱ 5 min read",
    title: "Hardening JWT Authentication for Enterprise Deployments",
    excerpt: "Security is non-negotiable in pharmaceutical logistics. We detail the engineering behind our new stateless refresh logic and why role-based boundary extraction is now strictly enforced at the Edge.",
    authorName: "Security Team",
    authorInitials: "ST",
    gradient: "from-[#FEF3DC] to-[#FFE0B2]",
    iconColor: "text-accent-dark",
    icon: "🔐"
  },
  {
    id: 3,
    badge: "Feature",
    date: "25 Feb 2026",
    readTime: "⏱ 4 min read",
    title: "Real-Time Stock Validation for Distributors",
    excerpt: "No more pending orders dying in the warehouse due to ghost inventory. Explore how the new React Context + Django WebSocket architecture prevents distributors from over-ordering critical supplies.",
    authorName: "Product Hub",
    authorInitials: "PH",
    gradient: "from-[#F0F4FF] to-[#C7D2FE]",
    iconColor: "text-[#4F46E5]",
    icon: "📊"
  }
];

export default function BlogSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col bg-pure-white overflow-hidden">
      
      {/* 1. TICKER BAR */}
      <div className="w-full bg-[#E8F7F6] border-y border-[#B2DFDB] py-3 flex items-center overflow-hidden">
        
        {/* Fixed Left Label */}
        <div className="bg-[#E8F7F6] z-10 pl-6 pr-4 flex shrink-0 items-center border-r border-[#B2DFDB]/50">
          <div className="bg-brand-teal text-pure-white font-display font-bold text-[0.65rem] px-3 py-1 rounded-sm uppercase tracking-wider whitespace-nowrap">
            Latest Updates
          </div>
        </div>

        {/* Scrolling Infinite Container */}
        <div className="flex overflow-hidden relative w-full items-center">
          <div className="animate-marquee whitespace-nowrap flex shrink-0 items-center">
            {/* Array mapped twice for seamless infinite loop */}
            {[1, 2].map((group) => (
              <div key={group} className="flex shrink-0 items-center pr-12">
                {TICKER_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="font-body font-semibold text-[0.8125rem] text-brand-dark">
                      {item}
                    </span>
                    {i !== TICKER_ITEMS.length - 1 && (
                      <span className="mx-6 text-brand-teal/40 font-black">·</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. BLOG CARDS SECTION */}
      <section ref={sectionRef} className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-display font-bold text-[0.72rem] tracking-widest text-brand-teal uppercase mb-3 block">
                Platform Updates
              </span>
              <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,2.5rem)] text-text-dark leading-[1.2]">
                What&apos;s New in I-Solution
              </h2>
            </div>
            
            <button className="text-accent-amber font-display font-bold text-[0.9375rem] hover:text-accent-dark transition-colors flex items-center gap-2 group">
              View All Updates
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <article 
                key={post.id}
                className="group bg-pure-white border border-border-default rounded-[16px] flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-teal hover:shadow-[0_12px_32px_rgba(43,168,160,0.15)]"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `all 600ms cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`
                }}
              >
                {/* Image Area */}
                <div className={`relative w-full aspect-video bg-gradient-to-br ${post.gradient} rounded-t-[15px] flex items-center justify-center overflow-visible`}>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-t-[15px]"></div>
                  
                  {/* Icon */}
                  <div className={`text-[3.5rem] filter drop-shadow-sm transform transition-transform duration-300 group-hover:scale-110 ${post.iconColor}`}>
                    {post.icon}
                  </div>

                  {/* Absolute Badge */}
                  <div className="absolute top-4 right-4 bg-pure-white/80 backdrop-blur-md border border-border-default font-display font-bold text-[0.65rem] uppercase tracking-wider px-3 py-1 rounded-full text-text-dark">
                    {post.badge}
                  </div>

                  {/* Absolute Overlapping Date Chip */}
                  <div className="absolute -bottom-[14px] left-[1.25rem] bg-pure-white border border-border-default rounded-lg px-4 py-1.5 shadow-sm group-hover:border-brand-teal transition-colors duration-300 z-10">
                    <span className="font-display font-bold text-[0.75rem] text-text-muted transition-colors group-hover:text-brand-teal">
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-8 flex flex-col grow">
                  <div className="font-body text-[0.75rem] text-text-muted mb-3 flex items-center gap-1.5">
                    {post.readTime}
                  </div>
                  
                  <h3 className="font-display font-black text-[1.0625rem] text-text-dark leading-snug mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="font-body text-[0.875rem] text-text-body line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer Row */}
                  <div className="mt-auto block border-t border-border-default pt-4 flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center font-display font-bold text-[0.7rem] text-brand-dark">
                        {post.authorInitials}
                      </div>
                      <span className="font-display font-bold text-[0.8125rem] text-text-dark">
                        {post.authorName}
                      </span>
                    </div>

                    {/* Read More */}
                    <div className="font-display font-bold text-[0.8125rem] text-brand-teal flex items-center gap-1">
                      Read More
                      <span className="transform transition-transform group-hover:translate-x-1 font-black">→</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
