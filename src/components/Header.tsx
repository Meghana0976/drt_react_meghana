const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
       
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontStyle: 'oblique',
        }}
      >
        🛰️ Satellite Tracker – Digantara
      </h1>
      <p
        style={{
        fontStyle: 'oblique',
        fontSize: '1.2rem',
        }}
      >
        Search and analyze real satellite data
      </p>
    </div>
  );
};

export default Header;
