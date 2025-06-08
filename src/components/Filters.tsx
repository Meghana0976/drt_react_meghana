import React from 'react';
import { Satellite } from '../types/Satellite';

interface Props {
  objectTypes: string[];
  orbitCodes: string[];
  selectedObject: string | null;
  selectedOrbit: string | null;
  onObjectChange: (val: string | null) => void;
  onOrbitChange: (val: string | null) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  getCount: (key: keyof Satellite, value: string) => number;
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  marginBottom: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  width: 'calc(50% - 12px)',
  marginRight: '10px',
};

const buttonStyle: React.CSSProperties = {
  marginRight: '10px',
  padding: '6px 12px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  background: '#f4f4f4',
  cursor: 'pointer',
};

const Filters = ({
  objectTypes,
  orbitCodes,
  selectedObject,
  selectedOrbit,
  onObjectChange,
  onOrbitChange,
  applyFilters,
  clearFilters,
  getCount,
}: Props) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
      <select
        style={selectStyle}
        value={selectedObject ?? ''}
        onChange={(e) => onObjectChange(e.target.value || null)}
      >
        <option value="">Filter by Object Type</option>
        {objectTypes.map((type) => (
          <option key={type} value={type}>
            {type} ({getCount('objectType', type)})
          </option>
        ))}
      </select>

      <select
        style={selectStyle}
        value={selectedOrbit ?? ''}
        onChange={(e) => onOrbitChange(e.target.value || null)}
      >
        <option value="">Filter by Orbit Code</option>
        {orbitCodes.map((code) => (
          <option key={code} value={code}>
            {code} ({getCount('orbitCode', code)})
          </option>
        ))}
      </select>

      <button onClick={applyFilters} style={buttonStyle}>Apply Filters</button>
      <button onClick={clearFilters} style={buttonStyle}>Clear Filters</button>
    </div>
  );
};

export default Filters;
