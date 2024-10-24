import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from '../services/authService.js';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem('access_token') !== null &&
      localStorage.getItem('refresh_token') !== null;
    if (isAuthenticated) {
      navigate('/subscriptions');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      navigate('/subscriptions');
    } catch (error) {
      console.error('Login error', error);
      setErrorMessage('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4">Login</Typography>
        <form
          onSubmit={handleLogin}
          style={{ width: '100%', marginTop: '1em' }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '1em' }}
          >
            Sign In
          </Button>
        </form>
        {errorMessage && (
          <Typography color="error" mt={2}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
