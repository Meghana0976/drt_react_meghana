import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSatellites } from '../apiservice/api';
import { Satellite } from '../types/Satellite';
import SearchBar from './SearchBar';
import Filters from './Filters';
import SatelliteTable from './SatelliteTable';
import PaginationControls from './PaginationControls';
import Header from './Header';

const containerStyle: React.CSSProperties = {
  width: '100%',
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
  const [selectedObject, setSelectedObject] = useState<string[]>([]);
  const [selectedOrbit, setSelectedOrbit] = useState<string[]>([]);
  const [objectFilter, setObjectFilter] = useState<string[]>([]);
  const [orbitFilter, setOrbitFilter] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<Satellite[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleProceed = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one satellite.');
      return;
    }
    localStorage.setItem('selectedSatellites', JSON.stringify(selectedRows));
    navigate('/selected');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchSatellites();
        setSatellites(data);

        const stored = localStorage.getItem('selectedSatellites');
        if (stored) {
          const storedSelected: Satellite[] = JSON.parse(stored);
          const restoredSelection = data.filter((sat) =>
            storedSelected.some((storedSat) => storedSat.noradCatId === sat.noradCatId)
          );
          setSelectedRows(restoredSelection);
        }
      } catch (err) {
        console.error(err);
        setError('❌ Failed to fetch satellites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = useMemo(() => {
    return satellites.filter(
      (sat) =>
        (sat.name || '').toLowerCase().includes(searchName.toLowerCase()) &&
        (objectFilter.length === 0 || objectFilter.includes(sat.objectType ?? '')) &&
        (orbitFilter.length === 0 || orbitFilter.includes(sat.orbitCode ?? ''))
    );
  }, [satellites, searchName, objectFilter, orbitFilter]);

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const objectTypes = uniqueValues(satellites, 'objectType').filter((v): v is string => v !== null);
  const orbitCodes = uniqueValues(satellites, 'orbitCode').filter((v): v is string => v !== null);

  const getCount = (key: keyof Satellite, value: string) =>
    satellites.filter((s) => s[key] === value).length;


  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '18px',
          color: 'red',
          fontWeight: 'bold',
        }}
      >
        {error}
      </div>
    );
  }


  return (
    <div style={containerStyle}>
      <Header />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onEnter={() => {
            setSearchName(searchInput.trim());
            setCurrentPage(1);
          }}
        />
        {/* <p style={{ margin: 0 }}>
          Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p> */}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={handleProceed}
          disabled={selectedRows.length === 0}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            backgroundColor: selectedRows.length === 0 ? '#ccc' : '#3b82f6',
            color: 'white',
            border: 'none',
            cursor: selectedRows.length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Proceed
        </button>
      </div>

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
          setSelectedObject([]);
          setSelectedOrbit([]);
          setObjectFilter([]);
          setOrbitFilter([]);
          setSearchInput('');
          setSearchName('');
          setCurrentPage(1);
        }}
        getCount={getCount}
      />

      <SatelliteTable
        data={paginated}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

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
