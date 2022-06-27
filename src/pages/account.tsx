import React from 'react';
import Layout from '@components/layout';
import { ServiceOFF } from '@components/common';

function Account() {
  return <ServiceOFF />;
}

Account.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Account;
