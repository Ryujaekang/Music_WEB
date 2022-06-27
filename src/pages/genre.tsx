import React from 'react';
import Layout from '@components/layout';
import { ServiceOFF } from '@components/common';

function Genre() {
  return <ServiceOFF />;
}

Genre.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Genre;
