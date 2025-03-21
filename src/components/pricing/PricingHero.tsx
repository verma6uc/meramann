import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';

const PricingHero: React.FC = () => {
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the plan that's right for your organization. All plans include access to our core platform features.
            </p>
            
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg mb-8">
              <button className="px-4 py-2 rounded-md bg-white shadow-sm text-gray-900 font-medium">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-md text-gray-600 font-medium">
                Annual
                <span className="ml-2 text-xs text-green-600 font-semibold">Save 20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PricingHero;
