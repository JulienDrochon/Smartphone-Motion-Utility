var socket = io('http://localhost:9079/utility');

socket.on('sendDataToDashboard', insertText);
function insertText(data) {
  variableOrientation01 = data.data.value[0].toString();
  variableOrientation02 = data.data.value[1];
  variableOrientation03 = data.data.value[2];
}
let variableOrientation01 = '';
let variableOrientation02 = '';
let variableOrientation03 = '';
