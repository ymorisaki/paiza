(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');
  const [size, comp] = lines[0].split(' ').map((n) => Number(n));
  const imageMap = lines
    .filter((_l, i) => i !== 0)
    .map((m) => m.split(' ').map((n) => Number(n)));
  const compImageMap = (() => {
    const ary = [];
    let yc = 0;
    let xc = 0;
    for (let i = 0; i < size / comp; i++) {
      ary[i] = [];
    }
    for (let x = 0; x < (size / comp) * (size / comp); x++) {
      ary[yc][xc] = [];
      xc++;
      if (Number.isInteger((x + 1) / (size / comp))) {
        xc = 0;
        yc++;
      }
    }
    return ary;
  })();
  let xCurrent = 0;
  let yCurrent = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      compImageMap[yCurrent][xCurrent].push(imageMap[y][x]);
      if (Number.isInteger((x + 1) / comp)) {
        xCurrent++;
      }
    }
    xCurrent = 0;

    if (Number.isInteger((y + 1) / comp)) {
      yCurrent++;
    }
  }

  const resultArray = compImageMap
    .flat()
    .map((m) => {
      return m.reduce((prev, next, i) => {
        return prev + next;
      });
    })
    .map((n) => Math.trunc(n / (comp * comp)));

  let result = '';

  resultArray.forEach((n, i) => {
    if (Number.isInteger((i + 1) / (size / comp))) {
      result += `${n}\n`;
    } else {
      result += `${n} `;
    }
  });

  console.log(result);
})();
