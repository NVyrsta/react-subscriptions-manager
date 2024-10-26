import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';
import logo from '@/assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}
    >
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          padding="0 16px"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', marginRight: '8px' }}
          />
        </Box>

        {isAuthenticated && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={1}
          >
            <IconButton
              onClick={handleLogout}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(232, 240, 254, 0.5)',
                },
                borderRadius: '4px',
                padding: '8px',
              }}
            >
              <LuLogOut style={{ fontSize: '24px', color: '#1976d2' }} />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
