import React from 'react';
import PricingHero from '../components/pricing/PricingHero';
import PricingTable from '../components/pricing/PricingTable';
import CTA from '../components/home/CTA';

const PricingPage: React.FC = () => {
  return (
    <>
      <PricingHero />
      <PricingTable />
      <CTA />
    </>
  );
};

export default PricingPage;
