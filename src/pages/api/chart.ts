// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { Track } from 'types/track';

export interface Top100Props {
  trackList: Track[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Top100Props>) {
  const {
    query: { type, genre, date },
  } = req;

  try {
    const { data } = await axios
      .get(`/track/rank/${type}`, {
        params: { genre, date },
      })
      .then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
