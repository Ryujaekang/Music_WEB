import React, { useState, useEffect } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavItem from './NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { miniOpenToggle } from '../sidebarSlice';

interface NavCollapseItem {
  id: string;
  title: string;
  type: string;
  icon: IconDefinition;
  activeIcon: IconDefinition;
  children?: {
    id: string;
    title: string;
    type: string;
    url: string;
    icon: IconDefinition;
    activeIcon: IconDefinition;
  }[];
}

interface NavCollapseProps {
  menu: NavCollapseItem;
  level: number;
}

function NavCollapse({ menu, level }: NavCollapseProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const { miniOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
    !miniOpen && dispatch(miniOpenToggle(true));
  };

  useEffect(() => {
    !miniOpen && (setOpen(false), setSelected(null));
  }, [miniOpen]);

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    const { id, title, icon, activeIcon, type, url } = item;
    switch (type) {
      case 'collapse':
        return <NavCollapse key={id} menu={item} level={level + 1} />;
      case 'item':
        return (
          <NavItem
            key={id}
            title={title}
            icon={icon}
            activeIcon={activeIcon}
            url={url}
            level={level + 1}
          />
        );
      default:
        return (
          <Typography key={id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <ListItemButton
        selected={selected === menu.id}
        sx={{ mb: 0.5, py: level > 1 ? 1 : 1.25, pl: `${level * 16}px` }}
        onClick={handleClick}
      >
        <ListItemIcon>
          {open ? (
            <FontAwesomeIcon icon={menu.activeIcon} style={{ fontSize: '1.8rem' }} />
          ) : (
            <FontAwesomeIcon icon={menu.icon} style={{ fontSize: '1.8rem' }} />
          )}
        </ListItemIcon>
        <ListItemText primary={menu.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menus}
        </List>
      </Collapse>
    </>
  );
}

export default NavCollapse;
