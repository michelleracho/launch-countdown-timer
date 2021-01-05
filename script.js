// ********** DOM **********
// DOM elements
const secondsEl = document.querySelector('#seconds');
const minutesEl = document.querySelector('#minutes');
const hoursEl = document.querySelector('#hours');
const daysEl = document.querySelector('#days');

// pad 0s if digit is less than 10
const padZeros = num => {
  return num >= 0 && num < 10 ? `0${num}` : num;
};

// flip card on countdown
// clone card to remove flip transition without flipping it backwards
const flipCard = (el, card) => {
  card.addEventListener('transitionend', () => {
    const clonedCard = card.cloneNode(true);
    clonedCard.classList.remove('flipped');

    try {
      el.replaceChild(clonedCard, card);
    } catch (e) {
      console.log(e);
    }
    card = clonedCard;
  });

  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped');
  }
};

// setup card
const setupCard = (el, currentTime, nextTime, resetTime) => {
  currentTime = padZeros(currentTime);
  nextTime = padZeros(nextTime);

  const card = el.querySelector('.card');
  const cardFaceFront = el.querySelector('.card-face__front');
  const cardFaceBack = el.querySelector('.card-face__back');

  el.setAttribute('data-current-number', currentTime);
  el.setAttribute('data-next-number', nextTime);

  cardFaceFront.innerText = currentTime;
  cardFaceBack.innerText = nextTime;

  resetTime && flipCard(el, card);
};

// update DOM countdown values
const updateDOM = (el, currentTime, resetTime) => {
  let nextTime = currentTime - 1;

  // hide/mask if time === -1 on DOM
  if (resetTime) {
    if (currentTime === 0) {
      nextTime = resetTime;
    } else if (currentTime === -1) {
      currentTime = resetTime;
      nextTime = resetTime - 1;
    }
  }

  setupCard(el, currentTime, nextTime, resetTime);
};

// ********** COUNTDOWN TIMER **********
// Timers
const HOURS = 24; // 1 day
const MINUTES = 60; // 1 hr
const SECONDS = 60; // 1 min

// per challenge README, start the count at 14 days
// but I want to match the screenshot
let days = 8;
let hours = 23;
let minutes = 55;
let seconds = 41;

let interval;

// if seconds === 0, minutes-- seconds = 60
// if minutes === 0, hours-- minute = 60 seconds = 60
// if hours === 0, days-- hours = 60 minute = 60 seconds = 60
// if days === 0 hours === 0 minutes === 0 seconds === 0, END countdown

const countdownDays = () => {
  if (days > 0) {
    days--;
    updateDOM(daysEl, days, days);
  } else {
    return;
  }
};

const countdownHours = () => {
  hours--;
  updateDOM(hoursEl, hours, HOURS);

  if (hours < 0) {
    countdownDays();
    hours = HOURS;
  }
};

const countdownMinutes = () => {
  minutes--;
  updateDOM(minutesEl, minutes, MINUTES);

  if (minutes < 0) {
    countdownHours();
    minutes = MINUTES;
  }
};

const countdownSeconds = () => {
  seconds--;
  updateDOM(secondsEl, seconds, SECONDS);

  if (seconds < 0) {
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

  // console.log(`${days} days ${hours}hrs ${minutes}min ${seconds}sec`);
  countdownSeconds();
};

// Start countdown
const startCountdown = () => {
  interval = setInterval(countdown, 1000);
};

// initialize DOM
updateDOM(secondsEl, seconds);
updateDOM(minutesEl, minutes);
updateDOM(hoursEl, hours);
updateDOM(daysEl, days);

startCountdown();
