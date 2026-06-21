"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ClinicGallery from '@/components/ClinicGallery';
import Testimonials from '@/components/Testimonials';
import KnowledgeHub from '@/components/KnowledgeHub';
import MapSection from '@/components/MapSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';

export default function Home() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        onBookClick={() => router.push('/booking')} 
        onAdminClick={() => setIsAdminOpen(true)} 
      />
      <main className="flex-1">
        <Hero onBookClick={() => router.push('/booking')} />
        <Services />
        <Features />
        <BeforeAfterSlider />
        <ClinicGallery />
        <Testimonials />
        <KnowledgeHub />
        <MapSection />
        <FAQ />
      </main>
      <Footer />
      
      {isAdminOpen && (
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

