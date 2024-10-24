import React from 'react';
import { IconButton } from '@mui/material';

const ArrowButton = ({ icon, onClick, isDisabled }) => {
  return (
    <IconButton
      variant="contained"
      color="primary"
      size="small"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        borderRadius: '50%',
        padding: '0.5rem',
        aspectRatio: 1,
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#1565c0',
          cursor: 'pointer',
        },
        '&.Mui-disabled': {
          backgroundColor: '#f2f2f2',
          color: '#bdbdbd',
          cursor: 'not-allowed',
        },
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      {icon}
    </IconButton>
  );
};

export default ArrowButton;
