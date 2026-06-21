"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs: FAQItem[] = [
    {
      q: "How often should I visit the dentist?",
      a: "You should visit the dentist every 6 months for a routine check-up and cleaning to maintain good oral health. If you experience a toothache, rinse your mouth with warm water and contact your dentist as soon as possible. Avoid applying heat or taking painkillers directly on the gums."
    },
    {
      q: "What should I do if I have a toothache?",
      a: `If you have a toothache, rinse your mouth with warm water, gently floss to remove any trapped debris, and call our clinic at ${CLINIC_CONFIG.phoneRaw} immediately. Avoid placing painkillers directly on the gums, as this can irritate the tissue.`
    },
    {
      q: "What is teeth whitening, and is it safe?",
      a: "Teeth whitening is a cosmetic treatment using safe active bleaching agents to lighten your natural teeth. When supervised by professional dentists, the procedure is entirely safe and preserves your enamel's structural integrity."
    },
    {
      q: "Do dental cleanings hurt?",
      a: "Standard cleanings are generally comfortable and pain-free. You may experience light vibrations or a scraping sensation. For sensitive teeth, we use mild topical desensitizers to ensure a relaxing visit."
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="w-full bg-[#E1EDEA] py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Image */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest/5 border border-forest/10 rounded-full text-forest text-xs font-bold uppercase tracking-wider">
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest tracking-tight uppercase leading-tight font-sans">
            Trusted Dental Care <br />
            You Can Count On
          </h2>
          <p className="text-forest/75 text-sm md:text-base font-medium leading-relaxed">
            Our friendly team provides personalized dental treatments designed to keep your whole family smiling. Experience modern dentistry with a gentle, caring touch right here in {CLINIC_CONFIG.state}.
          </p>

          <div className="relative w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden border-4 border-white shadow-md">
            <Image 
              src="/images/clinic_room1.png" 
              alt="Modern dental surgery room" 
              fill={true}
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-7 bg-white/40 p-6 md:p-8 rounded-3xl border border-forest/5 shadow-sm space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-forest/10 pb-4 last:border-b-0 last:pb-0"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-forest text-sm md:text-base hover:text-forest-light transition duration-300 cursor-pointer"
                >
                  <span className="font-sans pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-forest p-1 bg-white rounded-lg shadow-sm border border-forest/5">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {/* Answer container */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-60 mt-2 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-forest/80 text-xs md:text-sm leading-relaxed font-semibold bg-white/60 p-4 rounded-2xl border border-white/40">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
