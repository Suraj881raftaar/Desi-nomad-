import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Sparkles } from 'lucide-react';

export default function UnifiedLoginPortal() {
  const { login, register } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      if (isLoginTab) {
        const loggedInUser = await login(email, password);
        if (loggedInUser) {
          const base = import.meta.env.BASE_URL || '/';
          if (loggedInUser.role === 'admin') {
            window.history.pushState(null, '', `${base}admin`);
            window.dispatchEvent(new Event('popstate'));
          } else {
            window.history.pushState(null, '', `${base}dashboard`);
            window.dispatchEvent(new Event('popstate'));
          }
        } else {
          setAuthError('Invalid email or password.');
        }
      } else {
        if (!name.trim()) {
          setAuthError('Name is required');
          setIsLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (success) {
          const base = import.meta.env.BASE_URL || '/';
          window.history.pushState(null, '', `${base}dashboard`);
          window.dispatchEvent(new Event('popstate'));
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

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 animate-fade-in flex flex-col space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#e28743]/10 border border-[#e28743]/20 rounded-full px-3 py-1 text-[#e28743] font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles size={12} />
          <span>Unified Access Portal</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#0a251c] tracking-tight">Desi Nomad Trails</h2>
        <p className="text-slate-muted text-xs mt-1">Enter details to access your custom dashboard console.</p>
      </div>

      <div className="flex border-b border-slate-100 pb-1">
        <button 
          type="button"
          className={`flex-1 pb-2 font-bold text-sm text-center border-b-2 transition-all cursor-pointer ${isLoginTab ? 'border-[#e28743] text-[#e28743]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          onClick={() => { setIsLoginTab(true); setAuthError(''); }}
        >
          Log In
        </button>
        <button 
          type="button"
          className={`flex-1 pb-2 font-bold text-sm text-center border-b-2 transition-all cursor-pointer ${!isLoginTab ? 'border-[#e28743] text-[#e28743]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          onClick={() => { setIsLoginTab(false); setAuthError(''); }}
        >
          Register
        </button>
      </div>

      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs font-semibold text-center">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginTab && (
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <User size={14} className="text-[#e28743]" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none transition-all duration-200"
              required
            />
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <Mail size={14} className="text-[#e28743]" />
            Email Address
          </label>
          <input
            type="email"
            placeholder="e.g. nomad@desinomadtrails.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:ring-2 focus:ring-[#e28743] focus:border-transparent focus:outline-none transition-all duration-200"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
            <Lock size={14} className="text-[#e28743]" />
            Password
          </label>
          <input
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
          className="w-full h-11 bg-gradient-to-r from-[#e28743] to-[#c96b2d] text-white rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer border-none"
        >
          {isLoading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      
      <p className="text-[10px] text-slate-400 font-mono text-center">
        Admin: admin@desinomadtrails.in | Customer: nomad@desinomadtrails.in<br/>
        Password: password123
      </p>
    </div>
  );
}
