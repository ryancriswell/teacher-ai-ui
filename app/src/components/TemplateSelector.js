import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TemplateSelector = ({ onSelect }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="template-label">Select Template</InputLabel>
      <Select
        labelId="template-label"
        label="Select Template"
        onChange={(e) => onSelect(e.target.value)}
      >
        <MenuItem value="template1">Template 1</MenuItem>
        <MenuItem value="template2">Template 2</MenuItem>
        <MenuItem value="template3">Template 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TemplateSelector;