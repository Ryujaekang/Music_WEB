import { ChartTrack } from './track';

export interface Chart {
  date: string;
  type: 'now' | 'day' | 'week' | 'month';
  genre: number | null;
  layout: {
    genreList: Genre[];
    dateList: string[] | null;
  };
  trackList: ChartTrack[];
}

export type Genre = {
  id: number | null;
  name: string;
  image: string | null;
  displayName: string;
  title: string | null;
  description: string | null;
  views: number;
};

export interface LayoutData {
  genreList: Genre[];
  yearDate: string[];
  monthDate: string[];
  weekDate: string[];
}
