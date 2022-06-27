import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { faPlay, faCheck, faRandom } from '@fortawesome/free-solid-svg-icons';
import ChipItem from './ChipItem';

function PlayGroupChip() {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Stack direction="row" spacing={1} alignItems={'center'}>
      {checked ? (
        <ChipItem name={'선택해제'} icon={faCheck} handleClick={handleChange} color="primary" />
      ) : (
        <ChipItem name={'전체선택'} icon={faCheck} handleClick={handleChange} />
      )}
      <ChipItem name={'전체재생'} icon={faPlay} handleClick={handleClick} />
      <ChipItem name={'셔플재생'} icon={faRandom} handleClick={handleClick} />
    </Stack>
  );
}

export default PlayGroupChip;
