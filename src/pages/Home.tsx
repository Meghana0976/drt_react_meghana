import { useState } from 'react';
import Header from '../components/Header';
import { Satellite } from '../types/Satellite';
import SeachBar from '../components/SearchBar';


const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',   // stack header + table vertically
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#00001E',
        minHeight: '100vh',
        padding: '20px',
           overflow: 'hidden', // <-- Prevent scrolling
        boxSizing: 'border-box', // Ensure padding doesn't cause overflow
        width: '100vw', // Ensure full width
      }}
    >
      <Header />
      <SeachBar />
    </div>
  );
};


export default Home;
