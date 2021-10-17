var socket = io('http://localhost:9079/utility');

var variableOrientation01 = '';
var variableOrientation02 = '';
var variableOrientation03 = '';

socket.on('sendDataToDashboard', insertText);
function insertText(data) {
  variableOrientation01 = data.data.value[0];
  variableOrientation02 = data.data.value[1];
  variableOrientation03 = data.data.value[2];
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
