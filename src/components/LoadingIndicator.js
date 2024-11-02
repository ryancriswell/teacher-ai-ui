import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const LoadingIndicator = () => (
  <Box display="flex" justifyContent="center" m={2}>
    <CircularProgress />
  </Box>
);

export default LoadingIndicator;