import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export type AestheticTheme = 'emerald' | 'sunset' | 'midnight' | 'bloom';

interface ThemeOption {
  id: AestheticTheme;
  name: string;
  desc: string;
  primaryColor: string;
  accentColor: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'emerald',
    name: 'Emerald Wilderness',
    desc: 'Deep mountain greens & warm sunset amber',
    primaryColor: '#0a251c',
    accentColor: '#e28743'
  },
  {
    id: 'sunset',
    name: 'Himalayan Sunset',
    desc: 'Royal twilight indigo & vibrant coral glow',
    primaryColor: '#1e1b4b',
    accentColor: '#f97316'
  },
  {
    id: 'midnight',
    name: 'Midnight Alpine',
    desc: 'Deep obsidian night & electric glacier cyan',
    primaryColor: '#0f172a',
    accentColor: '#06b6d4'
  },
  {
    id: 'bloom',
    name: 'Brahmaputra Bloom',
    desc: 'Dark pine forests & blooming rose gold',
    primaryColor: '#064e3b',
    accentColor: '#fb7185'
  }
];

export default function ThemeSelector() {
  const { theme, setTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Theme Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm cursor-pointer hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-dark)'
        }}
        title="Change Aesthetic Color Theme"
        aria-label="Aesthetic Color Theme Selector"
      >
        <Palette size={14} style={{ color: 'var(--accent)' }} />
        <span className="hidden sm:inline-block">{currentThemeObj.name.split(' ')[0]}</span>
        <span
          className="w-2.5 h-2.5 rounded-full shadow-inner"
          style={{ backgroundColor: currentThemeObj.accentColor }}
        />
      </button>

      {/* Theme Options Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl p-3 z-50 border animate-fade-in backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-dark)'
          }}
        >
          <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Palette size={12} className="text-[#e28743]" />
              Aesthetic Color Themes
            </span>
          </div>

          <div className="space-y-1.5">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
                    isSelected ? 'shadow-sm' : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--border-light)' : 'transparent',
                    borderColor: isSelected ? 'var(--accent)' : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Dual Color Swatch */}
                    <div className="relative w-6 h-6 rounded-full overflow-hidden flex shadow-inner border border-slate-200">
                      <div className="w-1/2 h-full" style={{ backgroundColor: opt.primaryColor }} />
                      <div className="w-1/2 h-full" style={{ backgroundColor: opt.accentColor }} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold leading-tight" style={{ color: 'var(--text-dark)' }}>
                        {opt.name}
                      </h5>
                      <p className="text-[10px] leading-tight opacity-75 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {opt.desc}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check size={14} style={{ color: 'var(--accent)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
