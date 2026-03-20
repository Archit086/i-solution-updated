import { useState, useEffect, useRef } from 'react';

const TABS = ['Tablets', 'Capsules', 'Oral Solutions', 'Topical Oils', 'Compliance Docs'];

const MOCK_DATA = {
  'Tablets': [
    { id: 'tab1', name: 'IsoTears 3X', spec: 'Available in 3 variants', price: '$12.00 - $18.00', stock: 'In Stock', stockColor: 'bg-success-green', badge: 'Fast Acting', badgeColor: 'bg-brand-light text-brand-dark' },
    { id: 'tab2', name: 'NeuroCalm Advanced', spec: '50mg / 100mg', price: '₹4,250.00', stock: 'Limited', stockColor: 'bg-warning-amber', badge: 'Prescription', badgeColor: 'bg-accent-soft text-accent-dark' },
    { id: 'tab3', name: 'CardioProtect Daily', spec: 'Sustained release 24h', price: '₹1,120.00', stock: 'In Stock', stockColor: 'bg-success-green', badge: 'Standard', badgeColor: 'bg-brand-light text-brand-dark' }
  ],
  'Capsules': [
    { id: 'cap1', name: 'ImmunoBoost Pro', spec: 'Enteric coated, 60 cap', price: '₹850.00', stock: 'Out of Stock', stockColor: 'bg-danger-red', badge: 'High Demand', badgeColor: 'bg-accent-soft text-accent-dark' },
    { id: 'cap2', name: 'GastroEase FastAct', spec: 'Liquid filled rapid release', price: '₹640.00', stock: 'In Stock', stockColor: 'bg-success-green', badge: 'New', badgeColor: 'bg-brand-light text-brand-dark' }
  ],
  'Oral Solutions': [],
  'Topical Oils': [
    { id: 'oil1', name: 'DermaHeal Intense', spec: '50ml / 150ml pump', price: '₹1,850.00', stock: 'In Stock', stockColor: 'bg-success-green', badge: 'Clinical', badgeColor: 'bg-brand-light text-brand-dark' }
  ],
  'Compliance Docs': [
    { id: 'doc1', name: 'Q3 2025 Audit Report', spec: 'PDF - 4.2MB', price: 'Free Access', stock: 'Available', stockColor: 'bg-success-green', badge: 'Verified', badgeColor: 'bg-brand-light text-brand-dark' },
    { id: 'doc2', name: 'ISO Certification Bundle', spec: 'ZIP - 12MB', price: 'Free Access', stock: 'Available', stockColor: 'bg-success-green', badge: 'Official', badgeColor: 'bg-brand-light text-brand-dark' }
  ]
};

const CATEGORY_STYLES = {
  'Tablets': { gradient: 'from-[#E8F7F6] to-[#B2DFDB]', icon: '💊' },
  'Capsules': { gradient: 'from-[#FEF3DC] to-[#FFE0B2]', icon: '🧬' },
  'Oral Solutions': { gradient: 'from-[#FFF5F5] to-[#FED7D7]', icon: '💧' },
  'Topical Oils': { gradient: 'from-[#F0FFF4] to-[#C6F6D5]', icon: '🌿' },
  'Compliance Docs': { gradient: 'from-[#F1F5F9] to-[#CBD5E1]', icon: '📑' }
};

export default function ProductCategories() {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [tabStyle, setTabStyle] = useState({ left: 0, width: 0 });
  const [bookmarks, setBookmarks] = useState([]);
  const tabRefs = useRef([]);

  // Load bookmarks on mount
  useEffect(() => {
    const saved = localStorage.getItem('isolution-bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks on change
  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const updated = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      localStorage.setItem('isolution-bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Measure tab underline
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const el = tabRefs.current[activeTab];
      setTabStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  }, [activeTab]);

  const handleTabClick = (index) => {
    if (index === activeTab || isTransitioning) return;
    setSlideDirection(index > activeTab ? 'right' : 'left');
    setIsTransitioning(true);
    
    // Halfway through CSS transition (200ms), swap data
    setTimeout(() => {
      setActiveTab(index);
      setIsTransitioning(false);
    }, 200);
  };

  const activeCategory = TABS[activeTab];
  const activeProducts = MOCK_DATA[activeCategory];
  const { gradient, icon } = CATEGORY_STYLES[activeCategory];

  // Transition classes for the grid wrapper
  let gridTransform = 'translate-x-0 opacity-100';
  if (isTransitioning) {
    gridTransform = slideDirection === 'right' ? '-translate-x-5 opacity-0' : 'translate-x-5 opacity-0';
  }

  return (
    <section className="bg-pure-white w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="font-display font-bold text-[0.72rem] tracking-[0.15em] text-brand-teal uppercase mb-3 block">
            Product Catalogue
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,2.5rem)] text-text-dark leading-[1.2]">
            Browse by Category
          </h2>
        </div>

        {/* TABS COMPONENT */}
        <div className="relative mb-12 flex justify-center w-full">
          <div className="relative flex overflow-x-auto no-scrollbar border-b border-border-default max-w-full">
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                ref={el => tabRefs.current[idx] = el}
                onClick={() => handleTabClick(idx)}
                className={`relative whitespace-nowrap px-6 py-4 font-display font-semibold text-[0.875rem] transition-colors duration-200 z-10 ${
                  activeTab === idx ? 'text-brand-teal' : 'text-text-muted hover:text-text-dark'
                }`}
              >
                {tab}
              </button>
            ))}
            {/* Animated Sliding Underline */}
            <div 
              className="absolute bottom-[-1px] h-[2px] bg-brand-teal transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ left: `${tabStyle.left}px`, width: `${tabStyle.width}px` }}
            ></div>
          </div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className={`transition-all duration-200 ease-out ${gridTransform}`}>
          
          {/* EMPTY STATE */}
          {activeProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-[slideUpFade_400ms_ease-out]">
              <div className="text-brand-teal mb-6 animate-swingFlask origin-bottom">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.527a2 2 0 01-.528 1.345l-4.11 4.522A2.5 2.5 0 007.218 20h9.564a2.5 2.5 0 001.856-4.606l-4.11-4.522A2 2 0 0114 9.527V2"></path>
                  <path d="M8.5 2h7 M10 14h4"></path>
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-text-dark mb-2">
                No products in this category yet
              </h3>
              <p className="font-body text-text-muted text-[0.9375rem]">
                Check back soon as we continuously expand our catalogue.
              </p>
            </div>
          ) : (
            /* PRODUCT GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[slideUpFade_300ms_ease-out]">
              {activeProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-pure-white border border-border-default rounded-[16px] overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(43,168,160,0.12)] hover:border-brand-teal transition-all duration-250 ease-out flex flex-col"
                >
                  {/* Image Area with Gradient & Float Icon */}
                  <div className={`w-full aspect-video relative flex items-center justify-center bg-gradient-to-br ${gradient} transition-colors duration-300 before:absolute before:inset-0 before:bg-black/0 group-hover:before:bg-black/5`}>
                    
                    {/* Floating SVG/Emoji */}
                    <div className="text-[3rem] filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300 animate-[floatPill_4s_ease-in-out_infinite]">
                      {icon}
                    </div>

                    {/* Badge */}
                    <div className={`absolute top-4 left-4 font-display font-bold text-[0.65rem] uppercase tracking-wider px-3 py-1 rounded-full ${product.badgeColor}`}>
                      {product.badge}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-display font-bold text-[1rem] text-text-dark mb-1 group-hover:text-brand-teal transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-body text-[0.8125rem] text-text-muted mb-4">
                      {product.spec}
                    </p>

                    <div className="mt-auto flex items-end justify-between">
                      <div className="font-display font-extrabold text-[0.9375rem] text-brand-teal">
                        {product.price}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${product.stockColor}`}></div>
                        <span className="font-body font-semibold text-[0.7rem] text-text-muted uppercase tracking-wider">
                          {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-4 border-t border-border-default flex justify-between items-center group-hover:bg-brand-light/30 transition-colors">
                    <span className="font-display font-semibold text-[0.875rem] text-brand-teal flex items-center gap-1">
                      View Details <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </span>
                    
                    {/* Bookmark Interaction */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(product.id); }}
                      className="text-text-muted hover:text-accent-amber transition-colors outline-none focus:outline-none"
                      aria-label="Save product"
                    >
                      {bookmarks.includes(product.id) ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulseScale_300ms_ease-out]">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      )}
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* BOTTOM CTA & COUNTER */}
        <div className="mt-16 flex flex-col items-center">
          <button className="bg-accent-amber hover:bg-accent-dark text-text-dark font-display font-bold text-[0.9375rem] px-8 py-3.5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5">
            View All Products →
          </button>
          <div className="mt-4 font-body font-semibold text-[0.8rem] text-text-muted">
            Showing <span className="text-text-dark">{activeProducts.length}</span> of <span className="text-text-dark">47</span> products
          </div>
        </div>

      </div>
    </section>
  );
}
