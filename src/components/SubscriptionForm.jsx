import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Alert } from '@mui/material';
import { saveData } from '@/features/subscriptionsSlice.js';

import useSaveNotification from '@/hooks/useSaveNotification';
import MultiSelectControlPanel from '@/components/MultiSelectControlPanel';
import useFetchSubscriptions from '@/hooks/useFetchSubscriptions';

const SubscriptionForm = ({ type, value, title }) => {
  const showNotification = useSaveNotification();
  const dispatch = useDispatch();

  const { availableItems, selectedItems, loading, error } = useSelector(
    (state) => state.subscriptions,
  );

  const { handleFetch } = useFetchSubscriptions(dispatch, type);

  const handleSave = async () => {
    const selectedIds = selectedItems.map((item) => item.id);
    const requestBody = { [`${value}_ids`]: selectedIds };

    try {
      await dispatch(saveData({ type, requestBody })).unwrap();
      showNotification('fulfilled');
    } catch (error) {
      showNotification('rejected');
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}

      <MultiSelectControlPanel
        title={title}
        label={value}
        availableItems={availableItems}
        selectedItems={selectedItems}
        loading={loading}
      />

      <Box p={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSave}
          sx={{
            padding: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriptionForm;
