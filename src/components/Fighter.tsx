import React, { useState } from 'react';
import { Trophy, Award, Star, ChevronDown, ChevronUp, User, Medal, Target } from 'lucide-react';

interface FighterProps {
  name: string;
  record: string;
  achievements: string[];
  description: string;
  weight_class: string;
  id: string;
}

export const Fighter: React.FC<FighterProps> = ({
  name,
  record,
  achievements,
  description,
  weight_class,
  id,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article 
      id={id} 
      className="fighter-card w-full max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden mb-8 text-white"
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-fight-blue rounded-full p-3">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold hover:text-fight-blue transition-colors duration-300">
                {name}
              </h2>
              <div className="flex items-center mt-1 text-gray-300">
                <Target className="w-4 h-4 mr-2" />
                <span>{weight_class}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
            <Trophy className="w-5 h-5 mr-2 text-fight-red" />
            <span className="font-semibold">{record}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center mb-4">
              <Medal className="w-5 h-5 mr-2 text-fight-blue" />
              Career Highlights
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <li 
                  key={index} 
                  className="bg-gray-700/30 rounded-lg p-3 flex items-center transform transition-all duration-300 hover:translate-x-2 hover:bg-gray-700/50"
                >
                  <Star className="w-4 h-4 mr-3 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-200">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-fight-blue hover:text-fight-red transition-colors duration-300"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 mr-1" />
              ) : (
                <ChevronDown className="w-5 h-5 mr-1" />
              )}
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
            <p className={`mt-2 text-gray-300 transition-all duration-300 ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 overflow-hidden opacity-80'
            }`}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}