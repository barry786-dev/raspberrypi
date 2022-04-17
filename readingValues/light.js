'use strict';

var Gpio = require('onoff').Gpio,
  pr = new Gpio(18, 'in'),
  readInterval = setInterval(getPrValue, 1000);

function getPrValue() {
  console.log('Value of photo resistance : ' + pr.readSync());
}

process.on('SIGINT', function () {
  clearInterval(readInterval);
  pr.unexport();
});
