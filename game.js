const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TicTacToe = [' >1', ' >2', ' >3', ' >4', ' >5', ' >6', ' >7', ' >8', ' >9'];

function isXWin(arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] ===' X ') return true;
  if (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] ===' X ') return true;
  if (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] ===' X ') return true;
  if (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] ===' X ') return true;
  if (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] ===' X ') return true;
  if (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] ===' X ') return true;
  if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] ===' X ') return true;
  if (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] ===' X ') return true;

  return false;
}

function is0Win(arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] ===' 0 ') return true;
  if (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] ===' 0 ') return true;
  if (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] ===' 0 ') return true;
  if (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] ===' 0 ') return true;
  if (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] ===' 0 ') return true;
  if (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] ===' 0 ') return true;
  if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] ===' 0 ') return true;
  if (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] ===' 0 ') return true;
  
  return false;
}

function isTie(arr) {
  let counter = 0;

  for (const item of arr) {
    if (item === ' X ' || item === ' 0 ') {
      counter++;
    }
  }

  return counter;
}

function isNumber(value) {
  if (isNaN(value) && value.toLowerCase() !== 'x' && value.toLowerCase() !== 'r') return true;
  
  return false;
}

function isValidRangeOfCell(value) {
  if (value < 1 || value > 9) return true;
  
  return false;
}

function isCellOccupied(value) {
  if (TicTacToe[value - 1] === ' X ' || TicTacToe[value - 1] === ' 0 ') return true;
  
  return false;
}

function whoseTurn(boolean) {
  if (boolean) return `X`;
  
  return `0`;
}

console.log(`Let's play a game of Tic-Tac-Toe!
Enter a cell number (without '>') to make a move!
X starts first
| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |
| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |
| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`);

rl.prompt();

let isXMove = true;

rl.on('line', input => {
  if (input.toLowerCase() === 'r') {
    TicTacToe.splice(0, TicTacToe.length, ' >1', ' >2', ' >3', ' >4', ' >5', ' >6', ' >7', ' >8', ' >9');
    isXMove = true;
    console.log(`The game has been restarted!`);
    console.log(`X starts first`);
    console.log(`| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |`);
    console.log(`| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |`);
    console.log(`| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`);

    return rl.prompt();
  }

  if (isCellOccupied(input)) {
    console.log(`Cannot make a move. The cell is already occupied`);
    console.log(`Try again:`);
    console.log(`| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |`);
    console.log(`| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |`);
    console.log(`| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`);
    console.log(`Next move is ${whoseTurn(isXMove)}`);

    return rl.prompt();
  }

  if (isNumber(input)) {
    console.log(`Enter a valid cell number`);
    console.log(`Try again:`);
    console.log(`| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |`);
    console.log(`| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |`);
    console.log(`| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`);
    console.log(`Next move is ${whoseTurn(isXMove)}`);

    return rl.prompt();
  }

  if (isValidRangeOfCell(input)) {
    console.log(`Cannot occupy a non-existing cell`);
    console.log(`Try again:`);
    console.log(`| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |`);
    console.log(`| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |`);
    console.log(`| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`);
    console.log(`Next move is ${whoseTurn(isXMove)}`);

    return rl.prompt();
  }
  
  if (isXMove) {
    TicTacToe[input - 1] = ' X ';
  } else {
    TicTacToe[input - 1] = ' 0 ';
  }
  isXMove = !isXMove;

  const game = `| ${TicTacToe[0]} | ${TicTacToe[1]} | ${TicTacToe[2]} |
| ${TicTacToe[3]} | ${TicTacToe[4]} | ${TicTacToe[5]} |
| ${TicTacToe[6]} | ${TicTacToe[7]} | ${TicTacToe[8]} |`;
    
  if (input.toLowerCase() === 'x') {
    rl.close();
    return;
  }

  console.log(game);
  rl.prompt();

  if (isTie(TicTacToe) === TicTacToe.length && !isXWin(TicTacToe) && !is0Win(TicTacToe)) {
    console.log(`It's a tie! Hit R to restart`);
    return rl.prompt();
  } 

  if (isXWin(TicTacToe)) {
    console.log('X won! Hit R to restart the game');
    return rl.prompt();
  }

  if (is0Win(TicTacToe)) {
    console.log('0 won! Hit R to restart the game');
    return rl.prompt();
  }
});

rl.on('close', () => {
  console.log('You quitted the game');
  process.exit(0);
});



