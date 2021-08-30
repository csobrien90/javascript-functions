function seed() {
  return Array.from(arguments);
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some((c) => same(c, cell));
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  if (state.length === 0) {
    return {
      topRight: [0, 0],
      bottomLeft: [0, 0]
      }
  };

  let xs = state.map(([x, _]) => x);
  let ys = state.map(([_, y]) => y);
  
  return {
    topRight: [Math.max(...xs), Math.max(...ys)],
    bottomLeft: [Math.min(...xs), Math.min(...ys)]
  }
};

const printCells = (state) => {
  //use corners to figure out the array of visible cells
  let corners = corners(state);
  let arrToPrint = []
  for (let j = corners.topRight[1]; j >= corners.bottomLeft[1]; j--) {
    for (let i = corners.bottomLeft[0]; i <= corners.topRight[0]; i++) {
      arrToPrint.push([i, j]);
    }
  }
  
  //iterate through that array and use printCell to print correct square
  arrToPrint.map(cell => printCell(cell, state));
  
  //add space between same row items and \n before each new line
  let width = corners.topRight[0] - corners.bottomLeft[0] + 1;
  for (let i = 1; i < arrToPrint.length; i++) {
    if (i % width === 0) {
      arrToPrint[i] += '\n';
    } else {
      arrToPrint[i] += ' ';
    }
  }
  arrToPrint.join('');

  return arrToPrint;
};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;