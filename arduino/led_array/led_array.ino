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
  FastLED.setBrightness(255); //Number 0-255
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
    // read the incoming byte:
    Serial.print("Recieved serial Information: ");
    String incomingString = Serial.readString();
    Serial.println(incomingString);

    bool parsingCompleted = false;

    while(!parsingCompleted) {
      int delimiterIndex = incomingString.indexOf(",");
      int colorIndex;
      
      if (delimiterIndex < 0) {
        parsingCompleted = true;
        colorIndex = incomingString.substring(0).toInt();
      } else {
        colorIndex = incomingString.substring(0, delimiterIndex).toInt();
        incomingString = incomingString.substring(delimiterIndex + 1);
      }
      leds[ledIndex] = COLORS[colorIndex];

      ledIndex = ( ledIndex == 255 ) ? 0 : ledIndex + 1;
    }

    FastLED.show();
  }
  
  // put your main code here, to run repeatedly:
  // if (Serial.available() > 0) {
  //   // read the incoming byte:
  //   incomingByte = Serial.readString();

  //   if (incomingByte == "1") {
  //     Serial.write("Recieved Light on\n");
  //     digitalWrite(LED_BUILTIN, HIGH);
  //   } else {
  //     Serial.write("Recieved Light off\n");
  //     digitalWrite(LED_BUILTIN, LOW);
  //   }

    // // say what you got:
    // Serial.write("I received: ");
    
  // }
}

