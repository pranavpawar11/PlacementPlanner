// App.jsx - Main application entry point
import React from 'react';
import AppProvider from './context/AppProvider';
import Layout from './components/Layout/Layout';
import './styles/global.css';

const App = () => {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
};

export default App;