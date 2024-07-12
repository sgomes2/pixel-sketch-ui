const { SerialPort } = require('serialport');
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 115200});

const testImage = [7,3,5,5,5,5,5,4,4,5,5,5,5,5,3,7,1,7,3,5,5,5,5,4,4,5,5,5,5,3,7,1,4,1,7,3,5,5,5,4,4,5,5,5,3,7,1,4,5,4,1,7,3,2,2,4,4,2,2,3,7,1,4,5,5,5,4,1,7,3,2,4,4,2,3,7,1,4,5,5,5,5,13,4,1,7,3,4,4,3,7,1,4,13,5,5,5,5,13,13,4,1,7,3,3,7,1,4,13,13,5,5,2,2,2,2,2,4,1,7,7,1,4,2,2,2,2,2,2,2,2,2,2,4,1,7,7,1,4,2,2,2,2,2,5,5,13,13,4,1,7,3,3,7,1,4,13,13,5,5,5,5,13,4,1,7,3,4,4,3,7,1,4,13,5,5,5,5,4,1,7,3,2,4,4,2,3,7,1,4,5,5,5,4,1,7,3,2,2,4,4,2,2,3,7,1,4,5,4,1,7,3,5,5,5,4,4,5,5,5,3,7,1,4,1,7,3,5,5,5,5,4,4,5,5,5,5,3,7,1,7,3,5,5,5,5,5,4,4,5,5,5,5,5,3,7]

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
