const fetch = require('node-fetch');
/* async function test() {
console.log('Hello');
  const myString = 'Hello from Raspbery';
  const response = await fetch('http://dci-lap:5900/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({rasp : myString}),
  })
  const answer = await response.json();
  console.log(answer);
} */
function test() {
  const serialNumber = 'AB004S100001'; // do not forget to beycrept it later
  let LightValue = 0;
  const LightInt = setInterval(() => {
    if (LightValue === 0) {
      LightValue = 1;
    } else {
      LightValue = 0;
    }
  }, 1000);
  let SoilHumidityValue = 0;
  const SoilInt = setInterval(() => {
    SoilHumidityValue = Math.floor(Math.random() * 100);
  }, 1000);
  let pumpValue = 0;
  const PumpIn = setInterval(() => {
    if (pumpValue === 0) {
      pumpValue = 1;
    } else {
      pumpValue = 0;
    }
  }, 1000);
  const myInterval = setInterval(() => {
    console.log('Hello');
    fetch('http://dci-lap:5900/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([serialNumber,
        { light: LightValue, date: Date.now() },
        { SoilHumidity: SoilHumidityValue, date: Date.now() },
        { pump: pumpValue, date: Date.now() },
      ]),
    }).then((res) => {
      res.json().then((answer) => {
        console.log(answer);
      });
    });
  }, 2500);
  setTimeout(() => {
    clearInterval(myInterval);
    clearInterval(LightInt);
    clearInterval(SoilInt);
    clearInterval(PumpIn);
  }, 6 * 2500);
}
test();
