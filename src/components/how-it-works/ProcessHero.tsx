import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

const ProcessHero: React.FC = () => {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Creator Labs Works
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our platform simplifies the entire development lifecycle, from idea to deployment, making software creation accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button href="/demo" variant="primary" size="lg">
                Get a Demo
              </Button>
              <Button href="/features" variant="outline" size="lg">
                Explore Features
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 transform rotate-1 scale-105 rounded-xl opacity-10"></div>
              <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                  <div className="flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-white font-medium ml-4">Development Process</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    {['Describe', 'Design', 'Develop', 'Deploy'].map((step, index) => (
                      <div key={index} className="flex flex-col items-center mb-6 md:mb-0">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mb-3">
                          {index + 1}
                        </div>
                        <div className="text-gray-900 font-medium">{step}</div>
                        {index < 3 && (
                          <div className="hidden md:block w-16 h-0.5 bg-blue-100 mt-8 mx-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessHero;
