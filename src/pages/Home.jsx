import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import Features from '../components/Features';
import FeatureHighlights from '../components/FeatureHighlights';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import InteractiveBentoGallery from '../components/ui/interactive-bento-gallery';

const BENTOGALLERY_ITEMS = [
  {
    id: 1, type: "image", title: "IsoTears Premium", desc: "Preservative-free lubricating eye drops.", price: "$24.99",
    url: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=60", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2, type: "image", title: "CardioProtect XR", desc: "Advanced cardiovascular support formulas.", price: "$45.00",
    url: "https://images.unsplash.com/photo-1584308666744-24d5e893ebfa?w=800&auto=format&fit=crop&q=60", span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3, type: "image", title: "NeuroCalm Advanced", desc: "Soothe your nervous system naturally.", price: "$55.90",
    url: "https://images.unsplash.com/photo-1583947581924-860bda715aef?w=800&auto=format&fit=crop&q=60", span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4, type: "image", title: "DermaHeal Ointment", desc: "Cellular repair for severe dermal trauma.", price: "$32.50",
    url: "https://images.unsplash.com/photo-1616670831662-790432ee3d12?w=800&auto=format&fit=crop&q=60", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5, type: "image", title: "VitaGreens Complex", desc: "Organic Spirulina and Algae extract capsules.", price: "$28.00",
    url: "https://images.unsplash.com/photo-1564619472658-9c59dbe7ef2c?w=800&auto=format&fit=crop&q=60", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6, type: "image", title: "ImmunoMix Pro", desc: "Clinical-grade immune system fortification.", price: "$65.00",
    url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=60", span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7, type: "image", title: "OsteoFlex Care", desc: "Joint and bone density support tablets.", price: "$49.99",
    url: "https://images.unsplash.com/photo-1550572017-edb9b940026e?w=800&auto=format&fit=crop&q=60", span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [showRef, isShowVis] = useScrollReveal();

  return (
    <div className="bg-pure-white min-h-screen text-text-body font-open">
      <Navbar />
      <Hero />
      <StatsStrip />
      {/* 6. PRODUCT SHOWCASE */}
      <section ref={showRef} className="py-24 bg-pure-white overflow-hidden relative">
        <div className="max-w-[85rem] mx-auto px-6">
          <InteractiveBentoGallery 
            mediaItems={BENTOGALLERY_ITEMS}
            title="Featured Solutions"
            description="Explore our highly requested pharmaceutical and wellness grades. Drag to rearrange or click to view product details natively."
            onProductClick={(item) => navigate(`/products/${item.id}`)}
          />
        </div>
      </section>
      
      <Features />
      <FeatureHighlights />
      <AboutSection />

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
