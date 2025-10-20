import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Legion from './pages/legion';
import DemandZoneAnalyzer from './pages/demand-zone-analyzer/DemandZoneAnalyzer';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/legion" element={
            <ProtectedRoute>
              <Legion />
            </ProtectedRoute>
          } />
          <Route path="/demand-zone-analyzer" element={
            <ProtectedRoute>
              <DemandZoneAnalyzer />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
