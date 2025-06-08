import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const baseButtonStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  margin: '0 4px',
  borderRadius: '6px',
  border: 'none',
  background: '#ffff',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  transition: 'background 0.3s, color 0.3s',
};

const activeButtonStyle: React.CSSProperties = {
  backgroundColor: '#3b82f6',
  color: 'white',
};

const disabledButtonStyle: React.CSSProperties = {
  cursor: 'not-allowed',
  opacity: 0.5,
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }: Props) => {
  const buttons = [];
  const maxVisible = 3;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        style={{
          ...baseButtonStyle,
          ...(i === currentPage ? activeButtonStyle : {}),
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...baseButtonStyle,
          ...(currentPage === 1 ? disabledButtonStyle : {}),
        }}
      >
        «
      </button>
      {buttons}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...baseButtonStyle,
          ...(currentPage === totalPages ? disabledButtonStyle : {}),
        }}
      >
        »
      </button>
    </div>
  );
};

export default PaginationControls;
