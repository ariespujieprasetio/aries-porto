export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  technologies?: string[];
};

export type Capability = {
  title: string;
  description: string;
  technologies: string[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  href?: string;
  detail: string;
  tags: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  featured?: boolean;
  url?: string;
};
