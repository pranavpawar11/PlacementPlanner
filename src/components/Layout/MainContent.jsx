// components/Layout/MainContent.jsx 
import React from 'react';
import { useApp } from '../../context/AppProvider';
import CalendarBoard from '../CalendarBoard';
import DayView from '../DayView';
import NotificationsView from '../Notifications/NotificationsView';

const MainContent = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarBoard />;
      case 'day':
        return <DayView />;
      case 'notifications':
        return <NotificationsView />;
      default:
        console.warn(`Unknown view: ${currentView}. Falling back to calendar view.`);
        return <CalendarBoard />;
    }
  };

  return <>{renderView()}</>;
};

export default MainContent;