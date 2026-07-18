import { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Thermometer, ShieldAlert, Compass, ChevronRight, Zap, RefreshCw } from 'lucide-react';

interface GeneratedPlan {
  trekName: string;
  difficulty: string;
  season: string;
  temperature: string;
  acclimatizationDays: number;
  oxygenRequirement: string;
  gearList: string[];
  itinerary: { day: number; title: string; desc: string; altitude: string }[];
}

export default function AIPlanner() {
  // 4D Chrono-slider states: 0 = Spring, 1 = Summer, 2 = Monsoon, 3 = Autumn, 4 = Winter
  const [chronoTime, setChronoTime] = useState(1); 
  const [trekType, setTrekType] = useState('kedarkantha-snow');
  const [pace, setPace] = useState<'standard' | 'leisurely' | 'alpine'>('standard');
  const [focus, setFocus] = useState<'all' | 'photo' | 'fitness' | 'eco'>('all');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPlan, setCustomPlan] = useState<GeneratedPlan | null>(null);
  
  // 3D holographic matrix rotation state
  const [rotAngle, setRotAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const seasons = [
    { name: 'Spring', months: 'Mar - Apr', temp: '8°C to 15°C', color: 'from-[#10b981] to-[#047857]' },
    { name: 'Summer', months: 'May - Jun', temp: '15°C to 22°C', color: 'from-[#eab308] to-[#ca8a04]' },
    { name: 'Monsoon', months: 'Jul - Aug', temp: '12°C to 18°C', color: 'from-[#06b6d4] to-[#0891b2]' },
    { name: 'Autumn', months: 'Sep - Nov', temp: '5°C to 12°C', color: 'from-[#e28743] to-[#c96b2d]' },
    { name: 'Winter', months: 'Dec - Feb', temp: '-5°C to 5°C', color: 'from-[#3b82f6] to-[#1d4ed8]' }
  ];

  // 3D Canvas Wireframe rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localRot = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const cX = width / 2;
      const cY = height / 2;
      const radius = 65;

      // Draw futuristic grid rings
      ctx.strokeStyle = 'rgba(226, 135, 67, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cX, cY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cX, cY, radius * 1.4, 0, Math.PI * 2);
      ctx.stroke();

      // Render 3D Rotating Cube wireframe
      ctx.strokeStyle = chronoTime === 2 ? '#06b6d4' : chronoTime === 4 ? '#3b82f6' : '#e28743';
      ctx.lineWidth = 1.5;

      const vertices = [
        { x: -40, y: -40, z: -40 },
        { x: 40, y: -40, z: -40 },
        { x: 40, y: 40, z: -40 },
        { x: -40, y: 40, z: -40 },
        { x: -40, y: -40, z: 40 },
        { x: 40, y: -40, z: 40 },
        { x: 40, y: 40, z: 40 },
        { x: -40, y: 40, z: 40 }
      ];

      // Rotate vertices on Y and X axes
      const radY = localRot * (Math.PI / 180);
      const radX = 30 * (Math.PI / 180);

      const projected = vertices.map(v => {
        // Y Rotation
        let x1 = v.x * Math.cos(radY) - v.z * Math.sin(radY);
        let z1 = v.x * Math.sin(radY) + v.z * Math.cos(radY);
        // X Rotation
        let y2 = v.y * Math.cos(radX) - z1 * Math.sin(radX);
        let z2 = v.y * Math.sin(radX) + z1 * Math.cos(radX);

        // Perspective projection
        const f = 160 / (160 + z2);
        return {
          x: cX + x1 * f,
          y: cY + y2 * f
        };
      });

      // Connections logic helper
      const drawLine = (i: number, j: number) => {
        ctx.beginPath();
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
        ctx.stroke();
      };

      // Draw cube lines
      for (let i = 0; i < 4; i++) {
        drawLine(i, (i + 1) % 4);
        drawLine(i + 4, ((i + 1) % 4) + 4);
        drawLine(i, i + 4);
      }

      // Draw nodes
      ctx.fillStyle = ctx.strokeStyle;
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      localRot += 1.2;
      setRotAngle(Math.round(localRot % 360));
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [chronoTime]);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setCustomPlan(null);

    setTimeout(() => {
      setIsGenerating(false);
      const selectedSeason = seasons[chronoTime];
      
      // Dynamic mock generation parameters matching user selections
      const plan: GeneratedPlan = {
        trekName: trekType === 'kedarkantha-snow' ? 'Kedarkantha Peak Expedition' : trekType === 'beas-kund' ? 'Beas Kund Expedition' : 'Valley of Flowers Trail',
        difficulty: pace === 'alpine' ? 'Demanding' : 'Moderate',
        season: selectedSeason.name,
        temperature: selectedSeason.temp,
        acclimatizationDays: pace === 'leisurely' ? 2 : 1,
        oxygenRequirement: chronoTime === 4 ? 'Mandatory (O2 Cylinders in Camp)' : 'Emergency Standby',
        gearList: [
          'High-ankle trekking boots',
          chronoTime === 4 || chronoTime === 3 ? 'Sub-zero down jacket (-10°C rating)' : 'Windcheater & fleece jacket',
          chronoTime === 2 ? 'Waterproof rain poncho & pack cover' : 'Microspikes & gaiters (snow/ice trails)',
          focus === 'photo' ? 'Carbon fiber tripod & spare battery sets' : 'Trekking poles & headlights'
        ],
        itinerary: [
          { day: 1, title: 'Arrival at Base Camp', desc: 'Briefing, gear distribution, and acclimatization check.', altitude: '6,400 ft' },
          { day: 2, title: 'Ascent to High Camp', desc: `Steady climb through local forest lines. pace profile: ${pace}.`, altitude: '9,200 ft' },
          { day: 3, title: 'Summit Push & Return', desc: `Early morning departure. Max altitude projection under ${selectedSeason.name} parameters.`, altitude: '12,500 ft' }
        ]
      };
      setCustomPlan(plan);
    }, 2000);
  };

  const handleImportToBooking = () => {
    if (!customPlan) return;
    const base = import.meta.env.BASE_URL || '/';
    // Redirect to booking form with trek selection
    window.history.pushState(null, '', `${base}book?trek=${trekType}`);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16">
      
      {/* Brand Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#e28743]/10 border border-[#e28743]/20 rounded-full px-3 py-1 text-[#e28743] font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles size={12} className="animate-spin-slow" />
          <span>Futuristic AI Customizer</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a251c] tracking-tight">AI Trail Planner & 4D Chrono-Console</h2>
        <p className="text-slate-muted text-sm md:text-base leading-relaxed mt-2">
          Harness volumetric projections and time-slice environmental inputs to customize your Himalayan itinerary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Hologram Controls Column (Spans 1) */}
        <div className="bg-[#0a251c] text-white rounded-3xl p-6 shadow-xl border border-emerald-950 flex flex-col space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#e28743] border-b border-emerald-900 pb-3">4D Control Console</h3>

          {/* 3D Rotating Projection wireframe */}
          <div className="relative bg-black/45 border border-emerald-950 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} width="160" height="150" className="opacity-90" />
            <span className="text-[9px] text-[#e28743] font-bold uppercase tracking-wider mt-2 animate-pulse">
              MATRIX ROTATION: {rotAngle}°
            </span>
          </div>

          <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs font-semibold text-slate-300">
            {/* Trek Choice */}
            <div className="flex flex-col">
              <label className="mb-2 uppercase text-[10px] tracking-wider text-slate-400">Target Trail</label>
              <select 
                value={trekType}
                onChange={(e) => setTrekType(e.target.value)}
                className="w-full h-10 px-3 bg-emerald-950/60 border border-emerald-900 rounded-xl text-white focus:outline-none cursor-pointer"
              >
                <option value="kedarkantha-snow">Kedarkantha Peak</option>
                <option value="beas-kund">Beas Kund Trail</option>
                <option value="valley-flowers">Valley of Flowers</option>
              </select>
            </div>

            {/* 4D Chrono-Season Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="uppercase text-[10px] tracking-wider text-slate-400">4D Season Axis</label>
                <span className="text-[#e28743] font-bold text-[10px]">{seasons[chronoTime].name}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="4" 
                value={chronoTime}
                onChange={(e) => setChronoTime(parseInt(e.target.value))}
                className="w-full accent-[#e28743] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold mt-1.5">
                <span>SPRING</span>
                <span>MONSOON</span>
                <span>WINTER</span>
              </div>
            </div>

            {/* Pace toggle */}
            <div className="flex flex-col">
              <label className="mb-2 uppercase text-[10px] tracking-wider text-slate-400">Ascent Pace Model</label>
              <div className="grid grid-cols-3 border border-emerald-900 rounded-xl overflow-hidden">
                <button 
                  type="button" 
                  onClick={() => setPace('leisurely')}
                  className={`h-8 transition-all ${pace === 'leisurely' ? 'bg-[#e28743] text-white' : 'hover:bg-emerald-950/50'}`}
                >
                  Leisure
                </button>
                <button 
                  type="button" 
                  onClick={() => setPace('standard')}
                  className={`h-8 transition-all ${pace === 'standard' ? 'bg-[#e28743] text-white' : 'hover:bg-emerald-950/50'}`}
                >
                  Regular
                </button>
                <button 
                  type="button" 
                  onClick={() => setPace('alpine')}
                  className={`h-8 transition-all ${pace === 'alpine' ? 'bg-[#e28743] text-white' : 'hover:bg-emerald-950/50'}`}
                >
                  Alpine
                </button>
              </div>
            </div>

            {/* Core focus */}
            <div className="flex flex-col">
              <label className="mb-2 uppercase text-[10px] tracking-wider text-slate-400">Trail Focus</label>
              <select 
                value={focus}
                onChange={(e) => setFocus(e.target.value as any)}
                className="w-full h-10 px-3 bg-emerald-950/60 border border-emerald-900 rounded-xl text-white focus:outline-none cursor-pointer"
              >
                <option value="all">Standard Adventure</option>
                <option value="photo">Photography Expedition</option>
                <option value="fitness">High-End Fitness Drill</option>
                <option value="eco">Eco-Trails Green Code</option>
              </select>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full h-11 bg-[#e28743] hover:bg-[#c96b2d] text-white font-bold rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 border-none cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Processing Vectors...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  Generate 4D Blueprint
                </>
              )}
            </button>
          </form>
        </div>

        {/* Blueprint Display Column (Spans 2) */}
        <div className="lg:col-span-2 space-y-6">
          {isGenerating ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-md flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-slate-100 border-t-[#e28743] animate-spin" />
                <Sparkles size={24} className="text-[#e28743] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-[#0a251c]">AI Simulation Running</h3>
              <p className="text-slate-muted text-xs max-w-xs leading-normal">
                Synthesizing high-altitude coordinates, calculating barometric factors, and mapping custom acclimatization curves.
              </p>
            </div>
          ) : customPlan ? (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md space-y-6 animate-fade-in">
              
              {/* Plan Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Blueprint Project</span>
                  <h3 className="text-xl font-extrabold text-[#0a251c] mt-0.5">{customPlan.trekName}</h3>
                </div>
                <button 
                  onClick={handleImportToBooking}
                  className="h-9 px-4 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all border-none cursor-pointer flex items-center gap-1"
                >
                  Import to Booking <ChevronRight size={13} />
                </button>
              </div>

              {/* Environmental Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <span className="block text-[9px] text-slate-400 font-bold uppercase">Target Season</span>
                  <strong className="text-xs text-slate-700">{customPlan.season} ({seasons[chronoTime].months})</strong>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-2">
                  <Thermometer size={16} className="text-orange-500" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">Estimated Temp</span>
                    <strong className="text-xs text-slate-700">{customPlan.temperature}</strong>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-[#e28743]" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">AMS Risks level</span>
                    <strong className="text-xs text-slate-700">{customPlan.difficulty}</strong>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-2">
                  <Compass size={16} className="text-emerald-600" />
                  <div>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">O2 Support</span>
                    <strong className="text-xs text-slate-700">{customPlan.oxygenRequirement}</strong>
                  </div>
                </div>
              </div>

              {/* Custom Itinerary Blueprint */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#0a251c] uppercase tracking-wider">Dynamic Schedule Vectors</h4>
                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                  {customPlan.itinerary.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start relative pl-8">
                      <div className="absolute left-0.5 top-0.5 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-[#e28743] text-[10px] font-bold flex items-center justify-center">
                        {item.day}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs text-slate-800">{item.title}</h5>
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{item.altitude}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Gear Checklist */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="text-xs font-bold text-[#0a251c] uppercase tracking-wider flex items-center gap-1">
                  <Zap size={14} className="text-[#e28743]" />
                  AI Recommended Gear
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 pl-4 list-disc">
                  {customPlan.gearList.map((gear, idx) => (
                    <li key={idx} className="leading-normal">{gear}</li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-md text-center space-y-4 flex flex-col items-center justify-center">
              <Compass size={44} className="text-slate-300 animate-spin-slow" />
              <h3 className="text-lg font-bold text-[#0a251c]">Holographic Blueprint Deck</h3>
              <p className="text-slate-muted text-xs max-w-sm leading-normal">
                Adjust the chrono-slider to winter/summer variables on the console and click "Generate" to calculate real-time environmental routes!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
