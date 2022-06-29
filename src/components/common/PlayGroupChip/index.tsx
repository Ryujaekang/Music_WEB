import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { faPlay, faCheck, faRandom } from '@fortawesome/free-solid-svg-icons';
import ChipItem from './ChipItem';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setPlaylist } from '@components/player/playerSlice';

function PlayGroupChip({ rows, selected, onChangeSelected }) {
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch();

  const allPlayMusic = () => {
    let temp = [];
    rows.map((val) => {
      temp.push({
        name: val.name,
        trackId: val.id,
        musicSrc: val.musicUrl,
        cover: val.albumImage,
        singer: val.artistName,
      });
    });

    dispatch(setPlaylist(temp));
  };

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const shufflePlayMusic = () => {
    let temp = [];
    rows.map((val) => {
      temp.push({
        name: val.name,
        trackId: val.id,
        musicSrc: val.musicUrl,
        cover: val.albumImage,
        singer: val.artistName,
      });
    });
    shuffle(temp);

    dispatch(setPlaylist(temp));
  };

  const handleSelectAllClick = () => {
    if (!checked) {
      const newSelecteds = rows.map((n) => n);
      onChangeSelected(newSelecteds);
      setChecked(true);
      return;
    }
    onChangeSelected([]);
    setChecked(false);
  };

  useEffect(() => {
    if (rows.length === selected.length) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [selected]);

  return (
    <Stack direction="row" spacing={1} alignItems={'center'}>
      {checked ? (
        <ChipItem
          name={'선택해제'}
          icon={faCheck}
          handleClick={handleSelectAllClick}
          color="primary"
        />
      ) : (
        <ChipItem name={'전체선택'} icon={faCheck} handleClick={handleSelectAllClick} />
      )}
      <ChipItem name={'전체재생'} icon={faPlay} handleClick={allPlayMusic} />
      <ChipItem name={'셔플재생'} icon={faRandom} handleClick={shufflePlayMusic} />
    </Stack>
  );
}

export default PlayGroupChip;
