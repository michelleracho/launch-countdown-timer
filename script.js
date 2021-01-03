const HOURS = 1; // 24
const MINUTES = 2; // 60
const SECONDS = 3; // 60

// start the count at 14 days
let days = 1;
let hours = HOURS; // 8
let minutes = MINUTES; // 23
let seconds = SECONDS; // 41

let interval;

// if seconds === 0, minutes-- seconds = 60
// if minutes === 0, hours-- minute = 60 seconds = 60
// if hours === 0, days-- hours = 60 minute = 60 seconds = 60
// if days === 0 hours === 0 minutes === 0 seconds === 0, END countdown

const countdownDays = () => {
  if (days > 0) {
    days--;
    console.log(`${days} days ${hours}hrs ${minutes}min ${seconds}s`);
    // updateDOM(days);
  } else if (days <= 0) {
    return;
  }
};

const countdownHours = () => {
  if (hours > 0) {
    hours--;
    console.log(`${days} days ${hours}hrs ${minutes}min ${seconds}s`);
    // updateDOM(days);
  } else if (hours <= 0) {
    // days--
    countdownDays();
    hours = HOURS;
  }
};

const countdownMinutes = () => {
  if (minutes > 0) {
    minutes--;
    console.log(`${days} days ${hours}hrs ${minutes}min ${seconds}s`);
    // updateDOM(days);
  } else if (minutes <= 0) {
    // hours--
    countdownHours();
    minutes = MINUTES;
  }
};

const countdownSeconds = () => {
  if (seconds > 0) {
    seconds--;
    console.log(`${days} days ${hours}hrs ${minutes}min ${seconds}s`);
    // updateDOM(days);
  } else if (seconds <= 0) {
    // minutes--
    countdownMinutes();
    seconds = SECONDS;
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

startCountdown();
