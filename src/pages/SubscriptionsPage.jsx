import React from 'react';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SubscriptionForm from '@/components/SubscriptionForm';

const SubscriptionsPage = () => {
  const [tabIndex, setTabIndex] = useState('0');

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Your Subscriptions
      </Typography>

      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="companies" value="0" />
            <Tab label="mines" value="1" />
          </TabList>
        </Box>

        <TabPanel value="0">
          <SubscriptionForm
            type="companies"
            value="company"
            title="Select Companies to Track"
          />
        </TabPanel>

        <TabPanel value="1">
          <SubscriptionForm
            type="mines"
            value="mine"
            title="Select Mines to Track"
          />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default SubscriptionsPage;
