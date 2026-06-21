"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, User, Phone, CheckCircle, Clock, Heart, Award, ArrowLeft, Shield } from 'lucide-react';
import { CLINIC_CONFIG } from '@/config/clinic';
import confetti from 'canvas-confetti';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { supabase } from '@/lib/supabase';

interface ErrorsState {
  name?: string;
  phone?: string;
  date?: string;
}

interface BookingItem {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferred_date: string;
  completed: boolean;
  contacted: boolean;
  created_at: string;
}

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

export default function BookingPage() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: servicesList[0],
    date: '',
    time: '10:00'
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [serverError, setServerError] = useState<string>('');

  const validate = (): boolean => {
    let tempErrors: ErrorsState = {};
    if (!formData.name.trim()) tempErrors.name = "Patient name is required";
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = "Enter a valid phone number (10-12 digits)";
    }
    if (!formData.date) tempErrors.date = "Please select a preferred date";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError('');

    const bookingId = Math.random().toString(36).substr(2, 9);
    const booking: BookingItem = {
      id: bookingId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      preferred_date: `${formData.date}T${formData.time}:00`,
      completed: false,
      contacted: false,
      created_at: new Date().toISOString()
    };

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([booking]);

      if (error) throw error;

      // Celebrate with confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0E3A2F', '#D2FF3A', '#FAF9F6', '#154e40']
      });

      setIsSuccess(true);
      
      // Dispatch event in case admin dashboard is open in another tab/component
      window.dispatchEvent(new Event(`${CLINIC_CONFIG.id}_booking_added`));

    } catch (err: any) {
      console.error("Failed to save booking:", err);
      setServerError("Unable to confirm booking. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream font-sans">
      <Navbar 
        onBookClick={() => {}} 
        onAdminClick={() => setIsAdminOpen(true)} 
      />

      <main className="flex-1 py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-forest/70 hover:text-forest font-bold text-sm bg-white/50 hover:bg-white border border-forest/10 px-4 py-2 rounded-2xl transition cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-forest/10 shadow-xl overflow-hidden">
            <div className="bg-forest p-8 text-white relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-lime/10 rounded-full filter blur-xl pointer-events-none" />
              <h1 className="text-3xl font-black uppercase tracking-tight text-white">Book Priority Slot</h1>
              <p className="text-lime text-sm font-semibold mt-1">Instant confirmation & digital token generation</p>
            </div>

            <div className="p-8 md:p-10">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in space-y-6">
                  <div className="rounded-full bg-forest p-6 text-lime mb-2">
                    <CheckCircle size={64} className="animate-bounce" />
                  </div>
                  <h2 className="text-3xl font-black text-forest uppercase tracking-tight">Slot Reserved!</h2>
                  <p className="text-forest/70 max-w-md font-medium text-base leading-relaxed">
                    Your appointment request has been logged successfully in our system. A representative will contact you via WhatsApp shortly to finalize your slot timing.
                  </p>

                  <div className="bg-forest/5 p-5 rounded-2xl border border-forest/10 w-full max-w-sm text-left">
                    <h3 className="text-xs uppercase text-forest/50 font-bold tracking-wider mb-2">Booking Summary</h3>
                    <p className="text-sm font-bold text-forest"><span className="font-medium text-forest/70">Patient:</span> {formData.name}</p>
                    <p className="text-sm font-bold text-forest mt-1"><span className="font-medium text-forest/70">Service:</span> {formData.service}</p>
                    <p className="text-sm font-bold text-forest mt-1"><span className="font-medium text-forest/70">Preferred Slot:</span> {formData.date} at {formData.time}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
                    <button 
                      onClick={() => router.push('/')}
                      className="cursor-pointer bg-forest hover:bg-forest-light text-lime hover:text-white font-bold py-3.5 px-8 rounded-2xl transition shadow-md hover:shadow-lg text-sm"
                    >
                      Return to Homepage
                    </button>
                    <a 
                      href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber}?text=Hi!%20I%20just%20booked%20an%20appointment%20online%20for%20${encodeURIComponent(formData.service)}%20on%20${formData.date}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 px-8 rounded-2xl transition shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-semibold">
                      {serverError}
                    </div>
                  )}

                  {/* Patient Name */}
                  <div>
                    <label className="block text-sm font-bold text-forest mb-2">Patient Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-forest/40">
                        <User size={18} />
                      </span>
                      <input 
                        type="text" 
                        placeholder="Enter full name of the patient"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full rounded-2xl border ${errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-forest/20'} bg-white py-4 pl-12 pr-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium`}
                      />
                    </div>
                    {errors.name && <p className="text-red-600 text-xs mt-1.5 font-bold">{errors.name}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-bold text-forest mb-2">WhatsApp Contact Number</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-4 flex items-center text-forest/40">
                        <Phone size={18} />
                      </span>
                      <input 
                        type="tel" 
                        placeholder={`e.g. +91 ${CLINIC_CONFIG.phoneRaw}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full rounded-2xl border ${errors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-forest/20'} bg-white py-4 pl-12 pr-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium`}
                      />
                    </div>
                    <p className="text-[10px] text-forest/50 mt-1 font-semibold">We will send confirmation and details on this WhatsApp number.</p>
                    {errors.phone && <p className="text-red-600 text-xs mt-1.5 font-bold">{errors.phone}</p>}
                  </div>

                  {/* Treatment Service */}
                  <div>
                    <label className="block text-sm font-bold text-forest mb-2">Select Requested Service</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-2xl border border-forest/20 bg-white py-4 px-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                    >
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-forest mb-2">Preferred Date</label>
                      <input 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full rounded-2xl border ${errors.date ? 'border-red-500 ring-2 ring-red-100' : 'border-forest/20'} bg-white py-4 px-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium`}
                      />
                      {errors.date && <p className="text-red-600 text-xs mt-1.5 font-bold">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-forest mb-2">Preferred Time</label>
                      <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full rounded-2xl border border-forest/20 bg-white py-4 px-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full cursor-pointer rounded-2xl bg-forest hover:bg-forest-light text-lime hover:text-white font-black py-4 transition-all duration-300 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Calendar size={18} />
                        <span>CONFIRM APPOINTMENT SLOT</span>
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-[11px] text-forest/50 font-bold text-center">
                    <Shield size={14} className="text-lime fill-forest" />
                    <span>Secure Booking. End-to-end encrypted medical privacy policies apply.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Perks / Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Perks card */}
            <div className="bg-forest text-cream p-8 rounded-[32px] shadow-lg border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-full filter blur-xl pointer-events-none" />
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-6">Why Book Online?</h2>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white uppercase">Skip the Waiting Room</h3>
                    <p className="text-xs text-cream/70 mt-1 font-medium leading-relaxed">
                      Online bookings are automatically registered as Priority Tokens, reducing wait times to under 15 minutes.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white uppercase">Personalized Consultation</h3>
                    <p className="text-xs text-cream/70 mt-1 font-medium leading-relaxed">
                      We study your chosen service in advance to prep diagnostic files and allocate appropriate doctor time.
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lime flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white uppercase">Elite Specialists</h3>
                    <p className="text-xs text-cream/70 mt-1 font-medium leading-relaxed">
                      All diagnostic slots are scheduled with dentists having 8+ years of aesthetic and dental experience.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Support info card */}
            <div className="bg-white p-6 rounded-[24px] border border-forest/10 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xs uppercase text-forest/50 font-bold tracking-wider">Need Booking Help?</h3>
                <p className="text-sm font-bold text-forest mt-0.5">Call Clinic: {CLINIC_CONFIG.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {isAdminOpen && (
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
