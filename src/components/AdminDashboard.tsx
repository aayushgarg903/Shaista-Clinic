"use client";
import React, { useState, useEffect } from 'react';
import { X, Search, Phone, CheckCircle, Clock, Trash2, Download, RefreshCw, Lock, Users, AlertCircle, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CLINIC_CONFIG } from '@/config/clinic';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferred_date: string;
  completed: boolean;
  contacted: boolean;
  created_at: string;
}

export interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterTab, setFilterTab] = useState<string>('all'); // all, pending, contacted, completed

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBookings((data as Booking[]) || []);
    } catch (e: any) {
      console.error("Failed to load bookings from Supabase:", e?.message || e?.code || JSON.stringify(e) || e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          loadBookings();
        } else {
          setIsAuthenticated(false);
        }
      };
      checkSession();
    }
  }, [isOpen]);

  // Listen to custom booking added events to refresh
  useEffect(() => {
    const handleRefresh = () => {
      if (isAuthenticated) loadBookings();
    };
    window.addEventListener(`${CLINIC_CONFIG.id}_booking_added`, handleRefresh);
    return () => window.removeEventListener(`${CLINIC_CONFIG.id}_booking_added`, handleRefresh);
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setIsAuthenticated(true);
      loadBookings();
    } catch (err: any) {
      console.error("Login error caught:", err);
      let errMsg = '';
      if (err === null || err === undefined) {
        errMsg = 'null/undefined error';
      } else if (typeof err === 'string') {
        errMsg = err;
      } else {
        // Build a detailed error description including non-enumerable properties
        const details: any = {};
        Object.getOwnPropertyNames(err).forEach(key => {
          try {
            details[key] = String(err[key]);
          } catch (e) {}
        });
        
        // Include any regular enumerable properties
        Object.keys(err).forEach(key => {
          if (!(key in details)) {
            try {
              details[key] = String(err[key]);
            } catch (e) {}
          }
        });
        
        errMsg = details.message || details.error_description || JSON.stringify(details);
      }
      
      setError(errMsg || 'Login failed. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleToggleContacted = async (id: string) => {
    const current = bookings.find(b => b.id === id);
    if (!current) return;
    const nextVal = !current.contacted;

    // Optimistic UI update
    setBookings(prev => prev.map(b => b.id === id ? { ...b, contacted: nextVal } : b));

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ contacted: nextVal })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error("Failed to update contacted status:", e);
      // Revert status on error
      setBookings(prev => prev.map(b => b.id === id ? { ...b, contacted: current.contacted } : b));
    }
  };

  const handleToggleCompleted = async (id: string) => {
    const current = bookings.find(b => b.id === id);
    if (!current) return;
    const nextVal = !current.completed;

    // Optimistic UI update
    setBookings(prev => prev.map(b => b.id === id ? { ...b, completed: nextVal } : b));

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ completed: nextVal })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error("Failed to update completed status:", e);
      // Revert status on error
      setBookings(prev => prev.map(b => b.id === id ? { ...b, completed: current.completed } : b));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking entry?")) {
      const original = [...bookings];
      setBookings(prev => prev.filter(b => b.id !== id));

      try {
        const { error } = await supabase
          .from('bookings')
          .delete()
          .eq('id', id);
        if (error) throw error;
      } catch (e) {
        console.error("Failed to delete booking:", e);
        // Revert on error
        setBookings(original);
      }
    }
  };

  const handleExportCSV = () => {
    if (filteredBookings.length === 0) return alert("No bookings to export!");
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Phone,Service,Preferred Date,Contacted,Completed,Created At\n";
    
    filteredBookings.forEach(b => {
      const row = [
        b.id,
        `"${b.name.replace(/"/g, '""')}"`,
        `"${b.phone}"`,
        `"${b.service}"`,
        b.preferred_date,
        b.contacted ? "YES" : "NO",
        b.completed ? "YES" : "NO",
        b.created_at
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${CLINIC_CONFIG.id}_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter bookings based on tab and query
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.phone.includes(searchQuery) ||
                          b.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTab === 'pending') return matchesSearch && !b.contacted && !b.completed;
    if (filterTab === 'contacted') return matchesSearch && b.contacted && !b.completed;
    if (filterTab === 'completed') return matchesSearch && b.completed;
    return matchesSearch;
  });

  // Calculate metrics
  const totalAppointments = bookings.length;
  const pendingActions = bookings.filter(b => !b.contacted && !b.completed).length;
  const todayInquiries = bookings.filter(b => {
    const createdDate = new Date(b.created_at).toDateString();
    const todayDate = new Date().toDateString();
    return createdDate === todayDate;
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-[24px] sm:rounded-[32px] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Auth View */}
        {!isAuthenticated ? (
          <div className="flex flex-col items-center justify-center p-8 md:p-10 w-full max-w-md mx-auto my-8 bg-cream rounded-3xl shadow-inner border border-forest/10">
            <div className="rounded-full bg-forest p-4 text-lime mb-4">
              <Lock size={36} />
            </div>
            <h3 className="text-2xl font-bold text-forest text-center font-sans">{CLINIC_CONFIG.displayName} Doctor Portal</h3>
            <p className="text-forest/60 text-center text-xs mt-1 font-semibold">Secure Login. Enter Admin Credentials.</p>
            
            <form onSubmit={handleLoginSubmit} className="mt-6 w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="text" 
                  name="admin_username_field"
                  id="admin_username_field"
                  placeholder="Enter admin email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-forest/20 bg-white py-4 px-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest uppercase tracking-wider mb-1.5">Password</label>
                <input 
                  type="password" 
                  name="admin_password_field"
                  id="admin_password_field"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-forest/20 bg-white py-4 px-5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all text-sm font-medium"
                  autoComplete="new-password"
                  required
                />
                {error && <p className="text-red-600 text-xs mt-2 font-semibold text-center">{error}</p>}
              </div>
              
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="w-full cursor-pointer rounded-2xl bg-forest hover:bg-forest-light text-lime hover:text-white font-bold py-4 transition-all text-sm"
                >
                  Unlock Portal
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 border border-forest/20 rounded-2xl text-forest/70 hover:bg-forest/5 font-semibold text-sm transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Dashboard View */
          <>
            {/* Header */}
            <div className="bg-forest text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <span>🦷 {CLINIC_CONFIG.displayName} Booking Ledger</span>
                  <span className="bg-lime text-forest text-[10px] px-2.5 py-0.5 rounded-full font-bold">Admin</span>
                </h3>
                <p className="text-xs text-white/70 mt-0.5">Manage patient slots, checkups, and token schedules.</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={loadBookings} 
                  title="Refresh data"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition text-white cursor-pointer"
                >
                  <RefreshCw size={16} />
                </button>
                <button 
                  onClick={handleExportCSV} 
                  title="Export to CSV"
                  className="flex items-center gap-1.5 px-3 py-2 bg-lime hover:bg-lime-dark text-forest text-xs font-bold rounded-xl transition shadow cursor-pointer"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Lock
                </button>
                <button 
                  onClick={onClose}
                  className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Dashboard Metrics Header */}
            <div className="p-4 sm:p-6 bg-cream/20 border-b border-forest/10 grid grid-cols-3 gap-3 sm:gap-6">
              {/* Total Appointments Card */}
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-forest/5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest flex-shrink-0 hidden sm:flex">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase text-forest/50 tracking-wider">Total Bookings</p>
                  <h4 className="text-lg sm:text-2xl font-black text-forest mt-0.5">{totalAppointments}</h4>
                </div>
              </div>

              {/* Pending Actions Card */}
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-forest/5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center text-red-600 flex-shrink-0 hidden sm:flex">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase text-red-600/70 tracking-wider">Pending Action</p>
                  <h4 className="text-lg sm:text-2xl font-black text-red-600 mt-0.5">{pendingActions}</h4>
                </div>
              </div>

              {/* Today's Inquiries Card */}
              <div className="bg-white p-3 sm:p-5 rounded-2xl border border-forest/5 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center text-forest flex-shrink-0 hidden sm:flex">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase text-forest/70 tracking-wider">Today's Inquiries</p>
                  <h4 className="text-lg sm:text-2xl font-black text-forest mt-0.5">{todayInquiries}</h4>
                </div>
              </div>
            </div>

            {/* Dashboard Control Bar */}
            <div className="p-4 sm:p-6 border-b border-forest/10 bg-cream/30 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3 text-forest/40" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by name, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-forest/10 rounded-2xl bg-white text-sm outline-none focus:border-forest transition text-forest font-medium"
                />
              </div>

              {/* Tabs */}
              <div className="flex bg-forest/5 p-1 rounded-2xl w-full md:w-auto overflow-x-auto">
                {[
                  { id: 'all', label: 'All Slots' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'contacted', label: 'Contacted' },
                  { id: 'completed', label: 'Completed' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id)}
                    className={`flex-1 md:flex-initial cursor-pointer px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      filterTab === tab.id 
                        ? 'bg-forest text-lime shadow' 
                        : 'text-forest/70 hover:text-forest hover:bg-forest/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Container */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              {filteredBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-forest/40">
                  <Clock size={48} strokeWidth={1.5} className="mb-3 animate-pulse" />
                  <p className="text-base font-semibold">No appointments found matching this filter.</p>
                  <p className="text-xs mt-1">New slots generated by patients will appear here instantly.</p>
                </div>
              ) : (
                <>
                  {/* Desktop Layout (Table) */}
                  <div className="hidden md:block overflow-hidden border border-forest/10 rounded-2xl shadow-sm">
                    <table className="w-full text-left border-collapse bg-white">
                      <thead>
                        <tr className="bg-forest/5 text-forest font-bold text-xs uppercase border-b border-forest/10">
                          <th className="p-4">Patient</th>
                          <th className="p-4">Contact</th>
                          <th className="p-4">Treatment</th>
                          <th className="p-4">Slot Time</th>
                          <th className="p-4 text-center">Status Workflows</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-forest/10 text-sm text-forest/90">
                        {filteredBookings.map((b) => {
                          const d = new Date(b.preferred_date);
                          const dateFormatted = isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          });
                          const timeFormatted = isNaN(d.getTime()) ? 'N/A' : d.toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          });
                          const numericPhone = b.phone.replace(/[\s+()-]/g, '');

                          return (
                            <tr key={b.id} className="hover:bg-cream/10 transition">
                              {/* Patient Name */}
                              <td className="p-4 font-bold text-forest">
                                {b.name}
                              </td>
                              
                              {/* Contact */}
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs">{b.phone}</span>
                                  <a 
                                    href={`https://wa.me/${numericPhone}?text=Hi,%20this%20is%20the%20clinic%20confirming%20your%20dental%20appointment%20for%20${encodeURIComponent(b.service)}%20on%20${dateFormatted}%20at%20${timeFormatted}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp confirmation"
                                    className="flex items-center justify-center p-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-lg transition"
                                  >
                                    <Phone size={14} className="fill-current stroke-none" />
                                  </a>
                                </div>
                              </td>

                              {/* Treatment */}
                              <td className="p-4 text-xs font-bold text-forest/70">
                                {b.service}
                              </td>

                              {/* Slot Time */}
                              <td className="p-4 font-semibold text-xs">
                                <span className="block">{dateFormatted}</span>
                                <span className="block text-forest/50 mt-0.5">{timeFormatted}</span>
                              </td>

                              {/* Status Toggles */}
                              <td className="p-4">
                                <div className="flex items-center justify-center gap-4">
                                  {/* Contacted Toggle */}
                                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                    <input 
                                      type="checkbox"
                                      checked={b.contacted}
                                      onChange={() => handleToggleContacted(b.id)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-forest/15 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 relative"></div>
                                    <span className={`text-[10px] font-extrabold uppercase ${b.contacted ? 'text-blue-600' : 'text-forest/40'}`}>
                                      Contacted
                                    </span>
                                  </label>

                                  {/* Completed Toggle */}
                                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                    <input 
                                      type="checkbox"
                                      checked={b.completed}
                                      onChange={() => handleToggleCompleted(b.id)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-forest/15 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest relative"></div>
                                    <span className={`text-[10px] font-extrabold uppercase ${b.completed ? 'text-forest' : 'text-forest/40'}`}>
                                      Completed
                                    </span>
                                  </label>
                                </div>
                              </td>

                              {/* Delete Action */}
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDelete(b.id)}
                                  className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-forest/40 transition cursor-pointer"
                                  title="Delete entry"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Layout (Cards) */}
                  <div className="md:hidden space-y-4">
                    {filteredBookings.map((b) => {
                      const d = new Date(b.preferred_date);
                      const dateFormatted = isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });
                      const timeFormatted = isNaN(d.getTime()) ? 'N/A' : d.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      });
                      const numericPhone = b.phone.replace(/[\s+()-]/g, '');

                      return (
                        <div key={b.id} className="bg-white p-5 rounded-2xl border border-forest/10 shadow-sm space-y-4">
                          {/* Header: Name and Delete button */}
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-forest text-base">{b.name}</h4>
                              <p className="text-xs font-bold text-forest/50 mt-0.5 uppercase tracking-wider">{b.service}</p>
                            </div>
                            <button
                              onClick={() => handleDelete(b.id)}
                              className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-lg text-forest/40 transition cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Body: Contact details and preferred date/time */}
                          <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t border-b border-forest/5 py-3 text-forest/80">
                            <div>
                              <span className="block text-[10px] text-forest/40 font-bold uppercase tracking-wider">Contact</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="font-bold">{b.phone}</span>
                                <a 
                                  href={`https://wa.me/${numericPhone}?text=Hi,%20this%20is%20the%20clinic%20confirming%20your%20dental%20appointment%20for%20${encodeURIComponent(b.service)}%20on%20${dateFormatted}%20at%20${timeFormatted}.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center p-1 bg-[#25D366]/10 text-[#25D366] rounded-md transition"
                                >
                                  <Phone size={12} className="fill-current stroke-none" />
                                </a>
                              </div>
                            </div>
                            <div>
                              <span className="block text-[10px] text-forest/40 font-bold uppercase tracking-wider">Preferred Slot</span>
                              <p className="mt-1 font-bold">{dateFormatted} at {timeFormatted}</p>
                            </div>
                          </div>

                          {/* Actions: Stylish Toggle Swatches */}
                          <div className="flex items-center justify-between pt-1">
                            {/* Contacted Checkbox */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={b.contacted}
                                onChange={() => handleToggleContacted(b.id)}
                                className="sr-only peer"
                              />
                              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-forest/15 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 relative"></div>
                              <span className={`text-[10px] font-extrabold uppercase ${b.contacted ? 'text-blue-600' : 'text-forest/40'}`}>
                                Contacted
                              </span>
                            </label>

                            {/* Completed Checkbox */}
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={b.completed}
                                onChange={() => handleToggleCompleted(b.id)}
                                className="sr-only peer"
                              />
                              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-forest/15 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest relative"></div>
                              <span className={`text-[10px] font-extrabold uppercase ${b.completed ? 'text-forest' : 'text-forest/40'}`}>
                                Completed
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-4 bg-cream/45 border-t border-forest/10 flex items-center justify-between text-xs text-forest/60 font-bold">
              <span>Showing {filteredBookings.length} of {bookings.length} slots</span>
              <span>Pending Action: {pendingActions} slots</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
