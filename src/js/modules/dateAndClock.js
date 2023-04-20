
export let showCurrentDate = function () {
  const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = now.getMonth();
    month = months[month];
    let date = document.querySelector(".calendar"); 
    date.innerText = `${now.getDate()} ${month} ${now.getFullYear()}`
}

export let showCurrentTime = function () {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
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