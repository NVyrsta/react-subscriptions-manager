import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const MultiSelect = ({
  items,
  onItemsChange,
  selectedToMove,
  setSelectedToMove,
  loading,
}) => {
  const [filteredItems, setFilteredItems] = useState(items || []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredItems(
      items.filter((item) => item.name.toLowerCase().includes(query)),
    );
  };

  const handleSingleClick = (item, event) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedToMove((prevSelected) => {
        if (prevSelected.includes(item)) {
          return prevSelected.filter((i) => i !== item);
        }
        return [...prevSelected, item];
      });
    } else {
      setSelectedToMove([item]);
    }
  };

  const handleDoubleClick = (item) => {
    onItemsChange([item], 'move');
    setSelectedToMove([]);
  };

  return (
    <Box
      p={3}
      sx={{
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
        border="1px solid #ccc"
      />
      <Box
        mt={2}
        border="1px solid #ccc"
        height={300}
        overflow="auto"
        sx={{
          cursor: 'pointer',
          backgroundColor: 'white',
        }}
      >
        <Box minHeight={10}>{loading && <LinearProgress />}</Box>

        {filteredItems.map((item) => (
          <Box
            key={item.id}
            p={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={(e) => handleSingleClick(item, e)}
            onDoubleClick={() => handleDoubleClick(item)}
            sx={{
              backgroundColor: selectedToMove.includes(item)
                ? '#1976d2'
                : 'white',
              color: selectedToMove.includes(item) ? 'white' : 'gray',
            }}
          >
            {item.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiSelect;
