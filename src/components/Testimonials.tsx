"use client";
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
  colSpan: string;
  bgColor: string;
  textColor: string;
  quoteColor: string;
}

export default function Testimonials() {
  const getTestimonialStyle = (idx: number) => {
    const styles = [
      {
        colSpan: "md:col-span-2",
        bgColor: "bg-forest text-cream",
        textColor: "text-cream",
        quoteColor: "text-lime"
      },
      {
        colSpan: "md:col-span-1",
        bgColor: "bg-lime text-forest",
        textColor: "text-forest",
        quoteColor: "text-forest/20"
      },
      {
        colSpan: "md:col-span-1",
        bgColor: "bg-white border border-forest/10 text-forest",
        textColor: "text-forest",
        quoteColor: "text-forest/10"
      },
      {
        colSpan: "md:col-span-2",
        bgColor: "bg-forest/5 text-forest",
        textColor: "text-forest",
        quoteColor: "text-forest/10"
      }
    ];
    return styles[idx % styles.length];
  };

  const testimonials: TestimonialItem[] = CLINIC_CONFIG.testimonials.map((t, idx) => ({
    ...t,
    ...getTestimonialStyle(idx)
  }));

  return (
    <section id="testimonials" className="py-20 px-4 bg-cream/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-lime/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-forest/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tight uppercase">
            What Our Patients <span className="text-lime bg-forest px-4 py-1 rounded-2xl">Say</span>
          </h2>
          <p className="text-forest/70 max-w-2xl mx-auto font-medium">
            Don&apos;t just take our word for it. Read the experiences of our valued patients who trust us with their smiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between ${testimonial.colSpan} ${testimonial.bgColor} transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md`}
            >
              <Quote 
                size={80} 
                className={`absolute top-4 right-4 opacity-20 ${testimonial.quoteColor}`} 
              />
              
              <div className="relative z-10 mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className={testimonial.bgColor.includes('bg-forest') ? 'fill-lime stroke-lime' : 'fill-amber-500 stroke-amber-500'} />
                  ))}
                </div>
                <p className={`text-lg font-medium leading-relaxed ${testimonial.textColor}`}>
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${testimonial.bgColor.includes('bg-forest') ? 'bg-cream text-forest' : 'bg-forest text-cream'}`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`font-bold ${testimonial.textColor}`}>{testimonial.name}</h4>
                  <p className={`text-sm opacity-80 ${testimonial.textColor}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
