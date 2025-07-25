import React, { useState } from 'react';
import { Skill } from '../types';
import { Plus, X, Upload } from 'lucide-react';

interface SkillInputProps {
  userSkills: Skill[];
  onAddSkill: (skill: Skill) => void;
  onRemoveSkill: (skillId: string) => void;
  onAnalyzeResume: (file: File) => void;
}

export const SkillInput: React.FC<SkillInputProps> = ({
  userSkills,
  onAddSkill,
  onRemoveSkill,
  onAnalyzeResume,
}) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Programming');
  const [selectedProficiency, setSelectedProficiency] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const categories = ['Programming', 'Frontend', 'Backend', 'Database', 'Design', 'Tools', 'DevOps', 'AI/ML', 'Testing'];

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const skill: Skill = {
        id: newSkillName.toLowerCase().replace(/\s+/g, '-'),
        name: newSkillName.trim(),
        category: selectedCategory,
        proficiency: selectedProficiency,
      };
      onAddSkill(skill);
      setNewSkillName('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAnalyzeResume(file);
    }
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'beginner': return 'bg-yellow-100 text-yellow-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Tell Us About Your Skills
        </h2>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Add your current skills or upload your resume for analysis
        </p>
      </div>

      {/* Resume Upload */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 hover:shadow-lg group">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Upload Your Resume
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We'll automatically extract your skills from your resume
          </p>
          <label className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold">
            <Upload className="w-5 h-5 mr-2" />
            Choose File
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-4 font-medium">
            Supports PDF, DOC, DOCX files
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Manual Skill Input */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Add Skills Manually
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="e.g., React, Python, SQL"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Proficiency
            </label>
            <select
              value={selectedProficiency}
              onChange={(e) => setSelectedProficiency(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleAddSkill}
              disabled={!newSkillName.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Current Skills */}
      {userSkills.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Your Skills ({userSkills.length})
          </h3>
          
          <div className="flex flex-wrap gap-4">
            {userSkills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-xl group hover:border-red-300 transition-all duration-200 hover:shadow-md transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">{skill.name}</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getProficiencyColor(skill.proficiency || 'intermediate')}`}>
                    {skill.proficiency}
                  </span>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">{skill.category}</span>
                </div>
                <button
                  onClick={() => onRemoveSkill(skill.id)}
                  className="ml-3 p-1.5 text-gray-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};