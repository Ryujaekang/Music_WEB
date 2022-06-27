import { Album } from './album';
import { Track } from './track';

export interface BasicArtist {
  id: number;
  name: string;
  originalName: string | null;
  englishName: string | null;
}

export interface Artist extends BasicArtist {
  image: string;
  birthday: null;
  country: '한국' | '일본' | '미국' | '대만' | '중국' | '-';
  debut: number;
}

export interface ArtistDetail extends BasicArtist {
  image: string | null;
  birthday: string | null;
  country: '한국' | '일본' | '미국' | '대만' | '중국' | '-';
  debut: number | null; // 데뷔년도
  agency: string | null; // 소속사
  label: string | null;
  views: number;
  imageSmall: string | null;
  biosInfo: {
    id: number | null;
    content: string[] | null;
  }; // 아티스트 상세정보
  albumList: Album[];
  trackList: Track[];
}
