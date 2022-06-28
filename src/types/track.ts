import { BasicAlbum } from './album';
import { BasicArtist } from './artist';
import Lyrics from './lyrics';

export interface BasicTrack {
  id: number;
  name: string;
  number: number; // 앨범에서 곡의 자리 순서
  duration: number | null; // 곡 재생 시간
  description: string | null; // 곡 설명
  adult: 0 | 1; // 성인 곡 유무
  musicUrl: string; // 음원 재생 url
}

export interface Track extends BasicTrack {
  url: string;
  composer: string | null; // 작곡가
  lyricser: string | null; // 작사가
  arranger: string | null; // 편곡가
  lyricsInfo: Lyrics;
  artistInfo: BasicArtist;
  albumInfo: BasicAlbum;
}

export interface ChartTrack extends BasicTrack {
  rank: number;
  wave: number | null; // 곡 순위 변동
  albumImage: string | null; // 곡 이미지는 앨범 이미지로 사용
  artistId: number;
  artistName: string;
  albumId: number;
  albumName: string;
}

export interface TrackList extends BasicTrack {
  image: string | null; // 곡 이미지는 앨범 이미지로 사용
  artistId: number;
  artistName: string;
  albumId: number;
  albumName: string;
}
