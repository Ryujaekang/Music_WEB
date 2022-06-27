type Lyrics = {
  timeline: string;
  text: string;
  textOriginal: string;
  textPron: string;
};

interface LyricsInfo {
  id: number;
  lyrics: Lyrics[] | null;
}

export default LyricsInfo;
