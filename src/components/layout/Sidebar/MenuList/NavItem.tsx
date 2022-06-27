import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface NavItemProps {
  title: string;
  url: string;
  icon: IconDefinition;
  activeIcon: IconDefinition;
  level: number;
}

function NavItem({ url, icon, title, activeIcon, level, ...others }: NavItemProps) {
  const router = useRouter();
  const routerValue = router.pathname.split('/')[1];
  const urlValue = url.split('/')[1];
  const active = url ? routerValue === urlValue : false;

  return (
    <NextLink href={url}>
      <ListItemButton
        selected={active}
        sx={{ mb: 0.5, py: level > 1 ? 1 : 1.25, pl: `${level * 16}px` }}
        {...others}
      >
        <ListItemIcon>
          {active ? (
            <FontAwesomeIcon icon={activeIcon || icon} style={{ fontSize: '1.8rem' }} />
          ) : (
            <FontAwesomeIcon icon={icon} style={{ fontSize: '1.8rem' }} />
          )}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </NextLink>
  );
}

export default NavItem;
