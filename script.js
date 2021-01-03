const testDOM = document.querySelector('.test');

const updateDOM = days => {
  testDOM.innerText = days;
};

// Calculate target date and current date difference
const countdown = () => {
  if (days > 0) {
    days--;
    updateDOM(days);
  } else if (days <= 0) {
    return;
  }
};

// Start countdown
const startCountdown = () => {
  setInterval(countdown, 1000);
};

// start the count at 14 days
let days = 14;
startCountdown();
