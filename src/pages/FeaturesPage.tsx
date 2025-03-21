import React from 'react';
import FeatureHero from '../components/features/FeatureHero';
import FeatureDetail from '../components/features/FeatureDetail';
import CTA from '../components/home/CTA';

const FeaturesPage: React.FC = () => {
  const featureDetails = [
    {
      title: "AI-Driven Multi-Agent System",
      description: "Our platform leverages a team of specialized AI agents that work together to handle every aspect of the development process, from requirements gathering to deployment.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      features: [
        "Specialized agents for requirements, planning, architecture, development, and testing",
        "Agents collaborate to ensure consistency across the entire application",
        "Self-improving system that learns from each project to enhance future development",
        "Human-in-the-loop capability for critical decisions and approvals"
      ]
    },
    {
      title: "Customizable Development Spaces",
      description: "Create dedicated spaces for different departments, teams, or projects, each with its own set of permissions, resources, and configurations.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      features: [
        "Role-based access control for fine-grained permissions",
        "Customizable workflows tailored to each team's needs",
        "Resource allocation and monitoring for each space",
        "Seamless collaboration between spaces when needed"
      ],
      reversed: true
    },
    {
      title: "Comprehensive Blueprint Generation",
      description: "Our platform generates detailed application blueprints that serve as the foundation for development, ensuring alignment with your requirements and best practices.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      features: [
        "Detailed architecture diagrams and component relationships",
        "State machine modeling for complex application logic",
        "API specifications and data models",
        "Comprehensive documentation generation"
      ]
    },
    {
      title: "Automated Testing & Quality Assurance",
      description: "Ensure your applications meet the highest quality standards with our comprehensive automated testing and QA capabilities.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      features: [
        "Automated unit, integration, and end-to-end testing",
        "Performance and load testing",
        "Security vulnerability scanning",
        "Accessibility compliance checking"
      ],
      reversed: true
    },
    {
      title: "One-Click Deployment",
      description: "Deploy your applications to production environments with just a single click, eliminating complex deployment procedures and reducing time-to-market.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
      features: [
        "Automated infrastructure provisioning",
        "Containerization and orchestration",
        "Continuous integration and deployment pipelines",
        "Rollback capabilities for quick recovery"
      ]
    }
  ];

  return (
    <>
      <FeatureHero />
      {featureDetails.map((detail, index) => (
        <FeatureDetail
          key={index}
          title={detail.title}
          description={detail.description}
          image={detail.image}
          features={detail.features}
          reversed={detail.reversed}
        />
      ))}
      <CTA />
    </>
  );
};

export default FeaturesPage;
