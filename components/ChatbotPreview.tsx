
import React from 'react';
import { Link } from 'react-router-dom';

const ChatbotPreview: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/50" id="chatbot">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-card-dark border border-border-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-border-dark/30 px-8 py-4 border-b border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-red-500"></div>
              <div className="size-3 rounded-full bg-yellow-500"></div>
              <div className="size-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm font-medium text-text-muted">MediSafe AI Chat Assistant</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-text-muted text-xl cursor-pointer hover:text-white">settings</span>
            </div>
          </div>
          
          <div className="p-8 space-y-8 min-h-[300px]">
            <div className="flex justify-end">
              <div className="bg-primary/20 text-white p-4 rounded-2xl rounded-tr-none max-w-md border border-primary/30">
                <p className="text-sm">Can I take Dolo 650 with Augmentin?</p>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
              </div>
              <div className="bg-slate-800 text-white p-6 rounded-2xl rounded-tl-none max-w-lg border border-border-dark space-y-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 w-fit">
                  <span className="size-2 rounded-full bg-yellow-500"></span>
                  <span className="text-[10px] font-bold text-yellow-500 uppercase">Moderate Severity Risk</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Both Dolo 650 (Paracetamol) and Augmentin (Amoxicillin/Clavulanate) can be taken together under medical supervision. However, long-term use may affect liver function.
                </p>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-border-dark">
                  <p className="text-xs text-text-muted italic">Clinical Source: BMJ Pharmacology Guidelines (2024)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-border-dark bg-background-dark/50">
            <div className="relative">
              <input 
                disabled
                className="w-full bg-card-dark border-border-dark rounded-xl py-4 pl-6 pr-16 focus:ring-primary focus:border-primary text-white cursor-not-allowed opacity-50" 
                placeholder="Check actual functionality in Dashboard..." 
                type="text"
              />
              <Link 
                to="/dashboard"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primary/90"
              >
                <span className="material-symbols-outlined">send</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotPreview;
