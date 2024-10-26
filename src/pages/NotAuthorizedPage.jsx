import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotAuthorizedPage = () => {
  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">Access Denied</Typography>

        <Typography variant="body1" mt={2} mb={2}>
          You must be logged in to access this page.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 3 }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthorizedPage;
