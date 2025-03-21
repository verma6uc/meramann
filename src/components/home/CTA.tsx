import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Development Process?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the organizations that are building better software faster with Creator Labs. Get started today with a personalized demo.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                href="/demo" 
                variant="secondary" 
                size="lg"
                className="font-semibold"
              >
                Get a Demo
              </Button>
              <Button 
                href="/contact" 
                variant="outline" 
                size="lg"
                className="text-white border-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">90%</div>
                <div className="text-blue-100">Faster Development</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">60%</div>
                <div className="text-blue-100">Cost Reduction</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
