class Shake {
  constructor(thres, time) {
    this.threshold = thres;
    this.timeout = time;
  }

  start() {
    // console.log("oooooo : " + this.threshold);
    reset();
    var thresholdFunct = this.threshold;
    var timeoutFunct = this.timeout;
    var lasttimeFunct = new Date();
    // var lasttimeFunct = this.lastTime;

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
                window.addEventListener(
                  "devicemotion",
                  e => {
                    processMotion(
                      e,
                      thresholdFunct,
                      timeoutFunct,
                      this.lastX,
                      this.lastY,
                      this.lastZ,
                      lasttimeFunct
                    );
                  },
                  false
                );
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
      console.log("chrome");
      if (window.DeviceMotionEvent) {
        // console.log("chromeMotion");
        // console.log("ok : " + this.threshold);
        window.addEventListener(
          "devicemotion",
          function(event) {
            processMotion(
              event,
              thresholdFunct,
              timeoutFunct,
              this.lastX,
              this.lastY,
              this.lastZ,
              lasttimeFunct
            );
          },
          false
        );
      } else {
        document.body.innerHTML +=
          '<p class="warning">Votre navigateur ne semble pas supporter <code>deviceomotion</code></p>';
      }
    }
    // return;
  } // end function start()
} // end class shake()

function reset() {
  this.lastTime = new Date();
  this.lastX = null;
  this.lastY = null;
  this.lastZ = null;
}

function processMotion(e, Thres, TimeOut, lastx, lasty, lastz, lasttime) {
  // console.log(e.accelerationIncludingGravity);
  var current = e.acceleration;
  console.log(current);
  // currentTime = new Date();
  // console.log("threeeee : " + Thres);
  // console.log("timeout : " + TimeOut);

  // // alert("ert");
  // console.log("last time : " + lasttime);
  // console.log("time out : " + TimeOut);
  // console.log("lastx : " + lastx);
  // console.log("lastx : " + lasty);
  // console.log("lastx : " + lastz);
  var currentTime;
  var timeDifference;
  var deltaX = 0;
  var deltaY = 0;
  var deltaZ = 0;

  document.querySelector("#accx").innerHTML = e.acceleration.x;
  document.querySelector("#accy").innerHTML = e.acceleration.y;
  document.querySelector("#accz").innerHTML = e.acceleration.z;
  // if (lastx == null && lasty == null && lastz == null) {
  //   lastx = current.x;
  //   lasty = current.y;
  //   lastz = current.z;
  //   console.log("lastx 2: " + lastx);
  //   console.log("lastx 2: " + lasty);
  //   console.log("lastx 2: " + lastz);
  //   // return;
  // }
  // console.log("lastx 3: " + lastx);
  // console.log("lastx 3: " + lasty);
  // console.log("lastx 3: " + lastz);
  // console.log("poi kj : " + lastx); //ok
  // console.log("lastx : " + lastx);
  deltaX = Math.abs(lastx - current.x);
  deltaY = Math.abs(lasty - current.y);
  deltaZ = Math.abs(lastz - current.z);

  // console.log("deltaX : " + deltaX);
  // console.log("deltaY : " + deltaY);
  // console.log("deltaZ : " + deltaZ);
  // alert(" deltaZ = Math.abs(lastz - current.z);" + Math.abs(lastz - current.z));
  // console.log("thres : " + Thres); // ok
  if (
    (deltaX >= Thres && deltaY >= Thres) ||
    (deltaX >= Thres && deltaZ >= Thres) ||
    (deltaY >= Thres && deltaZ >= Thres)
  ) {
    // alert("deltaX > Thres && deltaY > Thres");
    //calculate time in milliseconds since last shake registered
    currentTime = new Date();
    timeDifference = currentTime.getTime() - lasttime.getTime();
    // console.log("timeDifference : " + timeDifference);
    // console.log("currentTime.getTime() : " + currentTime.getTime());
    if (timeDifference > TimeOut) {
      let eventShaked = new Event("skake1", { bubbles: true });
      // // window.dispatchEvent(this.event);
      window.dispatchEvent(eventShaked);
      // window.dispatchEvent("shake");
      // alert("shakedd");
      lasttime = new Date();
    }
  }
  lastx = current.x;
  lasty = current.y;
  lastz = current.z;
  // console.log("lastx current : " + lastx);
  //return;
}
