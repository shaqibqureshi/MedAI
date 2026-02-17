
import React from 'react';

const features = [
  {
    icon: 'warning',
    title: 'Detect Dangerous Combinations',
    description: 'Identify high-risk drug-to-drug interactions instantly with our verified medical engine.'
  },
  {
    icon: 'analytics',
    title: 'Predict Severity Levels',
    description: 'Visual indicators for Mild, Moderate, and Severe risks based on clinical documentation.'
  },
  {
    icon: 'list_alt',
    title: 'Side Effects Analysis',
    description: 'Comprehensive database of potential pharmaceutical reactions and personalized warnings.'
  },
  {
    icon: 'robot_2',
    title: 'AI Personal Assistant',
    description: '24/7 pharmaceutical support for all your medication queries via natural language processing.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/50" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Advanced Safety Features</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">Protecting Patients with AI</h3>
          <p className="text-text-muted max-w-2xl mx-auto">Our system analyzes thousands of drug combinations to provide real-time safety insights using deep learning models.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-card-dark border border-border-dark p-8 rounded-2xl hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
