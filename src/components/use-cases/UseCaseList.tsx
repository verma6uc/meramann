import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import UseCaseCard from './UseCaseCard';

const UseCaseList: React.FC = () => {
  const useCases = [
    {
      title: "Streamlining Enterprise Applications",
      industry: "Financial Services",
      description: "How a leading bank accelerated their application development process and reduced costs.",
      results: [
        { label: "Faster Development", value: "85%" },
        { label: "Cost Reduction", value: "60%" }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Rapid Prototyping for Startups",
      industry: "Technology",
      description: "How a tech startup went from idea to MVP in record time using Creator Labs.",
      results: [
        { label: "Time to Market", value: "2 weeks" },
        { label: "Dev Resources", value: "-70%" }
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Scaling Agency Operations",
      industry: "Digital Agency",
      description: "How a digital agency increased their client capacity without adding headcount.",
      results: [
        { label: "Client Capacity", value: "+150%" },
        { label: "Project Margin", value: "+40%" }
      ],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Healthcare System Modernization",
      industry: "Healthcare",
      description: "How a healthcare provider modernized their legacy systems with minimal disruption.",
      results: [
        { label: "Systems Updated", value: "12" },
        { label: "Downtime", value: "0" }
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "E-commerce Platform Overhaul",
      industry: "Retail",
      description: "How a retailer transformed their online shopping experience and increased sales.",
      results: [
        { label: "Conversion Rate", value: "+35%" },
        { label: "Page Load Time", value: "-60%" }
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Government Service Digitization",
      industry: "Public Sector",
      description: "How a government agency digitized citizen services and improved satisfaction.",
      results: [
        { label: "Processing Time", value: "-80%" },
        { label: "Satisfaction", value: "+65%" }
      ],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            See how organizations across industries are using Creator Labs to transform their development process.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <UseCaseCard {...useCase} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default UseCaseList;
