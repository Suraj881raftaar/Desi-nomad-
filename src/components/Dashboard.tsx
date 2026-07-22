import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { treksData } from '../data/treks';
import { User, Phone, Heart, Calendar, Clock, MapPin, LogOut, CheckCircle2, FileText, Printer, CreditCard, Trash2, XCircle } from 'lucide-react';
import UnifiedLoginPortal from './UnifiedLoginPortal';

export default function Dashboard() {
  const { currentUser, bookings, wishlist, logout, updateProfile, toggleWishlist, updateBookingStatus, cancelBooking, deleteBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'wishlist'>('profile');
  
  // Profile local form state
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [emergencyName, setEmergencyName] = useState(currentUser?.emergencyName || '');
  const [emergencyRelation, setEmergencyRelation] = useState(currentUser?.emergencyRelation || '');
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser?.emergencyPhone || '');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || '');
  const [allergies, setAllergies] = useState(currentUser?.allergies || '');
  const [medicalConditions, setMedicalConditions] = useState(currentUser?.medicalConditions || '');
  
  const [saveSuccess, setSaveSuccess] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  
  // Sandbox Razorpay payment flow simulation state variables
  const [payingBooking, setPayingBooking] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentErrorMsg, setPaymentErrorMsg] = useState('');
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState('');

  if (!currentUser) {
    return <UnifiedLoginPortal />;
  }

  // Redirect Admin away from customer dashboard to admin portal console
  if (currentUser.role === 'admin') {
    const base = import.meta.env.BASE_URL || '/';
    setTimeout(() => {
      window.history.replaceState(null, '', `${base}admin`);
      window.dispatchEvent(new Event('popstate'));
    }, 0);
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      emergencyName,
      emergencyRelation,
      emergencyPhone,
      bloodGroup,
      allergies,
      medicalConditions
    });
    setSaveSuccess('Profile parameters successfully updated!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  const handleLogoutClick = () => {
    logout();
    const base = import.meta.env.BASE_URL || '/';
    window.history.pushState(null, '', base);
    window.dispatchEvent(new Event('popstate'));
  };

  const handleSimulatePayment = (success: boolean) => {
    if (!payingBooking) return;
    setIsProcessingPayment(true);
    setPaymentErrorMsg('');

    setTimeout(() => {
      setIsProcessingPayment(false);
      if (success) {
        const mockPayId = `pay_mock_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        updateBookingStatus(payingBooking.id, 'Paid', mockPayId);
        setPaymentSuccessMsg(`Success! Booking confirmed. Payment Transaction Reference: ${mockPayId}`);
        setPayingBooking(null);
        setTimeout(() => setPaymentSuccessMsg(''), 5000);
      } else {
        setPaymentErrorMsg('Payment rejected by sandbox. Ensure mock inputs are valid.');
      }
    }, 1500);
  };

  const userBookings = bookings.filter(b => b.userId === currentUser.id || b.userEmail === currentUser.email);
  const wishlistedTreks = treksData.filter(t => wishlist.includes(t.id));

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
      
      {/* Dashboard Brand Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-8 gap-4 print:hidden">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a251c]">Welcome back, {currentUser.name}!</h2>
          <p className="text-slate-muted text-sm mt-1">Manage your trekking logs, wishlists, and health forms.</p>
        </div>
        <button 
          onClick={handleLogoutClick}
          className="flex items-center gap-2 h-10 px-4 border border-red-200 hover:bg-red-50 text-red-600 font-semibold rounded-xl text-sm transition-all"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      {paymentSuccessMsg && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 text-xs font-semibold flex items-center gap-2 animate-fade-in print:hidden">
          <CheckCircle2 size={18} />
          {paymentSuccessMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 print:hidden">
        
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'profile' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <User size={16} />
            Profile & Emergency
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'bookings' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Calendar size={16} />
            My Bookings
            {userBookings.length > 0 && (
              <span className="ml-auto bg-[#e28743] text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                {userBookings.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'wishlist' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Heart size={16} />
            Saved Treks
          </button>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-3">
          
          {/* 1. Profile and Emergency Tab Content */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">Profile Parameters</h3>
              
              {saveSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  {saveSuccess}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {/* Basic Personal Profile info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      value={currentUser.email} 
                      disabled
                      className="w-full h-11 px-4 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">WhatsApp / Phone</label>
                    <input 
                      type="tel" 
                      placeholder="WhatsApp number"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Emergency Contact coordinates */}
                <h4 className="text-sm font-bold text-[#0a251c] flex items-center gap-1.5 border-t border-slate-100 pt-5">
                  <Phone size={15} className="text-[#e28743]" />
                  Emergency Contacts (Mandatory for Expeditions)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Emergency contact name"
                      value={emergencyName} 
                      onChange={(e) => setEmergencyName(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Relation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mother, Father, Spouse"
                      value={emergencyRelation} 
                      onChange={(e) => setEmergencyRelation(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Emergency Phone</label>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile number"
                      value={emergencyPhone} 
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Medical parameters list */}
                <h4 className="text-sm font-bold text-[#0a251c] flex items-center gap-1.5 border-t border-slate-100 pt-5">
                  <Heart size={15} className="text-[#e28743]" />
                  Medical & Fitness Profile
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Blood Group</label>
                    <select 
                      value={bloodGroup} 
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Allergies</label>
                    <input 
                      type="text" 
                      placeholder="Food, medicine, insects, etc."
                      value={allergies} 
                      onChange={(e) => setAllergies(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-700 mb-1.5">Pre-existing Conditions</label>
                    <input 
                      type="text" 
                      placeholder="Asthma, blood pressure, etc."
                      value={medicalConditions} 
                      onChange={(e) => setMedicalConditions(e.target.value)}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5 text-right">
                  <button 
                    type="submit"
                    className="h-11 px-8 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. Bookings Tab Content */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">My Bookings</h3>
              
              {userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map((b) => (
                    <div key={b.id} className="border border-slate-150 rounded-2xl p-5 hover:border-[#e28743]/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#e28743] uppercase tracking-wider">{b.id}</span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            b.status === 'Paid' || b.status === 'Approved' || b.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : b.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-base text-[#0a251c]">{b.trekName}</h4>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <Calendar size={13} />
                          Batch: {b.batch}
                        </p>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                          <User size={13} />
                          Group Size: {b.groupSize} Trekker(s)
                        </p>
                      </div>
                      
                      <div className="text-left md:text-right space-y-2 flex flex-col md:items-end">
                        <span className="block font-extrabold text-lg text-[#0a251c] mb-1">₹{b.totalCost.toLocaleString('en-IN')}</span>
                        <div className="flex flex-wrap gap-2">
                          {b.status !== 'Paid' && b.status !== 'Completed' && b.status !== 'Cancelled' && (
                            <button 
                              onClick={() => setPayingBooking(b)}
                              className="h-9 px-4 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md"
                            >
                              <CreditCard size={14} />
                              Pay Now (Sandbox)
                            </button>
                          )}
                          <button 
                            onClick={() => setSelectedInvoice(b)}
                            className="h-9 px-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
                          >
                            <FileText size={14} className="text-[#e28743]" />
                            Invoice Details
                          </button>
                          {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                            <button 
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to cancel booking ${b.id} for ${b.trekName}?`)) {
                                  cancelBooking(b.id);
                                }
                              }}
                              className="h-9 px-3 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer bg-transparent"
                              title="Cancel this booking"
                            >
                              <XCircle size={14} />
                              Cancel
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              if (window.confirm(`Permanently remove booking ${b.id} from your history?`)) {
                                deleteBooking(b.id);
                              }
                            }}
                            className="h-9 px-2.5 border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600 text-xs font-bold rounded-xl transition-all flex items-center cursor-pointer bg-transparent"
                            title="Remove from history"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Calendar size={40} className="text-slate-300 mx-auto" />
                  <p className="text-slate-muted text-sm font-semibold">No bookings found. Start planning your next trek!</p>
                  <button 
                    onClick={() => {
                      const base = import.meta.env.BASE_URL || '/';
                      window.history.pushState(null, '', base);
                      window.dispatchEvent(new Event('popstate'));
                      
                      setTimeout(() => {
                        const el = document.getElementById('treks');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                      }, 150);
                    }}
                    className="h-10 px-5 bg-[#0a251c] hover:bg-[#154536] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Browse Active Treks
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. Wishlist Tab Content */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">Saved Treks</h3>
              
              {wishlistedTreks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {wishlistedTreks.map((t) => (
                    <div key={t.id} className="border border-slate-150 rounded-2xl overflow-hidden hover:border-[#e28743]/30 transition-all flex flex-col">
                      <div className="relative h-40">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                        <button 
                          onClick={() => toggleWishlist(t.id)}
                          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/95 text-red-500 hover:text-red-600 shadow-sm flex items-center justify-center font-bold"
                          aria-label="Remove from wishlist"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#0a251c]">{t.name}</h4>
                          <div className="flex gap-3 text-[10px] text-slate-500 font-semibold mt-1">
                            <span className="flex items-center gap-1"><MapPin size={11} /> {t.region}</span>
                            <span className="flex items-center gap-1"><Clock size={11} /> {t.duration} Days</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <div>
                            <span className="block text-[10px] text-slate-400">Price from</span>
                            <strong className="text-sm text-[#e28743]">₹{t.price.toLocaleString('en-IN')}</strong>
                          </div>
                          
                          <button 
                            onClick={() => {
                              const base = import.meta.env.BASE_URL || '/';
                              window.history.pushState(null, '', `${base}book?trek=${t.id}`);
                              window.dispatchEvent(new Event('popstate'));
                            }}
                            className="h-8 px-3 bg-[#0a251c] hover:bg-[#154536] text-white text-xs font-bold rounded-xl transition-all"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Heart size={40} className="text-slate-300 mx-auto" />
                  <p className="text-slate-muted text-sm font-semibold">Your wishlist is currently empty.</p>
                  <button 
                    onClick={() => {
                      const base = import.meta.env.BASE_URL || '/';
                      window.history.pushState(null, '', base);
                      window.dispatchEvent(new Event('popstate'));
                      
                      setTimeout(() => {
                        const el = document.getElementById('treks');
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                      }, 150);
                    }}
                    className="h-10 px-5 bg-[#0a251c] hover:bg-[#154536] text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Browse Active Treks
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Interactive PDF Printable Invoice Overlay */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:p-0 print:static print:bg-white print:z-auto">
          <div className="absolute inset-0 bg-[#0a251c]/65 backdrop-blur-sm print:hidden" onClick={() => setSelectedInvoice(null)} />
          
          <div className="relative bg-white w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 z-10 print:shadow-none print:border-none print:p-0 print:static print:max-w-none flex flex-col space-y-6">
            
            {/* Logo brand */}
            <div className="flex justify-between items-start border-b border-slate-150 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#0a251c] tracking-tight">DESI NOMAD TRAILS</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Himalayan Expedition Invoice</span>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600 print:hidden cursor-pointer bg-transparent border-none font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Bill Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Invoice ID</span>
                <strong className="text-slate-800">{selectedInvoice.id}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Booking Date</span>
                <span className="text-slate-800">{new Date(selectedInvoice.createdAt).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">User Account</span>
                <span className="text-slate-800">{selectedInvoice.userEmail}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">Payment status</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase w-max block mt-0.5 ${selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                  {selectedInvoice.status}
                </span>
              </div>
            </div>

            {/* Line items details */}
            <div className="border-t border-b border-slate-150 py-4 space-y-3">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Adventure Details</span>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Trek Name:</span>
                <span className="text-[#0a251c] font-bold">{selectedInvoice.trekName}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Departure batch:</span>
                <span>{selectedInvoice.batch.split(' (')[0]}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Headcount (Trekkers):</span>
                <span>{selectedInvoice.groupSize} Nomad(s)</span>
              </div>
              {selectedInvoice.offloadBackpack && (
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Backpack Offloading:</span>
                  <span>Yes (Included in total)</span>
                </div>
              )}
            </div>

            {/* Total ledger */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between text-slate-700">
                <span>Estimated Subtotal (Taxes & Add-ons included):</span>
                <span>₹{selectedInvoice.totalCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 pt-2.5 font-bold text-slate-800 text-sm">
                <span>Grand Total Paid:</span>
                <strong className="text-[#e28743] font-extrabold text-base">₹{selectedInvoice.totalCost.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Policy Notes */}
            <p className="text-[10px] text-slate-400 leading-normal border-t border-slate-100 pt-4">
              * This is a computer generated invoice transaction summary for high-altitude mountain trekking packages with Desi Nomad Trails. Standard cancellation rules apply. Medical certificates and waiver forms are checked prior to departure.
            </p>

            {/* Print buttons */}
            <div className="flex justify-end gap-2 print:hidden pt-2">
              <button 
                onClick={() => window.print()}
                className="h-10 px-5 bg-[#0a251c] hover:bg-[#154536] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border-none"
              >
                <Printer size={14} />
                Print Receipt
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Simulated Razorpay Sandbox Checkout Modal */}
      {payingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0a251c]/70 backdrop-blur-xs" onClick={() => setPayingBooking(null)} />
          
          <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 animate-fade-in flex flex-col">
            
            {/* Merchant Header */}
            <div className="bg-[#0a251c] text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[9px] bg-[#e28743] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Razorpay Sandbox</span>
                <h4 className="font-extrabold text-base tracking-tight mt-1">Desi Nomad Trails</h4>
              </div>
              <button 
                onClick={() => setPayingBooking(null)}
                className="text-slate-300 hover:text-white font-bold text-sm bg-transparent border-none cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>

            {/* Payment Summary */}
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center text-xs font-semibold text-slate-600">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Adventure</span>
                  <strong className="text-[#0a251c]">{payingBooking.trekName}</strong>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Amount Due</span>
                  <strong className="text-lg text-[#e28743]">₹{payingBooking.totalCost.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {paymentErrorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs font-semibold text-center leading-normal">
                  {paymentErrorMsg}
                </div>
              )}

              {/* Payment Methods tabs */}
              <div className="flex border border-slate-200 rounded-xl overflow-hidden text-xs font-bold text-slate-600">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 h-9 transition-all border-none cursor-pointer ${paymentMethod === 'card' ? 'bg-slate-100 text-[#0a251c]' : 'bg-white hover:bg-slate-50'}`}
                >
                  Card
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 h-9 transition-all border-none cursor-pointer ${paymentMethod === 'upi' ? 'bg-slate-100 text-[#0a251c]' : 'bg-white hover:bg-slate-50'}`}
                >
                  UPI
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex-1 h-9 transition-all border-none cursor-pointer ${paymentMethod === 'netbanking' ? 'bg-slate-100 text-[#0a251c]' : 'bg-white hover:bg-slate-50'}`}
                >
                  Netbanking
                </button>
              </div>

              {/* Form parameters fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <input type="text" placeholder="Cardholder Name" defaultValue={currentUser.name} className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                  <input type="text" placeholder="Card Number (e.g. 4111 2222 3333 4444)" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Expiry (MM/YY)" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                    <input type="password" placeholder="CVV" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <input type="text" placeholder="Enter Virtual Payment Address (e.g. nomad@upi)" className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none" />
              )}

              {paymentMethod === 'netbanking' && (
                <select className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none cursor-pointer">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              )}

              {/* Simulate triggers */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleSimulatePayment(true)}
                  className="w-full h-11 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 border-none cursor-pointer"
                >
                  {isProcessingPayment ? 'Processing sandbox checks...' : 'Simulate Success Payment'}
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleSimulatePayment(false)}
                  className="w-full h-11 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-bold text-xs transition-all duration-200 disabled:opacity-50 bg-transparent cursor-pointer"
                >
                  Simulate Failed Payment
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
