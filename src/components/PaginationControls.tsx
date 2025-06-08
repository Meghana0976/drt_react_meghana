import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonStyle: React.CSSProperties = {
  marginRight: '10px',
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
          ...buttonStyle,
          ...(i === currentPage ? activeButtonStyle : {}),
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle}
      >
        Prev
      </button>
      {buttons}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
