import { TestimonialCarousel } from "@/components/ui/testimonial";

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    title: "Medical Director, PrimeCare Hospital",
    description: "I-Solution has been instrumental in supplying top-quality pharmaceutical products. Their timely deliveries are highly commendable."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    title: "Nutrition Consultant",
    description: "Their nutraceutical range has helped us offer better wellness solutions to our patients. Highly reliable and safe formulations."
  },
  {
    id: 3,
    name: "Michael T.",
    title: "Procurement, Central Supplies",
    description: "We trust I-Solution for all our surgical and ayurvedic product needs. The quality assurance and packaging are absolutely top-notch."
  },
  {
    id: 4,
    name: "Rahul Desai",
    title: "Operations, Zenith Healthcare",
    description: "Working with I-Solution has strengthened our entire supply chain. Their customer service and regulatory support are excellent."
  },
  {
    id: 5,
    name: "Dr. Elena Rostova",
    title: "CEO, Global Medical Partners",
    description: "Their strict commitment to international distribution standards gave us complete confidence in building a long-term partnership."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 w-full overflow-hidden bg-gradient-to-b from-off-white to-pure-white border-t border-border-default">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-light/20 border border-brand-teal/30 text-brand-teal text-xs font-bold tracking-widest uppercase mb-4">
            Global Trust
          </span>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,4vw,3.5rem)] text-text-dark leading-[1.2] mb-4">
            Trusted by the Best
          </h2>
          <p className="text-text-body max-w-2xl mx-auto text-lg">
            Hear from industry leaders and medical professionals who rely on our pharmaceutical excellence daily.
          </p>
        </div>

        <div className="mt-12 pb-12 flex justify-center w-full">
          <TestimonialCarousel 
            testimonials={TESTIMONIAL_DATA}
            className="max-w-4xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
