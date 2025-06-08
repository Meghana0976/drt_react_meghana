import { useState } from 'react';
import Header from '../components/Header';
import { Satellite } from '../types/Satellite';
import SatelliteDashboard from '../components/SatelliteDashboard';


const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'linear-gradient(180deg, #C8D1FF 2.75%, #E3E6FF 100%)',
        minHeight: '100vh',
        padding: '20px',
           overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <Header />
      <SatelliteDashboard />
    </div>
  );
};


export default Home;
