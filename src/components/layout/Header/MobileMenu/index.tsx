import React from 'react';
import { IconButton, Badge, MenuItem, Menu } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  mobileMenuId: string;
  mobileMoreAnchorEl: Element | null;
  isMobileMenuOpen: boolean;
  handleMobileMenuClose: () => void;
}

function MobileMenu({
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
}: MobileMenuProps) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.6rem' }} />
          </Badge>
        </IconButton>
        <p>메일</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <FontAwesomeIcon icon={faBell} style={{ fontSize: '1.6rem' }} />
          </Badge>
        </IconButton>
        <p>알림</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '1.6rem' }} />
        </IconButton>
        <p>내 정보</p>
      </MenuItem>
    </Menu>
  );
}

export default MobileMenu;
