import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ menuItems, currentItemID }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {menuItems.map((menuItem) => {
          if (menuItem.to !== undefined && menuItem.to !== null) {
            return (
              <MenuItem component={RouterLink} to={`${menuItem.to}`} sx={{ color: 'text.secondary' }}>
                <ListItemText primary={`${menuItem.text}`} primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            );
          }
          return (
            <MenuItem
              sx={{ color: 'text.secondary' }}
              onClick={() => (menuItem.callback ? menuItem.callback(currentItemID) : null)}
            >
              <ListItemText primary={`${menuItem.text}`} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
