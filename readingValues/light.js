'use strict';

var Gpio = require('onoff').Gpio,
  pr = new Gpio(24, 'in'),
  readInterval = setInterval(getPrValue, 1000);
pr.writeSync(0);
function getPrValue() {
  
  console.log('Value of photo resistance : ' + pr.readSync());
}

process.on('SIGINT', function () {
  clearInterval(readInterval);
  pr.unexport();
});
