// if seconds === 0, minutes-- seconds = 60
// if minutes === 0, hours-- minute = 60 seconds = 60
// if hours === 0, days-- hours = 60 minute = 60 seconds = 60
// if days === 0 hours === 0 minutes === 0 seconds === 0, 🎉

const countdownDays = () => {
  console.log('days--');
};

const countdownHours = () => {
  console.log('hours--');
};

const countdownMinutes = () => {
  if (minutes > 0) {
    minutes--;
    console.log(`${minutes}min`);
    // updateDOM(days);
  } else if (minutes <= 0) {
    // minutes--
    countdownHours();
    minutes = 2;
  } else {
    return;
  }
};

const countdownSeconds = () => {
  if (seconds > 0) {
    seconds--;
    console.log(`${seconds}s`);
    // updateDOM(days);
  } else if (seconds <= 0) {
    // minutes--
    countdownMinutes();
    seconds = 3;
  }
};

const countdown = () => {
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    console.log('END!!');
    clearInterval(interval);
    return;
  }

  countdownSeconds();
};

// Start countdown
const startCountdown = () => {
  interval = setInterval(countdown, 1000);
};

// start the count at 14 days
let days = 0;
let hours = 0;
let minutes = 2;
let seconds = 3;

let interval;

startCountdown();
