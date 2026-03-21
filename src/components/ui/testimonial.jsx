"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TestimonialCarousel = React.forwardRef(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState(0);

    const handleDragEnd = (event, info) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
          setExitX(0);
        }, 200);
      }
    };

    const handleNext = () => {
      setExitX(-200);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setExitX(0);
      }, 200);
    };

    const handlePrev = () => {
      setExitX(200);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setExitX(0);
      }, 200);
    };

    React.useEffect(() => {
      const timer = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
      <div
        ref={ref}
        className={cn(
          "h-80 w-full flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="relative w-[340px] md:w-[450px] h-[300px]">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length;
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length;

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-3xl cursor-grab active:cursor-grabbing",
                  "bg-pure-white shadow-xl border border-border-default",
                  "dark:bg-card dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 16 : 32,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 16 : 32,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-3 flex justify-between px-6 z-20 pointer-events-none">
                    <span 
                      onClick={handlePrev} 
                      className="text-2xl select-none cursor-pointer text-text-muted hover:text-brand-teal transition-colors pointer-events-auto"
                    >
                      &larr;
                    </span>
                    <span 
                      onClick={handleNext} 
                      className="text-2xl select-none cursor-pointer text-text-muted hover:text-brand-teal transition-colors pointer-events-auto"
                    >
                      &rarr;
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col items-center justify-center gap-5 h-full relative overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-bl-full z-0 opacity-30 pointer-events-none"></div>
                  
                  <div className="text-center relative z-10 flex flex-col items-center">
                    <div className="flex justify-center gap-[2px] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#F5A623] fill-current drop-shadow-sm" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    <h3 className="text-[1.25rem] font-display font-bold text-text-dark mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-teal mb-4">
                      {testimonial.title}
                    </p>
                    <p className="text-center text-sm md:text-[0.9375rem] text-text-body font-medium italic leading-[1.6]">
                      "{testimonial.description}"
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {showDots && (
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "cursor-pointer rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 h-2 bg-brand-teal"
                      : "w-2 h-2 bg-border-default hover:bg-text-muted",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel };
