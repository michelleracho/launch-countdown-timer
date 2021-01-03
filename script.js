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

// initialize DOM countdown values
const initializeDOM = (el, currentTime) => {
  const cardFaceFront = el.querySelector('.card-face__front');
  const cardFaceBack = el.querySelector('.card-face__back');

  let nextTime = currentTime - 1;

  currentTime = padZeros(currentTime);
  nextTime = padZeros(nextTime);

  el.setAttribute('data-current-number', currentTime);
  el.setAttribute('data-next-number', nextTime);

  cardFaceFront.innerText = currentTime;
  cardFaceBack.innerText = nextTime;
};

// flip card on countdown
const flipCard = (el, card) => {
  card.addEventListener('transitionend', () => {
    const clonedCard = card.cloneNode(true);
    clonedCard.classList.remove('flipped');

    try {
      el.replaceChild(clonedCard, card);
    } catch (e) {
      console.log(e);
      // console.log(el);
      // console.log(card);
    }
    card = clonedCard;
  });

  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped');
  }
};

// update DOM
const updateDOM = (el, currentTime) => {
  const card = el.querySelector('.card');
  const cardFaceFront = el.querySelector('.card-face__front');
  const cardFaceBack = el.querySelector('.card-face__back');

  // let nextTime = currentTime <= 0 ? 0 : currentTime - 1;
  let nextTime = currentTime - 1;

  currentTime = padZeros(currentTime);
  nextTime = padZeros(nextTime);

  el.setAttribute('data-current-number', currentTime);
  el.setAttribute('data-next-number', nextTime);

  cardFaceFront.innerText = currentTime;
  cardFaceBack.innerText = nextTime;

  flipCard(el, card);
};

// ********** COUNTDOWN TIMER **********
// Timers
const HOURS = 2; // 24
const MINUTES = 3; // 60
const SECONDS = 5; // 60

// start the count at 14 days
let days = 2; // 8
let hours = HOURS; // 23
let minutes = MINUTES; // 55
let seconds = SECONDS; // 41

let interval;

// if seconds === 0, minutes-- seconds = 60
// if minutes === 0, hours-- minute = 60 seconds = 60
// if hours === 0, days-- hours = 60 minute = 60 seconds = 60
// if days === 0 hours === 0 minutes === 0 seconds === 0, END countdown

const countdownDays = () => {
  if (days >= 0) {
    days--;
    updateDOM(daysEl, days);

    // if (days === 0) {
    //   countdownDays();
    // }
  } else if (days < 0) {
    return;
  }
};

const countdownHours = () => {
  if (hours >= 0) {
    hours--;
    updateDOM(hoursEl, hours);

    if (hours === 0 && days >= 0) {
      countdownDays();
      hours = HOURS + 1;
    }
  } else if (hours <= 0) {
    // countdownDays();
    // hours = HOURS + 1;
  }
};

const countdownMinutes = () => {
  if (minutes >= 0) {
    minutes--;
    updateDOM(minutesEl, minutes);

    if (minutes === 0 && (days >= 0 || hours >= 0)) {
      countdownHours();
      minutes = MINUTES + 1;
    }
  } else if (minutes < 0) {
    // countdownHours();
    // minutes = MINUTES + 1;
  }
};

const countdownSeconds = () => {
  if (seconds >= 0) {
    seconds--;
    updateDOM(secondsEl, seconds);

    if (seconds === 0 && (days >= 0 || hours >= 0 || minutes >= 0)) {
      countdownMinutes();
      seconds = SECONDS + 1;
    }
  } else if (seconds < 0) {
    // if (seconds === 0) {
    // countdownMinutes();
    // }
    // countdownMinutes();
    // seconds = SECONDS + 1;
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

// inits
initializeDOM(secondsEl, seconds);
initializeDOM(minutesEl, minutes);
initializeDOM(hoursEl, hours);
initializeDOM(daysEl, days);

startCountdown();
