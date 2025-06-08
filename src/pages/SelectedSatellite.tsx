import React, { useEffect, useState } from 'react';
import { Satellite } from '../types/Satellite';

const containerStyle: React.CSSProperties = {
  maxWidth: '700px',
  margin: '40px auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  fontFamily: 'Arial, sans-serif',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  textAlign: 'center',
};

const listStyle: React.CSSProperties = {
  listStyleType: 'disc',
  paddingLeft: '24px',
};

const itemStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const noDataStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '40px',
  fontSize: '18px',
  color: '#555',
};

const SelectedSatellites = () => {
  const [selected, setSelected] = useState<Satellite[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('selectedSatellites');
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, []);

  if (selected.length === 0) {
    return <div style={noDataStyle}>No selected satellites found.</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Selected Satellites</h2>
      <ul style={listStyle}>
        {selected.map((sat) => (
          <li key={sat.noradCatId} style={itemStyle}>
            <strong>{sat.name || 'N/A'}</strong> (NORAD ID: {sat.noradCatId || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedSatellites;
