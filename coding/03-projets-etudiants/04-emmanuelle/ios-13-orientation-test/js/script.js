//https://dev.to/li/how-to-requestpermission-for-devicemotion-and-deviceorientation-events-in-ios-13-46g2
//https://developer.mozilla.org/fr/docs/Web/API/DeviceMotionEvent.acceleration
//https://developer.apple.com/documentation/safari_release_notes/safari_12_1_release_notes
// Shake : https://gist.github.com/minwe/9887001

var button = document.createElement("button");
button.innerHTML = "Allow Sensor Access";

var x1 = 0,
  y1 = 0,
  z1 = 0,
  x2 = 0,
  y2 = 0,
  z2 = 0;

var sensitivity = 10;

// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

// 3. Add event handler
button.addEventListener("click", function() {
  onClickIos();
});

function onClick() {
  // --------------- Device Motion / Accelerometre
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response == "granted") {
          button.style.display = "none";
          window.addEventListener("devicemotion", e => {
            // Motion
            document.querySelector("#motion-x").innerHTML = event.x;
            document.querySelector("#motion-y").innerHTML = event.y;
            document.querySelector("#motion-z").innerHTML = event.z;
            // Acceleration
            document.querySelector("#acc-x").innerHTML = event.acceleration.x;
            document.querySelector("#acc-y").innerHTML = event.acceleration.y;
            document.querySelector("#acc-z").innerHTML = event.acceleration.z;
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

  // --------------- Device Accelerometre
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", () => {});
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
  }
}
