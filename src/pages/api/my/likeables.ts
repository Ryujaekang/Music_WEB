// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { Track } from 'types/track';
import { useSession, getSession } from 'next-auth/react';

export interface LikeablesProps {
  trackList: Track[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LikeablesProps>) {
  const {
    query: { type },
  } = req;
  //   const { data: session } = useSession();
  //   console.log('sessionsessionsession', session);

  try {
    console.log('type', type);
    const { data } = await axios.get(`/track/likeables`).then((res) => res.data);

    console.log('apidata', data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
