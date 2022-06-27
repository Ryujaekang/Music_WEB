import { ChartTrack } from './track';
import { Album } from './album';
import { Artist } from './artist';
import LyricsInfo from './lyrics';

export interface BasicSearch {
  keyword: string;
  type: 'all';
  count: number;
}

export interface TrackSearch extends BasicSearch {
  trackList: ChartTrack[];
}

export interface AlbumSearch extends BasicSearch {
  albumList: Album[];
}

export interface ArtistSearch extends BasicSearch {
  artistList: Artist[];
}

export interface LyricsSearch extends BasicSearch {
  lyricsList: LyricsInfo[];
}

export interface AllSearch {
  keyword: string;
  type: 'all';
  track: TrackSearch;
  album: AlbumSearch;
  artist: ArtistSearch;
  lyrics: LyricsSearch;
}
