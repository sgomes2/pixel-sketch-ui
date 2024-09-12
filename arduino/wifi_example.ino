#include "WiFi.h"
 
const char* ssid = "Verizon_B3FQWG";
const char* password =  "few6-burrow-pet";
IPAddress ip(192, 168, 1, 161);
WiFiServer server(80);
 
void setup() {
 
  Serial.begin(9600);
 
  WiFi.config(ip);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(3000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
  ip = WiFi.localIP();
  server.begin();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  // listen for incoming clients
  WiFiClient client = server.available();
  if (client) {
    while (client.connected()) {

      while (client.available() > 0) {
        String received = client.readString();
        Serial.println(received);
      }

      delay(10);
    }

    client.stop();
    Serial.println("Client disconnected");

  }
}