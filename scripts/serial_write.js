const { SerialPort } = require('serialport');
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200});

const testImage = [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,5,2,2,2,2,2,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]

const sleep = ms => new Promise(r => setTimeout(r, ms));

port.on('open', (err) => {
    if(err) {
        console.log("Open port is failed : ", err.message)
    }
    console.log('port open')

    setTimeout(drawImage, 5000);
})

const drawImage = () => {
    testImage.forEach(async (value, index) => {
        setTimeout(() => {
            console.log(`sending: ${index} ${value} in ${1200 * index} ms`);
            port.write(`${index} ${value}`)
        }, 1200 * index);
    })
}



// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
});
