import React, { useState } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import tinycolor from 'tinycolor2';

function ColorTranslator() {
  const [colorName, setColorName] = useState('');
  const [hexValue, setHexValue] = useState('');

  const handleColorInputChange = ({ target: { value } }) => {
    setColorName(value);
  };

  const handleConvertColor = () => {
    if (colorName == '') return;

    const color = tinycolor(colorName);

    if (color.isValid() && isNaN(colorName)) {
      setHexValue(color.toHexString().toUpperCase());
    } else {
      setHexValue('Invalid Color Name');
    }
  };

  const handleConvertKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConvertColor();
    }
  };

  const handleClearInput = () => {
    setColorName('');
    setHexValue('');
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', p: 2 }}>
      <Grid item="true" xs={12} sm={6} md={4}>
        <Typography variant="h5" gutterBottom color="white" align="center" mb={2}>
          Universal Color Translator
        </Typography>

        <TextField
          label="Enter Color Name"
          variant="outlined"
          fullWidth
          value={colorName}
          onChange={handleColorInputChange}
          onKeyDown={handleConvertKeyDown}
          sx={{ mb: 2 }}
          autoComplete="off"
          focused
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleConvertColor}
          fullWidth
          disabled={!colorName && !hexValue}
          sx={{ mb: 2 }}
        >
          Convert Color To HEX
        </Button>

        {hexValue && (
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" color="white" align="center" mr={2}>
              Hex Value: {hexValue}
            </Typography>
            <Button
              variant="contained"
              onClick={handleClearInput}
              sx={{ flexShrink: 0, backgroundColor: 'red' }}
            >
              Clear
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default ColorTranslator;
