import React from 'react';
import Head from 'next/head';

function Meta() {
  function randomSlogan() {
    const name = parseInt(String(Math.random() * 3));
    switch (name) {
      case 0:
        return '음악이 필요할 때 뮤직웹';
      case 1:
        return '음원스트리밍 서비스 뮤직웹';
      case 2:
        return '힐링하고 싶을 땐 뮤직웹';
    }
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="음원스트리밍 서비스 뮤직웹" />
      <meta name="keywords" content="뮤직, Music, 차트" />
      <meta name="author" content="JAE KANG" />
      <title>Music::{randomSlogan()}</title>
    </Head>
  );
}

export default Meta;
