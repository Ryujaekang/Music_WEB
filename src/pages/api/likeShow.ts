// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { Likes } from 'types/like';

export interface LikeProps {
  data: Likes;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LikeProps>) {
  const {
    query: { type, ids },
  } = req;

  try {
    const { data } = await axios
      .get(`/like/show`, {
        params: { type, ids },
      })
      .then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
