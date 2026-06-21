"use client";
import React from 'react';
import { Monitor, Shield, Award, HeartHandshake } from 'lucide-react';

interface StepItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight: boolean;
  offsetY: string;
}

export default function Services() {
  const steps: StepItem[] = [
    {
      icon: <Monitor className="text-white" size={24} />,
      title: "Modern Facilities and Technology",
      desc: "Comfortable, ergonomic dental chairs with premium patient amenities.",
      highlight: false,
      offsetY: "lg:-translate-y-8"
    },
    {
      icon: <Shield className="text-white" size={24} />,
      title: "Comprehensive Services",
      desc: "Pediatric dentistry for younger patients and family orthodontic care.",
      highlight: true,
      offsetY: "lg:translate-y-12"
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Comfortable Environment",
      desc: "A waiting area with refreshments, high-speed wi-fi, and comfy seating.",
      highlight: false,
      offsetY: "lg:-translate-y-8"
    },
    {
      icon: <HeartHandshake className="text-white" size={24} />,
      title: "Community Engagement",
      desc: "Active social media presence to connect with patients and answer dental questions.",
      highlight: false,
      offsetY: "lg:translate-y-12"
    }
  ];

  return (
    <section id="about" className="relative w-full bg-cream py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest tracking-tight uppercase leading-tight font-sans">
            Caring for your smile <br />
            with precision and passion
          </h2>
          <div className="w-20 h-1 bg-lime mx-auto rounded-full" />
        </div>

        {/* Wavy Horizontal Grid Container */}
        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 py-8">
          
          {/* Connector SVG Curve (Hidden on mobile) */}
          <div className="hidden lg:block absolute inset-x-12 top-1/2 -translate-y-1/2 pointer-events-none z-0">
            <svg className="w-full h-32 text-forest/10" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <path 
                d="M0,50 C150,90 250,10 400,50 C550,90 650,10 800,50 C900,70 950,40 1000,50" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeDasharray="8,8"
              />
            </svg>
          </div>

          {/* Cards */}
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={`relative z-10 flex flex-col items-center text-center p-6 transition-all duration-300 ${step.offsetY} ${
                step.highlight 
                  ? 'bg-white rounded-3xl shadow-xl border border-forest/5 p-8 scale-105 ring-1 ring-forest/5' 
                  : 'bg-transparent rounded-3xl hover:bg-white/40 hover:shadow-md'
              }`}
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-14 h-14 bg-forest rounded-2xl shadow-md mb-5">
                {step.icon}
              </div>

              {/* Title & Desc */}
              <h4 className="text-lg font-extrabold text-forest font-sans">{step.title}</h4>
              <p className="text-forest/70 text-xs md:text-sm mt-3 leading-relaxed font-semibold">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

        {/* Spacer to offset grid overflow */}
        <div className="hidden lg:block h-16" />

      </div>
    </section>
  );
}
