function playSong(song) {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}
