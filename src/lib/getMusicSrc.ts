const getMusicLink = async (trackId: number) => {
  try {
    const url = await fetch('https://music.moe.work/secure/tracks/' + trackId)
      .then((response) => response.json())
      .then((data) => data.track.url);

    return url;
  } catch (error) {
    console.error(error);
  }
};

export default getMusicLink;
