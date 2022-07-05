// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { Track } from 'types/track';

export interface LikeablesProps {
  trackList: Track[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LikeablesProps>) {
  const {
    query: { type, token },
  } = req;

  try {
    const { data } = await axios
      .get(`/${type}/likeables`, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      })
      .then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
