import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

let startButtonIsActive = false;
let userDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('input[type="text"]', options);

startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  if (startButtonIsActive) {
    return;
  }
  startButtonIsActive = true;
  let timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userDate - currentTime;
    const timeElements = convertMs(deltaTime);
    updateTimer(timeElements);
    
    if (currentTime >= userDate) {
      stopTimer(timerId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';

    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(obj) {
  daysEl.textContent = obj.days;
  hoursEl.textContent = obj.hours;
  minutesEl.textContent = obj.minutes;
  secondsEl.textContent = obj.seconds;
}


function stopTimer(value) {
  clearInterval(value);

}