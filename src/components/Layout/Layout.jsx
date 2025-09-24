import React from 'react';
import ToastContainer from '../UI/ToastContainer';
import ConfirmationDialog from '../UI/ConfirmationDialog';
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
          {!isMobile && <Sidebar />}
          <MainContent />
        </div>

        {isMobile && currentView === 'calendar' && <MobileSidebar />}
      </div>

      {isMobile && currentView === 'calendar' && <FloatingActionButton />}
      <Modals />
      
      {/* NEW: Global UI Components */}
      <ToastContainer />
      <ConfirmationDialog />
    </div>
  );
};

export default Layout;