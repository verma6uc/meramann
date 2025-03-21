import React from 'react';
import UseCaseHero from '../components/use-cases/UseCaseHero';
import UseCaseList from '../components/use-cases/UseCaseList';
import CTA from '../components/home/CTA';

const UseCasesPage: React.FC = () => {
  return (
    <>
      <UseCaseHero />
      <UseCaseList />
      <CTA />
    </>
  );
};

export default UseCasesPage;
