// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from '@lib/customAxios';
import { TrackList } from 'types/track';
import { channelInfo } from 'types/channel';

export interface ChannelProps {
  channelInfo: channelInfo;
  type: 'track';
  list: TrackList[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChannelProps>) {
  const {
    query: { id },
  } = req;

  try {
    const { data } = await axios.get(`/channel/${id}`).then((res) => res.data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
