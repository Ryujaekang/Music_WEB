import {
  faCog,
  faQuestionCircle,
  faCircleUser,
  faCreditCardFront,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCog as cogSolid,
  faQuestionCircle as questionCircleSolid,
  faCircleUser as circleUserSolid,
  faCreditCardFront as creditCardFrontSolid,
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
      activeIcon: cogSolid,
      children: [
        {
          id: 'account',
          title: '계정 관리',
          type: 'item',
          url: '/account',
          icon: faCircleUser,
          activeIcon: circleUserSolid,
        },
        {
          id: 'payment',
          title: '결제 정보',
          type: 'item',
          url: '/payment',
          icon: faCreditCardFront,
          activeIcon: creditCardFrontSolid,
        },
      ],
    },
    {
      id: 'serviceInquiry',
      title: '서비스 문의',
      type: 'item',
      url: '/service',
      icon: faQuestionCircle,
      activeIcon: questionCircleSolid,
    },
  ],
};

export default other;
