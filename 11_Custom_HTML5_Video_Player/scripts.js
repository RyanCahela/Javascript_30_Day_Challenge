const playerVideo = document.querySelector(
  'video[data-js-reference="player_video"]'
);
const playerControls = document.querySelector(
  'div[data-js-reference="player_controls"]'
);

//playerVideo.addEventListener("click", handlePlayButtonClick);

playerControls.addEventListener("click", (e) => {
  const referenceString = e.target.dataset.jsReference;

  switch (referenceString) {
    case "play_button":
      handlePlayButtonClick();
      break;
    case "skip-back_button":
      console.log(referenceString);
      break;
    case "skip-forward_button":
      console.log(referenceString);
      break;
    default:
      break;
  }
});

playerControls.addEventListener("input", (e) => {
  const referenceString = e.target.dataset.jsReference;
  switch (referenceString) {
    case "volume_range":
      handleVolumeRangeInput(e.target.value);
      break;
    case "playback-rate_range":
      handlePlaybackRangeInput(e.target.value);
      break;
  }
});

function handlePlayButtonClick() {
  if (playerVideo.paused) {
    playerVideo.play();
  } else {
    playerVideo.pause();
  }
}

function handleVolumeRangeInput(volumeLevel) {
  playerVideo.volume = volumeLevel;
}

function handlePlaybackRangeInput(playbackRate) {
  playerVideo.playbackRate = playbackRate;
}
