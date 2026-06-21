"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { MapPin, Phone, Mail, Calendar, Compass, Car, Train, Navigation } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

export default function DirectionsPage() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar 
        onBookClick={() => router.push('/booking')} 
        onAdminClick={() => setIsAdminOpen(true)} 
      />
      
      <main className="flex-1 pt-24">
        {/* Header Hero Section */}
        <section className="bg-forest py-16 md:py-20 px-4 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-lime text-xs font-bold uppercase tracking-wider">
              <Compass size={14} className="animate-spin-slow" />
              <span>Visit Our Clinic</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-sans">
              Directions & <span className="text-lime">Location</span>
            </h1>
            <p className="text-base md:text-lg text-cream/85 max-w-xl mx-auto font-medium">
              We are conveniently located in {CLINIC_CONFIG.shortAddress}. Find details on parking, transit routes, and interactive maps below.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left Side: Details & Directions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-forest/10 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-forest uppercase tracking-tight font-sans">
                Clinic Details
              </h2>
              
              <div className="space-y-4 font-medium text-forest/80">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-forest/50 font-bold tracking-wider">Address</h4>
                    <p className="text-sm mt-0.5 text-forest leading-relaxed">
                      {CLINIC_CONFIG.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-forest/50 font-bold tracking-wider">Phone Number</h4>
                    <a href={`tel:${CLINIC_CONFIG.phoneRaw}`} className="text-sm mt-0.5 text-forest hover:text-lime-dark transition-colors inline-block">
                      {CLINIC_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase text-forest/50 font-bold tracking-wider">Email Address</h4>
                    <a href={`mailto:${CLINIC_CONFIG.email}`} className="text-sm mt-0.5 text-forest hover:text-lime-dark transition-colors inline-block">
                      {CLINIC_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-forest/5">
                <button
                  onClick={() => router.push('/booking')}
                  className="w-full bg-lime hover:bg-forest hover:text-lime text-forest font-bold py-4 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <Calendar size={18} />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>

            {/* Travel Guide */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-forest uppercase tracking-wider font-sans">
                How to Reach Us
              </h3>

              <div className="space-y-4">
                {/* Route 1: Car */}
                <div className="bg-white p-5 rounded-2xl border border-forest/5 flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center text-forest flex-shrink-0">
                    <Car size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-forest text-sm uppercase">By Car / Driving</h4>
                    <p className="text-xs text-forest/70 font-medium leading-relaxed">
                      {CLINIC_CONFIG.features.parking}
                    </p>
                  </div>
                </div>

                {/* Route 2: Bus */}
                <div className="bg-white p-5 rounded-2xl border border-forest/5 flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center text-forest flex-shrink-0">
                    <Navigation size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-forest text-sm uppercase">By Bus</h4>
                    <p className="text-xs text-forest/70 font-medium leading-relaxed">
                      The nearest bus stop is at the Medical College Chowk (Delhi Road), which is only a 3-minute walk from the clinic&apos;s main entrance.
                    </p>
                  </div>
                </div>

                {/* Route 3: Train */}
                <div className="bg-white p-5 rounded-2xl border border-forest/5 flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime/10 flex items-center justify-center text-forest flex-shrink-0">
                    <Train size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-forest text-sm uppercase">By Train</h4>
                    <p className="text-xs text-forest/70 font-medium leading-relaxed">
                      {CLINIC_CONFIG.features.railwayDistance}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Map iframe */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[400px] lg:min-h-[550px]">
            <div className="bg-white p-3 rounded-3xl border border-forest/10 shadow-sm flex-1 flex flex-col overflow-hidden relative">
              <iframe
                title={CLINIC_CONFIG.googleMapsTitle}
                src={CLINIC_CONFIG.googleMapsEmbedUrl}
                className="w-full h-full flex-1 rounded-2xl border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {isAdminOpen && (
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
