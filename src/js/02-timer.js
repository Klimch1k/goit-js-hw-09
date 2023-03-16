import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (selectedDates[0].getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr('input[type="text"]', options);

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
 setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userDate - currentTime;
    
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
