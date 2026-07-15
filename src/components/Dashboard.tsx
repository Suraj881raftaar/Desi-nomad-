import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { treksData } from '../data/treks';
import { User, Phone, ShieldAlert, Heart, Calendar, Clock, MapPin, LogOut, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, bookings, wishlist, logout, updateProfile, toggleWishlist } = useApp();
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

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl shadow-md border border-slate-100 text-center space-y-4">
        <ShieldAlert size={48} className="text-[#e28743] mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-[#0a251c]">Access Denied</h3>
        <p className="text-slate-muted text-sm">Please log in to view your customer dashboard.</p>
        <button 
          onClick={() => {
            // Trigger login modal via dispatching custom event or standard click
            window.dispatchEvent(new CustomEvent('open-auth-modal'));
          }}
          className="w-full h-11 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold transition-all shadow-md"
        >
          Open Login Portal
        </button>
      </div>
    );
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
    // Redirect to home page
    const base = import.meta.env.BASE_URL || '/';
    window.history.pushState(null, '', base);
    window.dispatchEvent(new Event('popstate'));
  };

  const userBookings = bookings.filter(b => b.userId === currentUser.id || b.userEmail === currentUser.email);
  const wishlistedTreks = treksData.filter(t => wishlist.includes(t.id));

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16">
      
      {/* Dashboard Brand Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-8 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
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
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${b.status === 'Paid' || b.status === 'Approved' || b.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
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
                      
                      <div className="text-left md:text-right space-y-2">
                        <span className="block font-extrabold text-lg text-[#0a251c]">₹{b.totalCost.toLocaleString('en-IN')}</span>
                        {/* Dynamic PDF Invoice simulation trigger */}
                        <button 
                          onClick={() => alert(`Generating PDF invoice for ${b.id}. It includes cost breakdowns, GST schedules, and general policy parameters.`)}
                          className="h-9 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          Invoice Details
                        </button>
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
                      // Redirect to homepage treks selector
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
                              // Go to book page preselected
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
    </div>
  );
}
