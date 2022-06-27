// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';

export interface SearchProps {
  data: { keyword: string }[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchProps>) {
  const {
    query: { keyword },
  } = req;

  try {
    const { data } = await axios
      .get(`/search`, {
        params: { keyword },
      })
      .then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
