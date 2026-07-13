import React, { useState } from 'react';
import { Shield, Check, Heart, Recycle, Compass, Sparkles } from 'lucide-react';

interface Pledge {
  id: number;
  text: string;
  category: string;
  icon: React.ReactNode;
}

export default function EcoPledge() {
  const [pledges, setPledges] = useState<number[]>([]);

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
