'use strict';

const Gpio = require('onoff').Gpio;
const pr = new Gpio(25, 'in');
const readInterval = setInterval(getPrValue, 1000);
function getPrValue() {
  console.log('Value of photo resistance : ' + pr.readSync());
}

process.on('SIGINT', function () {
  pr.writeSync(0);
  clearInterval(readInterval);
  pr.unexport();
});
