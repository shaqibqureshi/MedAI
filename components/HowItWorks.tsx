
import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Input Medication',
    description: 'Type in the name of your prescribed drugs or OTC medicine.'
  },
  {
    number: 2,
    title: 'AI Cross-Reference',
    description: 'Our engine compares ingredients against 50,000+ clinical studies.'
  },
  {
    number: 3,
    title: 'Get Warnings',
    description: 'Receive an instant safety report with clear severity indicators.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-white">Three Simple Steps to Safety</h3>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-dark hidden md:block -z-10"></div>
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center gap-6 bg-background-dark px-4 z-10">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(99,36,235,0.4)]">
                {step.number}
              </div>
              <div>
                <h5 className="text-lg font-bold text-white mb-2">{step.title}</h5>
                <p className="text-text-muted text-sm max-w-[200px]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
