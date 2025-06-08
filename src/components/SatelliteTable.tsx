import React from 'react';
import { Satellite } from '../types/Satellite';

interface Props {
  data: Satellite[];
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  borderRadius: '10px',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  backgroundColor: '#eef0ff',
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #eee',
};

const badge = (text: string, color: string) => ({
  backgroundColor: color,
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  display: 'inline-block',
});

const SatelliteTable = ({ data }: Props) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>NORAD ID</th>
          <th style={thStyle}>Designator</th>
          <th style={thStyle}>Launch Date</th>
          <th style={thStyle}>Decay Date</th>
          <th style={thStyle}>Object Type</th>
          <th style={thStyle}>Launch Site</th>
          <th style={thStyle}>Country</th>
          <th style={thStyle}>Orbit</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td style={tdStyle} colSpan={9}>No satellites found.</td>
          </tr>
        ) : (
          data.map((sat) => (
            <tr key={sat.noradCatId}>
              <td style={tdStyle}>{sat.name || 'N/A'}</td>
              <td style={tdStyle}>{sat.noradCatId || 'N/A'}</td>
              <td style={tdStyle}>{sat.intlDes || 'N/A'}</td>
              <td style={tdStyle}>{sat.launchDate || 'N/A'}</td>
              <td style={tdStyle}>{sat.decayDate || 'N/A'}</td>
              <td style={tdStyle}>
                <span style={badge(sat.objectType || 'N/A', '#60a5fa')}>
                  {sat.objectType || 'N/A'}
                </span>
              </td>
              <td style={tdStyle}>{sat.launchSiteCode || 'N/A'}</td>
              <td style={tdStyle}>{sat.countryCode || 'N/A'}</td>
              <td style={tdStyle}>
                <span style={badge(sat.orbitCode || 'N/A', '#a78bfa')}>
                  {sat.orbitCode || 'N/A'}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default SatelliteTable;
