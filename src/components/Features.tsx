"use client";
import React from 'react';
import { Shield, Clock, Smile, Sparkles } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function Features() {
  const features: FeatureItem[] = [
    {
      icon: <Shield size={24} />,
      title: "Advanced Technology",
      desc: "Using the latest in dental tech for accurate diagnosis and painless treatments."
    },
    {
      icon: <Clock size={24} />,
      title: "No Waiting Times",
      desc: "We respect your time. Token-based appointments mean you walk in and get treated."
    },
    {
      icon: <Smile size={24} />,
      title: "Comfortable Environment",
      desc: "A soothing atmosphere designed to ease anxiety and make you feel at home."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Expert Specialists",
      desc: "Highly qualified dentists with years of experience in various specialties."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-forest relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text & Features */}
          <div className="space-y-10 z-10">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-cream tracking-tight">
                Making Dental Visits <span className="text-lime">Pleasant.</span>
              </h2>
              <p className="text-cream/80 text-lg">
                We've redesigned the dental experience to be as relaxing and efficient as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-lime/10 rounded-xl flex items-center justify-center text-lime">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-cream font-bold mb-2 text-lg">{feature.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interlocked Photos */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Background blur decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime/20 rounded-full blur-[100px]" />
            
            {/* Main Photo 1 */}
            <div className="absolute top-10 left-0 w-[60%] h-[60%] rounded-3xl overflow-hidden border-4 border-forest shadow-2xl z-20 transition-transform hover:-translate-y-2 hover:rotate-2 duration-500">
              <div className="absolute inset-0 bg-cream/20 mix-blend-overlay z-10" />
              <img 
                src="/images/clinic/waiting_room.jpg" 
                alt={`${CLINIC_CONFIG.displayName} bright waiting area`} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Photo 2 */}
            <div className="absolute bottom-10 right-0 w-[65%] h-[55%] rounded-3xl overflow-hidden border-4 border-forest shadow-2xl z-30 transition-transform hover:-translate-y-2 hover:-rotate-2 duration-500">
              <div className="absolute inset-0 bg-lime/10 mix-blend-overlay z-10" />
              <img 
                src="/images/clinic/doctor_patient.jpg" 
                alt={`${CLINIC_CONFIG.doctorName} with a happy young patient`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
