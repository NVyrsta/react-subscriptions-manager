import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Alert,
  Box,
  Button,
  Grid,
} from '@mui/material';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';

import MultiSelect from '../components/MultiSelect.jsx';
import ArrowButton from '../components/ArrowButton.jsx';
import TabContent from '../components/TabContent.jsx';

import {
  fetchData,
  fetchSubscriptions,
  moveItems,
  saveData,
} from '../features/subscriptionsSlice.js';

import useSaveNotification from '../hooks/useSaveNotification';

const SubscriptionsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedToMove, setSelectedToMove] = useState([]);

  const showNotification = useSaveNotification();
  const dispatch = useDispatch();

  const { availableItems, selectedItems, loading, error } = useSelector(
    (state) => {
      return state.subscriptions;
    },
  );

  const type = tabIndex === 0 ? 'companies' : 'mines';

  const handleItemChange = (action) => {
    if (action === 'move') {
      dispatch(moveItems({ items: selectedToMove, action: 'move' }));
    } else if (action === 'remove') {
      dispatch(moveItems({ items: selectedToMove, action: 'remove' }));
    }
    setSelectedToMove([]);
  };

  const handleSave = async () => {
    const requestBody = {
      [tabIndex === 0 ? 'company_ids' : 'mine_ids']: selectedItems.map(
        (item) => item.id,
      ),
    };

    try {
      await dispatch(saveData({ type, requestBody })).unwrap();
      showNotification('fulfilled');
    } catch (error) {
      showNotification('rejected');
    }
  };

  useEffect(() => {
    dispatch(fetchData(type)).then(() => {
      dispatch(fetchSubscriptions(type));
    });
  }, [tabIndex, dispatch, type]);

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
                loading={loading}
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
