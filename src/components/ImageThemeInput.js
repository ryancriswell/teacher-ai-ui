import React from 'react';
import { TextField } from '@mui/material';

const ImageThemeInput = ({ onChange }) => (
  <TextField
    label="Enter Theme (ex. Thanksgiving)"
    variant="outlined"
    fullWidth
    margin="normal"
    onChange={(e) => onChange(e.target.value)}
  />
);

export default ImageThemeInput;