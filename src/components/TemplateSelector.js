import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TemplateSelector = ({ onSelect }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Select Template</InputLabel>
    <Select
      onChange={(e) => onSelect(e.target.value)}
      label="Select Template"
    >
      <MenuItem value="template1">Word Bubbles</MenuItem>
      {/* <MenuItem value="template2">Template 2</MenuItem>
      <MenuItem value="template3">Template 3</MenuItem> */}
    </Select>
  </FormControl>
);

export default TemplateSelector;