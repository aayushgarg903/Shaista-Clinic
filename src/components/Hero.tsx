"use client";
import React from 'react';
import Image from 'next/image';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

interface HeroProps {
  onBookClick?: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-cream py-10 md:py-16 lg:py-24 px-4">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-forest/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Left text column */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest/5 border border-forest/10 rounded-full text-forest text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
            <span>Top-Tier Dental Clinic in {CLINIC_CONFIG.state}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-forest leading-[1.05] font-sans uppercase">
            Trusted Dental Care <br />
            <span className="text-lime bg-forest px-5 py-2.5 rounded-3xl inline-block mt-3">
              For a Brighter Smile
            </span>
          </h1>

          <p className="text-forest/75 text-base md:text-lg max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
            Experience modern, friendly, and pain-free dentistry at {CLINIC_CONFIG.displayName}. Book your token appointment online and get a customized dental plan with the latest technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <button 
              onClick={onBookClick}
              className="w-full sm:w-auto bg-lime hover:bg-lime-dark text-forest font-bold px-8 py-4 rounded-2xl transition shadow-[0_8px_30px_rgba(210,255,58,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-500 stroke-amber-500" />
                ))}
              </div>
              <p className="text-xs text-forest/70 font-semibold leading-none">
                Loved by 1,200+ local patients in {CLINIC_CONFIG.shortAddress} & {CLINIC_CONFIG.state}
              </p>
            </div>
          </div>
        </div>

        {/* Right graphic column */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[350px] md:min-h-[500px]">
          
          {/* Overlapping Backdrop shapes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            {/* Dark Forest Green Shape */}
            <div className="absolute w-[240px] h-[340px] md:w-[320px] md:h-[450px] bg-forest rounded-[120px] transform -rotate-12 translate-x-12 translate-y-6 opacity-95" />
            {/* Lime Yellow Accent Shape */}
            <div className="absolute w-[220px] h-[320px] md:w-[300px] md:h-[420px] bg-lime/90 rounded-[120px] transform rotate-12 -translate-x-12 -translate-y-6" />
          </div>

          {/* Main Portrait image */}
          <div className="relative w-[280px] h-[380px] md:w-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-cream animate-fade-in">
            <Image 
              src="/images/clinic/clinic_staff.jpg" 
              alt={`${CLINIC_CONFIG.displayName} clinic staff`} 
              fill={true}
              priority={true}
              quality={100}
              className="object-cover object-top"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
