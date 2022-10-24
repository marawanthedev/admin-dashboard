import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import recraveLogo from '../assets/recraveLogo.webp';
import dashboardIcon from '../assets/dashboard.png';
// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>
      <img
        src={process.env.NODE_ENV === 'developmentz' ? recraveLogo : dashboardIcon}
        alt="logo"
        style={{ caretColor: 'transparent' }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
