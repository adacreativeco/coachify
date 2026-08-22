import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Team from '@/pages/Team';
import Players from '@/pages/Players';
import Training from '@/pages/Training';
import Matches from '@/pages/Matches';
import Analytics from '@/pages/Analytics';
import Messages from '@/pages/Messages';
import Settings from '@/pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected App Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/team" element={
                <ProtectedRoute>
                  <Layout>
                    <Team />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/players" element={
                <ProtectedRoute>
                  <Layout>
                    <Players />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/training" element={
                <ProtectedRoute>
                  <Layout>
                    <Training />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/matches" element={
                <ProtectedRoute>
                  <Layout>
                    <Matches />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Layout>
                    <Messages />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Toaster 
              position="top-right"
              expand={true}
              richColors
              closeButton
              duration={4000}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
