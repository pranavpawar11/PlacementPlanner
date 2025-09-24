import React from 'react';
import AppProvider from './context/AppProvider';
import UIProvider from './context/UIProvider'; 
import Layout from './components/Layout/Layout';
import './styles/global.css';

const App = () => {
  return (
    <AppProvider>
      <UIProvider> 
        <Layout />
      </UIProvider>
    </AppProvider>
  );
};

export default App;