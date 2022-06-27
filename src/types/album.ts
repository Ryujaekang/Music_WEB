import { BasicArtist } from './artist';
import { Track } from './track';

export interface BasicAlbum {
  id: number;
  name: string;
  image: string | null;
}

export interface Album extends BasicAlbum {
  artistId: number;
  artistName: string;
  releaseDate: string; // 발매일
  originalName: string | null;
  description: string[] | null;
}

export interface AlbumDetail extends BasicAlbum {
  albumType: string;
  publisherName: string; // 발매사
  thinkerName: string; // 기획사
  artistInfo: BasicArtist;
  releaseDate: string; // 발매일
  originalName: string | null;
  description: string[] | null;
  trackList: Track[];
}
