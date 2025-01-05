const net = require('net');

class PersistentSocket {
    constructor(host, port, reconnectInterval = 1000) {
        this.host = host;
        this.port = port;
        this.reconnectInterval = reconnectInterval;
        this.socket = null;
        this.reconnectTimeout = null;
        this.disconnectedCallback = null;
        this.connectedCallback = null;
    }

    connect() {
        this.socket = new net.Socket();
        this.socket.setKeepAlive(true, 3000);

        this.socket.connect(this.port, this.host, () => {
            console.log(`Connected to ${this.host}:${this.port}`);
            this.connectedCallback();
            clearTimeout(this.reconnectTimeout);
            this.reconnectInterval = 1000; // Reset interval on successful connection
        });

        this.socket.on('close', (hadError) => {
            this.disconnectedCallback();
            this.reconnect();
        });

        this.socket.on('error', (err) => {
            console.error(`Socket error: ${err.message}`);
            this.disconnectedCallback();
            this.reconnect();
        });
    }

    reconnect() {
        if (this.reconnectTimeout) {
            return; // Prevent multiple reconnect attempts
        }
        this.reconnectTimeout = setTimeout(() => {
            console.log(`Attempting to reconnect in ${this.reconnectInterval / 1000} seconds`);
            this.connect();
            this.reconnectInterval = Math.min(this.reconnectInterval * 2, 60000); // Exponential backoff, max 60s
            this.reconnectTimeout = null;
        }, this.reconnectInterval);
    }

    write(data) {
        if (this.socket && this.socket.writable) {
            this.socket.write(data);
        } else {
            console.log("Socket not connected, cannot send data");
            this.disconnectedCallback();
            this.reconnect(); // Attempt reconnect if socket is not writable
        }
    }

    destroy() {
        clearTimeout(this.reconnectTimeout);
        if (this.socket) {
            this.socket.destroy();
        }
        this.socket = null;
    }
}

// // Usage example:
// const persistentSocket = new PersistentSocket('127.0.0.1', 3000);

// // Send data after connection or when the socket is reconnected
// function sendDataPeriodically() {
//     if (persistentSocket.socket && persistentSocket.socket.writable) {
//         persistentSocket.write('Hello from client\n');
//     }
//     setTimeout(sendDataPeriodically, 5000); // Send every 5 seconds
// }

// setTimeout(sendDataPeriodically, 2000); // Start sending data after 2 seconds

module.exports = {
    PersistentSocket
}
