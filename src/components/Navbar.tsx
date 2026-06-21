"use client";
import React from 'react';
import { Phone, Menu, Calendar, Home, ChevronDown, ChevronUp, Sparkles, Star, Images } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

interface WhatsAppIconProps {
  size?: number;
  className?: string;
}

const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

interface NavbarProps {
  onBookClick?: () => void;
  onAdminClick?: () => void;
}

export default function Navbar({ onBookClick, onAdminClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  
  // Track double tap/click timing for mobile-responsive hidden admin portal access
  const lastTapRef = React.useRef<number>(0);
  const handleLogoClick = (e: React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      if (onAdminClick) onAdminClick();
    }
    lastTapRef.current = now;
  };

  const treatmentsCol1: string[] = [
    "Dental Implant",
    "Wisdom Teeth",
    "Cosmetic Dental Bonding",
    "Kids Dentistry",
    "Gum Disease Treatment",
    "Dentures",
    "Mouth Ulcers",
    "Smile Makeover"
  ];

  const treatmentsCol2: string[] = [
    "Root Canal Treatment RCT",
    "Clear Aligners",
    "Laser Dentistry",
    "Dental Crowns And Bridges",
    "Dental Filling",
    "Teeth Whitening",
    "Braces"
  ];

  const navItems = [
    { label: "Home", href: "/", active: true },
    { label: "Treatments", href: "/treatments", hasDropdown: true },
    { label: "Reviews", href: "/#testimonials", icon: "star" },
    { label: "Gallery", href: "/#gallery", icon: "images" },
    { label: "Contacts", href: "/#location-map" }
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-cream/80 backdrop-blur-md border-b border-forest/10 px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            title="Double-click or double-tap to access portal"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-2xl font-black tracking-tight text-forest font-sans italic">
              {CLINIC_CONFIG.name}<span className="text-lime">.</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, idx) => {
              if (item.hasDropdown) {
                return (
                  <div key={idx} className="relative group py-2">
                    <a 
                      href={item.href}
                      className={`flex items-center gap-1 text-[15px] font-semibold transition-all pb-1 ${
                        item.active 
                          ? 'text-[#f97316] border-b-2 border-[#f97316]' 
                          : 'text-[#475569] border-b-2 border-transparent hover:text-[#f97316] group-hover:text-[#f97316]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className="group-hover:hidden transition-transform" />
                      <ChevronUp size={14} className="hidden group-hover:block transition-transform" />
                    </a>

                    {item.label === 'Treatments' && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#f97316] p-6 w-[500px] flex gap-8 relative after:content-[''] after:absolute after:-top-3 after:left-10 after:border-8 after:border-transparent after:border-b-[#f97316]">
                          <div className="flex-1 flex flex-col gap-4">
                            {treatmentsCol1.map((t, i) => (
                              <a 
                                key={i} 
                                href={`/treatments#treatment-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                className="text-[14px] font-semibold text-[#475569] hover:text-[#f97316] transition-colors"
                              >
                                {t}
                              </a>
                            ))}
                          </div>
                          <div className="flex-1 flex flex-col gap-4">
                            {treatmentsCol2.map((t, i) => (
                              <a 
                                key={i} 
                                href={`/treatments#treatment-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                className="text-[14px] font-semibold text-[#475569] hover:text-[#f97316] transition-colors"
                              >
                                {t}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              // Smooth-scroll anchor items (Reviews, Gallery, Contacts)
              return (
                <div key={idx} className="py-2">
                  <a 
                    href={item.href}
                    className={`flex items-center gap-1.5 text-[15px] font-semibold transition-all pb-1 ${
                      item.active 
                        ? 'text-[#f97316] border-b-2 border-[#f97316]' 
                        : 'text-[#475569] border-b-2 border-transparent hover:text-[#f97316]'
                    }`}
                  >
                    {item.icon === 'star' && <Star size={13} className="fill-current opacity-70" />}
                    {item.icon === 'images' && <Images size={13} className="opacity-70" />}
                    {item.label}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Right actions (Call and Book) */}
          <div className="hidden md:flex items-center gap-5">
            <a 
              href={`tel:${CLINIC_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 text-forest hover:text-forest-light transition font-bold text-sm bg-white border border-forest/10 px-4.5 py-2 rounded-2xl shadow-sm"
            >
              <Phone size={16} className="text-lime fill-lime stroke-forest" />
              <span>{CLINIC_CONFIG.phoneRaw}</span>
            </a>
            <button 
              onClick={onBookClick}
              className="cursor-pointer bg-forest hover:bg-forest-light text-lime hover:text-white text-xs font-bold px-5 py-3.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <a 
              href={`tel:${CLINIC_CONFIG.phoneRaw}`} 
              className="flex items-center justify-center p-4 bg-white border border-forest/10 rounded-2xl text-forest hover:bg-forest/5 transition"
              title="Call Clinic"
            >
              <Phone size={16} />
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-4 bg-forest text-lime rounded-2xl transition hover:bg-forest-light cursor-pointer"
            >
              <Menu size={18} />
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white border border-forest/10 rounded-3xl space-y-3 shadow-xl animate-fade-in">
            {navItems.map((item, idx) => (
              <a 
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-forest/80 hover:bg-forest/5 hover:text-forest transition"
              >
                {item.icon === 'star' && <Star size={14} className="fill-current opacity-60" />}
                {item.icon === 'images' && <Images size={14} className="opacity-60" />}
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-forest/5 flex flex-col gap-3">
              <a 
                href={`tel:${CLINIC_CONFIG.phoneRaw}`} 
                className="flex items-center justify-center gap-2 py-4 bg-cream border border-forest/10 text-forest font-bold text-sm rounded-2xl"
              >
                <Phone size={16} />
                <span>Call: {CLINIC_CONFIG.phoneRaw}</span>
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBookClick) onBookClick();
                }}
                className="w-full bg-forest text-lime font-bold text-sm py-4 rounded-2xl hover:bg-forest-light transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Pinned CTA Bar */}
      <div 
        className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-forest/10 p-3 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] flex gap-2.5"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        {/* Call Clinic */}
        <a 
          href={`tel:${CLINIC_CONFIG.phoneRaw}`} 
          className="flex items-center justify-center p-3 bg-cream border border-forest/15 rounded-xl text-forest hover:bg-forest/5 transition flex-1 font-bold text-[11px] gap-1"
        >
          <Phone size={12} className="text-lime fill-lime stroke-forest" />
          <span>Call</span>
        </a>
        
        {/* Treatments */}
        <a 
          href="/treatments"
          className="flex items-center justify-center p-3 bg-cream border border-forest/15 rounded-xl text-forest hover:bg-forest/5 transition flex-[1.2] font-bold text-[11px] gap-1"
        >
          <Sparkles size={12} className="text-lime fill-lime stroke-forest" />
          <span>Treatments</span>
        </a>
        
        {/* Book Appointment */}
        <button 
          onClick={onBookClick}
          className="flex-[1.5] bg-forest text-lime font-black text-[11px] uppercase tracking-wider py-3 rounded-xl hover:bg-forest-light transition flex items-center justify-center gap-1 cursor-pointer shadow-md"
        >
          <Calendar size={12} />
          <span>Book Now</span>
        </button>
      </div>
    </>
  );
}
