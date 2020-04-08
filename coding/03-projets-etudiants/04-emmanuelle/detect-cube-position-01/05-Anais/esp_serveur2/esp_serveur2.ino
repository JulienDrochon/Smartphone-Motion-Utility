
#include "BluetoothSerial.h"

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif
BluetoothSerial SerialBT;

#define LED_PIN            5

void setup() {

  pinMode(LED_PIN, OUTPUT);
  //Serial.begin(115200);
  SerialBT.begin("ESP32test"); //Bluetooth device name
  //Serial.println("The device started, now you can pair it with bluetooth!");
}

void loop() {
  if (SerialBT.available())
  {
    //Serial.println("received data!");
    int myByte = SerialBT.read();
    //Serial.println(myByte);
    //48 et 49 par ce que ascii 1 et 0
    if (myByte == 49) digitalWrite(LED_PIN, HIGH);
    else if (myByte == 48) digitalWrite(LED_PIN, LOW);
    //Serial.write(SerialBT.read());
  }
  delay(10);
}
