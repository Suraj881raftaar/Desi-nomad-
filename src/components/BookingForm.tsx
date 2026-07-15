import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { treksData, getTrekByIdOrAlias } from '../data/treks';
import { CheckCircle2, MessageSquare, ShieldAlert, Sparkles, User, Mail, Phone, Calendar, Users, Briefcase } from 'lucide-react';

interface BookingFormProps {
  preselectedTrekId: string;
}

const WEB3FORMS_ACCESS_KEY: string = "3dbdb3a7-f0f0-44fd-af2b-071e30fdc587";

export default function BookingForm({ preselectedTrekId }: BookingFormProps) {
  const initialTrek = getTrekByIdOrAlias(preselectedTrekId) || treksData[0];
  const [selectedTrekId, setSelectedTrekId] = useState(initialTrek.id);
  const [trekNotFound, setTrekNotFound] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [offloadBackpack, setOffloadBackpack] = useState(false);
  const [questions, setQuestions] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedTrekId) {
      const match = getTrekByIdOrAlias(preselectedTrekId);
      if (!match) {
        setTrekNotFound(true);
        const timer = setTimeout(() => {
          // Redirect back to home treks page
          window.history.pushState(null, '', import.meta.env.BASE_URL || '/');
          window.dispatchEvent(new Event('popstate'));
          
          setTimeout(() => {
            const el = document.getElementById('treks');
            if (el) {
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = el.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }, 150);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setTrekNotFound(false);
        setSelectedTrekId(match.id);
      }
    } else {
      setTrekNotFound(false);
    }
  }, [preselectedTrekId]);

  useEffect(() => {
    setDate('');
  }, [selectedTrekId]);

  const handleTrekChange = (newTrekId: string) => {
    setSelectedTrekId(newTrekId);
    // Push new query URL to synchronize with browser back/forward history actions
    const base = import.meta.env.BASE_URL || '/';
    window.history.pushState(null, '', `${base}book?trek=${newTrekId}`);
  };

  const currentTrek = treksData.find((t) => t.id === selectedTrekId) || treksData[0];
  const offloadCostPerDay = 350;

  const baseCost = currentTrek.price * groupSize;
  const offloadCost = offloadBackpack ? (offloadCostPerDay * currentTrek.duration * groupSize) : 0;
  const totalCost = baseCost + offloadCost;
  const gstCost = Math.round(totalCost * 0.05);
  const grandTotal = totalCost + gstCost;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    
    if (!date) newErrors.date = 'Departure batch selection is required';
    if (groupSize < 1) newErrors.groupSize = 'Group size must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      console.log("Mocking form submission. Access key not set.");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          phone: phone,
          date: date,
          trek: currentTrek.name,
          group_size: groupSize,
          offload_backpack: offloadBackpack ? "Yes" : "No",
          total_cost: `₹${grandTotal.toLocaleString('en-IN')}`,
          message: questions,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'Failed to send inquiry. Please check your network connection.' });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="py-16 md:py-24 bg-gradient-to-b from-primary-light to-[#f8faf9]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10">
        
        {/* Premium Hero Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-1 bg-[#e28743]/10 border border-[#e28743]/20 rounded-full px-3 py-1 text-[#e28743] font-semibold text-xs uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            <span>Secure Checkout</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a251c] tracking-tight mb-3">
            Book Your Adventure
          </h2>
          <p className="text-slate-muted text-sm md:text-base leading-relaxed">
            Reserve your trek in just a few minutes. Submit your request, and our certified trek guides will confirm slot availability with instructions to secure your spot.
          </p>
        </div>

        {trekNotFound ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 text-center space-y-6 animate-fade-in">
            <ShieldAlert size={56} className="text-[#e28743] mx-auto" />
            <h3 className="text-xl md:text-2xl font-extrabold text-[#0a251c]">Trek Not Found</h3>
            <p className="text-slate-muted text-sm leading-relaxed">
              We couldn't find a matching adventure for the requested trail parameters. Redirecting you back to our trek finder in 3 seconds...
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-500 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-[#e28743] animate-ping" />
              <span>Redirecting...</span>
            </div>
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Interactive Inputs (Left Column - Spans 2) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 space-y-6">
              <h3 className="text-lg md:text-xl font-bold text-[#0a251c] border-b border-slate-100 pb-4 mb-4">
                Trekker Details
              </h3>
              
              {/* Choose Adventure */}
              <div className="flex flex-col">
                <label htmlFor="trek-select" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                  <Briefcase size={16} className="text-[#e28743]" />
                  Choose Adventure *
                </label>
                <div className="relative">
                  <select 
                    id="trek-select" 
                    value={selectedTrekId}
                    onChange={(e) => handleTrekChange(e.target.value)}
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 cursor-pointer appearance-none"
                  >
                    {treksData.map((t) => (
                      <option key={t.id} value={t.id}>{t.name} ({t.region})</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                </div>
              </div>

              {/* Full Name & Email Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="name-input" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                    <User size={16} className="text-[#e28743]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full h-12 px-4 border rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 ${errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 font-medium">{errors.name}</span>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email-input" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                    <Mail size={16} className="text-[#e28743]" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full h-12 px-4 border rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.email && <span className="text-xs text-red-500 mt-1 font-medium">{errors.email}</span>}
                </div>
              </div>

              {/* Mobile Number & Upcoming Departure Batch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="phone-input" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                    <Phone size={16} className="text-[#e28743]" />
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    id="phone-input"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full h-12 px-4 border rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 ${errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.phone && <span className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</span>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="date-input" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                    <Calendar size={16} className="text-[#e28743]" />
                    Upcoming Departure Batch *
                  </label>
                  <div className="relative">
                    <select
                      id="date-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full h-12 px-4 border rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 cursor-pointer appearance-none ${errors.date ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50'}`}
                    >
                      <option value="">-- Choose Departure Batch --</option>
                      {currentTrek.batches && currentTrek.batches.map((batch, idx) => (
                        <option key={idx} value={batch}>{batch}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                  </div>
                  {errors.date && <span className="text-xs text-red-500 mt-1 font-medium">{errors.date}</span>}
                </div>
              </div>

              {/* Number of Trekkers & Backpack Option */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="flex flex-col">
                  <label htmlFor="group-size-input" className="text-sm font-semibold text-[#1e293b] mb-2 flex items-center gap-1.5">
                    <Users size={16} className="text-[#e28743]" />
                    Number of Trekkers *
                  </label>
                  <input
                    type="number"
                    id="group-size-input"
                    min="1"
                    max="20"
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                    className={`w-full h-12 px-4 border rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 ${errors.groupSize ? 'border-red-500 bg-red-50/20' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.groupSize && <span className="text-xs text-red-500 mt-1 font-medium">{errors.groupSize}</span>}
                </div>

                <div className="flex items-center h-12 mt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={offloadBackpack}
                      onChange={(e) => setOffloadBackpack(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-[#e28743] focus:ring-[#e28743] accent-[#e28743]"
                    />
                    <span className="text-sm font-semibold text-slate-700">Offload backpack (carry only daypack)</span>
                  </label>
                </div>
              </div>

              {/* Questions & Requests */}
              <div className="flex flex-col">
                <label htmlFor="questions-input" className="text-sm font-semibold text-[#1e293b] mb-2">
                  Questions & Special Requests
                </label>
                <textarea
                  id="questions-input"
                  rows={3}
                  placeholder="Medical conditions, food preferences, flight arrivals..."
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none hover:border-[#e28743]/50 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Health Notice Warning */}
              {currentTrek.safetyFitness.medicalFormRequired && (
                <div className="flex items-start gap-3 bg-[#e28743]/5 border border-[#e28743]/15 rounded-2xl p-4 text-[#0a251c]">
                  <ShieldAlert size={18} className="text-[#e28743] flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm leading-relaxed">
                    <strong>Mandatory Health Notice:</strong> Since this route exceeds 10,000 ft altitude, a signed **Medical Fitness Certificate** is mandatory. We will email you the template bundle.
                  </span>
                </div>
              )}
            </div>

            {/* Sticky Booking Summary Card (Right Column - Spans 1) */}
            <div className="lg:sticky lg:top-24 bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col space-y-6">
              <h3 className="text-lg font-bold text-[#0a251c] border-b border-slate-100 pb-3 mb-2">
                Booking Summary
              </h3>

              <div className="space-y-4 text-sm font-medium text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Selected Trek:</span>
                  <span className="text-[#0a251c] font-bold text-right">{currentTrek.name}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Base Price (₹{currentTrek.price.toLocaleString('en-IN')} × {groupSize}):</span>
                  <span className="text-slate-700 font-semibold">₹{baseCost.toLocaleString('en-IN')}</span>
                </div>

                {offloadBackpack && (
                  <div className="flex justify-between items-center text-xs text-[#e28743] pl-2 border-l-2 border-[#e28743]">
                    <span>Backpack Offload (₹350 × {currentTrek.duration} days × {groupSize}):</span>
                    <span>+ ₹{offloadCost.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Taxes & Service Fees (5% GST):</span>
                  <span>₹{gstCost.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-end">
                  <span className="font-bold text-base text-[#0a251c]">Grand Total:</span>
                  <span className="font-extrabold text-2xl text-[#e28743]">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {errors.submit && <div className="text-xs text-red-500 font-semibold text-center">{errors.submit}</div>}

              {/* Submit CTA Trigger */}
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-12 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#e28743] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-[1px] active:translate-y-0"
              >
                {isSubmitting ? 'Sending Request...' : 'Book Adventure'}
              </button>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center">
                <p className="text-[10px] md:text-xs text-slate-muted leading-normal">
                  *Inquiry includes NIM/HMI guides, permits, gear, homestays, and all meals on the trail. Transport to base village not included.
                </p>
              </div>
            </div>

          </form>
        ) : (
          /* Receipt Card Panel */
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-100 text-center space-y-6 animate-fade-in">
            <CheckCircle2 size={56} className="text-green-500 mx-auto" />
            <h3 className="text-xl md:text-2xl font-extrabold text-[#0a251c]">Inquiry Received!</h3>
            <p className="text-slate-muted text-sm leading-relaxed">
              Thank you, <strong>{name}</strong>. We have registered your request for the <strong>{currentTrek.name}</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left text-sm space-y-3 font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Selected Batch:</span>
                <span className="text-slate-800 font-bold">{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Group Size:</span>
                <span className="text-slate-800 font-bold">{groupSize} Nomad(s)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200/50 pt-2.5">
                <span>Total Estimated Price:</span>
                <strong className="text-[#e28743] font-extrabold text-base">₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="text-left bg-[#e28743]/5 border border-[#e28743]/15 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs md:text-sm font-bold text-[#0a251c] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#e28743]" />
                What Happens Next?
              </h4>
              <ol className="list-decimal pl-4 text-xs text-slate-700 space-y-1.5 leading-normal">
                <li>Our trek coordinators will verify batch slot counts and review your request.</li>
                <li>We will send a secure **Razorpay token link** (₹2,000) via email or WhatsApp.</li>
                <li>Once paid, your slots are locked and you receive the preparation handbook!</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href={`https://wa.me/919450551538?text=Hi%20Desi%20Nomad%20Trails,%20I%20just%20submitted%20an%20inquiry%20for%20the%20${encodeURIComponent(currentTrek.name)}%20for%20${groupSize}%20people%20for%20the%20batch%20${encodeURIComponent(date)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <MessageSquare size={18} />
                Chat on WhatsApp
              </a>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="flex-1 h-12 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all duration-200"
              >
                Submit New Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
