import React, { useState, useEffect } from 'react';
import Layout from '@components/layout';
import { Stack, Button, Link, Typography, useMediaQuery, Grid } from '@mui/material';
import {
  ChoiceSlide,
  ContainerBox,
  CustomSelect,
  CustomTab,
  MobileTrackList,
  PlayGroupChip,
  ServiceOFF,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import { useTheme } from '@mui/material/styles';
import axios from '@lib/customAxios';
import { useSession } from 'next-auth/react';
import useRequest from '@lib/useRequest';
import useSWR from 'swr';

function Like({ like }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [content, setContent] = useState();

  const [tabType, setTabType] = useState(tabItem[0].value);
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const fetcher = (url, token) =>
    axios.get(url, { headers: { authorization: 'Bearer ' + token } }).then((res) => res.data);

  const { data, error } = useSWR([`/api/my/likeables`, session?.accessToken], fetcher);

  // const { data } = useRequest({
  //   url: `/api/my/likeables`,
  //   headers: { authorization: 'Bearer ' + session?.accessToken },
  //   params: { type: 'track' },
  // });

  console.log('datadata', data);

  // // Fetch content from protected route
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('/track/likeables', {
  //       headers: { authorization: `Bearer ${session?.accessToken}` },
  //     });

  //     if (data) {
  //       setContent(data);
  //     }
  //   };
  //   fetchData();
  // }, [session]);

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  const rows = [];

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <ServiceOFF />;
  }

  // If session exists, display content
  return (
    <div>session 실행</div>
    // <>
    //   <ContainerBox sx={{ marginTop: 2 }}>
    //     <Stack direction="row" spacing={1} alignItems={'center'}>
    //       <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
    //         좋아요
    //       </Typography>
    //       {smUp ? (
    //         <CustomTab item={tabItem} type={tabType} setType={setTabType} />
    //       ) : (
    //         <CustomSelect item={tabItem} type={tabType} setType={setTabType} />
    //       )}
    //     </Stack>
    //   </ContainerBox>
    //   <ContainerBox>
    //     <Stack direction={smUp ? 'row' : 'column'} spacing={1} justifyContent="space-between">
    //       <Stack direction="row" spacing={2}>
    //         <Link
    //           component="button"
    //           variant="body2"
    //           color="primary"
    //           underline="always"
    //           onClick={() => {
    //             console.info("I'm a button.");
    //           }}
    //         >
    //           최신순
    //         </Link>
    //         <Link
    //           component="button"
    //           variant="body2"
    //           color="inherit"
    //           underline="none"
    //           onClick={() => {
    //             console.info("I'm a button.");
    //           }}
    //         >
    //           가나다순
    //         </Link>
    //         <Link
    //           component="button"
    //           variant="body2"
    //           color="inherit"
    //           underline="none"
    //           onClick={() => {
    //             console.info("I'm a button.");
    //           }}
    //         >
    //           아티스트순
    //         </Link>
    //       </Stack>
    //       <PlayGroupChip rows={rows} selected={selected} onChangeSelected={onChangeSelected} />
    //     </Stack>
    //   </ContainerBox>
    //   <ContainerBox>
    //     {
    //       {
    //         track: smUp ? (
    //           <TrackTable rows={rows} selected={selected} onChangeSelected={onChangeSelected} />
    //         ) : (
    //           <MobileTrackList
    //             rows={rows}
    //             selected={selected}
    //             onChangeSelected={onChangeSelected}
    //           />
    //         ),
    //         album: (
    //           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //             {trackCardItem.map((item, i) => (
    //               <Grid item xs={2} sm={2} md={2} key={i}>
    //                 <ThumbnailCard
    //                   key={i}
    //                   id={item.id}
    //                   image={item.image}
    //                   name={item.name}
    //                   artistId={item.artistId}
    //                   artistName={item.artistName}
    //                   //  likeInfo={newAlbumLikes && newAlbumLikes?.likeInfoList[i]}
    //                 />
    //               </Grid>
    //             ))}
    //           </Grid>
    //         ),
    //       }[tabType]
    //     }
    //   </ContainerBox>
    //   <ChoiceSlide selected={selected} />
    // </>
  );
}

Like.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// export async function getStaticProps() {
//   const { data: like } = await axios.get('/track/likeables', {
//     params: { authorization: '' },
//   });

//   return {
//     props: {
//       like: like.data,
//     }, // will be passed to the page component as props
//   };
// }

export default Like;

let tabItem = [
  {
    name: '곡',
    value: 'track',
  },
  {
    name: '앨범',
    value: 'album',
  },
  {
    name: '아티스트',
    value: 'artist',
  },
  {
    name: '뮤직비디오',
    value: 'video',
  },
];
