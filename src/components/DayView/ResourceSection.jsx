import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResourceSection = ({ type, resources, icon, isDark }) => (
  <div>
    <h4 className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2 uppercase tracking-wider flex items-center`}>
      <span className="mr-2 text-sm">{icon}</span>
      {type.replace('-', ' ')}
      <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
        isDark ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-200/60 text-gray-600'
      }`}>
        {resources.length}
      </span>
    </h4>
    <div className="space-y-2">
      {resources.map((resource, idx) => (
        <a
          key={idx}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group block p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
            isDark ? 'bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50' : 'bg-white/80 hover:bg-white border border-gray-200/50'
          } backdrop-blur-sm hover:shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-base flex-shrink-0">{resource.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} truncate`}>
                  {resource.title}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} capitalize mt-0.5`}>
                  {resource.type.replace('-', ' ')}
                </div>
              </div>
            </div>
            <ExternalLink size={14} className={`${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'} transition-colors flex-shrink-0 ml-2`} />
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default ResourceSection;