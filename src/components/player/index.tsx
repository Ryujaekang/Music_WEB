import React, { useEffect, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';
import { GetLocalStorage, SetLocalStorage } from '@lib/storage';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setOptions, setPlaylist } from './playerSlice';
import axios from 'axios';
import getMusicLink from '@lib/getMusicSrc';

const Player = (props: any) => {
  const { options } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data } = await axios.get('/api/channel', {
      params: { id: 19 },
    });
    // let state = {
    //   name: data.list.name,
    //   singer: data.list.artistName,
    //   cover: data.list.albumImage,
    //   musicSrc: getMusicLink(data.list.id),
    // };
    const playList = await Promise.all(
      data.list.map(async (val, i) => {
        return {
          name: val.name,
          singer: val.artistName,
          cover: val.albumImage,
          musicSrc: await getMusicLink(val.id),
        };
      })
    );

    dispatch(setOptions({ clearPriorAudioLists: true, quietUpdate: false, audioLists: playList }));
  };

  useEffect(() => {
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log('playlist 바뀔때마다', options.audioLists);
  //   return;
  // }, [options]);

  const handlePlaylistChange = (val: any) => {
    dispatch(setPlaylist(val));
  };

  return (
    <ReactJkMusicPlayer
      audioLists={[]}
      glassBg
      showMediaSession
      mode={'full'}
      preload={true}
      spaceBar={true}
      remember={true}
      showMiniProcessBar={true}
      quietUpdate
      clearPriorAudioLists={true}
      showDestroy={true}
      showDownload={false}
      showReload={true}
      restartCurrentOnPrev={true}
      defaultPosition={{ bottom: 50, right: 50 }}
    />
  );
};

export default Player;
