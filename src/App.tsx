/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BecomeTutorPage from './pages/BecomeTutorPage';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLeads from './pages/Admin/AdminLeads';
import AdminTutors from './pages/Admin/AdminTutors';
import AdminSubscriptions from './pages/Admin/AdminSubscriptions';
import AdminConversations from './pages/Admin/AdminConversations';
import AdminReports from './pages/Admin/AdminReports';
import AdminSettings from './pages/Admin/AdminSettings';
import TutorDashboard from './pages/Tutor/TutorDashboard';
import TutorSettings from './pages/Tutor/TutorSettings';
import TutorCalendar from './pages/Tutor/TutorCalendar';
import TutorStudents from './pages/Tutor/TutorStudents';
import ParentDashboard from './pages/Parent/ParentDashboard';

import ErrorBoundary from './components/ErrorBoundary';
import FidelGameLab from './components/FidelGameLab';
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen w-screen flex items-center justify-center font-sans">Loading...</div>;
  if (!user && window.location.pathname !== '/login') return <Navigate to="/login" />;
  
  if (allowedRoles && user && user.role) {
    if (!allowedRoles.includes(user.role)) {
      if (user.role === 'tutor') {
        return <Navigate to="/tutor" />;
      }
      if (user.role === 'parent') {
        return <Navigate to="/parent" />;
      }
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/book-trial" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/become-tutor" element={<BecomeTutorPage />} />
            
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin">
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="tutors" element={<AdminTutors />} />
                    <Route path="subscriptions" element={<AdminSubscriptions />} />
                    <Route path="conversations" element={<AdminConversations />} />
                    <Route path="reports" element={<AdminReports />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="games" element={<FidelGameLab />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/tutor/*" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <DashboardLayout role="tutor">
                  <Routes>
                    <Route index element={<TutorDashboard />} />
                    <Route path="calendar" element={<TutorCalendar />} />
                    <Route path="students" element={<TutorStudents />} />
                    <Route path="settings" element={<TutorSettings />} />
                    <Route path="games" element={<FidelGameLab />} /> 
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/parent/*" element={
              <ProtectedRoute allowedRoles={['parent']}>
                <DashboardLayout role="parent">
                  <Routes>
                    <Route index element={<ParentDashboard />} />
                    <Route path="schedule" element={<ParentDashboard />} />
                    <Route path="billing" element={<ParentDashboard />} />
                    <Route path="progress" element={<ParentDashboard />} />
                    <Route path="settings" element={<ParentDashboard />} />
                    <Route path="games" element={<FidelGameLab />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}
