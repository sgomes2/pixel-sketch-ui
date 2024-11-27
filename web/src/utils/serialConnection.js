const { SerialPort } = require('serialport');

class SerialConnection {
    constructor(){
        this.isConnected = false;
        this.port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600});
        this.messageQueue = [];
        this.write = this.write.bind(this);
        this.started = false;
        this.start = this.start.bind(this);

        this.port.on('open', (err) => {
            if(err) {
                console.log("Open port is failed : ", err.message)
            } else {
                setTimeout(() => { 
                    this.isConnected = true;
                    console.log('port open');
                });
            }
        })
    }


    write(message) {
        this.messageQueue.push(message);
    }

    async writeToBoard() {
        while (this.started) {
            if (this.messageQueue.length > 0) {
                this.port.write(this.messageQueue.shift());
            }
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    start() {
        this.started = true;
    }

    stop() {
        this.started = false;
    }
}

export default SerialConnection;