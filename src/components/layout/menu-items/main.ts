import { faHome, faChartLine, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

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
    },
    {
      id: 'chart',
      title: '뮤온차트',
      type: 'item',
      url: '/chart/now',
      icon: faChartLine,
    },
    {
      id: 'new',
      title: '최신음악',
      type: 'item',
      url: '/new/track',
      icon: faSyncAlt,
    },
  ],
};

export default main;
