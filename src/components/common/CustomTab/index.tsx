import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))(({ theme }) => ({
  textColor: theme.palette.primary.main,
  indicatorColor: theme.palette.primary.main,
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <NextLink href={props.href}>
      <Tab {...props} />
    </NextLink>
  );
}

interface CustomTabProps {
  item: object[];
  type: string;
  setType: (val: string) => void;
}

function CustomTab({ item, type, setType }: CustomTabProps) {
  const router = useRouter();
  const routerValue = router.pathname.split('/')[1];
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

  return (
    <Box>
      <StyledTabs value={type} onChange={handleChange}>
        {item.map((val, i) => (
          <LinkTab
            key={i}
            label={val.name}
            value={val.value}
            href={`/${routerValue}/${val.value}`}
            sx={{ fontSize: '1.4rem' }}
          />
        ))}
      </StyledTabs>
    </Box>
  );
}

export default CustomTab;
