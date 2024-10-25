import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

const PageLayout = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ minHeight: '80vh' }}>
        <Box sx={{ py: 4 }}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default PageLayout;
