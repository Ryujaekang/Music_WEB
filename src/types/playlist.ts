import { Track } from './track';

interface Playlist {
  id: number;
  name: string;
  isPublic: 0 | 1; // 공개 여부 0:비공개
  image: string | null;
  views: number;
  description: string | null;
  createAt: string;
  trackCount: number; // 곡 갯수
  userInfo: {
    id: number;
    username: string;
  };
  trackInfoList: Track[] | null;
}

export default Playlist;
