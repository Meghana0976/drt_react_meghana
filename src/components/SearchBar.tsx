import React, { useEffect, useState, useMemo } from 'react';
import { fetchSatellites } from '../apiservice/api';
import { Satellite } from '../types/Satellite';

const buttonStyle: React.CSSProperties = {
  marginRight: '10px',
  marginBottom: '10px',
  padding: '6px 12px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  background: '#f4f4f4',
  cursor: 'pointer',
};

const activeButtonStyle: React.CSSProperties = {
  backgroundColor: '#dbeafe',
  borderColor: '#3b82f6',
};

const containerStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
  overflow: 'auto',
};

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  marginBottom: '10px',
  marginTop: '10px',
  width: '100%',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  width: 'calc(50% - 12px)',
  marginRight: '10px',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  background: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  borderRadius: '10px',
  overflow: 'hidden',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  textAlign: 'left',
  backgroundColor: '#eef0ff',
  fontWeight: 600,
  fontSize: '14px',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #eee',
  color: '#333',
};

const badge = (text: string, color: string) => ({
  backgroundColor: color,
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  display: 'inline-block',
});

const uniqueValues = (data: Satellite[], key: keyof Satellite) =>
  [...new Set(data.map((sat) => sat[key]))].filter(Boolean);

const SearchBar = () => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedObjectFilter, setSelectedObjectFilter] = useState<string | null>(null);
  const [selectedOrbitFilter, setSelectedOrbitFilter] = useState<string | null>(null);
  const [objectFilter, setObjectFilter] = useState<string | null>(null);
  const [orbitFilter, setOrbitFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadSatellites = async () => {
      try {
        const data = await fetchSatellites();
        setSatellites(data);
      } catch (error) {
        console.error('Failed to fetch satellites:', error);
      }
    };
    loadSatellites();
  }, []);

  const filteredSatellites = useMemo(() => {
    return satellites.filter((sat) =>
      (sat.name || '').toLowerCase().includes(searchName.toLowerCase()) &&
      (!objectFilter || sat.objectType === objectFilter) &&
      (!orbitFilter || sat.orbitCode === orbitFilter)
    );
  }, [satellites, searchName, objectFilter, orbitFilter]);

  const totalPages = Math.ceil(filteredSatellites.length / itemsPerPage);
  const paginatedSatellites = filteredSatellites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const objectTypes = uniqueValues(satellites, 'objectType');
  const orbitCodes = uniqueValues(satellites, 'orbitCode');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchName(searchInput.trim());
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setObjectFilter(selectedObjectFilter);
    setOrbitFilter(selectedOrbitFilter);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedObjectFilter(null);
    setSelectedOrbitFilter(null);
    setObjectFilter(null);
    setOrbitFilter(null);
    setSearchInput('');
    setSearchName('');
    setCurrentPage(1);
  };

  const paginationControls = (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        style={buttonStyle}
      >
        Prev
      </button>

      {(() => {
        const pageButtons = [];
        const maxVisible = 3;
        const half = Math.floor(maxVisible / 2);

        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
          start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              style={{
                ...buttonStyle,
                ...(currentPage === i ? activeButtonStyle : {}),
              }}
            >
              {i}
            </button>
          );
        }

        return pageButtons;
      })()}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );

  const getCount = (key: keyof Satellite, value: string) =>
    satellites.filter((s) => s[key] === value).length;

  return (
    <div style={containerStyle}>
      {/* Total count display */}
      <p style={{ fontWeight: 500, fontSize: '16px', marginBottom: '10px' }}>
        Showing {filteredSatellites.length} {filteredSatellites.length === 1 ? 'result' : 'results'}
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search satellite by name..."
        style={inputStyle}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={onKeyDown}
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '10px' }}>
        <select
          style={selectStyle}
          value={selectedObjectFilter ?? ''}
          onChange={(e) => setSelectedObjectFilter(e.target.value || null)}
        >
          <option value="">Filter by Object Type</option>
          {objectTypes.map((type) => (
            <option key={type as string} value={type as string}>
              {type} ({getCount('objectType', type as string)})
            </option>
          ))}
        </select>

        <select
          style={selectStyle}
          value={selectedOrbitFilter ?? ''}
          onChange={(e) => setSelectedOrbitFilter(e.target.value || null)}
        >
          <option value="">Filter by Orbit Code</option>
          {orbitCodes.map((code) => (
            <option key={code as string} value={code as string}>
              {code} ({getCount('orbitCode', code as string)})
            </option>
          ))}
        </select>

        <button onClick={applyFilters} style={buttonStyle}>Apply Filters</button>
        <button onClick={clearFilters} style={buttonStyle}>Clear Filters</button>
      </div>

      {/* Table */}
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
          {paginatedSatellites.length === 0 ? (
            <tr>
              <td style={tdStyle} colSpan={9}>No satellites found.</td>
            </tr>
          ) : (
            paginatedSatellites.map((sat) => (
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

      {filteredSatellites.length > itemsPerPage && paginationControls}
    </div>
  );
};

export default SearchBar;
