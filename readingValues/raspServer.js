// const express = require('express');
// const app = express();
const RaspIo = require('socket.io-client');
const socket = RaspIo('http://dci-lap:5900/', {
  withCredentials: true,
});
socket.on('connect', () => {
  console.log('connected to localhost:5900');
});

const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pump = new Gpio(21, 'high'); //use GPIO pin 24, and specify that it is output
/* if (pump.readSync() === 0) {
  //check the pin state, if the state is 0 (or off)
  socket.emit('PumpStatus', { pump: false });
} else if (pump.readSync() === 1) {
  socket.emit('PumpStatus', { pump: true });
} */

socket.on('raspEvent', (data) => {
  console.log('message from the server:', data);
  socket.emit('serverEventRasp', { value: 'light', date: Date.now() });
});
socket.on('pumpEventServerToRasp', (data) => {
  console.log('message from the Pump:', data);
  if (data.pump === true) {
    pump.writeSync(0); // Turn Pump on
  } else if (data.pump === false) {
    pump.writeSync(1); // Turn Pump off
  }
});
// const server = app.listen('5500',console.log('raspServer is running on port 5500'));
