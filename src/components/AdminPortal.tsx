import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, BarChart3, Calendar, Tag, ArrowUpRight, DollarSign, Users, Briefcase, Plus, Edit, Trash2, Search, Mountain } from 'lucide-react';
import type { Trek } from '../data/treks';

export default function AdminPortal() {
  const { currentUser, bookings, updateBookingStatus, cancelBooking, deleteBooking, treks, addTrek, updateTrek, deleteTrek } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'catalog' | 'batches' | 'coupons'>('analytics');
  
  // Search query for Catalog tab
  const [catalogSearch, setCatalogSearch] = useState('');
  const [editingTrek, setEditingTrek] = useState<Trek | null>(null);
  const [isAddTrekOpen, setIsAddTrekOpen] = useState(false);

  // New Trek Form State
  const [newTrekName, setNewTrekName] = useState('');
  const [newTrekRegion, setNewTrekRegion] = useState('Himachal');
  const [newTrekDifficulty, setNewTrekDifficulty] = useState<'Easy' | 'Moderate' | 'Demanding'>('Moderate');
  const [newTrekDuration, setNewTrekDuration] = useState(5);
  const [newTrekPrice, setNewTrekPrice] = useState(9500);
  const [newTrekAltitude, setNewTrekAltitude] = useState('12,000 ft');
  const [newTrekDistance, setNewTrekDistance] = useState('35 km');
  const [newTrekImage, setNewTrekImage] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80');
  const [newTrekDesc, setNewTrekDesc] = useState('');

  // Custom coupon codes database in local state for admin demo
  const [coupons, setCoupons] = useState([
    { code: 'TRAILS10', type: 'percentage', value: 10, desc: '10% Off total booking cost' },
    { code: 'NOMAD20', type: 'flat', value: 2000, desc: '₹2,000 Flat discount' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponDesc, setNewCouponDesc] = useState('');
  
  // Custom batch local state for demo management
  const [selectedTrekId, setSelectedTrekId] = useState(treks[0]?.id || 'hidden-valley');
  const [newBatchDate, setNewBatchDate] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl shadow-md border border-slate-100 text-center space-y-4 animate-fade-in">
        <ShieldAlert size={48} className="text-red-500 mx-auto animate-pulse" />
        <h3 className="text-xl font-bold text-[#0a251c]">Access Denied</h3>
        <p className="text-slate-muted text-sm">This portal is restricted to Desi Nomad Trails administrators only.</p>
        <button 
          onClick={() => {
            window.dispatchEvent(new CustomEvent('open-auth-modal'));
          }}
          className="w-full h-11 bg-[#0a251c] hover:bg-[#154536] text-white rounded-xl font-bold transition-all shadow-md cursor-pointer border-none"
        >
          Authenticate as Admin
        </button>
      </div>
    );
  }

  // Calculate high-level business analytics metrics
  const totalRevenue = bookings.reduce((sum, b) => b.status === 'Paid' || b.status === 'Completed' ? sum + b.totalCost : sum, 0);

  const bookingsCount = bookings.length;
  const paidBookingsCount = bookings.filter(b => b.status === 'Paid' || b.status === 'Completed').length;
  const uniqueUsersCount = new Set(bookings.map(b => b.userEmail)).size;

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = newCouponCode.trim().toUpperCase();
    if (!code) return;
    
    setCoupons([...coupons, {
      code,
      type: 'percentage',
      value: newCouponValue,
      desc: newCouponDesc || `${newCouponValue}% Off discount code`
    }]);
    setNewCouponCode('');
    setNewCouponDesc('');
  };

  const handleDeleteCoupon = (codeToDelete: string) => {
    setCoupons(coupons.filter(c => c.code !== codeToDelete));
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchDate.trim()) return;

    const targetTrek = treks.find(t => t.id === selectedTrekId);
    if (targetTrek) {
      updateTrek(selectedTrekId, {
        batches: [...(targetTrek.batches || []), `${newBatchDate} (Slots Available)`]
      });
    }
    setNewBatchDate('');
    alert('Departure batch successfully added!');
  };

  const handleDeleteBatch = (trekId: string, batchToDelete: string) => {
    const targetTrek = treks.find(t => t.id === trekId);
    if (targetTrek) {
      updateTrek(trekId, {
        batches: (targetTrek.batches || []).filter(b => b !== batchToDelete)
      });
    }
  };

  const handleAddTrekSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrekName.trim()) return;

    const newId = newTrekName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const createdTrek: Trek = {
      id: newId,
      name: newTrekName,
      region: newTrekRegion,
      difficulty: newTrekDifficulty,
      duration: Number(newTrekDuration),
      price: Number(newTrekPrice),
      highlights: 'Scenic wilderness, expert guides, alpine trail',
      altitude: newTrekAltitude,
      distance: newTrekDistance,
      bestSeason: 'Year Round',
      image: newTrekImage,
      description: newTrekDesc || `${newTrekName} adventure trail in ${newTrekRegion}.`,
      itinerary: [
        { day: 1, title: 'Base Arrival', desc: 'Arrive at base village and safety briefing.' },
        { day: 2, title: 'Summit Push', desc: 'Hike to summit ridge and return to base.' }
      ],
      gallery: [newTrekImage],
      rating: 4.9,
      reviewCount: 1,
      inclusions: ['All meals during trek.', 'Camping tents.', 'Wilderness first aid guides.'],
      exclusions: ['Personal transport to base.', 'Equipment rentals.'],
      safetyFitness: {
        amsRisk: 'Low',
        fitnessLevel: 'Moderate stamina required.',
        medicalFormRequired: false,
        warnings: 'Follow guide instructions.'
      },
      batches: ['Oct 10 - Oct 15 (Slots Available)', 'Nov 05 - Nov 10 (Slots Available)'],
      bestTimeToVisit: 'October to May',
      howToReach: `Arrive at nearest hub to ${newTrekRegion}.`,
      nearbyAttractions: 'Local scenic viewpoints.',
      temperature: '15°C to 0°C'
    };

    addTrek(createdTrek);
    setIsAddTrekOpen(false);
    setNewTrekName('');
    setNewTrekDesc('');
    alert(`Success! Trek "${newTrekName}" added to the live catalog.`);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10 pt-28 pb-16 md:pt-32 md:pb-20">
      
      {/* Header bar */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a251c] flex items-center gap-2">
            <span>Admin Console</span>
            <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Secure</span>
          </h2>
          <p className="text-slate-muted text-sm mt-1">Platform operations, ledgers, coupon rules, and analytics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Navigation menu */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col space-y-1">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'analytics' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <BarChart3 size={16} />
            Analytics Hub
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'bookings' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Calendar size={16} />
            Bookings Ledger
            {bookingsCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                {bookingsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'catalog' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Mountain size={16} />
            Treks Catalog ({treks.length})
          </button>
          <button 
            onClick={() => setActiveTab('batches')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'batches' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Briefcase size={16} />
            Manage Batches
          </button>
          <button 
            onClick={() => setActiveTab('coupons')}
            className={`w-full text-left h-11 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 ${activeTab === 'coupons' ? 'bg-[#0a251c] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
          >
            <Tag size={16} />
            Coupons Panel
          </button>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-3">
          
          {/* 1. Analytics Hub Tab Content */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              
              {/* Business Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Revenue</span>
                    <strong className="block text-xl text-[#0a251c]">₹{totalRevenue.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 text-[#e28743] rounded-xl flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bookings Total</span>
                    <strong className="block text-xl text-[#0a251c]">{bookingsCount} ({paidBookingsCount} Paid)</strong>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Nomads</span>
                    <strong className="block text-xl text-[#0a251c]">{uniqueUsersCount}</strong>
                  </div>
                </div>
              </div>

              {/* Glowing Interactive SVG Chart showing revenue projections */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-[#0a251c]">Revenue Analysis (Sandbox Projections)</h3>
                  <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                    <ArrowUpRight size={14} /> +12.4% vs Last Month
                  </span>
                </div>

                {/* SVG Graph wrapper */}
                <div className="relative pt-4">
                  <svg className="w-full h-48 text-[#e28743]" viewBox="0 0 500 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e28743" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="#e28743" stopOpacity="0.0"/>
                      </linearGradient>
                    </defs>
                    {/* Fill Area */}
                    <path d="M 0 100 Q 100 40 200 80 T 400 20 T 500 10 L 500 120 L 0 120 Z" fill="url(#chartGrad)" />
                    {/* Glowing Stroke Line */}
                    <path d="M 0 100 Q 100 40 200 80 T 400 20 T 500 10" fill="none" stroke="#e28743" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Dotted Grid lines */}
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                  </svg>
                  
                  {/* Chart labels */}
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2.5">
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL (CURRENT)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Bookings Ledger Tab Content */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">Bookings Ledger</h3>
              
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <th className="pb-3">ID & Date</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Trek</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-semibold text-slate-700">
                      {bookings.map((b) => (
                        <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="py-4">
                            <span className="block font-bold text-[#e28743]">{b.id}</span>
                            <span className="text-[10px] text-slate-400">{new Date(b.createdAt).toLocaleDateString()}</span>
                          </td>
                          <td className="py-4">
                            <span className="block text-slate-800">{b.userEmail}</span>
                            <span className="text-[10px] text-slate-400">headcount: {b.groupSize}</span>
                          </td>
                          <td className="py-4">
                            <span className="block text-slate-800">{b.trekName}</span>
                            <span className="text-[10px] text-slate-400">{b.batch.split(' (')[0]}</span>
                          </td>
                          <td className="py-4 text-[#0a251c] font-bold">₹{b.totalCost.toLocaleString('en-IN')}</td>
                          <td className="py-4">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${b.status === 'Paid' || b.status === 'Completed' ? 'bg-green-100 text-green-800' : b.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <select 
                                value={b.status}
                                onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                                className="h-7 px-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 focus:outline-none"
                              >
                                <option value="Inquiry">Inquiry</option>
                                <option value="Approved">Approved</option>
                                <option value="Paid">Paid</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>

                              {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                                <button 
                                  onClick={() => {
                                    if (window.confirm(`Cancel booking ${b.id}?`)) cancelBooking(b.id);
                                  }}
                                  className="h-7 px-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                                  title="Cancel booking"
                                >
                                  Cancel
                                </button>
                              )}

                              <button 
                                onClick={() => {
                                  if (window.confirm(`Permanently delete booking ${b.id}?`)) deleteBooking(b.id);
                                }}
                                className="h-7 px-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center"
                                title="Delete booking record"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 space-y-2">
                  <Calendar size={40} className="text-slate-200 mx-auto" />
                  <p className="text-slate-muted text-sm">No reservations records found.</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Treks Catalog Tab Content */}
          {activeTab === 'catalog' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0a251c]">Commercial Treks Catalog</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage live treks, edit price amounts, duration, altitude, or add new commercial trails.</p>
                </div>
                <button
                  onClick={() => setIsAddTrekOpen(true)}
                  className="h-10 px-4 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md border-none"
                >
                  <Plus size={16} />
                  Add New Trek
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search trek by name or region (e.g. Kedarkantha, Himachal)..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#e28743] focus:outline-none"
                />
              </div>

              {/* Treks List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {treks
                  .filter(t => t.name.toLowerCase().includes(catalogSearch.toLowerCase()) || t.region.toLowerCase().includes(catalogSearch.toLowerCase()))
                  .map((t) => (
                    <div key={t.id} className="border border-slate-200 rounded-2xl p-4 hover:border-[#e28743]/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={t.image} 
                          alt={t.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs" 
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-[#0a251c]">{t.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-full">{t.region}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-orange-100 text-orange-800 font-bold rounded-full">{t.difficulty}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 font-medium">
                            Duration: {t.duration} Days | Altitude: {t.altitude} | Distance: {t.distance}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-auto">
                        <div className="text-right">
                          <span className="block text-xs text-slate-400 font-semibold uppercase">Base Price</span>
                          <span className="font-extrabold text-base text-[#0a251c]">₹{t.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          onClick={() => setEditingTrek(t)}
                          className="h-9 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
                        >
                          <Edit size={14} className="text-[#e28743]" />
                          Edit Details
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete trek "${t.name}" from the live catalog?`)) {
                              deleteTrek(t.id);
                            }
                          }}
                          className="h-9 px-2.5 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl transition-all flex items-center cursor-pointer bg-transparent"
                          title="Delete Trek"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 3. Batches Coordinator Tab Content */}
          {activeTab === 'batches' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">Manage Departures</h3>

              {/* Add New Batch Form */}
              <form onSubmit={handleAddBatch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Select Trek</label>
                  <select 
                    value={selectedTrekId} 
                    onChange={(e) => setSelectedTrekId(e.target.value)}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    {treks.map((t: Trek) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">New Date Range</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sep 18 - Sep 25"
                    value={newBatchDate}
                    onChange={(e) => setNewBatchDate(e.target.value)}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <button type="submit" className="h-10 bg-[#0a251c] hover:bg-[#154536] text-white font-bold text-xs rounded-xl cursor-pointer border-none">
                  Add Departure
                </button>
              </form>

              {/* List of current batches per trek */}
              <div className="space-y-4">
                {treks.slice(0, 5).map((t: Trek) => (
                  <div key={t.id} className="border border-slate-100 rounded-2xl p-4 space-y-2">
                    <h4 className="font-extrabold text-sm text-[#0a251c]">{t.name}</h4>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {t.batches && t.batches.map((batch: string, index: number) => (
                        <div key={index} className="bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1 text-[10px] font-semibold text-slate-600 flex items-center gap-2">
                          <span>{batch.split(' (')[0]}</span>
                          <button 
                            onClick={() => handleDeleteBatch(t.id, batch)}
                            className="text-red-500 hover:text-red-700 font-bold border-none bg-transparent cursor-pointer"
                            aria-label="Delete batch"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Coupons manager Tab Content */}
          {activeTab === 'coupons' && (
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3">Coupons Manager</h3>

              {/* Add New Coupon Form */}
              <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Coupon Code</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MONSOON15" 
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Discount (%)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(parseInt(e.target.value) || 10)}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="15% Off Monsoon Treks" 
                      value={newCouponDesc}
                      onChange={(e) => setNewCouponDesc(e.target.value)}
                      className="h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none flex-1"
                    />
                    <button type="submit" className="h-10 px-4 bg-[#0a251c] hover:bg-[#154536] text-white font-bold text-xs rounded-xl cursor-pointer border-none">
                      Create
                    </button>
                  </div>
                </div>
              </form>

              {/* Coupons List */}
              <div className="space-y-3">
                {coupons.map((c) => (
                  <div key={c.code} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#0a251c]">{c.code}</strong>
                        <span className="text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold uppercase">
                          {c.type === 'percentage' ? `${c.value}% Off` : `₹${c.value} Off`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{c.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteCoupon(c.code)}
                      className="h-9 px-3 border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl transition-all cursor-pointer bg-transparent"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Add Trek Modal Overlay */}
      {isAddTrekOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in my-8">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <h3 className="text-lg font-bold text-[#0a251c]">Add New Commercial Trek</h3>
              <button onClick={() => setIsAddTrekOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg bg-transparent border-none cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleAddTrekSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Trek Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Kedarkantha Winter Summit" 
                  value={newTrekName} 
                  onChange={(e) => setNewTrekName(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Region</label>
                  <select 
                    value={newTrekRegion} 
                    onChange={(e) => setNewTrekRegion(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none bg-white"
                  >
                    <option value="Himachal">Himachal</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">Difficulty</label>
                  <select 
                    value={newTrekDifficulty} 
                    onChange={(e) => setNewTrekDifficulty(e.target.value as any)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Demanding">Demanding</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Price Amount (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={newTrekPrice} 
                    onChange={(e) => setNewTrekPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">Duration (Days)</label>
                  <input 
                    type="number" 
                    required 
                    value={newTrekDuration} 
                    onChange={(e) => setNewTrekDuration(Number(e.target.value))}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Max Altitude</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 12,500 ft" 
                    value={newTrekAltitude} 
                    onChange={(e) => setNewTrekAltitude(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">Trail Distance</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 38 km" 
                    value={newTrekDistance} 
                    onChange={(e) => setNewTrekDistance(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Image URL / Path</label>
                <input 
                  type="text" 
                  required 
                  value={newTrekImage} 
                  onChange={(e) => setNewTrekImage(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Description</label>
                <textarea 
                  rows={3} 
                  placeholder="Summary of the trek experience..." 
                  value={newTrekDesc} 
                  onChange={(e) => setNewTrekDesc(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddTrekOpen(false)} className="h-10 px-4 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer bg-transparent">Cancel</button>
                <button type="submit" className="h-10 px-5 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white font-bold text-xs rounded-xl cursor-pointer border-none shadow-md">Add Trek</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Trek Modal Overlay */}
      {editingTrek && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in my-8">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <h3 className="text-lg font-bold text-[#0a251c]">Edit Trek: {editingTrek.name}</h3>
              <button onClick={() => setEditingTrek(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg bg-transparent border-none cursor-pointer">✕</button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                updateTrek(editingTrek.id, editingTrek);
                setEditingTrek(null);
                alert(`Updated details and pricing for ${editingTrek.name}!`);
              }} 
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-bold text-slate-700">Trek Name</label>
                <input 
                  type="text" 
                  value={editingTrek.name} 
                  onChange={(e) => setEditingTrek({ ...editingTrek, name: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Price Amount (₹)</label>
                  <input 
                    type="number" 
                    value={editingTrek.price} 
                    onChange={(e) => setEditingTrek({ ...editingTrek, price: Number(e.target.value) })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-bold text-[#0a251c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">Duration (Days)</label>
                  <input 
                    type="number" 
                    value={editingTrek.duration} 
                    onChange={(e) => setEditingTrek({ ...editingTrek, duration: Number(e.target.value) })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700">Region</label>
                  <input 
                    type="text" 
                    value={editingTrek.region} 
                    onChange={(e) => setEditingTrek({ ...editingTrek, region: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700">Altitude</label>
                  <input 
                    type="text" 
                    value={editingTrek.altitude} 
                    onChange={(e) => setEditingTrek({ ...editingTrek, altitude: e.target.value })}
                    className="w-full h-10 px-3 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700">Description</label>
                <textarea 
                  rows={3} 
                  value={editingTrek.description} 
                  onChange={(e) => setEditingTrek({ ...editingTrek, description: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setEditingTrek(null)} className="h-10 px-4 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer bg-transparent">Cancel</button>
                <button type="submit" className="h-10 px-5 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white font-bold text-xs rounded-xl cursor-pointer border-none shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
