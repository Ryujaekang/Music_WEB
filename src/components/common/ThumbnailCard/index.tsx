import React, { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Checkbox, Typography, IconButton, Link, Stack } from '@mui/material';
import { albumDefaultImage } from '@assets/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import { CustomMenu } from '..';
import getMusicLink from '@lib/getMusicSrc';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setPlaylist } from '@components/player/playerSlice';
import { TrackList } from 'types/track';
import { Like } from 'types/like';
import { useSession } from 'next-auth/react';
import { postLike } from '@utils/postLike';

export interface ThumbnailCardProps {
  id: number;
  name: string;
  image: string | null;
  artistId: number;
  artistName: string;
  trackList: TrackList[];
  likeInfo: Like;
}

function ThumbnailCard({
  id,
  image,
  name,
  artistId,
  artistName,
  trackList,
  likeInfo,
}: ThumbnailCardProps) {
  const [hover, setHover] = useState(false);
  const isLike = Boolean(likeInfo?.isLike);
  const [checked, setChecked] = useState(isLike);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleChange = async () => {
    try {
      const data = await postLike({
        id: likeInfo.id,
        likeableId: likeInfo.likeableId,
        likeableType: 'album',
        token: session?.accessToken,
      });
      setChecked(Boolean(data.isLike));
    } catch {
      console.error('Like error');
    }
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const playAlbum = (trackList) => {
    let temp = [];
    trackList.map((val) => {
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

  return (
    <>
      <Box>
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{ position: 'relative' }}
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
              background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0.9))',
              opacity: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton title="재생" onClick={() => playAlbum(trackList)}>
              <FontAwesomeIcon icon={faPlay} size="2x" color="#fff" />
            </IconButton>
            <Stack
              direction="row"
              sx={{ position: 'absolute', bottom: 4, left: 4, alignItems: 'center' }}
            >
              <Checkbox
                title="좋아요"
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
                icon={
                  <FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '2rem', color: '#fff' }} />
                }
                checkedIcon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: '2rem' }} />}
              />
              <Typography color="#fff">{likeInfo ? likeInfo.likeCount : 0}</Typography>
            </Stack>
            <IconButton
              aria-label="show more"
              title="메뉴 더보기"
              sx={{ position: 'absolute', bottom: 4, right: 4, alignItems: 'center' }}
              onClick={handleClickMenu}
            >
              <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.8rem', color: '#fff' }} />.
            </IconButton>
            <CustomMenu
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              playMusic={() => playAlbum(trackList)}
              albumId={id}
              artistId={artistId}
            />
          </Box>
          <Image
            layout="responsive"
            src={image ? image : albumDefaultImage}
            alt="default image"
            width={100}
            height={100}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '8px',
          }}
        >
          <Typography
            variant="subtitle1"
            title={name}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Link underline="hover" color="inherit" component="div">
              <NextLink href={`/album/${id}`}>{name}</NextLink>
            </Link>
          </Typography>
          <Typography
            variant="subtitle2"
            title={artistName}
            sx={{
              color: 'text.secondary',
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
      </Box>
    </>
  );
}

export default ThumbnailCard;
