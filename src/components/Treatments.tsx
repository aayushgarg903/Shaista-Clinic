"use client";
import React from 'react';
import { 
  Shield, Zap, Sparkles, Smile, Activity, Heart, 
  Stethoscope, CheckCircle2, Star, Plus, ArrowRight,
  Calendar, Monitor
} from 'lucide-react';

interface TreatmentCard {
  name: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  desc: string;
}

const treatments: TreatmentCard[] = [
  { name: "Teeth whitening", icon: Sparkles, desc: "Professional brightening for a dazzling, stain-free smile." },
  { name: "Bonding", icon: Star, desc: "Seamlessly repair chips, cracks, and gaps in teeth." },
  { name: "Check-ups", icon: Stethoscope, desc: "Comprehensive diagnostic check-ups to track oral health." },
  { name: "Cosmetic procedures", icon: Sparkles, desc: "Custom aesthetic treatments to enhance your smile." },
  { name: "Dental implants", icon: Shield, desc: "Permanent, natural-feeling tooth replacements." },
  { name: "Dentures & bridges", icon: Smile, desc: "Restore complete mouth function and aesthetic." },
  { name: "Emergency care", icon: Activity, desc: "Urgent dental treatment for pain relief and trauma." },
  { name: "Extractions", icon: Plus, desc: "Safe, comfortable, and painless tooth removal." },
  { name: "Fillings and sealants", icon: CheckCircle2, desc: "Durable composite restorations to stop decay." },
  { name: "Laser dentistry", icon: Zap, desc: "Modern, high-precision, pain-free laser solutions." },
  { name: "Mouth guards", icon: Shield, desc: "Custom dental guards for sports and teeth grinding." },
  { name: "Online dentist booking", icon: Calendar, desc: "Reserve priority consultation slots from home." },
  { name: "Oral surgery", icon: Activity, desc: "Surgical corrections and advanced extractions." },
  { name: "Paediatrics", icon: Heart, desc: "Gentle, fun, and warm pediatric care for kids." },
  { name: "Root canals", icon: Activity, desc: "Relieve dental pain and save infected teeth." },
  { name: "Teeth cleaning", icon: Sparkles, desc: "Deep scaling and polishing for optimal hygiene." },
  { name: "Teeth reshaping", icon: Star, desc: "Subtle contouring to align and balance teeth." },
  { name: "Veneers & crowns", icon: Shield, desc: "Premium shells and caps for restoration." },
  { name: "X-ray", icon: Monitor, desc: "High-resolution digital imaging for diagnosis." },
  { name: "Treatment of Black Gums", icon: Heart, desc: "Gingival depigmentation for natural pink gums." },
  { name: "Treatment of bleeding gums", icon: Activity, desc: "Cure gum inflammation and prevent periodontitis." },
  { name: "Treatment of gummy smile", icon: Smile, desc: "Aesthetic contouring to balance gum display." },
  { name: "Treatment of gum recession", icon: Shield, desc: "Protect exposed roots and restore gum tissue." }
];

export default function Treatments() {
  return (
    <section id="treatments" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-forest uppercase tracking-tight">
            Comprehensive <span className="text-lime">Treatments</span>
          </h2>
          <p className="text-forest/70 font-semibold text-lg">
            State-of-the-art dental care tailored to your unique needs. We provide a full range of services under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div 
                key={idx} 
                id={`treatment-${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="group p-8 rounded-3xl border border-forest/10 hover:border-forest bg-forest/5 hover:bg-forest transition-all duration-500 cursor-pointer flex flex-col justify-between items-start h-full shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-forest group-hover:text-lime shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-extrabold text-forest group-hover:text-white transition-colors duration-300">
                    {t.name}
                  </h3>
                  <p className="text-sm font-semibold text-forest/70 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-forest group-hover:text-lime font-bold text-sm transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
