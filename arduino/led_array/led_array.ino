String incomingByte = "";

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.readString();

    if (incomingByte == "1") {
      Serial.write("Recieved Light on\n");
      digitalWrite(LED_BUILTIN, HIGH);
    } else {
      Serial.write("Recieved Light off\n");
      digitalWrite(LED_BUILTIN, LOW);
    }

    // // say what you got:
    // Serial.write("I received: ");
    
  }
}
