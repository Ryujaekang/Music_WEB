import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  useTheme,
  Link,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faMusic,
  faCaretUp,
  faCaretDown,
  faHeart,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import { CustomMenu } from '..';
import Image from 'next/image';
import WaveRanking from '../WaveRanking';
import getMusicLink from '@lib/getMusicSrc';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setPlaylist } from '@components/player/playerSlice';
import CustomAxios from '@lib/customAxios';
import { Like } from 'types/like';

export interface RankingCardProps {
  id: number;
  name: string;
  adult: 0 | 1; // 성인 곡 유무
  rank: number;
  wave: number | null; // 곡 순위 변동
  albumImage: string | null; // 곡 이미지는 앨범 이미지로 사용
  artistId: number;
  artistName: string;
  albumId: number;
  musicUrl: string;
  likeInfo: Like;
  postLike: (id: number | null, likeableId: number, likeableType: string) => void;
}

function RankingCard({
  id,
  name,
  adult,
  rank,
  wave,
  albumId,
  albumImage,
  artistId,
  artistName,
  musicUrl,
  likeInfo,
  postLike,
}: RankingCardProps) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(Boolean(likeInfo.isLike));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { playlist } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  const handleChange = async () => {
    try {
      const data = await postLike(likeInfo.id, likeInfo.likeableId, 'track');
      setChecked(Boolean(data.isLike));
    } catch {
      console.error('Like error');
    }
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const playMusic = () => {
    const state = {
      trackId: id,
      name: name,
      musicSrc: musicUrl,
      cover: albumImage,
      singer: artistName,
    };

    dispatch(setPlaylist(state));
  };

  // console.log('likeInfo', likeInfo);

  return (
    <Box
      sx={{
        width: '100%',
        paddingLeft: 1,
        paddingRight: 1,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ bgcolor: grey[500], alignItems: 'center', justifyContent: 'center' }}
          variant="rounded"
        >
          <Box
            sx={{
              display: hover ? 'flex' : 'none',
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
            <IconButton title="재생" onClick={() => playMusic()}>
              <FontAwesomeIcon icon={faPlay} style={{ color: '#fff', fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
          {albumImage ? (
            <Image layout="fill" src={albumImage} alt="default image" />
          ) : (
            <FontAwesomeIcon icon={faMusic} style={{ fontSize: '1.8rem' }} />
          )}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{rank}</Typography>
          <WaveRanking wave={wave} />
        </Box>
        <Box
          sx={{
            flexWrap: 'wrap',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle1"
            title={name}
            sx={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onClick={() => playMusic()}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            title={artistName}
            sx={{
              color: 'text.secondary',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Link underline="hover" color="inherit" component="div">
              <NextLink href={`/artist/${artistId}`}>{artistName}</NextLink>
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: hover ? 'flex' : 'none',
          }}
        >
          <Checkbox
            title="좋아요"
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            color="primary"
            icon={
              <FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '1.8rem', color: 'inherit' }} />
            }
            checkedIcon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.8rem' }} />}
          />
          <IconButton
            aria-label="show more"
            title="메뉴 더보기"
            color="inherit"
            onClick={handleClickMenu}
          >
            <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.8rem' }} />.
          </IconButton>
          <CustomMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            playMusic={playMusic}
            trackId={id}
            albumId={albumId}
            artistId={artistId}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export default RankingCard;
