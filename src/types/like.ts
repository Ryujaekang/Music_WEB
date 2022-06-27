export interface Like {
  id: number | null;
  likeableId: number; // 요청한 타입의 ID 값
  isLike: 0 | 1;
  createdAt: string | null;
  likeCount: number;
}

export interface Likes {
  type: 'track' | 'album' | 'artist' | 'playlist';
  likeInfoList: Like[];
}
