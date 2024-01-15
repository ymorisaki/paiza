(async () => {
  const fs = require('fs/promises');
  const buffer = await fs.readFile('./input.txt');
  const lines = buffer.toString().split('\n');

  const turn = (block) => {
    const newBlock = [[], [], []];

    block.forEach((line) => {
      line.forEach((parts, j) => {
        if (j === 2) {
          newBlock[0].push(parts);
        }
        if (j === 1) {
          newBlock[1].push(parts);
        }
        if (j === 0) {
          newBlock[2].push(parts);
        }
      });
    });
    return newBlock;
  };

  let height = Number(lines[0].split(' ')[0] - 1);
  let width = Number(lines[0].split(' ')[1] - 1);
  const block1 = lines.splice(-3, 3).map((line) => line.split(''));
  const block2 = turn(block1);
  const block3 = turn(block2);
  const block4 = turn(block3);
  const map = lines.map((line) => line.split(''));
  const patterns = [];
  let total = 0;
  map.splice(0, 1);

  if (height < 2) {
    const tmp = [];
    for (let i = 0; i < width + 1; i++) {
      tmp.push('○');
    }
    map.push(tmp);
    map.unshift(tmp);
    height += 2;
  }

  if (width < 2) {
    for (let i = 0; i < map.length; i++) {
      map[i].push('○');
      map[i].unshift('○');
    }
    width += 2;
  }

  map.forEach((x, xIndex) => {
    if (xIndex !== 0 && xIndex !== height) {
      x.forEach((y, yIndex) => {
        const line1 = [];
        const line2 = [];
        const line3 = [];
        const parts = [];

        if (yIndex !== 0 && yIndex !== width) {
          line1.push(map[xIndex - 1][yIndex - 1]);
          line1.push(map[xIndex - 1][yIndex]);
          line1.push(map[xIndex - 1][yIndex + 1]);
          line2.push(map[xIndex][yIndex - 1]);
          line2.push(map[xIndex][yIndex]);
          line2.push(map[xIndex][yIndex + 1]);
          line3.push(map[xIndex + 1][yIndex - 1]);
          line3.push(map[xIndex + 1][yIndex]);
          line3.push(map[xIndex + 1][yIndex + 1]);
          parts.push(line1);
          parts.push(line2);
          parts.push(line3);
          patterns.push(parts);
        }
      });
    }
  });

  patterns.forEach((pattern, hoge) => {
    let result = 4;
    if (hoge === 0) {
      pattern.forEach((line, i) => {
        line.forEach((floor, j) => {
          if (
            (floor === '#' && block1[i][j] === '#') ||
            (floor === '○' && block1[i][j] === '#')
          ) {
            result--;
          }
          if (
            (floor === '#' && block2[i][j] === '#') ||
            (floor === '○' && block2[i][j] === '#')
          ) {
            result--;
          }
          if (
            (floor === '#' && block3[i][j] === '#') ||
            (floor === '○' && block3[i][j] === '#')
          ) {
            result--;
          }
          if (
            (floor === '#' && block4[i][j] === '#') ||
            (floor === '○' && block4[i][j] === '#')
          ) {
            result--;
          }
        });
      });
      if (result) {
        total++;
      }
    }
  });

  if (total) {
    console.log('Yes');
  } else {
    console.log('No');
  }
})();
