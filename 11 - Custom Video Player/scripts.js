/* Get elements */
const player = document.querySelector(`.player`);
const video = player.querySelector(`.viewer`);
const progress = player.querySelector(`.progress`);
const progressBar = player.querySelector(`.progress__filled`);
const toggle = player.querySelector(`.toggle`);
const skipButtons = player.querySelectorAll(`[data-skip]`);
const ranges = player.querySelectorAll(`.player__slider`);
const fullscreenButton = player.querySelector(`.fullscreen`);

/* Build functions */
// version 1
// function togglePlay() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }

// version 2
function togglePlay() {
  const toggleMethod = video.paused ? "play" : "pause";
  video[toggleMethod]();
}

function updateButton() {
  const icon = this.paused ? `►` : `❚ ❚`;
  toggle.textContent = icon;
  //   console.log("update the button");
}

function skip() {
  //   console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  //   console.log(this.value);
  //   console.log(this.name);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  //   console.log(e);
}

function goFullscreen(e) {
  video.requestFullscreen();
  //   console.log(e);
}

/* BHook up event listeners */
video.addEventListener(`click`, togglePlay);
video.addEventListener(`dblclick`, goFullscreen);
video.addEventListener(`play`, updateButton);
video.addEventListener(`pause`, updateButton);
video.addEventListener(`timeupdate`, handleProgress);

toggle.addEventListener(`click`, togglePlay);
skipButtons.forEach((button) => button.addEventListener(`click`, skip));
ranges.forEach((range) => range.addEventListener(`change`, handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener(`mousemove`, handleRangeUpdate)
);

let mouseDown = false;
progress.addEventListener(`click`, scrub);
progress.addEventListener(`mousemove`, (e) => mouseDown && scrub(e));
progress.addEventListener(`mousedown`, () => (mouseDown = true));
progress.addEventListener(`mouseup`, () => (mouseDown = false));

fullscreenButton.addEventListener(`click`, goFullscreen);
