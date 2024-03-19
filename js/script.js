const hour = document.querySelector(".h"),
  min = document.querySelector(".m"),
  sec = document.querySelector(".s"),
  hoursNumber = document.querySelector(".hours"),
  minutesNumber = document.querySelector(".minutes");

function clock() {
  let time = new Date(),
    milliseconds = time.getMilliseconds(),
    seconds = time.getSeconds(),
    minutes = time.getMinutes(),
    hours = time.getHours();
  sec.style = `transform:rotate(${0.006 * (seconds * 1000 + milliseconds)}deg);`;
  min.style = `transform:rotate(${6 * minutes}deg); transition: 1s linear;`;
  hour.style = `transform:rotate(${30 * hours}deg); transition: 1s linear;`;

  hoursNumber.innerHTML =
    time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  minutesNumber.innerHTML =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();

  setTimeout(() => clock(), 1);
}
clock();

const links = document.querySelectorAll(".tabsItem"),
  tabs = document.querySelectorAll(".tabsContentItem");

links.forEach((item, i) => {
  item.addEventListener("click", (e) => {

    e.preventDefault();
    links.forEach((link, index) => {
      link.classList.remove("active");
      tabs[index].classList.remove("active");
    });
    changeTab(item, tabs[i]);
  });
});

function changeTab(el, el2) {
  el.classList.add("active");
  el2.classList.add("active");
}

let dispHour = document.querySelector(".stopwatch__hours"),
  dispMin = document.querySelector(".stopwatch__minutes"),
  dispSec = document.querySelector(".stopwatch__seconds");

let btn = document.querySelector(".stopwatch__btn"),
  resumeBtn = document.querySelector(".stopwatch__btn_resume"),
  timerStatus = document.querySelector(".tabsLink__span");

let timerSec = -1,
  timerMin = 0,
  timerHour = 0;

btn.onclick = () => {
  if (btn.innerText.toLowerCase() == "start") {
    btn.innerText = "stop";
    timerStatus.classList.add("active");
    timerStatus.classList.remove("active_clear");
    startStopwatch();
  } else if (btn.innerText.toLowerCase() == "stop") {
    timerStatus.classList.remove("active");
    timerStatus.classList.add("active_clear");
    resumeBtn.classList.add("active");
    btn.innerText = "clear";
  } else if (btn.innerText.toLowerCase() == "clear") {
    timerStatus.classList.remove("active");
    timerStatus.classList.remove("active_clear");
    resumeBtn.classList.remove("active");

    refreshTimer();
    btn.innerText = "start";
    displayTimer();
  }
};

resumeBtn.onclick = () => {
  btn.innerText = "stop";
  startStopwatch();
  resumeBtn.classList.remove("active");
};

function startStopwatch() {
  if (btn.innerText.toLowerCase() != "stop") return;

  updateDisplay();
  setTimeout(() => startStopwatch(), 1000);
}

function updateDisplay() {
  if (timerSec >= 59) {
    timerSec = 0;
    timerMin++;
  } else if (timerMin >= 59) {
    timerMin = 0;
    timerHour++;
  } else if (timerHour >= 59) {
    refreshTimer();
  }
  timerSec++;
  displayTimer();
}

function displayTimer() {
  dispHour.innerHTML = timerHour;
  dispMin.innerHTML = timerMin;
  dispSec.innerHTML = timerSec;
}

function refreshTimer() {
  timerHour = 0;
  timerMin = 0;
  timerSec = 0;
}
