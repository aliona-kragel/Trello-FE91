'use strict'

// time

let showCurrentTime = function () {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  let time = document.querySelector(".header__clock");
  time.innerText = `${hour}:${min}`;
  let timeout = setTimeout(function () { showCurrentTime() }, 1000);
}

let updateTime = function (t) {
  if (t < 10) {
    return "0" + t;
  }
  else {
    return t;
  }
}

showCurrentTime();

