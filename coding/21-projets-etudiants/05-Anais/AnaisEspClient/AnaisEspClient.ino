#include "BluetoothSerial.h"

BluetoothSerial SerialBT;

const int pushButton = 4;
const int ledPin = 2;

int buttonState;
int lastButtonState = LOW;
bool connectFlag = false;
int ledState = LOW;
unsigned long previousMillis = 0;
const long interval = 1000;
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 100;    // the debounce time; increase if the output flickers

String MACadd = "24:6F:28:96:3F:DA";
uint8_t address[6]  = {0x24, 0x6F, 0x28, 0x96, 0x3F, 0xDA};
//uint8_t address[6]  = {0x00, 0x1D, 0xA5, 0x02, 0xC3, 0x22};
String name = "ANAIS";
char *pin = "1234"; //<- standard pin would be provided by default
bool connected;

void setup() {
  Serial.begin(115200);
  pinMode(pushButton, INPUT);
  pinMode(ledPin, OUTPUT);
  //SerialBT.setPin(pin);
  SerialBT.begin("JASON", true);
  //SerialBT.setPin(pin);
  Serial.println("The device started in master mode, make sure remote BT device is on!");

  // connect(address) is fast (upto 10 secs max), connect(name) is slow (upto 30 secs max) as it needs
  // to resolve name to address first, but it allows to connect to different devices with the same name.
  // Set CoreDebugLevel to Info to view devices bluetooth address and device names
  //connected = SerialBT.connect(name);

  digitalWrite(ledPin, HIGH);
  connected = SerialBT.connect(address);

  if (connected) {
    Serial.println("Connected Succesfully!");
  } else {
    connectFlag = false;
    while (!SerialBT.connected(10000)) {
      Serial.println("Failed to connect. Make sure remote device is available and in range, then restart app.");
    }
  }
  // disconnect() may take upto 10 secs max
  if (SerialBT.disconnect()) {
    connectFlag = true;
    Serial.println("Disconnected Succesfully!");
  }
  else {
    connectFlag = false;
  }
  // this would reconnect to the name(will use address, if resolved) or address used with connect(name/address).
  SerialBT.connect();
  digitalWrite(ledPin, LOW);
}

void loop() {
  if (connectFlag == true)
  {
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval) {
      // save the last time you blinked the LED
      previousMillis = currentMillis;

      // if the LED is off turn it on and vice-versa:
      if (ledState == LOW) {
        ledState = HIGH;
      } else {
        ledState = LOW;
      }

      // set the LED with the ledState of the variable:
      digitalWrite(ledPin, ledState);
    }
  }
  int reading = digitalRead(pushButton);
  if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) buttonState = reading;
  }
  if (buttonState == 1) SerialBT.print("1");
  if (buttonState == 0) SerialBT.print("0");
  
  if (Serial.available()) {
    SerialBT.write(Serial.read());
  }
  if (SerialBT.available()) {
    Serial.write(SerialBT.read());
  }
  lastButtonState = reading;
  delay(20);
}
