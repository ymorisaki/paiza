(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');

  const numberList = lines[0].split('').map((n) => Number(n));
  const mapList = [];
  let resultTmp = ['', '', ''];
  let result = '';
  let count = 0;

  numberList.forEach((number, index) => {
    let tmp = '';

    for (let i = 0; i < 9; i++) {
      if (number <= i) {
        tmp += '.';
      } else {
        tmp += '#';
      }
    }
    mapList.push(tmp);
  });

  mapList.forEach((map) => {
    const maps = map.split('');
    maps.forEach((m, i) => {
      if (i < 3) {
        resultTmp[0] += m;
      } else if (i < 6) {
        resultTmp[1] += m;
      } else {
        resultTmp[2] += m;
      }
    });

    count++;

    if (count === 3) {
      result += `\n${resultTmp.join('\n')}`;
      count = 0;
      resultTmp = ['', '', ''];
    }
  });
  console.log(result.replace('\n'));
})();
