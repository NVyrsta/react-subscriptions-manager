import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Alert,
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
import TabContent from '../components/TabContent.jsx';

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
      setError('');
    } catch (error) {
      notifications.show('Failed to fetch data. Please try again.', {
        severity: 'error',
        autoHideDuration: 3000,
      });
      setError(error.message);
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

      notifications.show('Saved successfully!', {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } catch (error) {
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

      {error && <Alert severity="error">{error}</Alert>}

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

      <TabContent
        title={
          tabIndex === 0 ? 'Select Companies to Track' : 'Select Mines to Track'
        }
        tab={tabIndex === 0 ? 'Company' : 'Mine'}
      >
        <Box>
          <Grid container spacing={1}>
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
              gap={2}
              sx={{
                flexDirection: {
                  xs: 'row',
                  sm: 'column',
                },
              }}
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
      </TabContent>
    </div>
  );
};

export default SubscriptionsPage;
