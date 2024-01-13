(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');

  console.log(lines);
})();
