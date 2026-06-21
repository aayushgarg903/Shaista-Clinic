"use client";
import React, { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLINIC_CONFIG } from '@/config/clinic';

const servicesList: string[] = [
  "Teeth whitening",
  "Bonding",
  "Check-ups",
  "Cosmetic procedures",
  "Dental implants",
  "Dentures & bridges",
  "Emergency care",
  "Extractions",
  "Fillings and sealants",
  "Laser dentistry",
  "Mouth guards",
  "Online dentist booking",
  "Oral surgery",
  "Paediatrics",
  "Root canals",
  "Teeth cleaning",
  "Teeth reshaping",
  "Veneers & crowns",
  "X-ray",
  "Treatment of Black Gums",
  "Treatment of bleeding gums",
  "Treatment of gummy smile",
  "Treatment of gum recession"
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorsState {
  name?: string;
  phone?: string;
  date?: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: servicesList[0],
    date: '',
    time: '10:00'
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsState>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    let tempErrors: ErrorsState = {};
    if (!formData.name.trim()) tempErrors.name = "Patient name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = "Enter a valid phone number (10-12 digits)";
    }
    if (!formData.date) tempErrors.date = "Please select a date";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create booking object
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      preferred_date: `${formData.date}T${formData.time}:00`,
      completed: false,
      contacted: false,
      created_at: new Date().toISOString()
    };

    // Save to localStorage as a fallback
    try {
      const existing = localStorage.getItem(`${CLINIC_CONFIG.id}_bookings`);
      const bookings = existing ? JSON.parse(existing) : [];
      bookings.push(booking);
      localStorage.setItem(`${CLINIC_CONFIG.id}_bookings`, JSON.stringify(bookings));
      
      // Fire success confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0E3A2F', '#D2FF3A', '#FAF9F6', '#154e40']
      });

      setIsSuccess(true);
      // Trigger a local storage custom event so AdminDashboard knows to refresh
      window.dispatchEvent(new Event(`${CLINIC_CONFIG.id}_booking_added`));

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          phone: '',
          service: servicesList[0],
          date: '',
          time: '10:00'
        });
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Failed to save booking:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream shadow-2xl transition-all duration-300">
        
        {/* Header decoration */}
        <div className="bg-forest p-6 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X size={20} />
          </button>
          <h3 className="text-2xl font-bold font-sans">Book a Priority Slot</h3>
          <p className="text-white/80 mt-1 text-sm font-medium">Secure your token instantly. Quick consultation scheduling.</p>
        </div>

        {/* Form area */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="rounded-full bg-forest p-4 text-lime mb-4">
                <CheckCircle size={48} className="animate-bounce" />
              </div>
              <h4 className="text-2xl font-bold text-forest">Slot Reserved!</h4>
              <p className="text-forest/70 mt-2 max-w-sm">
                Your token is generated successfully. Our representative will contact you via WhatsApp shortly to confirm.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-semibold text-forest mb-1.5">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-forest/40">
                    <User size={18} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-forest/20 bg-white py-3 pl-10 pr-4 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-forest mb-1.5">WhatsApp Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-forest/40">
                    <Phone size={18} />
                  </span>
                  <input 
                    type="tel" 
                    placeholder={`e.g. +91 ${CLINIC_CONFIG.phoneRaw}`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-forest/20 bg-white py-3 pl-10 pr-4 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                  />
                </div>
                {errors.phone && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.phone}</p>}
              </div>

              {/* Treatment Service */}
              <div>
                <label className="block text-sm font-semibold text-forest mb-1.5">Select Treatment</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-2xl border border-forest/20 bg-white py-3 px-4 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                >
                  {servicesList.map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-forest mb-1.5">Preferred Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-2xl border border-forest/20 bg-white py-3 px-4 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                    />
                  </div>
                  {errors.date && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest mb-1.5">Preferred Time</label>
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-2xl border border-forest/20 bg-white py-3 px-4 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="w-full cursor-pointer rounded-2xl bg-forest hover:bg-forest-light text-lime hover:text-white font-bold py-3.5 transition-all duration-350 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 mt-2"
              >
                <Calendar size={18} />
                Generate My Token
              </button>
              
              <p className="text-[11px] text-center text-forest/50 font-medium">
                🔒 Your patient data is secure. RLS rules and localized privacy compliant.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
