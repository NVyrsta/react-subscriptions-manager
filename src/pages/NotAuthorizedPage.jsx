import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/');
  };

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
          onClick={handleLoginRedirect}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default NotAuthorizedPage;
