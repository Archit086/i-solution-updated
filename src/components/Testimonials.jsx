import { cn } from "../lib/utils"
import { TestimonialCard } from "./ui/testimonial-card"

// Using premium Unsplash medical/professional placeholders as per user request
const testimonials = [
  {
    author: {
      name: "Dr. Sarah Chen",
      handle: "Chief Medical Officer",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" // Female doctor
    },
    text: "I-Solution has transformed our compliance workflow. The speed and accuracy of the automated approvals are unprecedented in the pharma industry."
  },
  {
    author: {
      name: "James Wilson",
      handle: "Supply Chain Director",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" // Professional man
    },
    text: "The integration perfectly handles our distributor pipelines. We've reduced compliance audit times by 60% since migrating to this platform."
  },
  {
    author: {
      name: "Dr. Emily Taylor",
      handle: "Lead Pharmacist",
      avatar: "https://images.unsplash.com/photo-1594824436951-7f126f09c4d4?w=150&h=150&fit=crop&crop=face" // Female professional physician
    },
    text: "Finally, an ecosystem that actually understands pharmaceutical roles! The permissions system is exactly what our clinic needed."
  },
  {
    author: {
      name: "Marcus Rodriguez",
      handle: "Quality Assurance",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face" // Male professional
    },
    text: "Reviewing batches and assigning approvals is now entirely frictionless. The UI is incredibly intuitive for our entire QA team."
  }
]

export default function Testimonials({ 
  title = "Trusted by industry leaders",
  description = "Join thousands of healthcare professionals who are building the future with our ecosystem.",
  className 
}) {
  return (
    <section className={cn(
      "bg-pure-white text-text-dark overflow-hidden",
      "py-16 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-8 sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-6 text-center sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-display font-bold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-body text-text-muted sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row w-full [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] min-w-full">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-64 bg-gradient-to-r from-pure-white sm:block z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-64 bg-gradient-to-l from-pure-white sm:block z-10" />
        </div>
      </div>
    </section>
  )
}
