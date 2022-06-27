import React from 'react';
import { Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ChipItemProps {
  name: string;
  icon: IconDefinition;
  handleClick: () => void;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
}

function ChipItem({ name, icon, handleClick, color }: ChipItemProps) {
  return (
    <Chip
      variant="outlined"
      onClick={handleClick}
      icon={<FontAwesomeIcon icon={icon} />}
      label={name}
      color={color}
      sx={{
        fontSize: '1.2rem',
        '& .MuiChip-icon': {
          marginLeft: '12px',
        },
      }}
    />
  );
}

export default ChipItem;
