import {
  faHome,
  faTrophyStar,
  faSyncAlt,
  faWaveformLines,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHome as homeSolid,
  faTrophyStar as trophyStarSolid,
  faSyncAlt as syncAltSolid,
  faWaveformLines as waveformLinesSolid,
} from '@fortawesome/free-solid-svg-icons';

const main = {
  id: 'main',
  // title: '메인 메뉴',
  type: 'group',
  children: [
    {
      id: 'home',
      title: '뮤온홈',
      type: 'item',
      url: '/',
      icon: faHome,
      activeIcon: homeSolid,
    },
    {
      id: 'chart',
      title: '뮤온차트',
      type: 'item',
      url: '/chart/now',
      icon: faTrophyStar,
      activeIcon: trophyStarSolid,
    },
    {
      id: 'new',
      title: '최신음악',
      type: 'item',
      url: '/new/track',
      icon: faSyncAlt,
      activeIcon: syncAltSolid,
    },
    {
      id: 'genre',
      title: '장르음악',
      type: 'item',
      url: '/genre',
      icon: faWaveformLines,
      activeIcon: waveformLinesSolid,
    },
  ],
};

export default main;
