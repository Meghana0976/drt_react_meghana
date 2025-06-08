import { Routes, Route } from 'react-router-dom';
import SatelliteDashboard from './components/SatelliteDashboard';
import SelectedSatellites from './pages/SelectedSatellite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SatelliteDashboard />} />
      <Route path="/selected" element={<SelectedSatellites />} />
    </Routes>
  );
}

export default App;
