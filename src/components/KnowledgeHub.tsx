"use client";
import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface MythItem {
  myth: string;
  fact: string;
}

export default function KnowledgeHub() {
  const [activeTab, setActiveTab] = useState<string>('myths');

  const myths: MythItem[] = [
    { myth: "Brushing harder cleans better.", fact: "Brushing too hard can damage gums and enamel. Use a soft brush and gentle strokes." },
    { myth: "Sugar is the only cause of cavities.", fact: "Carbohydrates and acidic foods also contribute significantly to tooth decay." },
    { myth: "Flossing isn't really necessary.", fact: "Flossing removes plaque between teeth where a brush can't reach, preventing gum disease." },
  ];

  const tips: string[] = [
    "Brush twice a day for two minutes each time.",
    "Replace your toothbrush every 3-4 months.",
    "Drink plenty of water to wash away food particles.",
    "Visit your dentist every 6 months for a routine checkup."
  ];

  return (
    <section id="knowledge-hub" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Interactive Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime/10 border border-lime/20 rounded-full text-forest text-xs font-bold uppercase tracking-wider">
              <BookOpen size={14} className="text-lime" />
              <span>Oral Health 101</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tight">
              Empowering Your <span className="text-lime">Smile.</span>
            </h2>
            <p className="text-forest/70 font-medium">
              We believe educated patients make the best decisions for their oral health. Explore our interactive hub.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-forest/10 pb-0">
            <button 
              onClick={() => setActiveTab('myths')}
              className={`font-bold px-4 py-3 text-sm border-b-2 transition-colors cursor-pointer ${activeTab === 'myths' ? 'border-lime text-forest' : 'border-transparent text-forest/50 hover:text-forest'}`}
            >
              Myths vs Facts
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`font-bold px-4 py-3 text-sm border-b-2 transition-colors cursor-pointer ${activeTab === 'tips' ? 'border-lime text-forest' : 'border-transparent text-forest/50 hover:text-forest'}`}
            >
              Daily Tips
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[250px]">
            {activeTab === 'myths' ? (
              <div className="space-y-4 animate-fade-in">
                {myths.map((item, idx) => (
                  <div key={idx} className="bg-cream/50 p-4 rounded-2xl border border-forest/5">
                    <div className="flex items-start gap-3 mb-2">
                      <XCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-sm text-red-500/80 uppercase tracking-wider block mb-0.5">Myth</span>
                        <p className="font-semibold text-forest">{item.myth}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 ml-8 pt-2 border-t border-forest/5">
                      <CheckCircle size={20} className="text-lime mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-sm text-lime uppercase tracking-wider block mb-0.5">Fact</span>
                        <p className="text-forest/80 text-sm leading-relaxed">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {tips.map((tip, idx) => (
                  <div key={idx} className="bg-forest p-6 rounded-2xl text-cream group hover:bg-forest-light transition-colors">
                    <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center text-lime font-black mb-4 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <p className="font-medium text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Interactive SVG/Graphic area */}
        <div className="bg-cream rounded-[40px] p-4 h-full min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden border border-forest/5 shadow-inner">
          <div className="w-full h-full relative rounded-[32px] overflow-hidden">
            <img 
              src="/images/premium_dental_photo.png" 
              alt="Premium Dental Care" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
