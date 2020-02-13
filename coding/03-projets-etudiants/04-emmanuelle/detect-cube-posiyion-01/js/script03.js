// tested on ios 10.13 Chrome /+ Safari
var phoneData = [0, 0, 0];
var prevPhoneData = [0, 0, 0];

var positions = [
  {
    pos: 1,
    top: 0,
    bottom: 6,
    left: 0,
    right: 2
  },
  {
    pos: 2,
    top: 0,
    bottom: 7,
    left: 1,
    right: 3
  },
  {
    pos: 3,
    top: 0,
    bottom: 8,
    left: 2,
    right: 4
  },
  {
    pos: 4,
    top: 0,
    bottom: 9,
    left: 3,
    right: 5
  },
  {
    pos: 5,
    top: 0,
    bottom: 10,
    left: 4,
    right: 0
  },
  {
    pos: 6,
    top: 1,
    bottom: 11,
    left: 0,
    right: 7
  },
  {
    pos: 7,
    top: 2,
    bottom: 12,
    left: 6,
    right: 8
  },
  {
    pos: 8,
    top: 3,
    bottom: 13,
    left: 7,
    right: 9
  },
  {
    pos: 9,
    top: 4,
    bottom: 14,
    left: 8,
    right: 10
  },
  {
    pos: 10,
    top: 5,
    bottom: 15,
    left: 9,
    right: 0
  },
  {
    pos: 11,
    top: 6,
    bottom: 16,
    left: 0,
    right: 12
  },
  {
    pos: 12,
    top: 7,
    bottom: 17,
    left: 11,
    right: 13
  },
  {
    pos: 13,
    top: 8,
    bottom: 18,
    left: 12,
    right: 14
  },
  {
    pos: 14,
    top: 9,
    bottom: 19,
    left: 13,
    right: 15
  },
  {
    pos: 15,
    top: 10,
    bottom: 20,
    left: 14,
    right: 0
  },
  {
    pos: 16,
    top: 11,
    bottom: 0,
    left: 0,
    right: 17
  },
  {
    pos: 17,
    top: 12,
    bottom: 0,
    left: 16,
    right: 18
  },
  {
    pos: 18,
    top: 13,
    bottom: 0,
    left: 17,
    right: 19
  },
  {
    pos: 19,
    top: 14,
    bottom: 0,
    left: 18,
    right: 20
  },
  {
    pos: 20,
    top: 15,
    bottom: 0,
    left: 19,
    right: 0
  }
];

// setInterval(runFunction, 1000);

function compareData(a, b) {
  // if length is not equal
  if (a.length != b.length) return false;
  else {
    // comapring each element of array
    for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
    return true;
  }
}

setInterval(print, 500);

function print() {
  document.write(compareData(phoneData, prevPhoneData));
}
// console.log(possiblePosition[0].bottom);
var button = document.createElement("button");
button.innerHTML = "Allow Sensor Access";

// Shake sensitivity (a lower number is more)
var sensitivity = 20;

// Position variables
var x1 = 0,
  y1 = 0,
  z1 = 0,
  x2 = 0,
  y2 = 0,
  z2 = 0;

// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

// 3. Add event handler
button.addEventListener("click", function() {
  onClickIos();
});

function onClickIos() {
  // --------------- Device Motion / Accelerometre
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == "granted") {
          button.style.display = "none";
          window.addEventListener("devicemotion", e => {
            x1 = event.accelerationIncludingGravity.x;
            y1 = event.accelerationIncludingGravity.y;
            z1 = event.accelerationIncludingGravity.z;
            // Accelerometer grvity
            document.querySelector("#motion-x").innerHTML = x1;
            document.querySelector("#motion-y").innerHTML = y1;
            document.querySelector("#motion-z").innerHTML = z1;
            // Acceleration
            document.querySelector("#acc-x").innerHTML = e.acceleration.x;
            document.querySelector("#acc-y").innerHTML = e.acceleration.y;
            document.querySelector("#acc-z").innerHTML = e.acceleration.z;

            setInterval(function() {
              var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2);

              if (change > sensitivity) {
                alert("Shake!");
              }

              // Update new position
              x2 = x1;
              y2 = y1;
              z2 = z1;
            }, 150);
          });
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
  }

  // --------------- Device Orientation
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == "granted") {
          button.style.display = "none";
          window.addEventListener("deviceorientation", e => {
            // Motion
            document.querySelector("#orient-x").innerHTML = event.alpha;
            document.querySelector("#orient-y").innerHTML = event.beta;
            document.querySelector("#orient-z").innerHTML = event.gamma;
          });
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
  }
}
