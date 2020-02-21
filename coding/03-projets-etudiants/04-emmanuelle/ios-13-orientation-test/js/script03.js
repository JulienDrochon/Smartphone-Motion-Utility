//https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2
//https://developer.mozilla.org/fr/docs/Web/API/DeviceMotionEvent.acceleration
//https://developer.apple.com/documentation/safari_release_notes/safari_12_1_release_notes
// Shake : https://gist.github.com/minwe/9887001
// tested on ios 10.13 Chrome / Safari

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

// var sensitivity = 10;

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
            // Accelerometer gravity
            document.querySelector("#motion-x").innerHTML = x1;
            document.querySelector("#motion-y").innerHTML = y1;
            document.querySelector("#motion-z").innerHTML = y2;
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
