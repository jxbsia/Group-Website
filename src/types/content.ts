// Team types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: 'phd' | 'postdoc' | 'staff' | 'masters';
  email: string;
  researchInterests: string[];
  startYear: string;
  image?: string;
}

export interface AlumniMember {
  id: string;
  name: string;
  previousPosition: string;
  currentPosition: string;
  currentInstitution?: string;
  graduationYear: string;
}

export interface JoinUsSection {
  title: string;
  description: string;
  contactEmail: string;
}

export interface TeamData {
  members: TeamMember[];
  alumni: AlumniMember[];
  joinUs: JoinUsSection;
}

// Publications types
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  type: 'article';
  citations: number;
  doi?: string;
  url?: string;
  abstract?: string;
}

export interface PublicationStats {
  totalPublications: number;
  totalCitations: number;
  hIndex: number;
  avgCitations: number;
}

export interface PublicationsData {
  stats: PublicationStats;
  googleScholarLink: string;
  publications: Publication[];
}

// Research types
export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  icon: string;
  applications: string[];
  keyTechnologies: string[];
  funding?: string;
  collaborators?: string[];
  publications?: number;
}

export interface ResearchStats {
  publications: string;
  funding: string;
  collaborators: string;
  patents: string;
}

export interface CollaborationSection {
  title: string;
  description: string;
  contactEmail: string;
}

export interface ResearchData {
  stats: ResearchStats;
  areas: ResearchArea[];
  collaboration: CollaborationSection;
}

// About types
export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
}

export interface PrincipalInvestigator {
  name: string;
  title: string;
  affiliation: string;
  email: string;
  location: string;
  googleScholarLink: string;
  biography: string;
  researchInterests: string[];
  education: Education[];
  awards: Award[];
}

export interface AboutData {
  pi: PrincipalInvestigator;
}

// Contact types
export interface ContactPI {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  facultyProfileLink: string;
}

export interface Address {
  department: string;
  university: string;
  street: string;
  city: string;
  postalCode: string;
}

export interface Office {
  building: string;
  level: string;
  room: string;
  officeHours: string;
}

export interface Opportunity {
  type: 'PhD' | 'Postdoc' | 'Visiting';
  title: string;
  description: string;
}

export interface AdditionalInfo {
  responseTime: string;
  collaborationNote: string;
}

export interface ContactData {
  pi: ContactPI;
  address: Address;
  office: Office;
  mapLink: string;
  opportunities: Opportunity[];
  additionalInfo: AdditionalInfo;
}

// Home types
export interface HeroSection {
  institution: string;
  title: string;
  subtitle: string;
}

export interface ResearchHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Funder {
  name: string;
  logo: string;
}

export interface CallToAction {
  sectionLabel: string;
  title: string;
  description: string;
}

export interface HomeData {
  hero: HeroSection;
  researchHighlights: ResearchHighlight[];
  funders: Funder[];
  callToAction: CallToAction;
}

// News types
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  link?: string;
  thumbnail?: string;
}
