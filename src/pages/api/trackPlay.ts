import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { trackId, token },
  } = req;

  try {
    const { data } = await axios
      .post(
        `/player/${trackId}`,
        {},
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        }
      )
      .then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
