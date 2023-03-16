

const startButton = document.querySelector('button[data-start]')
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopButton.disabled = true;

startButton.addEventListener('click', onStartButtonClick)
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  startButton.disabled = true;
  stopButton.disabled = false;
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  
}

function onStopButtonClick() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}