// components/Layout/MobileSidebar.jsx - Mobile sidebar component
import React from 'react';
import { useApp } from '../../context/AppProvider';
import Sidebar from '../Sidebar/Sidebar';

const MobileSidebar = () => {
  const { isDark } = useApp();

  return (
    <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md`}>
      <Sidebar />
    </div>
  );
};

export default MobileSidebar;