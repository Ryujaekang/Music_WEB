import { faHeart, faHistory, faListMusic } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as heartSolid,
  faHistory as historySolid,
  faListMusic as listMusicSolid,
} from '@fortawesome/free-solid-svg-icons';

const mine = {
  id: 'mine',
  title: '마이뮤직',
  type: 'group',
  children: [
    {
      id: 'myLike',
      title: '좋아요',
      type: 'item',
      url: '/like',
      icon: faHeart,
      activeIcon: heartSolid,
    },
    {
      id: 'history',
      title: '최근들은',
      type: 'item',
      url: '/history',
      icon: faHistory,
      activeIcon: historySolid,
    },
    {
      id: 'playlist',
      title: '플레이리스트',
      type: 'item',
      url: '/playlist',
      icon: faListMusic,
      activeIcon: listMusicSolid,
    },
  ],
};

export default mine;
