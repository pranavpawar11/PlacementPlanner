import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResourceSection = ({ type, resources, icon, isDark }) => (
  <div className={`p-4 rounded-2xl border backdrop-blur-sm ${
    isDark ? 'bg-gray-800/40 border-gray-700/40' : 'bg-white/60 border-gray-200/40'
  } shadow-lg hover:shadow-xl transition-all duration-300`}>
    {/* Section Header */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl ${
          isDark ? 'bg-gray-700/60 border border-gray-600/40' : 'bg-gray-100/80 border border-gray-200/60'
        }`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h4 className={`font-bold text-base ${isDark ? 'text-gray-200' : 'text-gray-800'} capitalize leading-tight`}>
            {type.replace('-', ' ')}
          </h4>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
            {resources.length} resource{resources.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      <div className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
        isDark ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25' : 'bg-blue-50 text-blue-600 border border-blue-200'
      }`}>
        {resources.length}
      </div>
    </div>

    {/* Resources Grid */}
    <div className="grid grid-cols-1 gap-3">
      {resources.map((resource, idx) => (
        <a
          key={idx}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] border ${
            isDark ? 'bg-gray-800/60 hover:bg-gray-700/80 border-gray-700/50 hover:border-gray-600/60' : 'bg-white/80 hover:bg-white border-gray-200/60 hover:border-gray-300/80'
          } backdrop-blur-sm hover:shadow-lg`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${
              isDark ? 'bg-gray-700/40' : 'bg-gray-100/60'
            }`}>
              <span className="text-base">{resource.icon}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-800 group-hover:text-gray-900'} truncate leading-tight`}>
                {resource.title}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'} capitalize mt-1 font-medium`}>
                {resource.type.replace('-', ' ')}
              </div>
            </div>
            
            <div className={`p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110 ${
              isDark ? 'bg-gray-700/40 group-hover:bg-blue-500/20' : 'bg-gray-100/60 group-hover:bg-blue-50'
            }`}>
              <svg className={`w-4 h-4 ${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default ResourceSection;