const { SerialPort } = require('serialport');
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600});

port.on('open', (err) => {
    if(err) {
        console.log("Open port is failed : ", err.message)
    }
    console.log('port open')

    setTimeout(()=>{port.write('1')}, 3000);

    setTimeout(()=>{port.write('0')}, 5000);

    setTimeout(()=>{port.write('1')}, 7000);

    setTimeout(()=>{port.write('0')}, 9000);
})



// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
});
