// import { useState } from 'react';

import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterAttribute: PropTypes.string,
  onFilterAttribute: PropTypes.func,
  onFilterClick: PropTypes.func,
  placeHolder: PropTypes.string,
  searchAllSubmitCallback: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterAttribute,
  onFilterAttribute,
  onFilterClick,
  placeHolder,
  searchAllSubmitCallback,
}) {
  const handleFilterButtonRendering = () => {
    if (onFilterClick) {
      return (
        <Tooltip title="Filter list" style={{ marginLeft: 'auto' }}>
          <IconButton onClick={onFilterClick}>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <SearchStyle
        value={filterAttribute}
        onChange={onFilterAttribute}
        placeholder={placeHolder}
        sx={{ width: 200, fontSize: '15px' }}
        startAdornment={
          <InputAdornment position="start" style={{ caretColor: 'transparent' }}>
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
        style={{ marginRight: '1rem' }}
      />
      <Button
        variant="contained"
        component="label"
        to="#"
        disabled={!filterAttribute ?? true}
        className="edit-role-popup__button"
        style={{ width: 100, height: 40 }}
        sx={{ width: 40, height: 20, fontSize: '11px' }}
        onClick={() => searchAllSubmitCallback()}
      >
        Search All
      </Button>

      {handleFilterButtonRendering()}
    </RootStyle>
  );
}
