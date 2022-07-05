import { faHeart, faHistory, faListUl } from '@fortawesome/free-solid-svg-icons';

const mine = {
  id: 'mine',
  title: '마이뮤직',
  type: 'group',
  children: [
    {
      id: 'myLike',
      title: '좋아요',
      type: 'item',
      url: '/like/track',
      icon: faHeart,
    },
    {
      id: 'history',
      title: '최근들은',
      type: 'item',
      url: '/history',
      icon: faHistory,
    },
    {
      id: 'playlist',
      title: '플레이리스트',
      type: 'item',
      url: '/playlist',
      icon: faListUl,
    },
  ],
};

export default mine;
