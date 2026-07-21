import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register, loginWithGoogle } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      if (isLoginTab) {
        const success = await login(email, password);
        if (success) {
          onClose();
        } else {
          setAuthError('Invalid credentials. Use nomad@desinomadtrails.in or click Google Login.');
        }
      } else {
        if (!name.trim()) {
          setAuthError('Name is required');
          setIsLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (success) {
          onClose();
        } else {
          setAuthError('Email already registered.');
        }
      }
    } catch (err) {
      setAuthError('Authentication error. Try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSSO = async () => {
    setAuthError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setAuthError('Google SSO failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay backdrop */}
      <div className="absolute inset-0 bg-[#0a251c]/65 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card content */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 z-10 animate-fade-in flex flex-col space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#e28743]/10 border border-[#e28743]/20 rounded-full px-3 py-1 text-[#e28743] font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles size={12} />
            <span>Join the Community</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0a251c] tracking-tight">Desi Nomad Trails</h2>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-100 pb-1">
          <button 
            type="button"
            className={`flex-1 pb-2 font-bold text-sm text-center border-b-2 transition-all ${isLoginTab ? 'border-[#e28743] text-[#e28743]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            onClick={() => { setIsLoginTab(true); setAuthError(''); }}
          >
            Log In
          </button>
          <button 
            type="button"
            className={`flex-1 pb-2 font-bold text-sm text-center border-b-2 transition-all ${!isLoginTab ? 'border-[#e28743] text-[#e28743]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            onClick={() => { setIsLoginTab(false); setAuthError(''); }}
          >
            Register
          </button>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs font-semibold text-center">
            {authError}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div className="flex flex-col">
              <label htmlFor="auth-name" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <User size={14} className="text-[#e28743]" />
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none transition-all duration-200"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="auth-email" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Mail size={14} className="text-[#e28743]" />
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder="nomad@desinomadtrails.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="auth-password" className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Lock size={14} className="text-[#e28743]" />
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none transition-all duration-200"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-11 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-1">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <span className="relative bg-white px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or Connect Via</span>
        </div>

        {/* Social SSO Trigger */}
        <button
          type="button"
          onClick={handleGoogleSSO}
          disabled={isLoading}
          className="w-full h-11 border border-slate-200 hover:bg-slate-50 rounded-xl font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 disabled:opacity-50"
        >
          {/* Custom inline Google SVG Icon */}
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.24 12.88a5.72 5.72 0 0 1 5.751-5.72c1.558 0 3.012.59 4.114 1.666l3.201-3.2A10.22 10.22 0 0 0 13.99.88C8.362.88 3.8 5.44 3.8 11.07s4.562 10.19 10.19 10.19c5.842 0 10.2-4.103 10.2-10.2 0-.687-.06-1.348-.182-1.977H12.24Z"/>
          </svg>
          Google Login (Sandbox Demo)
        </button>

        {isLoginTab && (
          <div className="space-y-2 pt-2 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-500 font-semibold">
              Quick Sandbox Credentials:
            </p>
            <div className="flex justify-center gap-2">
              <button 
                type="button" 
                onClick={() => {
                  setEmail('admin@desinomadtrails.in');
                  setPassword('password123');
                }}
                className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold rounded-lg border border-red-200 transition-all cursor-pointer"
              >
                👑 Auto-Fill Admin
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setEmail('nomad@desinomadtrails.in');
                  setPassword('password123');
                }}
                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-200 transition-all cursor-pointer"
              >
                🎒 Auto-Fill Customer
              </button>
            </div>
            <p className="text-[9px] text-slate-400 font-mono">
              Admin: admin@desinomadtrails.in | User: nomad@desinomadtrails.in (Pass: password123)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
