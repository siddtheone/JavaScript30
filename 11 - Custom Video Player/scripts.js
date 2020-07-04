const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousePressedOnProgress = false;

function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function seek(e) {
    const seekOn = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = seekOn;
}

function handleProgress() {
    const percentage = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percentage}%`;
}

toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

progress.addEventListener('mousedown', () => mousePressedOnProgress = true);
progress.addEventListener('mouseup', () => mousePressedOnProgress = false);
progress.addEventListener('mousemove', (e) => mousePressedOnProgress && seek(e))