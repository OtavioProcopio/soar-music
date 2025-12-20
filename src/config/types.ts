// Domain Entities - Keeping structure clean for future backend integration

export type ViewName = 'home' | 'about' | 'studios' | 'team' | 'plans' | 'faq' | 'tools' | 'courses' | 'contact';

export interface Tenant {
  id: string;
  name: string;
  primaryColor: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  colorTheme: 'cyan' | 'gold' | 'purple' | 'rose';
  imagePlaceholder: string;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
}

export interface StudioLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl?: string; // Placeholder for Google Maps embed link
}

export interface Course {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}