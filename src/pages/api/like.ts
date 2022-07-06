// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { Likes } from 'types/like';

export interface LikeProps {
  data: Likes;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LikeProps>) {
  const {
    body: { likeableId, id, likeableType, token },
  } = req;

  try {
    if (req.method === 'POST') {
      const { data } = await axios
        .post(
          `/like`,
          {
            likeableId,
            likeableType,
          },
          {
            headers: {
              authorization: 'Bearer ' + token,
            },
          }
        )
        .then((res) => res.data);

      res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const { data } = await axios
        .put(`/like/${id}`, {
          headers: {
            authorization: 'Bearer ' + token,
          },
        })
        .then((res) => res.data);
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
