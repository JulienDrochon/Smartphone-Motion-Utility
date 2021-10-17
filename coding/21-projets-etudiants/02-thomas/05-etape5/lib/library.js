var socket = io("http://localhost:9079/utility");

var variableOrientation01 = "";
var variableOrientation02 = "";
var variableOrientation03 = "";
var variableOrientation04 = "";
var variableOrientation05 = "";
var variableOrientation06 = "";
var variableOrientation07 = "";
var variableOrientation08 = "";
var variableOrientation09 = "";
var variableOrientation10 = "";

socket.on("sendDataToDashboard", insertText);
function insertText(data) {
  console.log(data.data.value[0]);
  // variableOrientation01 = data.orientation.value[0];
  // variableOrientation02 = data.orientation.value[1];
  // variableOrientation03 = data.orientation.value[2];
  // variableOrientation04 = data.orientation.value[3];
  // variableOrientation05 = data.orientation.value[4];
  // variableOrientation06 = data.orientation.value[5];
  // variableOrientation07 = data.orientation.value[6];
  // variableOrientation08 = data.orientation.value[7];
  // variableOrientation09 = data.orientation.value[8];
  // variableOrientation10 = data.orientation.value[9]; //shake
}

// -------------------------- Functions Library -------------------------- //
// --- Map
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

// --- Timer
function timer() {}

// --- Clockwise sense
function clockwise() {}
