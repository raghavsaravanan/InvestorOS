import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Legion from './pages/legion';
import DemandZoneAnalyzer from './pages/demand-zone-analyzer/DemandZoneAnalyzer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legion" element={<Legion />} />
        <Route path="/demand-zone-analyzer" element={<DemandZoneAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
