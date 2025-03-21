import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const OurStory: React.FC = () => {
  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Creator Labs was founded with a vision to transform software development through AI."
    },
    {
      year: "2021",
      title: "First Platform Release",
      description: "Launched our first version of the platform with basic AI capabilities."
    },
    {
      year: "2022",
      title: "Series A Funding",
      description: "Secured $15M in Series A funding to accelerate product development."
    },
    {
      year: "2023",
      title: "Multi-Agent System",
      description: "Introduced our revolutionary multi-agent system for comprehensive development automation."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded operations globally with offices in North America, Europe, and Asia."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                Creator Labs was founded in 2020 by a team of experienced software engineers and AI researchers who recognized a fundamental problem in software development: it was too slow, too complex, and too expensive.
              </p>
              <p>
                We set out to build a platform that would leverage the power of artificial intelligence to automate and streamline the development process, making it faster, more accessible, and more efficient.
              </p>
              <p>
                Our journey began with a simple prototype that could generate basic applications from natural language descriptions. Over time, we evolved this into a comprehensive platform powered by a sophisticated multi-agent system capable of handling complex development tasks.
              </p>
              <p>
                Today, Creator Labs is used by organizations of all sizes around the world, from startups to enterprises, to build better software faster. We're proud of what we've accomplished, but we're just getting started.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:translate-x-px"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="flex-1 md:w-1/2 mb-6 md:mb-0">
                        <div className={`md:px-8 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <div className="inline-block bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full text-sm mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                      
                      <div className="md:w-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-4 border-white shadow z-10"></div>
                      </div>
                      
                      <div className="flex-1 md:w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;
