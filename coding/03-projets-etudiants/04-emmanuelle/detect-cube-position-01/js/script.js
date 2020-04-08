// tested on ios 10.13 Chrome /+ Safari
var phoneData = [0, 0, 0];
var prevPhoneData = [0, 0, 0];

var gridPositions = [
  {
    pos: 1,
    north: 0,
    south: 6,
    east: 0,
    west: 2
  },
  {
    pos: 2,
    north: 0,
    south: 7,
    east: 1,
    west: 3
  },
  {
    pos: 3,
    north: 0,
    south: 8,
    east: 2,
    west: 4
  },
  {
    pos: 4,
    north: 0,
    south: 9,
    east: 3,
    west: 5
  },
  {
    pos: 5,
    north: 0,
    south: 10,
    east: 4,
    west: 0
  },
  {
    pos: 6,
    north: 1,
    south: 11,
    east: 0,
    west: 7
  },
  {
    pos: 7,
    north: 2,
    south: 12,
    east: 6,
    west: 8
  },
  {
    pos: 8,
    north: 3,
    south: 13,
    east: 7,
    west: 9
  },
  {
    pos: 9,
    north: 4,
    south: 14,
    east: 8,
    west: 10
  },
  {
    pos: 10,
    north: 5,
    south: 15,
    east: 9,
    west: 0
  },
  {
    pos: 11,
    north: 6,
    south: 16,
    east: 0,
    west: 12
  },
  {
    pos: 12,
    north: 7,
    south: 17,
    east: 11,
    west: 13
  },
  {
    pos: 13,
    north: 8,
    south: 18,
    east: 12,
    west: 14
  },
  {
    pos: 14,
    north: 9,
    south: 19,
    east: 13,
    west: 15
  },
  {
    pos: 15,
    north: 10,
    south: 20,
    east: 14,
    west: 0
  },
  {
    pos: 16,
    north: 11,
    south: 0,
    east: 0,
    west: 17
  },
  {
    pos: 17,
    north: 12,
    south: 0,
    east: 16,
    west: 18
  },
  {
    pos: 18,
    north: 13,
    south: 0,
    east: 17,
    west: 19
  },
  {
    pos: 19,
    north: 14,
    south: 0,
    east: 18,
    west: 20
  },
  {
    pos: 20,
    north: 15,
    south: 0,
    east: 19,
    west: 0
  }
];

// var initPhoneData;

function initPhone() {
  setTimeout(initPhoneData, 2000);
}

function initPhoneData() {}
// console.log(possiblePosition[0].bottom);

// --------------------- IOS
if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
  var button = document.createElement("button");
  button.innerHTML = "Allow Sensor Access";
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
}
// ---------------- FIREFOX ou Chrome
if (
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ||
  /Chrom(e|ium)\W\d|CriOS\W\d/.test(navigator.userAgent)
) {
  function process(event) {
    document.querySelector("#orient-x").innerHTML = event.alpha;
    document.querySelector("#orient-y").innerHTML = event.beta;
    document.querySelector("#orient-z").innerHTML = event.gamma;
  }
  function processMotion(event) {
    document.querySelector("#motion-x").innerHTML =
      event.accelerationIncludingGravity.x;
    document.querySelector("#motion-y").innerHTML =
      event.accelerationIncludingGravity.y;
    document.querySelector("#motion-z").innerHTML =
      event.accelerationIncludingGravity.z;
    document.querySelector("#acc-x").innerHTML = event.acceleration.x;
    document.querySelector("#acc-y").innerHTML = event.acceleration.y;
    document.querySelector("#acc-z").innerHTML = event.acceleration.z;
  }
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", process, true);
  } else {
    document.body.innerHTML +=
      '<p class="warning">Votre navigateur ne semble pas supporter <code>deviceorientation</code></p>';
  }
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", processMotion, true);
  } else {
    document.body.innerHTML +=
      '<p class="warning">Votre navigateur ne semble pas supporter <code>deviceomotion</code></p>';
  }
}
