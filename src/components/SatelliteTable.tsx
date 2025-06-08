import React, { useState, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Satellite } from '../types/Satellite';

interface Props {
  data: Satellite[];
  selectedRows: Satellite[];
  setSelectedRows: React.Dispatch<React.SetStateAction<Satellite[]>>;
}

type SortField = 'name' | 'noradCatId';
type SortOrder = 'asc' | 'desc';

const headerStyle: CSSProperties = {
  display: 'flex',
  fontWeight: 'bold',
  backgroundColor: '#eef0ff',
  padding: '10px',
};

const cellStyle: CSSProperties = {
  flex: 1,
  padding: '10px',
  borderBottom: '1px solid #eee',
};

const badgeStyle = (color: string): CSSProperties => ({
  backgroundColor: color,
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  display: 'inline-block',
});

const SatelliteTable: React.FC<Props> = ({ data, selectedRows, setSelectedRows }) => {
  const [error, setError] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleSelection = (sat: Satellite) => {
    const isSelected = selectedRows.some((s) => s.noradCatId === sat.noradCatId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((s) => s.noradCatId !== sat.noradCatId));
      setError('');
    } else {
      if (selectedRows.length >= 10) {
        setError('⚠️ You can only select up to 10 satellites.');
        return;
      }
      setSelectedRows([...selectedRows, sat]);
      setError('');
    }
  };

  const isSelected = (sat: Satellite) =>
    selectedRows.some((s) => s.noradCatId === sat.noradCatId);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase() || '';
    const valB = b[sortField]?.toString().toLowerCase() || '';
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const sat = sortedData[index];
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', background: isSelected(sat) ? '#e0f7ff' : 'white' }}>
        <div style={{ ...cellStyle, flex: '0 0 60px' }}>
          <input type="checkbox" checked={isSelected(sat)} onChange={() => toggleSelection(sat)} />
        </div>
        <div style={cellStyle}>{sat.name || 'N/A'}</div>
        <div style={cellStyle}>{sat.noradCatId || 'N/A'}</div>
        <div style={cellStyle}>{sat.intlDes || 'N/A'}</div>
        <div style={cellStyle}>{sat.launchDate || 'N/A'}</div>
        <div style={cellStyle}>{sat.decayDate || 'N/A'}</div>
        <div style={cellStyle}>
          <span style={badgeStyle('#60a5fa')}>{sat.objectType || 'N/A'}</span>
        </div>
        <div style={cellStyle}>{sat.launchSiteCode || 'N/A'}</div>
        <div style={cellStyle}>{sat.countryCode || 'N/A'}</div>
        <div style={cellStyle}>
          <span style={badgeStyle('#a78bfa')}>{sat.orbitCode || 'N/A'}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}>
        Selected Satellites: {selectedRows.length} / 10
      </p>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '12px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      {/* Table Header */}
      <div style={headerStyle}>
        <div style={{ ...cellStyle, flex: '0 0 60px' }}>Select</div>
        <div style={cellStyle} onClick={() => handleSort('name')}>
          Name {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
        </div>
        <div style={cellStyle} onClick={() => handleSort('noradCatId')}>
          NORAD ID {sortField === 'noradCatId' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
        </div>
        <div style={cellStyle}>Designator</div>
        <div style={cellStyle}>Launch Date</div>
        <div style={cellStyle}>Decay Date</div>
        <div style={cellStyle}>Object Type</div>
        <div style={cellStyle}>Launch Site</div>
        <div style={cellStyle}>Country</div>
        <div style={cellStyle}>Orbit</div>
      </div>

      {/* Virtualized Rows */}
      <List
        height={500}
        itemCount={sortedData.length}
        itemSize={60}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default SatelliteTable;
