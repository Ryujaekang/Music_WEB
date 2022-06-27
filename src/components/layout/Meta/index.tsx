import React from 'react';
import Head from 'next/head';

function Meta() {
  function randomSlogan() {
    const name = parseInt(String(Math.random() * 3));
    switch (name) {
      case 0:
        return '경단 경단 경단 뮤온';
      case 1:
        return '서브컬쳐 음원스트리밍 뮤온';
      case 2:
        return '애니송 듣고 싶을 땐 뮤온';
    }
  }

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="서브컬쳐 음원 스트리밍 서비스 MuOn" />
      <meta name="keywords" content="서브컬쳐, MuOn, 뮤온차트" />
      <meta name="author" content="JAE KANG" />
      <title>MuOn::{randomSlogan()}</title>
    </Head>
  );
}

export default Meta;
