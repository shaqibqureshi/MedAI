
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import ChatbotPreview from '../components/ChatbotPreview';

const LandingPage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ChatbotPreview />
    </main>
  );
};

export default LandingPage;
