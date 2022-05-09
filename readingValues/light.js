/* 'use strict';

const Gpio = require('onoff').Gpio;
const pr = new Gpio(23, 'in');
const readInterval = setInterval(getPrValue, 5000);
function getPrValue() {
  console.log('Value of photo resistance : ' + pr.readSync());
}

process.on('SIGINT', function () {
  pr.writeSync(0);
  clearInterval(readInterval);
  pr.unexport();
}); */
//NodeJS SPI Dump for MCP3008 - Created by Mikael Levén
//Original https://gist.github.com/mikaelleven/c3db08ae7837eb3c8698
var rpio = require('rpio');

rpio.spiBegin();
//rpio.spiChipSelect(0);                  /* Use CE0 (slave 0) */
//rpio.spiSetCSPolarity(0, rpio.LOW);    /* Commonly chip enable (CE) pins are active low, and this is the default. */
//rpio.spiSetClockDivider(256);           /* MCP3008 max is ~1MHz, 256 == 0.98MHz */
//rpio.spiSetDataMode(0);

process.stdout.write('\x1b[36m');
for (var channelHeader = 0; channelHeader <= 7; channelHeader++) {
    process.stdout.write('ch' + channelHeader.toString() + (channelHeader == 7 ? '\x1b[0m\n' : '\t'));
}

setInterval(function() {
    for (var channel = 0; channel <= 7; channel++) {
        // Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [placeholder = 0x01]
        var txBuffer = Buffer.from([0x01, (8 + channel << 4), 0x01]);
        var rxBuffer = Buffer.alloc(txBuffer.byteLength);

        var recieveBuffer = rpio.spiTransfer(
          txBuffer,
          rxBuffer,
          txBuffer.length
        ); // Send TX buffer and recieve RX buffer

        // Extract value from output buffer. Ignore first byte.
        var junk = rxBuffer[0],
            MSB = rxBuffer[1],
            LSB = rxBuffer[2];

        // Ignore first six bits of MSB, bit shift MSB 8 positions and
        // finally combine LSB and MSB to get a full 10 bit value
        var value = ((MSB & 3) << 8) + LSB;

        process.stdout.write(value.toString() + (channel == 7 ? '\n' : '\t'));
    };
}, 3000);


process.on('SIGTERM', function () {

    process.exit(0);
});

process.on('SIGINT', function () {
    process.exit(0);
});

// process.on('exit', function () {
//     console.log('\nShutting down, performing GPIO cleanup');
//     rpio.spiEnd();
//     process.exit(0);
// });

// var rpio = require('rpio');
// ch0 = 112;
// rpio.spiBegin();

// // Prepare TX buffer [trigger byte = 0x01] [channel 0 = 0x80 (128)] [dummy data = 0x01]
// var sendBuffer = new Buffer([0x01, (8 + 0) << 4, 0x01]);
// var rxBuffer = Buffer.alloc(sendBuffer.byteLength);

// // Send TX buffer to SPI MOSI and recieve RX buffer from MISO
// var recieveBuffer = rpio.spiTransfer(sendBuffer, rxBuffer, sendBuffer.length);

// // Extract value from output buffer. Ignore first byte (junk).
// var junk = rxBuffer[0],
//   MSB = rxBuffer[1],
//   LSB = rxBuffer[2];

// // Ignore first six bits of MSB, bit shift MSB 8 positions and
// // lastly combine LSB with MSB to get a full 10 bit value
// var value = ((MSB & 3) << 8) + LSB;

// console.log('ch' + ((sendBuffer[1] >> 4) - 8), '=', value);

/* const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(0, { speedHz: 20000 }, (err) => {
  if (err) throw err;

  setInterval((_) => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
}); */