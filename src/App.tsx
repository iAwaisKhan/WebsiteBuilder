import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/3d/Scene';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Projects from './pages/Projects';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div className="relative min-h-screen">
      <Scene />

      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
