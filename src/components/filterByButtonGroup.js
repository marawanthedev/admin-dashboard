import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function FilterByButtonGroup() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>Customer</Button>
      <Button>Seller</Button>
      <Button>Admin</Button>
    </ButtonGroup>
  );
}
