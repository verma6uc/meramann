import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Describe Your Application',
      description: 'Start by describing your application idea in plain language. Our AI understands your requirements and vision.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '02',
      title: 'AI Asks Clarifying Questions',
      description: 'Our AI asks targeted questions to fully understand your requirements and expectations.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '03',
      title: 'Generate Application Blueprint',
      description: 'The platform creates a detailed blueprint and architecture for your application.',
      image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '04',
      title: 'Review & Refine',
      description: 'Review the generated blueprint and make any necessary adjustments before proceeding.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '05',
      title: 'Automatic Development',
      description: 'Our AI agents build your application, handling both frontend and backend development.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      number: '06',
      title: 'Deploy & Scale',
      description: 'Deploy your application with just a few clicks and scale as your needs grow.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Creator Labs Works
          </h2>
          <p className="text-xl text-gray-600">
            Our platform simplifies the development process from idea to deployment, making software creation accessible to everyone.
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 transform rotate-1 scale-105 rounded-xl opacity-10"></div>
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="h-px flex-grow bg-blue-100 ml-4"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                {index === steps.length - 1 && (
                  <Link 
                    to="/how-it-works" 
                    className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                  >
                    Learn more about our process
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
