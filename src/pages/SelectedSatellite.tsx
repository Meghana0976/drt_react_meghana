import React, { useEffect, useState } from 'react';
import { Satellite } from '../types/Satellite';

const SelectedSatellites = () => {
  const [selected, setSelected] = useState<Satellite[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('selectedSatellites');
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, []);

  if (selected.length === 0) {
    return <p>No selected satellites found.</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Selected Satellites</h2>
      <ul>
        {selected.map((sat) => (
          <li key={sat.noradCatId}>
            <strong>{sat.name || 'N/A'}</strong> (NORAD ID: {sat.noradCatId || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedSatellites;
