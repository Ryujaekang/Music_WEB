import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faMusic, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import { CustomMenu } from '..';
import Image from 'next/image';
import WaveRanking from '../WaveRanking';
import { Like } from 'types/like';
import getMusicLink from '@lib/getMusicSrc';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setOptions } from '@components/player/playerSlice';

function EnhancedTableHead(props) {
  const { headCells, onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

type TableHead = {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label?: string;
};

interface TrackTableProps {
  tableHead?: TableHead[];
  rows: object[] | undefined;
  selected: string[];
  onChangeSelected: (val: string[]) => void;
  likeInfo?: Like[];
}

function TrackTable({ tableHead, rows, selected, onChangeSelected, likeInfo }: TrackTableProps) {
  const [hoveredRow, setHoveredRow] = useState(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { options } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      onChangeSelected(newSelecteds);
      return;
    }
    onChangeSelected([]);
  };

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

  const showCartHandler = (i) => {
    setHoveredRow(i);
  };

  const hideCartHandler = () => {
    setHoveredRow(-1);
  };

  const playMusic = async (
    name: string,
    trackId: number,
    albumImage: string,
    artistName: string
  ) => {
    const state = {
      name: name,
      musicSrc: await getMusicLink(trackId),
      cover: albumImage,
      singer: artistName,
    };
    console.log('state', state);
    dispatch(
      setOptions({
        clearPriorAudioLists: true,
        audioLists: [state, ...options.audioLists],
      })
    );
  };

  return (
    <>
      <TableContainer>
        <Table sx={{}} aria-labelledby="tableTitle" size={'medium'}>
          <EnhancedTableHead
            headCells={tableHead ? tableHead : headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isLike = likeInfo && Boolean(likeInfo[index].isLike);

              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  onMouseLeave={hideCartHandler}
                  onMouseEnter={() => showCartHandler(index)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    <Avatar
                      sx={{ bgcolor: grey[500], alignItems: 'center', justifyContent: 'center' }}
                      variant="rounded"
                    >
                      <Box
                        sx={{
                          display: hoveredRow === index ? 'flex' : 'none',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          zIndex: 1,
                          background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6))',
                          opacity: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton
                          title="재생"
                          onClick={() =>
                            playMusic(row.name, row.id, row.albumImage, row.artistName)
                          }
                        >
                          <FontAwesomeIcon
                            icon={faPlay}
                            style={{ color: '#fff', fontSize: '1.8rem' }}
                          />
                        </IconButton>
                      </Box>
                      {row.albumImage ? (
                        <Image layout="fill" src={row.albumImage} alt="default image" />
                      ) : (
                        <FontAwesomeIcon icon={faMusic} style={{ fontSize: '1.8rem' }} />
                      )}
                    </Avatar>
                  </TableCell>
                  {row.rank && (
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Box>{row.rank}</Box>
                        <WaveRanking wave={row.wave} />
                      </Stack>
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      maxWidth: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.artistName}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.albumName}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Checkbox
                        checked={isLike}
                        onChange={() => console.log('API 개발해야함')}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="primary"
                        icon={<FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '1.6rem' }} />}
                        checkedIcon={
                          <FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.6rem' }} />
                        }
                      />
                      <Typography>{likeInfo ? likeInfo[index].likeCount : 0}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right" padding="none">
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClickMenu}
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            <CustomMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TrackTable;

const headCells = [
  {
    id: 'thumbnail',
    numeric: false,
    disablePadding: true,
  },
  {
    id: 'trackName',
    numeric: false,
    disablePadding: false,
    label: '곡명',
  },
  {
    id: 'artistName',
    numeric: false,
    disablePadding: false,
    label: '아티스트명',
  },
  {
    id: 'albumName',
    numeric: false,
    disablePadding: false,
    label: '앨범명',
  },
  {
    id: 'good',
    numeric: false,
    disablePadding: false,
    label: '좋아요',
  },
  {
    id: 'other',
    numeric: false,
    disablePadding: true,
  },
];
