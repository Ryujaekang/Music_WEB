import React, { useState } from 'react';
import { Box, List, ListItemButton } from '@mui/material';
import { MobileTrackCard } from '@components/common';

interface MobileTrackListProps {
  rows: object[];
  selected: string[];
  onChangeSelected: (val: string[]) => void;
}

function MobileTrackList({ rows, selected, onChangeSelected }: MobileTrackListProps) {
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    onChangeSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <List dense={true}>
      {rows.map((row, index) => {
        const isItemSelected = isSelected(row.id);

        return (
          <ListItemButton
            key={index}
            selected={isItemSelected}
            onClick={(event) => handleClick(event, row.id)}
            sx={{
              paddingLeft: 0,
              paddingRight: 0,
              '& .Mui-selected': { backgroundColor: 'red' },
            }}
          >
            <MobileTrackCard
              adult={row.adult}
              albumId={row.albumId}
              albumImage={row.albumImage}
              artistId={row.artistId}
              artistName={row.artistName}
              id={row.id}
              image={row.image}
              name={row.name}
              rank={row.rank}
              wave={row.wave}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default MobileTrackList;
