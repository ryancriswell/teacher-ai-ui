import React from 'react';
import { TextField } from '@mui/material';

const PromptInput = ({ onChange }) => (
  <TextField
    label="Enter Prompt"
    fullWidth
    margin="normal"
    onChange={(e) => onChange(e.target.value)}
  />
);

export default PromptInput;