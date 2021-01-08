const playerVideo = document.querySelector(
  'video[data-js-reference="player_video"]'
);
const playerControls = document.querySelector(
  'div[data-js-reference="player_controls"]'
);
const progressBar = playerControls.querySelector(
  'div[data-js-reference="progress_bar"]'
);
const progressControls = playerControls.querySelector(
  'div[data-js-reference="progress_controls"]'
);

playerVideo.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target;
  updateProgressBar(duration, currentTime);
});

playerVideo.addEventListener("click", (e) => {
  const player = e.currentTarget;
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
});

playerControls.addEventListener("click", (e) => {
  const referenceString = e.target.dataset.jsReference;

  console.log();

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
    case "progress_controls":
      handleProgressControlsClick(e);
    case "progress_bar":
      handleProgressControlsClick(e);
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

function handlePlaybackRangeInput(playbackRate) {
  playerVideo.playbackRate = playbackRate;
}

function handleProgressControlsClick(mouseEvent) {
  const { width } = progressControls.getBoundingClientRect();
  const { offsetX } = mouseEvent;
  const percentileClicked = offsetX / width;
  const timeToMoveTo = playerVideo.duration * percentileClicked;
  playerVideo.currentTime = timeToMoveTo;
}

function handleSkipForward(skipAmount) {
  playerVideo.currentTime += parseFloat(skipAmount);
}

function handleSkipBackward(skipAmount) {
  playerVideo.currentTime += parseFloat(skipAmount);
}

function handleVolumeRangeInput(volumeLevel) {
  playerVideo.volume = volumeLevel;
}
