import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  cta
}) => {
  return (
    <div 
      className={`rounded-xl overflow-hidden border ${
        highlighted 
          ? 'border-blue-200 shadow-xl relative' 
          : 'border-gray-200 shadow-sm'
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 inset-x-0 flex justify-center transform -translate-y-1/2">
          <span className="inline-flex rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>
        </div>
      )}
      
      <div className={`px-6 py-8 ${highlighted ? 'bg-blue-50' : 'bg-white'}`}>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold tracking-tight text-gray-900">{price}</span>
          <span className="ml-1 text-xl font-semibold text-gray-500">/month</span>
        </div>
        <p className="mt-6 text-gray-600">{description}</p>
        
        <Button 
          href="/contact" 
          variant={highlighted ? 'primary' : 'outline'} 
          className="mt-8 w-full justify-center"
        >
          {cta}
        </Button>
      </div>
      
      <div className="px-6 pt-6 pb-8 bg-white">
        <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
          What's included
        </h4>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingTable: React.FC = () => {
  const tiers = [
    {
      name: "Starter",
      price: "$499",
      description: "Perfect for small teams and startups just getting started with application development.",
      features: [
        "Up to 5 users",
        "3 concurrent projects",
        "Basic AI agents",
        "Standard support",
        "Community access"
      ],
      cta: "Start free trial"
    },
    {
      name: "Professional",
      price: "$999",
      description: "Ideal for growing teams that need more capacity and advanced features.",
      features: [
        "Up to 20 users",
        "10 concurrent projects",
        "Advanced AI agents",
        "Priority support",
        "API access",
        "Custom integrations",
        "Enhanced security"
      ],
      highlighted: true,
      cta: "Start free trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with complex needs requiring tailored solutions and dedicated support.",
      features: [
        "Unlimited users",
        "Unlimited projects",
        "Premium AI agents",
        "Dedicated support",
        "Advanced API access",
        "Custom workflows",
        "SSO & advanced security",
        "Dedicated environment",
        "SLA guarantees"
      ],
      cta: "Contact sales"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingTier {...tier} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Need a custom solution?</h3>
              <p className="mt-2 text-lg text-gray-600">
                Contact our sales team to discuss your specific requirements and get a tailored quote.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button href="/contact" variant="primary" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How does billing work?",
                answer: "We offer monthly and annual billing options. Annual plans come with a 20% discount. You can upgrade or downgrade your plan at any time."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll have access to the platform until the end of your billing period."
              },
              {
                question: "Do you offer a free trial?",
                answer: "Yes, we offer a 14-day free trial for our Starter and Professional plans. No credit card required."
              },
              {
                question: "What kind of support do you offer?",
                answer: "We offer different levels of support based on your plan. All plans include access to our documentation and community. Higher-tier plans include priority support and dedicated account managers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PricingTable;
