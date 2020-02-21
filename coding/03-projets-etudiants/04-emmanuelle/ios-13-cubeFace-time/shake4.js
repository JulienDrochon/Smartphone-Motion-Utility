(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    define(function() {
      return factory(global, global.document);
    });
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(global, global.document);
  } else {
    global.cubeFace = factory(global, global.document);
  }
})(typeof window !== "undefined" ? window : this, function(window, document) {
  "use strict";

  function cubeFace(options) {
    //feature detect
    this.hasDeviceMotion = "ondevicemotion" in window;

    this.options = {
      threshold: 15, //default velocity threshold for shake to register
      timeout: 1000 //default interval between events
    };

    if (typeof options === "object") {
      for (var i in options) {
        if (options.hasOwnProperty(i)) {
          this.options[i] = options[i];
        }
      }
    }

    //use date to prevent multiple shakes firing
    this.lastTime = new Date();

    //accelerometer values
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;

    //create custom event
    if (typeof document.CustomEvent === "function") {
      this.event = new document.CustomEvent("cube-face", {
        bubbles: true,
        cancelable: true
      });
    } else if (typeof document.createEvent === "function") {
      this.event = document.createEvent("Event");
      this.event.initEvent("cube-face", true, true);
    } else {
      return false;
    }
  }

  //reset timer values
  cubeFace.prototype.reset = function() {
    this.lastTime = new Date();
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;
  };

  //start listening for devicemotion
  cubeFace.prototype.start = function() {
    this.reset();
    if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
      var button = document.createElement("button");
      button.innerHTML = "Allow Sensor Access";

      // 2. Append somewhere
      var body = document.getElementsByTagName("body")[0];
      body.appendChild(button);

      // 3. Add event handler
      button.addEventListener("click", function() {
        onClickIos();
      });

      function onClickIos() {
        if (this.hasDeviceMotion) {
          if (typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
              .then(response => {
                if (response == "granted") {
                  button.style.display = "none";
                  window.addEventListener("devicemotion", this, false);
                }
              })
              .catch(console.error);
          }
        }
      }
    } else {
      // handle regular non iOS 13+ devices
      window.addEventListener("devicemotion", this, false);
    }
  };

  //stop listening for devicemotion
  cubeFace.prototype.stop = function() {
    if (this.hasDeviceMotion) {
      window.removeEventListener("devicemotion", this, false);
    }
    this.reset();
  };

  //calculates if shake did occur
  cubeFace.prototype.devicemotion = function(e) {
    var current = e.accelerationIncludingGravity;
    var currentTime;
    var timeDifference;
    var deltaX = 0;
    var deltaY = 0;
    var deltaZ = 0;

    if (this.lastX === null && this.lastY === null && this.lastZ === null) {
      this.lastX = current.x;
      this.lastY = current.y;
      this.lastZ = current.z;
      return;
    }

    deltaX = Math.abs(this.lastX - current.x);
    deltaY = Math.abs(this.lastY - current.y);
    deltaZ = Math.abs(this.lastZ - current.z);

    if (
      (deltaX > this.options.threshold && deltaY > this.options.threshold) ||
      (deltaX > this.options.threshold && deltaZ > this.options.threshold) ||
      (deltaY > this.options.threshold && deltaZ > this.options.threshold)
    ) {
      //calculate time in milliseconds since last shake registered
      currentTime = new Date();
      timeDifference = currentTime.getTime() - this.lastTime.getTime();

      if (timeDifference > this.options.timeout) {
        window.dispatchEvent(this.event);
        this.lastTime = new Date();
      }
    }

    this.lastX = current.x;
    this.lastY = current.y;
    this.lastZ = current.z;
  };

  //event handler
  cubeFace.prototype.handleEvent = function(e) {
    if (typeof this[e.type] === "function") {
      return this[e.type](e);
    }
  };

  return cubeFace;
});
