const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const pump = new Gpio(21, 'high'); //use GPIO pin 24, and specify that it is output
const pumpStartInterval = setInterval(() => {
  if (pump.readSync() === 1) {
    console.log('value1:', pump.readSync());
    //check the pin state, if the state is 0 (or off)
    pump.writeSync(0); // Turn Pump on
  } else {
    console.log('value0:', pump.readSync());
    pump.writeSync(1); // Turn Pump off
  }
}, 5000); // here we will pass the time which chose by the user in user_product sittings schema */

const stopPump = () => {
  clearInterval(pumpStartInterval); // Stop pump intervals
  pump.writeSync(1); // Turn Pump off
  pump.unexport();
};
process.on('SIGINT', function () {
  clearInterval(pumpStartInterval);
  pump.writeSync(1); // Turn Pump off
  pump.unexport();
});
setTimeout(() => {
  stopPump();
}, 7000);

//pump.writeSync(1); 
//console.log('read' + pump.readSync());

/* function motor_on(gpio) {
  gpio.writeSync(1);
}

function motor_off(gpio) {
  gpio.writeSync(0);
}

motor_on(relay);
setTimeout(function () {
  motor_off(relay);
  setTimeout(function () {
    relay.unexport();
  }, 2000);
}, 2000); */

 /* console.log(
   'Program started. Relay should be off. Relay will turn on in 5 seconds.'
 );

 setTimeout(() => {
   pump.writeSync(0);
   console.log('Relay should be on. Relay will turn off in 2 seconds.');

   setTimeout(() => {
     pump.writeSync(1);
     console.log('Relay should be off. ');
   }, 2000);
 }, 5000); */


//const Gpio = require('onoff').Gpio; // Gpio class
//const led = new Gpio(21, 'out'); // Export GPIO17 as an output
// Toggle the state of the LED connected to GPIO17 every 200ms
//led.writeSync(1); 
//console.log('read' + led.readSync());
//const iv = setInterval((_) => led.writeSync(led.readSync() ^ 1), 100);

// Stop blinking the LED after 5 seconds
/* setTimeout((_) => {
  clearInterval(iv); // Stop blinking
  led.writeSync(0); // Turn LED off
  led.unexport(); // Unexport GPIO and free resources
}, 5000);*/