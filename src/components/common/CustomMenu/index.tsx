import React from 'react';
import { Menu, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPlus,
  faListMusic,
  faMusic,
  faCompactDisc,
  faUserMusic,
} from '@fortawesome/free-regular-svg-icons';

interface CustomMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (event: null | HTMLElement) => void;
  trackId?: number;
  albumId?: number;
  artistId?: number;
}

function CustomMenu({ anchorEl, setAnchorEl, trackId, albumId, artistId }: CustomMenuProps) {
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faDownload} />
        </ListItemIcon>
        <ListItemText>다운로드</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faPlus} />
        </ListItemIcon>
        <ListItemText>재생목록에 담기</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faListMusic} />
        </ListItemIcon>
        <ListItemText>플레이리스트에 담기</ListItemText>
      </MenuItem>
      {trackId && (
        <MenuItem onClick={() => router.push(`/track/${trackId}`)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faMusic} />
          </ListItemIcon>
          <ListItemText>곡 정보</ListItemText>
        </MenuItem>
      )}
      {albumId && (
        <MenuItem onClick={() => router.push(`/album/${albumId}`)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCompactDisc} />
          </ListItemIcon>
          <ListItemText>앨범 정보</ListItemText>
        </MenuItem>
      )}
      {artistId && (
        <MenuItem onClick={() => router.push(`/artist/${artistId}`)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUserMusic} />
          </ListItemIcon>
          <ListItemText>아티스트 채널</ListItemText>
        </MenuItem>
      )}
    </Menu>
  );
}

export default CustomMenu;
