// const Gpio = require('onoff').Gpio;
// const HuSensor = new Gpio(23, 'in'); //use GPIO pin 10 as output

// HuSensor.watch((err, value) => {
//   //Watch for humidity sensor sending value to GPIO, specify callback function
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(value, Date.now); // send the value and the date to user_product collection
// });


// /* function stopReadingHuSensor() {
//   HuSensor.unexport();
// } */


// process.on('SIGINT', function () {
//   HuSensor.unexport();
// });
// //const gpio = require('gpio')
/* const rpio = require('rpio');
rpio.open(23, rpio.INPUT);
 readInterval = setInterval(getPrValue, 1000);

 function getPrValue() {
   console.log('Value of photo resistance : ' + rpio.read(23));
 } */

 const five = require('johnny-five');
 var Raspi = require('raspi-io').RaspiIO;
  const board = new five.Board({
    io: new Raspi(),
  });
  board.on('ready', () => {
    console.log('Board ready');
    const soilSensor = new five.Sensor('23');
    soilSensor.on('data', () => {
      console.log(sensor.value);
    });
  });