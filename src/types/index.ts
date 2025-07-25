export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced';
  isRequired?: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  averageSalary: string;
  growthRate: string;
  requiredSkills: Skill[];
  niceToHaveSkills: Skill[];
}

export interface SkillGap {
  skill: Skill;
  priority: 'high' | 'medium' | 'low';
  estimatedLearningTime: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'course' | 'tutorial' | 'documentation' | 'book' | 'certification';
  provider: string;
  url: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  isFree: boolean;
}