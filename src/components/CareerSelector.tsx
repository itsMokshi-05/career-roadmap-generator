import React from 'react';
import { CareerPath } from '../types';
import { TrendingUp, DollarSign } from 'lucide-react';

interface CareerSelectorProps {
  careerPaths: CareerPath[];
  selectedCareer: CareerPath | null;
  onSelectCareer: (career: CareerPath) => void;
}

export const CareerSelector: React.FC<CareerSelectorProps> = ({
  careerPaths,
  selectedCareer,
  onSelectCareer,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Choose Your Career Goal
        </h2>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
          Select a career path to get personalized skill recommendations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {careerPaths.map((career) => (
          <div
            key={career.id}
            onClick={() => onSelectCareer(career)}
            className={`
              relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-500
              hover:shadow-2xl hover:scale-105 group backdrop-blur-sm
              ${selectedCareer?.id === career.id
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-2xl scale-105 ring-4 ring-blue-200/50'
                : 'border-gray-200 bg-white/80 hover:border-blue-300 hover:bg-white/90'
              }
            `}
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-center">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{career.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-200">
                {career.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {career.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center text-sm text-gray-700 bg-white/50 rounded-lg py-2 px-3">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  {career.averageSalary}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-700 bg-white/50 rounded-lg py-2 px-3">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  {career.growthRate}
                </div>
              </div>
            </div>
            
            {selectedCareer?.id === career.id && (
              <div className="absolute top-2 right-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};