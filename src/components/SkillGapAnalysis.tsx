import React from 'react';
import { CareerPath, Skill, SkillGap } from '../types';
import { AlertTriangle, CheckCircle, Clock, ExternalLink, Star } from 'lucide-react';
import { resources } from '../data/resources';

interface SkillGapAnalysisProps {
  selectedCareer: CareerPath;
  userSkills: Skill[];
  skillGaps: SkillGap[];
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  selectedCareer,
  userSkills,
  skillGaps,
}) => {
  const userSkillIds = userSkills.map(skill => skill.id);
  const requiredSkillsMatched = selectedCareer.requiredSkills.filter(skill => 
    userSkillIds.includes(skill.id)
  );
  const niceToHaveSkillsMatched = selectedCareer.niceToHaveSkills.filter(skill => 
    userSkillIds.includes(skill.id)
  );

  const completionPercentage = Math.round(
    (requiredSkillsMatched.length / selectedCareer.requiredSkills.length) * 100
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '🎓';
      case 'tutorial': return '📖';
      case 'documentation': return '📚';
      case 'book': return '📗';
      case 'certification': return '🏆';
      default: return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Your Skill Gap Analysis
        </h2>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Based on your goal: <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{selectedCareer.title}</span>
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Progress Overview</h3>
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{completionPercentage}%</div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm font-semibold text-gray-600 mb-3">
            <span>Required Skills Mastered</span>
            <span>{requiredSkillsMatched.length} of {selectedCareer.requiredSkills.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
              style={{ width: `${completionPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{requiredSkillsMatched.length}</div>
            <div className="text-sm font-semibold text-gray-600">Skills Mastered</div>
          </div>
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-3xl font-bold text-red-600 mb-2">{skillGaps.length}</div>
            <div className="text-sm font-semibold text-gray-600">Skills to Learn</div>
          </div>
        </div>
      </div>

      {/* Skills You Have */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
          Skills You Already Have
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-700 mb-4 text-lg">Required Skills ✓</h4>
            <div className="space-y-3">
              {requiredSkillsMatched.map((skill) => (
                <div key={skill.id} className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-shadow duration-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">{skill.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{skill.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-700 mb-4 text-lg">Nice-to-Have Skills ✓</h4>
            <div className="space-y-3">
              {niceToHaveSkillsMatched.map((skill) => (
                <div key={skill.id} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold text-gray-900">{skill.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{skill.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills to Learn */}
      {skillGaps.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-amber-600 mr-2" />
            Skills to Learn
          </h3>
          
          <div className="space-y-6">
            {skillGaps.map((gap) => (
              <div key={gap.skill.id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h4 className="text-xl font-bold text-gray-900">{gap.skill.name}</h4>
                      <span className={`px-4 py-2 text-xs font-bold rounded-full border ${getPriorityColor(gap.priority)}`}>
                        {gap.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-6 font-medium">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {gap.estimatedLearningTime}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{gap.skill.category}</span>
                    </div>
                  </div>
                </div>

                {/* Learning Resources */}
                <div>
                  <h5 className="font-bold text-gray-900 mb-4 text-lg">Recommended Learning Resources</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gap.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group hover:shadow-md transform hover:scale-105"
                      >
                        <div className="text-3xl mr-4 transform group-hover:scale-110 transition-transform duration-200">{getResourceTypeIcon(resource.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                              {resource.title}
                            </h6>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                          </div>
                          <div className="text-sm text-gray-600 mb-3 font-medium">
                            {resource.provider} • {resource.duration}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                              <span className="text-sm text-gray-600 font-semibold">{resource.rating}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                resource.isFree ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {resource.isFree ? 'Free' : 'Paid'}
                              </span>
                              <span className="px-3 py-1 text-xs font-bold bg-gray-100 text-gray-800 rounded-full">
                                {resource.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};