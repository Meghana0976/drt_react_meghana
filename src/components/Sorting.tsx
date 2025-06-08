
import React from 'react';

interface Props {
  sortBy: 'name' | 'noradCatId';
  sortOrder: 'asc' | 'desc';
  onSortByChange: (value: 'name' | 'noradCatId') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const SortControls: React.FC<Props> = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', gap: '10px', marginBottom: '10px' }}>
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'name' | 'noradCatId')}
          style={{    marginLeft: '5px',
    padding: '5px 4px',
    borderRadius: '7px' }}
        >
          <option value="name">Name</option>
          <option value="noradCatId">NORAD ID</option>
        </select>
      </label>

     
    </div>
  );
};

export default SortControls;
