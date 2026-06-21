"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

export default function ClinicGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = [
    {
      src: '/images/clinic/clinic_exterior.jpg',
      alt: `${CLINIC_CONFIG.displayName} Reception and Team`,
      label: 'Reception & Team',
      caption: 'Welcoming desk and clinical team members',
    },
    {
      src: '/images/clinic/waiting_room.jpg',
      alt: `${CLINIC_CONFIG.displayName} Consultation Room`,
      label: 'Consultation Room',
      caption: 'Clean and comfortable space for consultations',
    },
    {
      src: '/images/clinic/dental_chair.jpg',
      alt: `${CLINIC_CONFIG.displayName} Treatment Area`,
      label: 'Treatment Room',
      caption: 'Modern double-chair setup with state-of-the-art equipment',
    },
    {
      src: '/images/clinic/doctor_treatment.jpg',
      alt: `Treatment in progress at ${CLINIC_CONFIG.displayName}`,
      label: 'Clinical Treatment',
      caption: 'Precise and hygienic treatment by our expert dentists',
    },
    {
      src: '/images/clinic/doctor_patient.jpg',
      alt: 'Dr. Avneet Yadav at consultation desk',
      label: 'Dr. Avneet Yadav',
      caption: 'MDS (RCT, Smile Makeover & Fixed Implant Specialist)',
    },
    {
      src: '/images/clinic/doctor_portrait.jpg',
      alt: 'Dr. R P Yadav at consultation desk',
      label: 'Dr. R P Yadav',
      caption: 'BDS, MDS (Senior Dental Surgeon & Consultant)',
    },
  ];

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const prev = () =>
    setLightbox((l) => (l !== null ? (l - 1 + photos.length) % photos.length : null));
  const next = () =>
    setLightbox((l) => (l !== null ? (l + 1) % photos.length : null));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-forest relative overflow-hidden">
      {/* Decorative bg shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-lime/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime/10 border border-lime/20 rounded-full text-lime text-xs font-bold uppercase tracking-wider">
            <Camera size={12} />
            <span>Inside Our Clinic</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-cream tracking-tight uppercase">
            See Where{' '}
            <span className="text-forest bg-lime px-4 py-1 rounded-2xl">
              We Work
            </span>
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto font-medium text-base md:text-lg">
            A clean, modern, and welcoming environment where every patient feels at home.
            Take a peek inside {CLINIC_CONFIG.displayName}.
          </p>
        </div>

        {/* Photo Grid – editorial layout */}
        <div className="flex flex-col gap-4">

          {/* Row 1: Clinic Reception/Team – full-width hero */}
          <div
            className="group cursor-pointer rounded-3xl overflow-hidden relative shadow-2xl h-[320px] md:h-[420px]"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-lime text-xs font-bold uppercase tracking-widest">{photos[0].label}</span>
              <p className="text-cream text-xl font-bold mt-1">{photos[0].caption}</p>
            </div>
            <div className="absolute top-5 left-5 bg-lime text-forest text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              📍 Our Clinic
            </div>
            <div className="absolute top-5 right-5 bg-cream/20 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera size={16} className="text-cream" />
            </div>
          </div>

          {/* Row 2: Grid of 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-auto sm:h-[340px]">
            {photos.slice(1, 4).map((photo, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-3xl overflow-hidden relative shadow-lg h-[260px] sm:h-full"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-lime text-xs font-bold uppercase tracking-widest">{photo.label}</span>
                  <p className="text-cream font-semibold mt-0.5 text-sm">{photo.caption}</p>
                </div>
                <div className="absolute top-4 right-4 bg-cream/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={13} className="text-cream" />
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Grid of 2 columns (Doctors) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[340px]">
            {photos.slice(4).map((photo, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-3xl overflow-hidden relative shadow-lg h-[260px] sm:h-full"
                onClick={() => openLightbox(i + 4)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-lime text-xs font-bold uppercase tracking-widest">{photo.label}</span>
                  <p className="text-cream font-semibold mt-0.5 text-sm">{photo.caption}</p>
                </div>
                <div className="absolute top-4 right-4 bg-cream/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={13} className="text-cream" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom tag */}
        <p className="text-center text-cream/40 text-sm mt-8 font-medium">
          Click any photo to view full screen
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-forest/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 bg-cream/10 hover:bg-cream/20 text-cream rounded-full p-2 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 bg-cream/10 hover:bg-lime hover:text-forest text-cream rounded-full p-3 transition-all z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-3xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-forest/90 to-transparent">
              <span className="text-lime text-xs font-bold uppercase tracking-widest">{photos[lightbox].label}</span>
              <p className="text-cream font-semibold mt-1">{photos[lightbox].caption}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 bg-cream/10 hover:bg-lime hover:text-forest text-cream rounded-full p-3 transition-all z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === lightbox ? 'bg-lime w-6' : 'bg-cream/30'}`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
