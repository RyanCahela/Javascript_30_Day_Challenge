const playerVideo = document.querySelector(
  'video[data-js-reference="player_video"]'
);
const playerControls = document.querySelector(
  'div[data-js-reference="player_controls"]'
);

const progressBar = playerControls.querySelector(
  'div[data-js-reference="progress_bar"]'
);

playerVideo.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target;
  updateProgressBar(duration, currentTime);
});

playerControls.addEventListener("click", (e) => {
  const referenceString = e.target.dataset.jsReference;

  switch (referenceString) {
    case "play_button":
      handlePlayButtonClick();
      break;
    case "skip-back_button":
      handleSkipBackward(e.target.dataset.skip);
      break;
    case "skip-forward_button":
      handleSkipForward(e.target.dataset.skip);
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
    default:
      break;
  }
});

function updateProgressBar(totalDuration, currentTime) {
  const percentageDone = (currentTime / totalDuration) * 100;
  progressBar.style.flexBasis = `${percentageDone}%`;
}

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

function handleSkipForward(skipAmount) {
  playerVideo.currentTime += parseFloat(skipAmount);
}

function handleSkipBackward(skipAmount) {
  playerVideo.currentTime += parseFloat(skipAmount);
}
