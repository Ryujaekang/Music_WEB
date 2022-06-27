import React from 'react';

// material-ui
import { Divider, List, ListSubheader, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// fortawesome Type
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// project imports
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';

// redux-toolkit
import { useAppSelector } from '@app/hooks';

interface NavGroupItem {
  id: string;
  title?: string;
  type: 'group' | 'collapse' | 'item';
  children: {
    id: string;
    title: string;
    type: string;
    url?: string;
    icon: IconDefinition;
    activeIcon: IconDefinition;
  }[];
}

interface NavGroupProps {
  item: NavGroupItem;
}

function NavGroup({ item }: NavGroupProps) {
  const { miniOpen } = useAppSelector((state) => state.sidebar);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  // menu list collapse & items
  const items = item.children?.map((menu) => {
    const { id, title, type, url, icon, activeIcon } = menu;

    switch (type) {
      case 'collapse':
        return <NavCollapse key={id} menu={menu} level={1} />;
      case 'item':
        return (
          <NavItem
            key={id}
            title={title}
            icon={icon}
            activeIcon={activeIcon}
            url={url ? url : '/'}
            level={1}
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
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          padding: '0px 16px',
        }}
        aria-labelledby="nested-list-subheader"
        subheader={
          item.title &&
          (smDown ? (
            <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.6rem' }}>
              {item.title}
            </ListSubheader>
          ) : (
            miniOpen && (
              <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '1.6rem' }}>
                {item.title}
              </ListSubheader>
            )
          ))
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
}

export default NavGroup;
