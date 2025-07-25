import React from 'react';
import { SkillGap } from '../types';
import { Clock, Target, BookOpen, Trophy } from 'lucide-react';

interface RoadmapProps {
  skillGaps: SkillGap[];
}

export const Roadmap: React.FC<RoadmapProps> = ({ skillGaps }) => {
  const sortedGaps = [...skillGaps].sort((a, b) => {
    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseColor = (index: number) => {
    const colors = [
      'from-red-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-green-500 to-teal-500',
      'from-blue-500 to-purple-500',
      'from-purple-500 to-indigo-500',
    ];
    return colors[index % colors.length];
  };

  const phases = [
    { name: 'Foundation', skills: sortedGaps.filter(gap => gap.priority === 'high') },
    { name: 'Core Skills', skills: sortedGaps.filter(gap => gap.priority === 'medium') },
    { name: 'Advanced', skills: sortedGaps.filter(gap => gap.priority === 'low') },
  ].filter(phase => phase.skills.length > 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Your Learning Roadmap
        </h2>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          A structured path to reach your career goal
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative mt-12">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.name} className="relative mb-16">
            {/* Phase Header */}
            <div className={`inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r ${getPhaseColor(phaseIndex)} text-white font-bold text-xl mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300`}>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-30 rounded-full shadow-lg">
                  <span className="text-lg font-bold">{phaseIndex + 1}</span>
                </div>
                <span>Phase {phaseIndex + 1}: {phase.name}</span>
              </div>
            </div>

            {/* Skills in Phase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-12">
              {phase.skills.map((gap, skillIndex) => (
                <div
                  key={gap.skill.id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors duration-200">{gap.skill.name}</h4>
                    <div className={`w-4 h-4 rounded-full ${getPriorityColor(gap.priority)} shadow-lg`}></div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 font-medium">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Clock className="w-3 h-3 text-blue-600" />
                      </div>
                      {gap.estimatedLearningTime}
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Target className="w-3 h-3 text-purple-600" />
                      </div>
                      {gap.skill.category}
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="w-3 h-3 text-green-600" />
                      </div>
                      {gap.resources.length} resources
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {gap.priority.toUpperCase()} PRIORITY
                      </span>
                      <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200">
                        View Resources →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Connection Line to Next Phase */}
            {phaseIndex < phases.length - 1 && (
              <div className="flex justify-center mt-8">
                <div className="w-2 h-16 bg-gradient-to-b from-gray-300 via-blue-400 to-purple-500 rounded-full shadow-lg animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-green-200 text-center shadow-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h3>
        <p className="text-gray-600 mb-8 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Follow this roadmap step by step to systematically build the skills you need for your dream career.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-bold text-lg">
            Start Learning Phase 1
          </button>
          <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg font-bold text-lg">
            Download Roadmap PDF
          </button>
        </div>
      </div>
    </div>
  );
};