"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const onMouseUp = () => setIsDragging(false);
    const onTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  return (
    <section className="py-20 px-4 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-forest tracking-tight">
            See the <span className="text-lime">Difference.</span>
          </h2>
          <p className="text-forest/70 font-medium max-w-xl mx-auto">
            Swipe to see real results from our professional teeth whitening and aesthetic treatments.
          </p>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-3xl mx-auto aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white cursor-ew-resize select-none"
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
        >
          {/* After Image (Base) */}
          <div className="absolute inset-0">
             <img 
               src="/images/teeth_whitening_after.png" 
               alt="After Treatment - Bright White Smile" 
               className="w-full h-full object-cover"
               draggable="false"
             />
             <div className="absolute bottom-4 right-4 bg-forest text-lime text-xs font-bold px-3 py-1 rounded-full shadow-md z-0">
               After
             </div>
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 top-0 left-0 bottom-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
             <img 
               src="/images/teeth_whitening_before.png" 
               alt="Before Treatment" 
               className="w-full h-full object-cover"
               draggable="false"
             />
             <div className="absolute bottom-4 left-4 bg-white/90 text-forest text-xs font-bold px-3 py-1 rounded-full shadow-md z-0">
               Before
             </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 transition-transform duration-75"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
             <div className="w-10 h-10 bg-forest text-lime rounded-full flex items-center justify-center shadow-lg border-2 border-white absolute pointer-events-none hover:scale-110 transition-transform">
               <ArrowLeftRight size={20} />
             </div>
          </div>
          
          {/* Interaction Overlay (to prevent drag issues) */}
          <div className="absolute inset-0 pointer-events-none z-10" />

        </div>

      </div>
    </section>
  );
}
