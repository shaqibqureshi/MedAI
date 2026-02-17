
import React from 'react';

const HistoryPage: React.FC = () => {
  return (
    <div className="pt-32 pb-12 min-h-screen px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
          <span className="material-symbols-outlined text-primary text-3xl">history</span>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">Interaction History</h2>
          <p className="text-text-muted">Review your past medication safety checks.</p>
        </div>
      </div>
      
      <div className="bg-card-dark border border-border-dark rounded-2xl overflow-hidden">
        <div className="p-12 text-center space-y-4">
          <div className="size-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-border-dark">
            <span className="material-symbols-outlined text-4xl text-text-muted">folder_open</span>
          </div>
          <h3 className="text-xl font-bold text-white">No history found</h3>
          <p className="text-text-muted max-w-sm mx-auto">You haven't performed any medication interaction checks yet. Your history will appear here once you start using the dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
