// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import UIProvider from "./context/UIProvider";
import AuthProvider from "./context/AuthProvider";

import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Layout from "./components/Layout/Layout";

import CalendarBoard from "./components/CalendarBoard";
import DayView from "./components/DayView";
import NotificationsView from "./components/Notifications/NotificationsView";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <UIProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected routes */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CalendarBoard />} />
                <Route path="day" element={<DayView />} />
                <Route path="notifications" element={<NotificationsView />} />
              </Route>
            </Routes>
          </Router>
        </UIProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
