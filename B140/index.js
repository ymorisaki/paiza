(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');

  const rat = Number(lines[1].split(' ')[0]);
  const trap = Number(lines[1].split(' ')[1]);
  const numbers = [];
  const list = {};
  let result = 0;

  lines.splice(0, 2);
  lines.pop();

  lines.forEach((m) => {
    if (!list[m] && list[m] !== 0) {
      list[m] = 1;
    } else {
      list[m] = list[m] + 1;
    }
  });

  for (let property in list) {
    numbers.push(list[property]);
  }

  numbers.sort((a, b) => b - a);

  const len = numbers.length < trap ? numbers.length : trap;

  for (let i = 0; i < len; i++) {
    result += numbers[i];
  }

  console.log(list, result);
})();
