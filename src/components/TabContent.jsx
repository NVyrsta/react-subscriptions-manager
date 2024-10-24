import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const TabContent = ({ title, tab, children }) => {
  return (
    <Box
      p={3}
      sx={{
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" gutterBottom fontStyle={'italic'}>
          To follow a {tab}, select it in the left panel and click → <br />
          To unfollow a {tab}, select it in the right panel and click ← <br />
          Then click "Save" to apply your changes. <br />
        </Typography>

        <Typography variant="body1" gutterBottom fontStyle={'italic'}>
          Use search fields to easily find a required {tab}.
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default TabContent;
