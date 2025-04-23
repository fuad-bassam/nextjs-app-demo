"use client";
import React, { useState } from 'react';
import { Select, MenuItem, Divider, FormControl, InputLabel } from '@mui/material';

const LOV = () => {
  const [value, setValue] = useState('');

  return (
    // <FormControl fullWidth>
    //   <InputLabel id="demo-select-label">Choose</InputLabel>
    <Select
      labelId="demo-select-label"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
            overflow: 'auto',
          },
        },
      }}
    >
      <MenuItem value="option1">Option 1</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
      <Divider />
      <MenuItem value="option2">Option 2</MenuItem>
      <Divider />
      <MenuItem value="option3">Option 3</MenuItem>
    </Select>
    // </FormControl>
  );
};

export default LOV;
