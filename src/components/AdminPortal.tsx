import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { treksData } from '../data/treks';
import { ShieldAlert, BarChart3, Calendar, Tag, CheckCircle2, ArrowUpRight, DollarSign, Users, Briefcase } from 'lucide-react';

export default function AdminPortal() {
  const { currentUser, bookings, updateBookingStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'batches' | 'coupons'>('analytics');
  
  // Custom coupon codes database in local state for admin demo
  const [coupons, setCoupons] = useState([
    { code: 'TRAILS10', type: 'percentage', value: 10, desc: '10% Off total booking cost' },
    { code: 'NOMAD20', type: 'flat', value: 2000, desc: '₹2,000 Flat discount' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(10);
  const [newCouponDesc, setNewCouponDesc] = useState('');
  
  // Custom batch local state for demo management
  const [localTreks, setLocalTreks] = useState(treksData);
  const [selectedTrekId, setSelectedTrekId] = useState(treksData[0].id);
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

    const updated = localTreks.map(t => {
      if (t.id === selectedTrekId) {
        return {
          ...t,
          batches: [...(t.batches || []), `${newBatchDate} (Slots Available)`]
        };
      }
      return t;
    });
    
    setLocalTreks(updated);
    setNewBatchDate('');
    alert('Departure batch successfully added!');
  };

  const handleDeleteBatch = (trekId: string, batchToDelete: string) => {
    const updated = localTreks.map(t => {
      if (t.id === trekId) {
        return {
          ...t,
          batches: (t.batches || []).filter(b => b !== batchToDelete)
        };
      }
      return t;
    });
    setLocalTreks(updated);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16">
      
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
                            {b.status !== 'Paid' && b.status !== 'Completed' ? (
                              <button 
                                onClick={() => updateBookingStatus(b.id, 'Paid', `PAY-MOCK-${Math.floor(1000 + Math.random() * 9000)}`)}
                                className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[10px] font-bold transition-all border-none cursor-pointer"
                              >
                                Mark Paid
                              </button>
                            ) : (
                              <span className="text-[10px] text-green-600 font-bold flex items-center justify-end gap-1">
                                <CheckCircle2 size={12} /> Confirmed
                              </span>
                            )}
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
                    {localTreks.map(t => (
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
                {localTreks.slice(0, 5).map(t => (
                  <div key={t.id} className="border border-slate-100 rounded-2xl p-4 space-y-2">
                    <h4 className="font-extrabold text-sm text-[#0a251c]">{t.name}</h4>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {t.batches && t.batches.map((batch, index) => (
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
    </div>
  );
}
