import { useMemo } from 'react';
import { CareerPath, Skill, SkillGap } from '../types';
import { resources } from '../data/resources';

export const useSkillGapAnalysis = (selectedCareer: CareerPath | null, userSkills: Skill[]): SkillGap[] => {
  return useMemo(() => {
    if (!selectedCareer) return [];

    const userSkillIds = new Set(userSkills.map(skill => skill.id));
    const gaps: SkillGap[] = [];

    // Check required skills
    selectedCareer.requiredSkills.forEach(skill => {
      if (!userSkillIds.has(skill.id)) {
        gaps.push({
          skill,
          priority: 'high',
          estimatedLearningTime: getEstimatedLearningTime(skill.name),
          resources: resources[skill.id] || getDefaultResources(skill),
        });
      }
    });

    // Check nice-to-have skills
    selectedCareer.niceToHaveSkills.forEach(skill => {
      if (!userSkillIds.has(skill.id)) {
        gaps.push({
          skill,
          priority: 'medium',
          estimatedLearningTime: getEstimatedLearningTime(skill.name),
          resources: resources[skill.id] || getDefaultResources(skill),
        });
      }
    });

    return gaps.sort((a, b) => {
      const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [selectedCareer, userSkills]);
};

const getEstimatedLearningTime = (skillName: string): string => {
  const timeMap: { [key: string]: string } = {
    'HTML': '2-3 weeks',
    'CSS': '3-4 weeks',
    'JavaScript': '6-8 weeks',
    'React': '4-6 weeks',
    'Python': '6-10 weeks',
    'SQL': '3-4 weeks',
    'Git/Version Control': '1-2 weeks',
    'Node.js': '4-6 weeks',
    'TypeScript': '2-3 weeks',
    'Docker': '3-4 weeks',
    'AWS': '8-12 weeks',
    'Machine Learning': '12-16 weeks',
    'Figma': '2-3 weeks',
    'Testing': '3-4 weeks',
  };

  return timeMap[skillName] || '4-6 weeks';
};

const getDefaultResources = (skill: Skill) => {
  return [
    {
      id: `${skill.id}-generic-1`,
      title: `Learn ${skill.name}`,
      type: 'course' as const,
      provider: 'Multiple Providers',
      url: `https://www.google.com/search?q=learn+${skill.name.replace(/\s+/g, '+')}`,
      duration: '4-6 weeks',
      difficulty: 'beginner' as const,
      rating: 4.5,
      isFree: true,
    },
    {
      id: `${skill.id}-generic-2`,
      title: `${skill.name} Documentation`,
      type: 'documentation' as const,
      provider: 'Official Docs',
      url: `https://www.google.com/search?q=${skill.name.replace(/\s+/g, '+')}+documentation`,
      duration: '2-3 weeks',
      difficulty: 'intermediate' as const,
      rating: 4.3,
      isFree: true,
    },
  ];
};