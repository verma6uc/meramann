import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

interface FeatureDetailProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  reversed?: boolean;
}

const FeatureDetail: React.FC<FeatureDetailProps> = ({ 
  title, 
  description, 
  image, 
  features, 
  reversed = false 
}) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: reversed ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 transform rotate-1 scale-105 rounded-xl opacity-10"></div>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: reversed ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-6">{description}</p>
            
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureDetail;
