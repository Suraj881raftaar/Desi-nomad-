import { useState } from 'react';
import { Shield, Check, Heart, Recycle, Compass, Sparkles, Award } from 'lucide-react';

interface Pledge {
  id: number;
  text: string;
  category: string;
  icon: React.ReactNode;
}

export default function EcoPledge() {
  const [pledges, setPledges] = useState<number[]>([]);
  const [userName, setUserName] = useState('');

  const handleDownloadCertificate = () => {
    if (!userName.trim()) return;
    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="#fcfbf7" />
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#0a251c" stroke-width="8" />
      <rect x="32" y="32" width="736" height="536" fill="none" stroke="#e28743" stroke-width="2" />
      
      <text x="400" y="110" font-family="'Outfit', sans-serif" font-size="32" font-weight="bold" fill="#0a251c" text-anchor="middle">CERTIFICATE OF RECOGNITION</text>
      <text x="400" y="150" font-family="'Inter', sans-serif" font-size="12" fill="#64748b" text-anchor="middle" letter-spacing="2">GREEN TRAILS ECO-NOMAD PLEDGE</text>
      
      <line x1="200" y1="180" x2="600" y2="180" stroke="#e28743" stroke-width="2" />
      
      <text x="400" y="230" font-family="'Inter', sans-serif" font-size="16" fill="#1e293b" text-anchor="middle">This is proudly awarded to</text>
      
      <text x="400" y="300" font-family="'Outfit', sans-serif" font-size="38" font-weight="bold" fill="#e28743" text-anchor="middle">${userName.toUpperCase()}</text>
      <line x1="250" y1="320" x2="550" y2="320" stroke="#0a251c" stroke-width="1" />
      
      <text x="400" y="370" font-family="'Inter', sans-serif" font-size="15" fill="#1e293b" text-anchor="middle">for successfully taking the Green Trails Pledge and committing to</text>
      <text x="400" y="395" font-family="'Inter', sans-serif" font-size="15" font-weight="bold" fill="#0a251c" text-anchor="middle">Mindful, Sustainable, and Zero-Waste Adventure Travel in India</text>
      <text x="400" y="420" font-family="'Inter', sans-serif" font-size="14" fill="#64748b" text-anchor="middle">with Desi Nomad Adventures.</text>
      
      <text x="250" y="500" font-family="'Inter', sans-serif" font-size="11" fill="#64748b" text-anchor="middle">DATE</text>
      <text x="250" y="525" font-family="'Inter', sans-serif" font-size="14" font-weight="bold" fill="#1e293b" text-anchor="middle">${dateStr}</text>
      
      <text x="550" y="500" font-family="'Inter', sans-serif" font-size="11" fill="#64748b" text-anchor="middle">ISSUING BODY</text>
      <text x="550" y="525" font-family="'Outfit', sans-serif" font-size="15" font-weight="bold" fill="#0a251c" text-anchor="middle">DESI NOMAD CLUB</text>
      
      <circle cx="400" cy="510" r="30" fill="#0a251c" />
      <polygon points="400,490 408,510 400,518 392,510" fill="#eab308" />
      <polygon points="400,530 408,510 400,502 392,510" fill="#f8faf9" />
    </svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DesiNomad_EcoPledge_Certificate_${userName.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const pledgeList: Pledge[] = [
    {
      id: 1,
      text: 'Carry reusable water bottles and thermoses, completely avoiding single-use plastic water bottles on the trail.',
      category: 'Waste',
      icon: <Recycle size={18} />
    },
    {
      id: 2,
      text: 'Pack out all waste (dry or wet), including snack wrappers, fruit peels, and toilet tissues. Leave no scrap behind.',
      category: 'Waste',
      icon: <Shield size={18} />
    },
    {
      id: 3,
      text: 'Stay strictly on marked paths to avoid damaging fragile high-altitude vegetation and accelerating soil erosion.',
      category: 'Nature',
      icon: <Compass size={18} />
    },
    {
      id: 4,
      text: 'Never feed wildlife or birds, wash utensils directly in natural streams, or pluck local wildflowers.',
      category: 'Nature',
      icon: <Heart size={18} />
    },
    {
      id: 5,
      text: 'Use local home stays, buy village produce, and hire local guides to keep the financial benefits within mountain communities.',
      category: 'Community',
      icon: <Sparkles size={18} />
    }
  ];

  const handlePledgeToggle = (id: number) => {
    if (pledges.includes(id)) {
      setPledges(pledges.filter((pId) => pId !== id));
    } else {
      setPledges([...pledges, id]);
    }
  };

  const getImpactStatus = (count: number) => {
    if (count === 0) return { title: 'Standard Traveler', desc: 'Take the pledge to become a mindful explorer.', color: '#ef4444' };
    if (count <= 2) return { title: 'Conscious Nomad', desc: 'Good start! Try adopting a few more green habits.', color: '#f59e0b' };
    if (count <= 4) return { title: 'Green Trails Defender', desc: 'Impressive! You are actively protecting the mountains.', color: '#10b981' };
    return { title: 'Zero-Waste Guardian', desc: 'Outstanding! You represent the pinnacle of eco-friendly trekking.', color: '#059669' };
  };

  const status = getImpactStatus(pledges.length);

  return (
    <section id="eco" className="section eco-section">
      <div className="section-title">
        <h2>Eco-Friendly Initiatives</h2>
        <p>Our Green Trails policy aims to leave the mountains cleaner than we found them.</p>
      </div>

      <div className="grid-2 eco-layout">
        <div className="eco-info">
          <h3>Green Trails Policy</h3>
          <p>
            Trekking in India has surged, but the trails are facing a waste crisis. At Desi Nomad, we believe we must act as guardians of the wilderness. That's why we enforce a strict **zero-waste code**.
          </p>
          <p>
            Our teams pack out all dry waste generated on treks. We also collaborate with local village panchayats to carry out periodic trail cleanups and install waste disposal systems.
          </p>
          
          <div className="impact-meter card">
            <h4>Your Eco-Nomad Status</h4>
            <div className="status-indicator">
              <span className="status-badge" style={{ backgroundColor: status.color + '20', color: status.color, border: `1px solid ${status.color}` }}>
                {status.title}
              </span>
              <span className="status-score">{pledges.length} / 5 Checked</span>
            </div>
            <p className="status-description">{status.desc}</p>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(pledges.length / 5) * 100}%`, backgroundColor: status.color }} 
              />
            </div>
            
            {pledges.length === 5 && (
              <div className="certificate-unlock animate-fade">
                <h5>
                  <Award size={18} />
                  Eco-Nomad Certificate Unlocked!
                </h5>
                <p>Enter your full name to download your personalized honor certificate:</p>
                <div className="certificate-input-group">
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                  />
                  <button 
                    onClick={handleDownloadCertificate} 
                    disabled={!userName.trim()} 
                    className="btn btn-primary btn-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="eco-pledges">
          <h3>Take the Eco-Nomad Pledge</h3>
          <p className="pledges-subtitle">Click the pledges below to commit to responsible, low-impact travel:</p>
          
          <div className="pledge-list">
            {pledgeList.map((pledge) => {
              const isChecked = pledges.includes(pledge.id);
              return (
                <div 
                  key={pledge.id} 
                  className={`pledge-item card ${isChecked ? 'active' : ''}`}
                  onClick={() => handlePledgeToggle(pledge.id)}
                >
                  <div className={`pledge-checkbox ${isChecked ? 'checked' : ''}`}>
                    {isChecked ? <Check size={14} /> : null}
                  </div>
                  <div className="pledge-content-wrap">
                    <span className="pledge-category">{pledge.category}</span>
                    <p className="pledge-text">{pledge.text}</p>
                  </div>
                  <div className="pledge-icon-wrap">
                    {pledge.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
