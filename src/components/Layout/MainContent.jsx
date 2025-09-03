// components/Layout/MainContent.jsx - Main content area
import React from 'react';
import { useApp } from '../../context/AppProvider';
import CalendarBoard from '../CalendarBoard';
import DayView from '../DayView';

const MainContent = () => {
  const { currentView } = useApp();

  return (
    <>
      {currentView === 'calendar' ? (
        <CalendarBoard />
      ) : (
        <DayView />
      )}
    </>
  );
};

export default MainContent;