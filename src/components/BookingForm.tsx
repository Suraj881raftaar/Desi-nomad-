import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { treksData } from '../data/treks';
import { Calculator, CheckCircle2, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  preselectedTrekId: string;
}

// Go to https://web3forms.com to get your free access key
const WEB3FORMS_ACCESS_KEY: string = "3dbdb3a7-f0f0-44fd-af2b-071e30fdc587";

export default function BookingForm({ preselectedTrekId }: BookingFormProps) {
  const [selectedTrekId, setSelectedTrekId] = useState(preselectedTrekId || treksData[0].id);
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

  // Sync state if prop changes (e.g. user clicked "Book Now" on a specific trek card)
  useEffect(() => {
    if (preselectedTrekId) {
      setSelectedTrekId(preselectedTrekId);
    }
  }, [preselectedTrekId]);

  const currentTrek = treksData.find((t) => t.id === selectedTrekId) || treksData[0];
  const offloadCostPerDay = 1200; // INR per day

  // Dynamic cost calculation
  const baseCost = currentTrek.price * groupSize;
  const offloadCost = offloadBackpack ? (offloadCostPerDay * currentTrek.duration * groupSize) : 0;
  const totalCost = baseCost + offloadCost;

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
    
    if (!date) newErrors.date = 'Preferred departure date is required';
    if (groupSize < 1) newErrors.groupSize = 'Group size must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);

    // If the user hasn't set up the API key yet, bypass API call for local testing
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
          total_cost: `₹${totalCost.toLocaleString('en-IN')}`,
          message: questions,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.message || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="section booking-section">
      <div className="section-title">
        <h2>Booking & Inquiry</h2>
        <p>Estimate costs and secure your spot on the trails. Our team will contact you within 24 hours.</p>
      </div>

      <div className="grid-2 booking-layout">
        {/* Cost Calculator Section */}
        <div className="calculator-card card">
          <div className="card-header-accent">
            <Calculator size={20} />
            <h3>Trek Cost Estimator</h3>
          </div>
          <div className="calculator-body">
            <div className="calc-row">
              <span>Trek Selected:</span>
              <strong>{currentTrek.name}</strong>
            </div>
            <div className="calc-row">
              <span>Base Price (₹{currentTrek.price.toLocaleString('en-IN')} × {groupSize}):</span>
              <span>₹{baseCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-row">
              <span>Backpack Offloading:</span>
              <span>{offloadBackpack ? `₹${(offloadCostPerDay * currentTrek.duration).toLocaleString('en-IN')} per person` : 'None'}</span>
            </div>
            {offloadBackpack && (
              <div className="calc-row sub-row">
                <span>(₹{offloadCostPerDay} × {currentTrek.duration} Days × {groupSize}):</span>
                <span>+ ₹{offloadCost.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="calc-divider" />
            <div className="calc-total">
              <span>Total Estimated Price:</span>
              <span className="total-amount">₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="calc-footer-info">
              <p>*Price includes expert guiding, permits, camping gears, homestays, and all meals on the trek. Does not include travel to base camp.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-card card">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="booking-form">
              <h3>Secure Your Spot</h3>
              
              <div className="form-group">
                <label htmlFor="trek-select">Choose Adventure *</label>
                <select 
                  id="trek-select" 
                  value={selectedTrekId}
                  onChange={(e) => setSelectedTrekId(e.target.value)}
                >
                  {treksData.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.region})</option>
                  ))}
                </select>
              </div>

              <div className="grid-2 form-row-compact">
                <div className="form-group">
                  <label htmlFor="name-input">Full Name *</label>
                  <input
                    type="text"
                    id="name-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email-input">Email Address *</label>
                  <input
                    type="email"
                    id="email-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="grid-2 form-row-compact">
                <div className="form-group">
                  <label htmlFor="phone-input">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    id="phone-input"
                    placeholder="10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="date-input">Departure Date *</label>
                  <input
                    type="date"
                    id="date-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={errors.date ? 'input-error' : ''}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>
              </div>

              <div className="grid-2 form-row-compact">
                <div className="form-group">
                  <label htmlFor="group-size-input">Number of Trekkers *</label>
                  <input
                    type="number"
                    id="group-size-input"
                    min="1"
                    max="20"
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                    className={errors.groupSize ? 'input-error' : ''}
                  />
                  {errors.groupSize && <span className="error-text">{errors.groupSize}</span>}
                </div>

                <div className="form-group checkbox-form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={offloadBackpack}
                      onChange={(e) => setOffloadBackpack(e.target.checked)}
                    />
                    <span>Offload backpack (carry only daypack)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="questions-input">Questions & Special Requests</label>
                <textarea
                  id="questions-input"
                  rows={3}
                  placeholder="Medical conditions, food preferences, flight arrivals..."
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
              </button>
            </form>
          ) : (
            <div className="booking-success animate-fade">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Inquiry Received!</h3>
              <p>Thank you, <strong>{name}</strong>. We have registered your request for the <strong>{currentTrek.name}</strong>.</p>
              
              <div className="ticket-receipt">
                <div className="ticket-row">
                  <span>Departure Date:</span>
                  <span>{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="ticket-row">
                  <span>Group Size:</span>
                  <span>{groupSize} Nomad(s)</span>
                </div>
                <div className="ticket-row">
                  <span>Total Estimated Price:</span>
                  <strong>₹{totalCost.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="success-instructions">
                <h4>What Happens Next?</h4>
                <ol>
                  <li>Our trek leads will check batch availability and review your details.</li>
                  <li>We will email/WhatsApp you a secure **Razorpay payment link** for the ₹2,000 token deposit.</li>
                  <li>Once payment is received, your booking is confirmed and you receive the trek preparation pack!</li>
                </ol>
              </div>

              <div className="success-actions">
                <a 
                  href={`https://wa.me/919450551538?text=Hi%20Desi%20Nomad,%20I%20just%20submitted%20an%20inquiry%20for%20the%20${encodeURIComponent(currentTrek.name)}%20for%20${groupSize}%20people.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary w-full"
                >
                  <MessageSquare size={18} />
                  Chat on WhatsApp
                </a>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-outline w-full btn-text">
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
