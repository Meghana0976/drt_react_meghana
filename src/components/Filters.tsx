import React from 'react';
import { Satellite } from '../types/Satellite';

interface Props {
  objectTypes: string[];
  orbitCodes: string[];
  selectedObject: string[];
  selectedOrbit: string[];
  onObjectChange: (vals: string[]) => void;
  onOrbitChange: (vals: string[]) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  getCount: (key: keyof Satellite, value: string) => number;
};

const containerStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const filterGroupStyle: React.CSSProperties = {
  marginBottom: '8px',
};

const filterLabelStyle: React.CSSProperties = {
  marginBottom: '4px',
  fontWeight: 'bold',
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const filterButtonStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: '20px',
  // border: '1px solid #ccc',
  background: '#f4f4f4',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.3s',
  border:'none'
};

const selectedButtonStyle: React.CSSProperties = {
  background: '#007bff',
  color: 'white',
  borderColor: '#007bff',
};

const actionButtonStyle: React.CSSProperties = {
  ...filterButtonStyle,
  marginRight: '10px',
  minWidth: '100px',
  textAlign: 'center',
  background:'rgb(0, 123, 255)',
  padding: '13px 16px',
  color: 'white',
  borderRadius: '10px',
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
  // Toggle for filters
  const toggleSelection = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter((v) => v !== value);
    }
    return [...array, value];
  };

  return (
    <div style={containerStyle}>
    
      <div style={filterGroupStyle}>
        <div style={filterLabelStyle}>Filter by Object Type:</div>
        <div style={buttonGroupStyle}>
         
          <button
            style={{
              ...filterButtonStyle,
              ...(selectedObject.length === 0 ? selectedButtonStyle : {}),
            }}
            onClick={() => onObjectChange([])}
            type="button"
          >
            All ({objectTypes.reduce((acc, type) => acc + getCount('objectType', type), 0)})
          </button>
          {objectTypes.map((type) => {
            const count = getCount('objectType', type);
            const isSelected = selectedObject.includes(type);
            return (
              <button
                key={type}
                style={{
                  ...filterButtonStyle,
                  ...(isSelected ? selectedButtonStyle : {}),
                }}
                onClick={() => onObjectChange(toggleSelection(selectedObject, type))}
                type="button"
              >
                {type} 
              </button>
            );
          })}
        </div>
      </div>

      {/* Orbit Code Filters */}
      <div style={filterGroupStyle}>
        <div style={filterLabelStyle}>Filter by Orbit Code:</div>
        <div style={buttonGroupStyle}>
      
          <button
            style={{
              ...filterButtonStyle,
              ...(selectedOrbit.length === 0 ? selectedButtonStyle : {}),
            }}
            onClick={() => onOrbitChange([])}
            type="button"
          >
            All ({orbitCodes.reduce((acc, code) => acc + getCount('orbitCode', code), 0)})
          </button>
          {orbitCodes.map((code) => {
            const count = getCount('orbitCode', code);
            const isSelected = selectedOrbit.includes(code);
            return (
              <button
                key={code}
                style={{
                  ...filterButtonStyle,
                  ...(isSelected ? selectedButtonStyle : {}),
                }}
                onClick={() => onOrbitChange(toggleSelection(selectedOrbit, code))}
                type="button"
              >
                {code} 
              </button>
            );
          })}
        </div>
      </div>

 
      <div style={{ marginTop: '12px' }}>
        <button onClick={applyFilters} style={actionButtonStyle} type="button">
          Apply Filters
        </button>
        <button onClick={clearFilters} style={actionButtonStyle} type="button">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
