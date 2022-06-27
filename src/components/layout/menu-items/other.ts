import {
  faCog,
  faQuestionCircle,
  faCircleUser,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

const other = {
  id: 'other',
  type: 'group',
  children: [
    {
      id: 'setting',
      title: '설정',
      type: 'collapse',
      icon: faCog,
      children: [
        {
          id: 'account',
          title: '계정 관리',
          type: 'item',
          url: '/account',
          icon: faCircleUser,
        },
        {
          id: 'payment',
          title: '결제 정보',
          type: 'item',
          url: '/payment',
          icon: faCreditCard,
        },
      ],
    },
    {
      id: 'serviceInquiry',
      title: '서비스 문의',
      type: 'item',
      url: '/service',
      icon: faQuestionCircle,
    },
  ],
};

export default other;
