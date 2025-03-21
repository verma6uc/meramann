import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface UseCaseCardProps {
  title: string;
  industry: string;
  description: string;
  results: {
    label: string;
    value: string;
  }[];
  image: string;
  logo?: string;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({
  title,
  industry,
  description,
  results,
  image,
  logo
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        {logo && (
          <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
            <img 
              src={logo} 
              alt={`${title} logo`} 
              className="w-8 h-8"
            />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-sm font-medium text-blue-600 mb-2">{industry}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {results.map((result, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{result.value}</div>
              <div className="text-sm text-gray-600">{result.label}</div>
            </div>
          ))}
        </div>
        
        <Link 
          to="#" 
          className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
        >
          Read case study
          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default UseCaseCard;
