import React from 'react';
import ProcessHero from '../components/how-it-works/ProcessHero';
import WizardDemo from '../components/how-it-works/WizardDemo';
import SalesDialogue from '../components/how-it-works/SalesDialogue';
import CTA from '../components/home/CTA';

const HowItWorksPage: React.FC = () => {
  return (
    <>
      <ProcessHero />
      <WizardDemo />
      <SalesDialogue />
      <CTA />
    </>
  );
};

export default HowItWorksPage;
