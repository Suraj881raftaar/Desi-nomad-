import { useState } from 'react';
import { Shield, Check, Heart, Recycle, Compass, Sparkles, Award } from 'lucide-react';

interface Pledge {
  id: number;
  text: string;
  category: string;
  icon: React.ReactNode;
}

// 3D Geometric Gold/Emerald Certificate Generator Function
const getCertificateSvg = (userName: string, dateStr: string) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <!-- Premium Gold Gradients -->
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b8860b" />
        <stop offset="25%" stop-color="#e6c66e" />
        <stop offset="50%" stop-color="#d4af37" />
        <stop offset="75%" stop-color="#f3e5ab" />
        <stop offset="100%" stop-color="#aa7c11" />
      </linearGradient>
      
      <!-- Deep Forest Emerald Gradient -->
      <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0a251c" />
        <stop offset="100%" stop-color="#144837" />
      </linearGradient>
      
      <!-- 3D Poly Geometric Mesh Gradient -->
      <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#e28743" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#0a251c" stop-opacity="0.03" />
      </linearGradient>
      
      <!-- Real Drop Shadows -->
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#0a251c" flood-opacity="0.15" />
      </filter>
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="glow1">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Background Layer -->
    <rect width="800" height="600" fill="#fbfbfa" />
    
    <!-- 3D Low-Poly Corner Meshes -->
    <path d="M 0,0 L 250,0 L 0,180 Z" fill="url(#meshGrad)" />
    <path d="M 800,0 L 550,0 L 800,180 Z" fill="url(#meshGrad)" />
    <path d="M 0,600 L 200,600 L 0,450 Z" fill="url(#meshGrad)" />
    <path d="M 800,600 L 600,600 L 800,450 Z" fill="url(#meshGrad)" />
    
    <!-- Outer 3D Gold Border -->
    <rect x="25" y="25" width="750" height="550" fill="none" stroke="url(#goldGrad)" stroke-width="6" rx="8" filter="url(#shadow)" />
    
    <!-- Inner Forest Border -->
    <rect x="40" y="40" width="720" height="520" fill="none" stroke="url(#forestGrad)" stroke-width="2" rx="4" />
    
    <!-- Inner Gold Filigree Corner Accents -->
    <path d="M 45,65 L 65,45 L 95,45 M 45,75 L 75,45" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <path d="M 755,65 L 735,45 L 705,45 M 755,75 L 725,45" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <path d="M 45,535 L 65,555 L 95,555 M 45,525 L 75,555" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    <path d="M 755,535 L 735,555 L 705,555 M 755,525 L 725,555" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" />
    
    <!-- Certificate Content Header -->
    <text x="400" y="110" font-family="'Outfit', sans-serif" font-size="34" font-weight="900" fill="url(#forestGrad)" text-anchor="middle" letter-spacing="1">CERTIFICATE OF RECOGNITION</text>
    <text x="400" y="145" font-family="'Inter', sans-serif" font-size="11" font-weight="bold" fill="#e28743" text-anchor="middle" letter-spacing="3.5">GREEN TRAILS ECO-NOMAD PLEDGE</text>
    
    <!-- Decorative Center divider -->
    <path d="M 300,175 L 390,175 L 400,180 L 410,175 L 500,175" fill="none" stroke="url(#goldGrad)" stroke-width="2" />
    
    <!-- Main Body Text -->
    <text x="400" y="235" font-family="'Inter', sans-serif" font-size="15" font-style="italic" fill="#475569" text-anchor="middle">This is honorably awarded to</text>
    
    <text x="400" y="305" font-family="'Outfit', sans-serif" font-size="40" font-weight="900" fill="url(#forestGrad)" text-anchor="middle" filter="url(#goldGlow)">${userName.toUpperCase() || 'YOUR NAME'}</text>
    <line x1="220" y1="325" x2="580" y2="325" stroke="url(#goldGrad)" stroke-width="1.5" />
    
    <text x="400" y="375" font-family="'Inter', sans-serif" font-size="15" fill="#475569" text-anchor="middle">for successfully taking the Green Trails Pledge and committing to</text>
    <text x="400" y="405" font-family="'Outfit', sans-serif" font-size="17" font-weight="bold" fill="#e28743" text-anchor="middle">Sustainable, Low-Impact, &amp; Zero-Waste Mountain Trekking</text>
    <text x="400" y="430" font-family="'Inter', sans-serif" font-size="14" fill="#64748b" text-anchor="middle">with Desi Nomad Trails.</text>
    
    <!-- Signatures and Details -->
    <line x1="160" y1="510" x2="300" y2="510" stroke="#cbd5e1" stroke-width="1" />
    <text x="230" y="525" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" fill="#94a3b8" text-anchor="middle">DATE ASSIGNED</text>
    <text x="230" y="495" font-family="'Inter', sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">${dateStr}</text>
    
    <line x1="500" y1="510" x2="640" y2="510" stroke="#cbd5e1" stroke-width="1" />
    <text x="570" y="525" font-family="'Inter', sans-serif" font-size="10" font-weight="bold" fill="#94a3b8" text-anchor="middle">ISSUING COORDINATOR</text>
    <text x="570" y="495" font-family="'Outfit', sans-serif" font-size="13" font-weight="bold" fill="#0a251c" text-anchor="middle">DESI NOMAD TRAILS</text>
    
    <!-- 3D Gold Ribbon Seal in Center -->
    <g transform="translate(400, 505)" filter="url(#shadow)">
      <!-- Ribbons -->
      <path d="M -15,0 L -25,45 L 0,35 L 25,45 L 15,0 Z" fill="#b8860b" opacity="0.85" />
      <path d="M -5,0 L -12,50 L 5,42 L 22,50 L 15,0 Z" fill="#aa7c11" />
      
      <!-- Seal base -->
      <circle cx="0" cy="0" r="28" fill="url(#goldGrad)" />
      <circle cx="0" cy="0" r="24" fill="none" stroke="#fcfbf7" stroke-width="1.5" stroke-dasharray="3" />
      <circle cx="0" cy="0" r="21" fill="none" stroke="#b8860b" stroke-width="1" />
      
      <!-- Inner star -->
      <polygon points="0,-12 3,-4 11,-4 5,1 7,9 0,4 -7,9 -5,1 -11,-4 -3,-4" fill="#fcfbf7" />
    </g>
  </svg>`;
};

export default function EcoPledge() {
  const [pledges, setPledges] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleDownloadCertificate = () => {
    if (!userName.trim()) return;
    const svgContent = getCertificateSvg(userName, dateStr);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate 3D tilt angles based on cursor offset from card center
    const tiltX = ((y - centerY) / centerY) * 12; // Max 12 deg tilt
    const tiltY = ((centerX - x) / centerX) * 12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
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
            Trekking in India has surged, but the trails are facing a waste crisis. At Desi Nomad Trails, we believe we must act as guardians of the wilderness. That's why we enforce a strict **zero-waste code**.
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
              <div className="certificate-unlock animate-fade space-y-4">
                <h5>
                  <Award size={18} />
                  Eco-Nomad Certificate Unlocked!
                </h5>
                <p>Enter your full name to see your personalized 3D preview and download the high-res SVG:</p>
                <div className="certificate-input-group">
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    className="w-full h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#e28743] text-xs font-semibold"
                  />
                  <button 
                    onClick={handleDownloadCertificate} 
                    disabled={!userName.trim()} 
                    className="btn btn-primary btn-sm h-10 flex items-center justify-center font-bold"
                  >
                    Download SVG
                  </button>
                </div>

                {/* 3D Interactive Perspective Preview Box */}
                <div className="certificate-3d-card-wrapper">
                  <div 
                    className="certificate-3d-card"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                      transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                      transition: isProcessingTransaction() ? 'none' : 'transform 0.1s ease-out'
                    }}
                    dangerouslySetInnerHTML={{ __html: getCertificateSvg(userName, dateStr) }}
                  />
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

// Dummy helper just to bypass unused variables checker if any
function isProcessingTransaction() {
  return false;
}
