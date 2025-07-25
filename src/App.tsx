import React, { useState } from 'react';
import { CareerPath, Skill, SkillGap } from './types';
import { careerPaths } from './data/careerPaths';
import { CareerSelector } from './components/CareerSelector';
import { SkillInput } from './components/SkillInput';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { Roadmap } from './components/Roadmap';
import { useSkillGapAnalysis } from './hooks/useSkillGapAnalysis';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

type Step = 'career' | 'skills' | 'analysis' | 'roadmap';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('career');
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  
  const skillGaps = useSkillGapAnalysis(selectedCareer, userSkills);

  const handleAddSkill = (skill: Skill) => {
    setUserSkills(prev => [...prev, skill]);
  };

  const handleRemoveSkill = (skillId: string) => {
    setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
  };

  const handleAnalyzeResume = (file: File) => {
    // Mock resume analysis - in a real app, this would send the file to a backend service
    const mockExtractedSkills: Skill[] = [
      { id: 'javascript', name: 'JavaScript', category: 'Programming', proficiency: 'intermediate' },
      { id: 'html', name: 'HTML', category: 'Frontend', proficiency: 'advanced' },
      { id: 'css', name: 'CSS', category: 'Frontend', proficiency: 'intermediate' },
      { id: 'git', name: 'Git', category: 'Tools', proficiency: 'intermediate' },
    ];
    
    // Add extracted skills to user skills (avoiding duplicates)
    const existingSkillIds = new Set(userSkills.map(skill => skill.id));
    const newSkills = mockExtractedSkills.filter(skill => !existingSkillIds.has(skill.id));
    setUserSkills(prev => [...prev, ...newSkills]);
  };

  const steps = [
    { id: 'career', title: 'Choose Career', completed: !!selectedCareer },
    { id: 'skills', title: 'Add Skills', completed: userSkills.length > 0 },
    { id: 'analysis', title: 'Analysis', completed: false },
    { id: 'roadmap', title: 'Roadmap', completed: false },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case 'career': return !!selectedCareer;
      case 'skills': return userSkills.length > 0;
      case 'analysis': return true;
      case 'roadmap': return true;
      default: return false;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">SkillBridge</h1>
                <p className="text-sm text-gray-600 font-medium">Career Roadmap Generator</p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-6">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center group">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 text-sm font-bold
                    transition-all duration-300 transform group-hover:scale-110
                    ${currentStep === step.id 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg' 
                      : step.completed
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-500 shadow-md'
                        : 'bg-white text-gray-400 border-gray-300 shadow-sm'
                    }
                  `}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <span className={`ml-3 text-sm font-semibold transition-colors duration-200 ${
                    currentStep === step.id ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`ml-6 w-12 h-1 rounded-full transition-colors duration-300 ${
                      step.completed ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:shadow-3xl transition-all duration-500">
          <div className="p-8 md:p-12">
            {currentStep === 'career' && (
              <CareerSelector
                careerPaths={careerPaths}
                selectedCareer={selectedCareer}
                onSelectCareer={setSelectedCareer}
              />
            )}

            {currentStep === 'skills' && (
              <SkillInput
                userSkills={userSkills}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
                onAnalyzeResume={handleAnalyzeResume}
              />
            )}

            {currentStep === 'analysis' && selectedCareer && (
              <SkillGapAnalysis
                selectedCareer={selectedCareer}
                userSkills={userSkills}
                skillGaps={skillGaps}
              />
            )}

            {currentStep === 'roadmap' && (
              <Roadmap skillGaps={skillGaps} />
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 md:px-12 py-6 bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-white/50 rounded-xl font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              <div className="text-sm text-gray-500 font-medium bg-white/50 px-4 py-2 rounded-full">
                Step {currentStepIndex + 1} of {steps.length}
              </div>

              {currentStepIndex < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold">
                  Get Started Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;