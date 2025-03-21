import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';

const WizardDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    {
      title: "Describe Your Application",
      description: "Start by describing your application idea in plain language. Our AI understands your requirements and vision.",
      input: {
        type: "textarea",
        placeholder: "I need a customer relationship management system that allows sales teams to track leads, manage contacts, and generate reports...",
        label: "Application Description"
      }
    },
    {
      title: "Answer Clarifying Questions",
      description: "Our AI asks targeted questions to fully understand your requirements and expectations.",
      questions: [
        {
          question: "What user roles will your application need?",
          options: ["Admin", "Manager", "User", "Guest", "Custom roles"]
        },
        {
          question: "What integrations are important for your application?",
          options: ["Email", "Calendar", "Payment processing", "Social media", "Other"]
        },
        {
          question: "What is your preferred deployment environment?",
          options: ["Cloud (AWS)", "Cloud (Azure)", "Cloud (GCP)", "On-premises", "Hybrid"]
        }
      ]
    },
    {
      title: "Review Application Blueprint",
      description: "The platform creates a detailed blueprint and architecture for your application.",
      blueprint: {
        components: [
          "User Authentication Module",
          "Contact Management System",
          "Lead Tracking Dashboard",
          "Reporting Engine",
          "Notification Service"
        ],
        architecture: "Microservices architecture with React frontend and Node.js backend",
        database: "PostgreSQL for relational data with Redis caching layer",
        apis: "RESTful API with GraphQL for complex data queries"
      }
    },
    {
      title: "Development & Deployment",
      description: "Our AI agents build your application, handling both frontend and backend development.",
      progress: {
        frontend: 85,
        backend: 92,
        database: 100,
        testing: 78,
        deployment: 65
      }
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep - 1];

    switch (currentStep) {
      case 1:
        return (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {step.input.label}
            </label>
            <textarea
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder={step.input.placeholder}
            ></textarea>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {step.questions.map((q, index) => (
              <div key={index}>
                <div className="text-gray-800 font-medium mb-3">{q.question}</div>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex} className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <span className="ml-2 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Components</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {step.blueprint.components.map((component, index) => (
                  <li key={index}>{component}</li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Architecture</h4>
                <p className="text-gray-700">{step.blueprint.architecture}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Database</h4>
                <p className="text-gray-700">{step.blueprint.database}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">APIs</h4>
                <p className="text-gray-700">{step.blueprint.apis}</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            {Object.entries(step.progress).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 font-medium capitalize">{key}</span>
                  <span className="text-gray-700 font-medium">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Application will be ready in approximately 45 minutes
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            Experience Our Development Wizard
          </h2>
          <p className="text-xl text-gray-600">
            See how easy it is to create an application with Creator Labs. This interactive demo walks you through our development process.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white font-medium ml-4">Creator Labs Wizard</div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep > index + 1 
                            ? 'bg-blue-600 text-white' 
                            : currentStep === index + 1 
                              ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                              : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {currentStep > index + 1 ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mt-2 max-w-[80px] text-center">
                        {step.title.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute top-0 left-0 h-1 bg-blue-600" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                  <div className="h-1 bg-gray-200 w-full"></div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep - 1].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {steps[currentStep - 1].description}
                </p>
                
                {renderStepContent()}
              </div>
              
              <div className="flex justify-between">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  variant="primary"
                  disabled={currentStep === totalSteps}
                  className={currentStep === totalSteps ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {currentStep === totalSteps ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WizardDemo;
