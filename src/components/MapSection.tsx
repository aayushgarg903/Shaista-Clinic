"use client";
import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CLINIC_CONFIG } from '@/config/clinic';

export default function MapSection() {
  const router = useRouter();

  return (
    <section id="location-map" className="py-20 px-4 bg-cream/35 border-t border-forest/5 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-forest/5 border border-forest/10 rounded-full text-forest text-xs font-black uppercase tracking-wider">
            <span>Our Location</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest tracking-tight uppercase leading-tight font-sans">
            Find Us In <span className="text-lime bg-forest px-4 py-1 rounded-2xl">{CLINIC_CONFIG.shortAddress.split(',')[0]}</span>
          </h2>
          <p className="text-forest/70 font-semibold text-sm md:text-base">
            Visit our state-of-the-art dental clinic. Find operating hours, contact info, and directions below.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Column: Clinic Mechanics & Contact Info */}
          <div className="lg:col-span-5 bg-forest text-cream p-8 md:p-10 rounded-[32px] shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden border border-white/5">
            {/* Background blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-lime/10 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
                {CLINIC_CONFIG.displayName}
              </h3>
              <p className="text-cream/80 text-sm leading-relaxed font-medium">
                Located in {CLINIC_CONFIG.shortAddress}. Our clinic provides patient parking and is highly accessible by public transit and local routes.
              </p>
              
              <div className="w-12 h-1 bg-lime rounded-full" />
            </div>

            {/* Mechanics List */}
            <div className="space-y-6 relative z-10 font-semibold">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0 border border-white/10">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-lime font-black tracking-wider">Address</h4>
                  <p className="text-sm mt-0.5 leading-relaxed text-white">
                    {CLINIC_CONFIG.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0 border border-white/10">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-lime font-black tracking-wider">Phone & Contact</h4>
                  <a href={`tel:${CLINIC_CONFIG.phoneRaw}`} className="text-sm mt-0.5 text-white hover:text-lime transition">
                    {CLINIC_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0 border border-white/10">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[10px] uppercase text-lime font-black tracking-wider">Operational Hours</h4>
                  <div className="text-xs mt-1 text-cream/90 space-y-1">
                    <p className="flex justify-between max-w-[200px]"><span>Mon - Sat:</span> <span className="text-white font-bold">{CLINIC_CONFIG.operatingHours.weekdayShort}</span></p>
                    <p className="flex justify-between max-w-[200px]"><span>Sunday:</span> <span className={CLINIC_CONFIG.operatingHours.sundayShort === 'Closed' ? 'text-white/60 font-medium' : 'text-lime font-black'}>{CLINIC_CONFIG.operatingHours.sundayShort}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 relative z-10 flex flex-col gap-3">
              <a
                href={CLINIC_CONFIG.googleMapsDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-bold py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 text-sm"
              >
                <MapPin size={16} className="text-lime" />
                <span>Get Directions</span>
              </a>
              <button
                onClick={() => router.push('/booking')}
                className="w-full bg-lime hover:bg-lime-dark text-forest hover:text-forest-dark font-black py-4 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Calendar size={18} />
                <span>BOOK YOUR PRIORITY SLOT</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Embed (100% width, responsive) */}
          <div className="lg:col-span-7 flex flex-col h-[400px] sm:h-[450px] lg:h-auto min-h-[350px]">
            <div className="w-full h-full bg-white p-3 rounded-[32px] border border-forest/10 shadow-xl overflow-hidden flex flex-col">
              <iframe
                title={CLINIC_CONFIG.googleMapsTitle}
                src={CLINIC_CONFIG.googleMapsEmbedUrl}
                className="w-full h-full flex-1 rounded-[24px] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
