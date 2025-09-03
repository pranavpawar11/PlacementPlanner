// components/Layout/Layout.jsx - Main application layout
import React from 'react';
import { useApp } from '../../context/AppProvider';
import { theme } from '../../utils/theme';

// Component imports
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from './MainContent';
import MobileSidebar from './MobileSidebar';
import FloatingActionButton from './FloatingActionButton';
import Modals from './Modals';

const Layout = () => {
  const { isDark, isMobile, currentView } = useApp();

  return (
    <div className={`min-h-screen ${isDark ? theme.colors.background.dark : theme.colors.background.light} transition-all duration-300`}>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          {!isMobile && <Sidebar />}
          
          {/* Main Content Area */}
          <MainContent />
        </div>

        {/* Mobile Sidebar */}
        {isMobile && currentView === 'calendar' && <MobileSidebar />}
      </div>

      {/* Floating Action Button for Mobile */}
      {isMobile && currentView === 'calendar' && <FloatingActionButton />}

      {/* Modals */}
      <Modals />
    </div>
  );
};

export default Layout;