#include "FastLED.h"

#define NUM_LEDS 256
#define DATA_PIN 3

CRGB leds[NUM_LEDS];

String incomingByte = "";

void setup() {
  // put your setup code here, to run once:
  delay(2000);
  Serial.begin(9600);
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(10); //Number 0-255
  FastLED.clear();
}

void loop() {
  leds[0] = CRGB::Black;
  leds[1] = CRGB::White;
  leds[2] = CRGB::Red;
  leds[3] = CRGB::Lime;
  leds[4] = CRGB::Blue;
  leds[5] = CRGB::Yellow;
  leds[6] = CRGB::Cyan;
  leds[7] = CRGB::Magenta;
  leds[8] = CRGB::Silver;
  leds[9] = CRGB::Gray;
  leds[10] = CRGB::Maroon;
  leds[11] = CRGB::Olive;
  leds[12] = CRGB::Green;
  leds[13] = CRGB::Purple;
  leds[14] = CRGB::Teal;
  leds[15] = CRGB::Navy;
  FastLED.show();
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

void parseCSVString(const char* input, char** array, int arraySize) {
    // Check if the input starts with '[' and ends with ']'
    if (input[0] != '[' || input[strlen(input)-1] != ']') {
        // Invalid format, return or handle error as needed
        return;
    }

    // Copy the content inside the square brackets (excluding the brackets)
    char content[strlen(input)];
    strncpy(content, input + 1, strlen(input) - 2);
    content[strlen(input) - 2] = '\0';  // Null-terminate the string

    // Initialize variables for parsing
    char* token;
    int index = 0;

    // Parse the content using strtok
    token = strtok(content, ",");
    while (token != NULL && index < arraySize) {
        // Remove leading and trailing spaces (if any)
        while (isspace((unsigned char)*token)) token++;
        int len = strlen(token);
        while (len && isspace((unsigned char)token[len - 1])) --len;
        token[len] = '\0';  // Null-terminate the trimmed token

        // Allocate memory for the token and copy it into the array
        array[index] = (char*) malloc(len + 1); // allocate memory for the string
        strcpy(array[index], token); // copy string
    }

    
}
