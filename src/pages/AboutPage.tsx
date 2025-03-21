import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import Team from '../components/about/Team';
import CTA from '../components/home/CTA';

const AboutPage: React.FC = () => {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Team />
      <CTA />
    </>
  );
};

export default AboutPage;
