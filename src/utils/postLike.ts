import axios from 'axios';

type PostLike = {
  id: number | null;
  likeableId: number;
  likeableType: string;
  token: string | null;
};

export const postLike = async ({ id, likeableId, likeableType, token }: PostLike) => {
  if (id) {
    const { data } = await axios.put('/api/like', {
      id,
      token,
    });
    return data;
  } else {
    const { data } = await axios.post('/api/like', {
      likeableId,
      likeableType,
      token,
    });
    return data;
  }
};
