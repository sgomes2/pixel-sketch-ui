#include "FastLED.h"

#define NUM_LEDS 256
#define DATA_PIN 3

CRGB leds[NUM_LEDS];
CRGB COLORS[16];
int ledIndex = 0;

void setup() {
  // put your setup code here, to run once:
  delay(2000);
  Serial.begin(115200);
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(1); //Number 0-255
  FastLED.clear();
  pinMode(LED_BUILTIN, OUTPUT);

  COLORS[0] = CRGB::Black;
  COLORS[1] = CRGB::White;
  COLORS[2] = CRGB::Red;
  COLORS[3] = CRGB::Lime;
  COLORS[4] = CRGB::Blue;
  COLORS[5] = CRGB::Yellow;
  COLORS[6] = CRGB::Cyan;
  COLORS[7] = CRGB::Magenta;
  COLORS[8] = CRGB::Silver;
  COLORS[9] = CRGB::Gray;
  COLORS[10] = CRGB::Maroon;
  COLORS[11] = CRGB::Olive;
  COLORS[12] = CRGB::Green;
  COLORS[13] = CRGB::Purple;
  COLORS[14] = CRGB::Teal;
  COLORS[15] = CRGB::Navy;
}

void loop() {
  if (Serial.available() > 0) {
  parseLedColor();
  }
}

void parseLedColor() {
  int incomingByte = getNextByte();
  bool parseSuccesful = true;

  if ((char)incomingByte == '[') {
    int ledIndex = getNextByte() - 48;
    if (ledIndex < 0 || ledIndex > 255) {
      // Serial.println("Failed to Parse LED Index");
      // Serial.print("Recived LED Index: ");
      // Serial.println(ledIndex);
      parseSuccesful = false;
    }

    int delimiter = getNextByte();
    if ((char)delimiter != ':'){
      // Serial.println("Failed to Parse Delimiter");
      // Serial.print("Recived Delimiter: ");
      // Serial.println(delimiter);
      parseSuccesful = false;
    }

    int colorIndex = getNextByte() - 48;
    if (colorIndex < 0 || colorIndex > 15){
    //  Serial.println("Failed to Parse Color Index");
    //  Serial.print("Recived Color Index: ");
    //  Serial.println(colorIndex);
     parseSuccesful = false;
    }

    if (!parseSuccesful) {
      Serial.println("Failed to Parse Led Color");
      return;
    }

    leds[ledIndex] = COLORS[colorIndex];
    FastLED.show();
  }
}

int getNextByte() {
  int nextByte = -1;
  while (nextByte < 0){
    nextByte = Serial.read();
  }
  return nextByte;
}


