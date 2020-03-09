const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

/** Use JS to move clock arms*/

/* use date object to get current time */
var date = new Date();
// console.log(date);

/** Get hours, minutes, and seconds
(!) Now the goal is to convert these values into degrees in order to show
    time on the clock. Requires math. Takes 60 steps for second arm to move
    around circle, so 360/60 and add up how many seconds we want to move
    for hour there are 12 hour marks.
*/
let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
// console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

// These will contain the degrees to which we want to move the arms.
let hrPosition = (hr*360/12)+(min*(360/60)/12);
// in order to move incrementally, add number of seconds added to the clock.
let minPosition = (min*360/60)+(sec*(360/60)/60);
let secPosition = sec*360/60;

function runTheClock() {

  /* Use math to find degree positions
     incrementally move arm positions.

     Downside, no longer relying on the date object to constantly
     update the time.indtead we're handing that task over to the browser.
     If the browser throttles the JS, or stops it, we'll lose track of time.
     Go to a new tab to see this, got to a different tab for a bit, when
     you retun, you'll see the clock arms catch up to the current time, since
     the JS was throttled by the browser.
  */
  secPosition = secPosition+(360/60); // add number of degrees to dipslay 1 additional sec
  minPosition = minPosition+(1/60)*6; // The minute arm moves distance of 1 second over 60 seconds
  // Looking for 1/60th degree of the minute hand
  hrPosition = hrPosition+((360/12)/3600); // 360/12 = 30, over 3600 seconds (seconds in an hour)

  HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
  /**
    <g id="minute" style="transform: rotate(130deg);">
    Adds inline styling to this element
  */
  MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
  SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
}

/** Show current time.
  Need to re-run script to update clock every second

  setInterval() method: repeatedly calls a function or executes a code
  snippet, with a fixed time delay between each call. Returns an intervalID

  function to be executed every delay milliseconds, we need this to
  to be every second.
*/

var interval = setInterval(runTheClock, 1000);
