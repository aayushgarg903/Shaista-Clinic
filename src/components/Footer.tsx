import React from 'react';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

export default function Footer() {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>

      <footer className="bg-forest text-cream pt-20 pb-10 px-4 border-t-8 border-lime relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cream/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <span className="text-3xl font-black tracking-tight text-cream font-sans italic">
                {CLINIC_CONFIG.name}<span className="text-lime">.</span>
              </span>
              <p className="text-cream/70 text-sm leading-relaxed max-w-xs">
                {CLINIC_CONFIG.tagline} in {CLINIC_CONFIG.shortAddress}, {CLINIC_CONFIG.state}. We blend advanced technology with a compassionate approach to give you the smile you deserve.
              </p>
              <div className="flex gap-4">
                <a href={CLINIC_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center font-bold text-xs hover:bg-lime hover:text-forest transition-colors">
                  IG
                </a>
                <a href={CLINIC_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center font-bold text-xs hover:bg-lime hover:text-forest transition-colors">
                  FB
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-lime">Quick Links</h4>
              <ul className="space-y-3">
                {[
                { label: 'Home', href: '/' },
                { label: 'About Clinic', href: '/#about' },
                { label: 'Our Treatments', href: '/treatments' },
                { label: 'Gallery', href: '/#gallery' },
                { label: 'Knowledge Hub', href: '/#knowledge-hub' },
              ].map((item, i) => (
                  <li key={i}>
                    <a href={item.href} className="text-cream/70 hover:text-lime transition-colors text-sm font-medium">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-lime">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-lime flex-shrink-0 mt-1" />
                  <span className="text-cream/70 text-sm leading-relaxed">
                    {CLINIC_CONFIG.address}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-lime flex-shrink-0" />
                  <a href={`tel:${CLINIC_CONFIG.phoneRaw}`} className="text-cream/70 hover:text-lime transition-colors text-sm font-medium">
                    {CLINIC_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-lime flex-shrink-0" />
                  <a href={`mailto:${CLINIC_CONFIG.email}`} className="text-cream/70 hover:text-lime transition-colors text-sm font-medium">
                    {CLINIC_CONFIG.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Working Hours & Maps embed */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold mb-4 text-lime">Clinic Hours</h4>
                <ul className="space-y-2 text-sm text-cream/70">
                  <li className="flex justify-between"><span>Mon - Sat:</span> <span>{CLINIC_CONFIG.operatingHours.weekdayShort}</span></li>
                  <li className="flex justify-between"><span>Sunday:</span> <span className={CLINIC_CONFIG.operatingHours.sundayShort === 'Closed' ? 'text-white/40' : 'text-lime font-bold'}>{CLINIC_CONFIG.operatingHours.sundayShort}</span></li>
                </ul>
              </div>
              
              {/* Google Maps Live Embed */}
              <div className="w-full h-48 bg-cream/10 rounded-2xl overflow-hidden relative shadow-inner border border-white/10">
                <iframe
                  title={CLINIC_CONFIG.googleMapsTitle}
                  src={CLINIC_CONFIG.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-cream/10 text-center text-sm text-cream/50 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} {CLINIC_CONFIG.displayName}. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/#faq" className="hover:text-cream transition-colors">FAQ</a>
              <a href={`tel:${CLINIC_CONFIG.phoneRaw}`} className="hover:text-cream transition-colors">Call Us</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
