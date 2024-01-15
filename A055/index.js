(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');

  const [height, width] = lines[0].split(' ').map((n) => Number(n));
  const map = lines.filter((_l, i) => i !== 0).map((m) => m.split(''));
  const current = (() => {
    const obj = {};
    map.forEach((line, y) => {
      line.forEach((m, x) => {
        if (m === 'S') {
          obj.x = x;
          obj.y = y;
        }
      });
    });
    return obj;
  })();
  let result = 'NO';

  const run = (c, m) => {
    if (c.x === 0 || c.x + 1 === width || c.y === 0 || c.y + 1 === height) {
      result = 'YES';
      return;
    }

    const newMap = m;
    const top = m[c.y - 1][c.x] === '.';
    const right = m[c.y][c.x + 1] === '.';
    const bottom = m[c.y + 1][c.x] === '.';
    const left = m[c.y][c.x - 1] === '.';

    newMap[c.y][c.x] = '#';

    if (top) {
      run({ x: c.x, y: c.y - 1 }, newMap);
    }
    if (right) {
      run({ x: c.x + 1, y: c.y }, newMap);
    }
    if (bottom) {
      run({ x: c.x, y: c.y + 1 }, newMap);
    }
    if (left) {
      run({ x: c.x - 1, y: c.y }, newMap);
    }
  };

  run(current, map);

  console.log(result);
})();
