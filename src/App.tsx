import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/3d/Scene';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Builder = lazy(() => import('./pages/Builder'));
const Projects = lazy(() => import('./pages/Projects'));
const Templates = lazy(() => import('./pages/Templates'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Modern Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#27272a] via-[#52525b] to-[#a1a1aa] opacity-50" />
        <Scene />
      </div>
      
      <div className="relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
