import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import Features from '../components/Features';
import FeatureHighlights from '../components/FeatureHighlights';
import AboutSection from '../components/AboutSection';
import ProductCategories from '../components/ProductCategories';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const [showRef, isShowVis] = useScrollReveal();

  return (
    <div className="bg-pure-white min-h-screen text-text-body font-open">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Features />
      <FeatureHighlights />
      <AboutSection />
      <ProductCategories />

      {/* 6. PRODUCT SHOWCASE */}
      <section ref={showRef} className="py-24 bg-pure-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div className={`reveal-item ${isShowVis ? 'is-visible' : ''}`}>
              <h2 className="text-[2.5rem] mb-2">Featured Solutions</h2>
              <p className="body-lg">Highly requested pharmaceutical grades.</p>
            </div>
            <button className="btn-ghost hidden sm:block">View All</button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {[1, 2, 3, 4].map((p, i) => (
              <div key={i} className={`min-w-[280px] md:min-w-[320px] snap-start card hover:bg-brand-light/50 group reveal-item ${isShowVis ? 'is-visible' : ''}`}>
                <span className="label-ui mb-2 block">Ophthalmic</span>
                <h3 className="text-[1.5rem] mb-2 group-hover:text-brand-mid transition-colors">IsoTears {p}X</h3>
                <p className="text-text-muted text-sm mb-6">Preservative-free lubricating eye drops for intensive relief.</p>
                <button className="text-brand-mid font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Request Sample <span className="text-lg">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* 7. BLOG SECTION */}
      <BlogSection />

      {/* 8. CTA SECTION */}
      <CallToAction />

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
