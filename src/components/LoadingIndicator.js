import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const LoadingIndicator = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100px" mt={2}>
    <CircularProgress size={50} />
  </Box>
);

export default LoadingIndicator;