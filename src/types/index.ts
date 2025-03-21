export interface WizardStep {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export interface TestimonialType {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

export interface FeatureType {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface UseCase {
  id: number;
  title: string;
  description: string;
  image: string;
  industry: string;
  results: string[];
}
