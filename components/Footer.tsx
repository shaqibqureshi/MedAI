
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">shield_with_heart</span>
              </div>
              <h2 className="text-xl font-extrabold text-white">MediSafe AI</h2>
            </div>
            <p className="text-text-muted max-w-sm">The world's most advanced pharmaceutical interaction detection engine. Safeguarding lives through intelligent medication cross-referencing.</p>
          </div>
          <div>
            <h6 className="text-white font-bold mb-6">Company</h6>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Clinical Data</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Medical Board</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h6 className="text-white font-bold mb-6">Legal</h6>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">FDA Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-text-muted">© 2024 MediSafe AI Systems Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-xl">brand_awareness</span></a>
            <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-xl">group</span></a>
            <a className="text-text-muted hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-xl">public</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
