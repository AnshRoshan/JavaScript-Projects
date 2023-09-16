document.addEventListener("DOMContentLoaded", function () {
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let timerRef = document.querySelector(".timer-display");
  let int = null;
  let isRunning = false;

  document.getElementById("start-timer").addEventListener("click", () => {
    if (isRunning) {
      clearInterval(int);
      isRunning = false;
      document.getElementById("start-timer").innerHTML = "Start";
    } else {
      isRunning = true;
      document.getElementById("start-timer").innerHTML = "Pause";
      int = setInterval(displayTimer, 10);
    }
  });

  function displayTimer() {
    if (isRunning) {
      milliseconds += 10;
      seconds = milliseconds >= 1000 ? seconds + 1 : seconds;
      minutes = seconds >= 60 ? minutes + 1 : minutes;
      hours = minutes >= 60 ? hours + 1 : hours;
      milliseconds = milliseconds >= 1000 ? 0 : milliseconds;

      let h = String(hours).padStart(2, "0");
      let m = String(minutes % 60).padStart(2, "0");
      let s = String(seconds % 60).padStart(2, "0");
      let ms = String(milliseconds).padStart(3, "0");

      timerRef.innerHTML = `${h}:${m}:${s}:${ms}`;
    }
  }

  document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    isRunning = false;
    document.getElementById("start-timer").innerHTML = "Start";
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = "00:00:00:000";
  });
});


// canvas javscript
var c = document.getElementById("canv")
var $ = c.getContext("2d")

var col = function (x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
  $.fillRect(x, y, 1, 1)
}
var R = function (x, y, t) {
  return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
}

var G = function (x, y, t) {
  return Math.floor(
    192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
  )
}

var B = function (x, y, t) {
  return Math.floor(
    192 +
      64 *
        Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)
  )
}

var t = 0

var run = function () {
  for (x = 0; x <= 35; x++) {
    for (y = 0; y <= 35; y++) {
      col(x, y, R(x, y, t), G(x, y, t), B(x, y, t))
    }
  }
  t = t + 0.05
  window.requestAnimationFrame(run)
}

run()
