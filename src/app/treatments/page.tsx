"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';

interface TreatmentItem {
  id: string;
  name: string;
  image: string;
  desc: string;
}

const treatmentsData: TreatmentItem[] = [
  { 
    id: "teeth-whitening",
    name: "Teeth whitening", 
    image: "/images/treatments/cosmetic.png",
    desc: "Professional brightening for a dazzling, stain-free smile. Erase years of stains and discoloration with our safe, fast, and highly effective professional teeth whitening treatments." 
  },
  { 
    id: "bonding",
    name: "Bonding", 
    image: "/images/treatments/cosmetic.png",
    desc: "Seamlessly repair chips, cracks, and gaps in teeth. Dental bonding uses a tooth-colored resin to easily fix minor imperfections, restoring the natural appearance of your teeth in just one visit." 
  },
  { 
    id: "check-ups",
    name: "Check-ups", 
    image: "/images/treatments/implant.png",
    desc: "Comprehensive diagnostic check-ups to track oral health. Regular check-ups allow us to monitor your dental wellness, catch issues early, and keep your teeth and gums in excellent condition." 
  },
  { 
    id: "cosmetic-procedures",
    name: "Cosmetic procedures", 
    image: "/images/treatments/cosmetic.png",
    desc: "Custom aesthetic treatments to enhance your smile. From minor adjustments to full smile upgrades, our cosmetic dentistry aligns and beautifies your teeth for maximum confidence." 
  },
  { 
    id: "dental-implants",
    name: "Dental implants", 
    image: "/images/treatments/implant.png",
    desc: "Permanent, natural-feeling tooth replacements. Dental implants are a long-term solution for missing teeth, providing the look, feel, and function of natural teeth while preserving jawbone health." 
  },
  { 
    id: "dentures-bridges",
    name: "Dentures & bridges", 
    image: "/images/treatments/implant.png",
    desc: "Restore complete mouth function and aesthetic. Reclaim your smile and ability to chew properly with our comfortable, custom-designed complete and partial dentures or bridges." 
  },
  { 
    id: "emergency-care",
    name: "Emergency care", 
    image: "/images/treatments/implant.png",
    desc: "Urgent dental treatment for pain relief and trauma. We provide rapid-response emergency dental services for severe toothaches, dental fractures, or accidental trauma." 
  },
  { 
    id: "extractions",
    name: "Extractions", 
    image: "/images/treatments/implant.png",
    desc: "Safe, comfortable, and painless tooth removal. We provide gentle wisdom tooth removal and other necessary extractions to prevent crowding, infection, or impaction." 
  },
  { 
    id: "fillings-sealants",
    name: "Fillings and sealants", 
    image: "/images/treatments/cosmetic.png",
    desc: "Durable composite restorations to stop decay. Our tooth-colored composite fillings treat decay and cavities while seamlessly blending with the natural shade of your teeth." 
  },
  { 
    id: "laser-dentistry",
    name: "Laser dentistry", 
    image: "/images/treatments/implant.png",
    desc: "Modern, high-precision, pain-free laser solutions. Utilizing state-of-the-art laser technology, we offer minimally invasive treatments with faster healing times and reduced discomfort." 
  },
  { 
    id: "mouth-guards",
    name: "Mouth guards", 
    image: "/images/treatments/aligners.png",
    desc: "Custom dental guards for sports and teeth grinding. Protect your teeth from athletic injury or nocturnal grinding with our high-durability, custom-fitted guards." 
  },
  { 
    id: "online-dentist-booking",
    name: "Online dentist booking", 
    image: "/images/treatments/cosmetic.png",
    desc: "Reserve priority consultation slots from home. Quickly book and secure your priority timing slot on our portal, reducing waiting times when you visit." 
  },
  { 
    id: "oral-surgery",
    name: "Oral surgery", 
    image: "/images/treatments/implant.png",
    desc: "Surgical corrections and advanced extractions. Expert surgical treatments including wisdom teeth impactions, bone grafting, and other corrective oral surgeries." 
  },
  { 
    id: "paediatrics",
    name: "Paediatrics", 
    image: "/images/treatments/pediatric.png",
    desc: "Gentle, fun, and warm pediatric care for kids. Our children's dentistry focuses on preventative care and creating a positive, stress-free environment for early dental experiences." 
  },
  { 
    id: "root-canals",
    name: "Root canals", 
    image: "/images/treatments/cosmetic.png",
    desc: "Relieve dental pain and save infected teeth. Root canal therapy is a highly effective way to treat infected or inflamed dental pulp, preventing tooth loss and restoring oral health." 
  },
  { 
    id: "teeth-cleaning",
    name: "Teeth cleaning", 
    image: "/images/treatments/cosmetic.png",
    desc: "Deep scaling and polishing for optimal hygiene. Remove built-up plaque, tartar, and surface stains to keep your breath fresh and prevent gum disease." 
  },
  { 
    id: "teeth-reshaping",
    name: "Teeth reshaping", 
    image: "/images/treatments/cosmetic.png",
    desc: "Subtle contouring to align and balance teeth. Contour minor tooth discrepancies and uneven edges to create a perfectly balanced, symmetrical dental aesthetic." 
  },
  { 
    id: "veneers-crowns",
    name: "Veneers & crowns", 
    image: "/images/treatments/implant.png",
    desc: "Premium shells and caps for restoration. Enhance the shape, size, strength, and overall color of your teeth with custom porcelain veneers or crowns." 
  },
  { 
    id: "x-ray",
    name: "X-ray", 
    image: "/images/treatments/implant.png",
    desc: "High-resolution digital imaging for diagnosis. Safe, low-radiation digital radiography helps us locate hidden decay, bone structure issues, and root infections." 
  },
  { 
    id: "treatment-of-black-gums",
    name: "Treatment of Black Gums", 
    image: "/images/treatments/cosmetic.png",
    desc: "Gingival depigmentation for natural pink gums. Safely and comfortably remove dark pigmentation spots on gums using advanced dental procedures." 
  },
  { 
    id: "treatment-of-bleeding-gums",
    name: "Treatment of bleeding gums", 
    image: "/images/treatments/cosmetic.png",
    desc: "Cure gum inflammation and prevent periodontitis. We offer specialized scaling, root planing, and therapies to eliminate bleeding gums and restore tissue health." 
  },
  { 
    id: "treatment-of-gummy-smile",
    name: "Treatment of gummy smile", 
    image: "/images/treatments/cosmetic.png",
    desc: "Aesthetic contouring to balance gum display. Reshape and level excessive gum tissue line to expose more of your natural teeth for a balanced smile ratio." 
  },
  { 
    id: "treatment-of-gum-recession",
    name: "Treatment of gum recession", 
    image: "/images/treatments/implant.png",
    desc: "Protect exposed roots and restore gum tissue. Comprehensive therapies to treat receding gums, reduce sensitivity, and protect underlying tooth structure." 
  }
];

export default function TreatmentsPage() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar 
        onBookClick={() => router.push('/booking')} 
        onAdminClick={() => setIsAdminOpen(true)} 
      />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-forest pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-96 h-96 bg-lime rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
              Our <span className="text-lime">Treatments</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto">
              Discover our comprehensive range of premium dental services, uniquely tailored to bring out your best and brightest smile.
            </p>
          </div>
        </section>

        {/* Treatments List */}
        <section className="py-20 px-4 max-w-6xl mx-auto space-y-24">
          {treatmentsData.map((treatment, index) => (
            <div 
              key={treatment.id} 
              id={`treatment-${treatment.id}`}
              className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] group">
                <Image 
                  src={treatment.image} 
                  alt={treatment.name} 
                  fill={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-forest/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/5 text-forest font-bold text-xs rounded-full uppercase tracking-wider">
                  <ChevronRight size={14} className="text-lime" />
                  Service
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-forest">{treatment.name}</h2>
                <p className="text-lg text-forest/70 font-medium leading-relaxed">
                  {treatment.desc}
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => router.push('/booking')}
                    className="flex items-center gap-2 bg-forest hover:bg-forest-light text-lime font-bold px-6 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Calendar size={18} />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      {isAdminOpen && (
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
