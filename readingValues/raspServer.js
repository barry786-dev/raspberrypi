// const express = require('express');
// const app = express();
const RaspIo = require('socket.io-client');
const socket = RaspIo('http://dci-lap:5900/', {
  withCredentials: true,
});
socket.on('connect', () => {
    console.log('connected to localhost:5900');    
})
socket.on('raspEvent', (data) => {
  console.log('message from the server:', data);
  socket.emit('serverEventRasp', { value: 'light', date: Date.now() });
});
// const server = app.listen('5500',console.log('raspServer is running on port 5500'));