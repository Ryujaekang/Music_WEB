import Axios from 'axios';
import { useSession, getSession } from 'next-auth/react';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 인터셉터 추가하기
axios.interceptors.request.use(
  async (config) => {
    // 요청이 전달되기 전에 작업 수행

    // const { data: session } = await useSession();
    // const { accessToken } = session;
    // console.log('accessToken', accessToken);
    //   const decode = jwt.decode(accessToken);
    //   const nowDate = new Date().getTime() / 1000;

    //   // 토큰 만료시간이 지났다면
    //   if (decode.exp < nowDate) {
    //     const { data } = await axios.post(
    //       `${SERVER_URL}/token`,
    //       { accessToken },
    //       {
    //         headers: {
    //           access_token: getToken(),
    //         },
    //       }
    //     );

    //     // 리프레쉬 토큰 발급 서버 요청
    //     const { refreshToken } = data.data;

    //     accessToken = refreshToken;
    //   }

    //   config.headers['access_token'] = accessToken;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export default axios;
