import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import MultiSelect from '../components/MultiSelect.jsx';
import api from '../services/authService.js';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';
import { useNotifications } from '@toolpad/core/useNotifications';
import ArrowButton from '../components/ArrowButton.jsx';

const SubscriptionsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedToMove, setSelectedToMove] = useState([]);
  const [error, setError] = useState('');

  const notifications = useNotifications();

  const fetchData = useCallback(async (type) => {
    const availableEndpoint = type === 'companies' ? '/companies/' : '/mines/';
    const selectedEndpoint = `/subscriptions/${type}/`;

    try {
      const availableRes = await api.get(availableEndpoint);
      const selectedRes = await api.get(selectedEndpoint);

      const filteredAvailable = availableRes.data.filter(
        (item) => !selectedRes.data.some((sel) => sel.id === item.id),
      );

      setAvailableItems(filteredAvailable);
      setSelectedItems(selectedRes.data);
      console.log('fetched data', filteredAvailable, selectedRes.data);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchData(tabIndex === 0 ? 'companies' : 'mines');
  }, [tabIndex, fetchData]);

  const handleItemChange = (items, action) => {
    if (action === 'move') {
      setSelectedItems((prevSelected) => [...prevSelected, ...items]);
      setAvailableItems((prevAvailable) =>
        prevAvailable.filter((i) => !items.includes(i)),
      );
    } else if (action === 'remove') {
      setAvailableItems((prevAvailable) => [...prevAvailable, ...items]);
      setSelectedItems((prevSelected) =>
        prevSelected.filter((i) => !items.includes(i)),
      );
    }
    setSelectedToMove([]);
  };

  const handleSave = async () => {
    const type = tabIndex === 0 ? 'companies' : 'mines';
    const selectedIds = selectedItems.map((item) => item.id);

    try {
      const requestBody =
        type === 'companies'
          ? { company_ids: selectedIds }
          : { mine_ids: selectedIds };

      await api.post(`/subscriptions/${type}/`, requestBody);

      console.log('Save method triggered:', selectedIds);
      notifications.show('Saved successfully!', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.error('Error saving subscriptions:', error);
      notifications.show('Failed to save. Please try again.', {
        severity: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Your Subscriptions
      </Typography>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          color: 'black',
          width: 'fit-content',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => {
            setTabIndex(newIndex);
            setSelectedToMove([]);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Companies" />
          <Tab label="Mines" />
        </Tabs>
      </AppBar>

      <Box
        p={3}
        sx={{
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(to bottom, #f0f8ff, #e0f2ff)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <MultiSelect
              items={availableItems}
              selectedToMove={selectedToMove}
              setSelectedToMove={setSelectedToMove}
              onItemsChange={(items) => handleItemChange(items, 'move')}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <ArrowButton
                icon={<FaArrowRight />}
                onClick={() => handleItemChange(selectedToMove, 'move')}
                isDisabled={
                  !selectedToMove.length ||
                  selectedToMove.every((item) => selectedItems.includes(item))
                }
              />
              <ArrowButton
                icon={<FaArrowLeft />}
                onClick={() => handleItemChange(selectedToMove, 'remove')}
                isDisabled={
                  !selectedToMove.length ||
                  selectedToMove.every((item) => availableItems.includes(item))
                }
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSave}
                sx={{
                  borderRadius: '50%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                Save
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={5}>
            <MultiSelect
              items={selectedItems}
              selectedToMove={selectedToMove}
              setSelectedToMove={setSelectedToMove}
              onItemsChange={(items) => handleItemChange(items, 'remove')}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SubscriptionsPage;
