const RaspIo = require('socket.io-client');
const socket = RaspIo('https://mygadeden.herokuapp.com/', {
  withCredentials: true,
});
socket.on('connect', () => {
  console.log('connected to https://mygadeden.herokuapp.com/');
});

const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pump = new Gpio(21, 'high'); //use GPIO pin 21, and specify that it is output
const light = new Gpio(18, 'in'); //use GPIO pin 18, and specify that it is in
const SoilHumidity = new Gpio(23, 'in'); //use GPIO pin 23, and specify that it is in
const serialNumber = 'AB004S100002';
const deviceUniqueCode = '123!qweR'; // do not forget to beycrept it later
/* if (pump.readSync() === 0) {
  //check the pin state, if the state is 0 (or off)
  socket.emit('PumpStatus', { pump: false });
} else if (pump.readSync() === 1) {
  socket.emit('PumpStatus', { pump: true });
} */

socket.on('raspEvent', (data) => {
  // listen to message from server (liveChart action)
  console.log('message from the server:', data);
  socket.emit('serverEventRasp', { value: 'light', date: Date.now() }); //send message to server (liveChart action)
});
socket.on('pumpEventServerToRasp', (data) => {
  // listen to message from server (pump action / userControllers)
  console.log('message from the Pump:', data);
  if (data.pump === true) {
    pump.writeSync(0); // Turn Pump on
  } else if (data.pump === false) {
    pump.writeSync(1); // Turn Pump off
  }
});

setInterval(() => {
  pumpState = pump.readSync();
  if (pumpState === 0) {
    pumpState = 1;
  } else if (pumpState === 1) {
    pumpState = 0;
  }
  lightState = light.readSync();
  SoilHumidityState = SoilHumidity.readSync();
  socket.emit('raspSensorsValues', [
    serialNumber,
    { light: lightState, date: Date.now() },
    { SoilHumidity: SoilHumidityState, date: Date.now() },
    { pump: pumpState, date: Date.now() },
    deviceUniqueCode,
  ]);
  console.log(pumpState + ' ' + lightState + ' ' + SoilHumidityState);
}, 6 * 60 * 60 * 1000); // check the sensors and snd values each six hours
