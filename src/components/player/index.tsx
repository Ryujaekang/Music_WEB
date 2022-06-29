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
  const { playlist } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   const { data } = await axios.get('/api/channel', {
  //     params: { id: 19 },
  //   });
  //   // let state = {
  //   //   name: data.list.name,
  //   //   singer: data.list.artistName,
  //   //   cover: data.list.albumImage,
  //   //   musicSrc: getMusicLink(data.list.id),
  //   // };
  //   const playList = await Promise.all(
  //     data.list.map(async (val, i) => {
  //       return {
  //         name: val.name,
  //         singer: val.artistName,
  //         cover: val.albumImage,
  //         musicSrc: await getMusicLink(val.id),
  //       };
  //     })
  //   );

  //   dispatch(setOptions({ clearPriorAudioLists: true, quietUpdate: false, audioLists: playList }));
  // };

  // useEffect(() => {
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, []);

  const handlePlaylistChange = (val: any) => {
    dispatch(setPlaylist(val));
  };

  return (
    <ReactJkMusicPlayer
      audioLists={playlist}
      quietUpdate={false}
      clearPriorAudioLists={true}
      locale={customLocale}
      glassBg
      showMediaSession
      mode={'full'}
      preload={true}
      spaceBar={true}
      // remember={true}
      showMiniProcessBar={true}
      showDestroy={true}
      showDownload={false}
      showReload={true}
      restartCurrentOnPrev={true}
      defaultPosition={{ bottom: 50, right: 50 }}
    />
  );
};

export default Player;

const customLocale = {
  playModeText: {
    order: '기본 재생',
    orderLoop: '전체 반복 재생',
    singleLoop: '한곡 반복 재생',
    shufflePlay: '랜덤 재생',
  },
  openText: '열기',
  closeText: '닫기',
  emptyText: '곡 없음',
  clickToPlayText: '재생',
  clickToPauseText: '일시정지',
  nextTrackText: '다음곡',
  previousTrackText: '이전곡',
  reloadText: '새로고침',
  volumeText: '소리',
  playListsText: '플레이리스트',
  toggleLyricText: '가사',
  toggleMiniModeText: '미니모드',
  destroyText: '종료',
  downloadText: '다운로드',
  lightThemeText: 'L',
  darkThemeText: 'D',
  switchThemeText: '다크/화이트 모드',
  removeAudioListsText: '전체 삭제',
  emptyLyricText: '가사 없음',
  loadingText: '로딩',
  controllerTitle: <FontAwesomeIcon icon={faHeadphonesAlt} />,
  clickToDeleteText: (name) => `${name} 삭제`,
  audioTitle: '',
  // audioTitle: (audioInfo) => ``
};
