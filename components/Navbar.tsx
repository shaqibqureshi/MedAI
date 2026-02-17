
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-border-dark/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl font-variation-fill">shield_with_heart</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            MediSafe <span className="text-primary">AI</span>
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
            <span className="material-symbols-outlined text-[20px]">home</span>
            Home
          </Link>
          <Link to="/dashboard" className={`text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/dashboard') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </Link>
          <Link to="/history" className={`text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/history') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
            <span className="material-symbols-outlined text-[20px]">history</span>
            History
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/profile" className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/profile') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
            <div className="size-8 rounded-full bg-slate-800 border border-border-dark flex items-center justify-center overflow-hidden">
               <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link to="/dashboard" className="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-accent-blue/20">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
