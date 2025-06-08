import React, { useEffect, useState, useMemo } from 'react';
import { fetchSatellites } from '../apiservice/api';
import { Satellite } from '../types/Satellite';
import SearchBar from './SearchBar';
import Filters from './Filters';
import SatelliteTable from './SatelliteTable';
import PaginationControls from './PaginationControls';

const containerStyle: React.CSSProperties = {
  width: '100vw',
  minHeight: '100vh',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
  overflow: 'auto',
};

const uniqueValues = (data: Satellite[], key: keyof Satellite) =>
  [...new Set(data.map((sat) => sat[key]))].filter(Boolean);

const SatelliteDashboard = () => {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [objectFilter, setObjectFilter] = useState<string | null>(null);
  const [orbitFilter, setOrbitFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSatellites();
      setSatellites(data);
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return satellites.filter(
      (sat) =>
        (sat.name || '').toLowerCase().includes(searchName.toLowerCase()) &&
        (!objectFilter || sat.objectType === objectFilter) &&
        (!orbitFilter || sat.orbitCode === orbitFilter)
    );
  }, [satellites, searchName, objectFilter, orbitFilter]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const objectTypes = uniqueValues(satellites, 'objectType').filter((v): v is string => v !== null);
  const orbitCodes = uniqueValues(satellites, 'orbitCode').filter((v): v is string => v !== null);

  const getCount = (key: keyof Satellite, value: string) =>
    satellites.filter((s) => s[key] === value).length;

  return (
    <div style={containerStyle}>
      <p>Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

      <SearchBar
        value={searchInput}
        onChange={setSearchInput}
        onEnter={() => {
          setSearchName(searchInput.trim());
          setCurrentPage(1);
        }}
      />

      <Filters
        objectTypes={objectTypes}
        orbitCodes={orbitCodes}
        selectedObject={selectedObject}
        selectedOrbit={selectedOrbit}
        onObjectChange={setSelectedObject}
        onOrbitChange={setSelectedOrbit}
        applyFilters={() => {
          setObjectFilter(selectedObject);
          setOrbitFilter(selectedOrbit);
          setCurrentPage(1);
        }}
        clearFilters={() => {
          setSelectedObject(null);
          setSelectedOrbit(null);
          setObjectFilter(null);
          setOrbitFilter(null);
          setSearchInput('');
          setSearchName('');
          setCurrentPage(1);
        }}
        getCount={getCount}
      />

      <SatelliteTable data={paginated} />

      {filtered.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SatelliteDashboard;
