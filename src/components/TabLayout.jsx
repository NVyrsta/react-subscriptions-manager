import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const TabLayout = ({ title, tab, children }) => {
  return (
    <Box
      p={3}
      sx={{
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        To follow a {tab}, select it in the left panel and click To unfollow a{' '}
        {tab}, select it in the right panel and click Then click "Save" to apply
        your changes. <br />
      </Typography>
      <Typography variant="body1" gutterBottom>
        Use search fields to easily find a required {tab}.
      </Typography>
      {children}
      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('Save clicked')}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TabLayout;
