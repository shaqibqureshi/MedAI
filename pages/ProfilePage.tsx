
import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="pt-32 pb-12 min-h-screen px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card-dark border border-border-dark rounded-2xl p-8 text-center space-y-6">
            <div className="size-32 rounded-full bg-slate-800 border-4 border-primary/20 flex items-center justify-center mx-auto relative group">
              <span className="material-symbols-outlined text-6xl text-text-muted">person</span>
              <button className="absolute bottom-0 right-0 bg-primary text-white size-8 rounded-full flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Alex Johnson</h3>
              <p className="text-primary font-bold text-sm">Patient Account</p>
            </div>
            <div className="pt-6 border-t border-border-dark flex flex-col gap-3">
              <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-bold transition-all">Account Settings</button>
              <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl text-sm font-bold transition-all">Log Out</button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card-dark border border-border-dark rounded-2xl p-8">
            <h4 className="text-lg font-bold text-white mb-6">Medical Profile</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase">Age</label>
                <div className="bg-slate-900 p-3 rounded-lg text-white border border-border-dark">32 years</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase">Blood Type</label>
                <div className="bg-slate-900 p-3 rounded-lg text-white border border-border-dark">O Positive</div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-text-muted uppercase">Known Allergies</label>
                <div className="bg-slate-900 p-3 rounded-lg text-white border border-border-dark">Penicillin, Peanuts</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card-dark border border-border-dark rounded-2xl p-8">
            <h4 className="text-lg font-bold text-white mb-4">Verification Status</h4>
            <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <div>
                <p className="text-white font-bold text-sm">Identity Verified</p>
                <p className="text-text-muted text-xs">Your medical credentials have been verified by our clinical board.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
