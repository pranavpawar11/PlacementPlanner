import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import UIProvider from './context/UIProvider';
import Layout from './components/Layout/Layout';
import AuthProvider from './context/AuthProvider';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './styles/global.css';

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <UIProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected / main app */}
              <Route path="/" element={<Layout />} />
            </Routes>
          </Router>
        </UIProvider>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
