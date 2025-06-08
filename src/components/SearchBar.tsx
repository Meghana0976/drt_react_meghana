import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onEnter: () => void;
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  marginBottom: '10px',
  marginTop: '10px',
  width: '100%',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const SearchBar = ({ value, onChange, onEnter }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onEnter();
  };

  return (
    <input
      type="text"
      placeholder="Search satellite by name..."
      style={inputStyle}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
