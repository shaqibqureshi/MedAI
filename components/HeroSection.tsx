
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden hero-gradient">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">v2.0 Now Live</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
              AI Powered Drug <br /><span className="text-primary">Interaction</span> Detection
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Check your medicine safety instantly. Cross-reference prescriptions and OTC medications to ensure patient safety with AI-driven pharmaceutical accuracy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/dashboard" className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all group text-lg shadow-xl shadow-primary/20">
              Check Medicine Safety
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
