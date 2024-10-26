import React from 'react';
import { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import MultiSelect from '@/components/MultiSelect';
import ArrowButton from '@/components/ArrowButton';

import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa6';

import { moveItems } from '@/features/subscriptionsSlice.js';

const MultiSelectControlPanel = ({
  title,
  label,
  availableItems,
  selectedItems,
  loading,
}) => {
  const [selectedToMove, setSelectedToMove] = useState([]);
  const isSmallScreen = useMediaQuery('(min-width:600px)');

  const dispatch = useDispatch();

  const handleItemChange = (items, action) => {
    if (action === 'move') {
      dispatch(moveItems({ items: selectedToMove, action: 'move' }));
    } else if (action === 'remove') {
      dispatch(moveItems({ items: selectedToMove, action: 'remove' }));
    }
    setSelectedToMove([]);
  };

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" gutterBottom fontStyle={'italic'}>
          To follow a {label}, select it in the left panel and click → <br />
          To unfollow a {label}, select it in the right panel and click ← <br />
          Then click "Save" to apply your changes. <br />
        </Typography>

        <Typography variant="body1" gutterBottom fontStyle={'italic'}>
          Use search fields to easily find a required {label}.
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={5}>
            <MultiSelect
              items={availableItems}
              selectedToMove={selectedToMove}
              setSelectedToMove={setSelectedToMove}
              onItemsChange={(items) => handleItemChange(items, 'move')}
              loading={loading}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{
              flexDirection: {
                xs: 'row',
                sm: 'column',
              },
            }}
          >
            <ArrowButton
              icon={isSmallScreen ? <FaArrowRight /> : <FaArrowDown />}
              onClick={() => handleItemChange(selectedToMove, 'move')}
              isDisabled={
                !selectedToMove.length ||
                selectedToMove.every((item) => selectedItems.includes(item))
              }
            />
            <ArrowButton
              icon={isSmallScreen ? <FaArrowLeft /> : <FaArrowUp />}
              onClick={() => handleItemChange(selectedToMove, 'remove')}
              isDisabled={
                !selectedToMove.length ||
                selectedToMove.every((item) => availableItems.includes(item))
              }
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MultiSelect
              items={selectedItems}
              selectedToMove={selectedToMove}
              setSelectedToMove={setSelectedToMove}
              onItemsChange={(items) => handleItemChange(items, 'remove')}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MultiSelectControlPanel;
