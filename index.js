const readline = require('readline');

function ticTacToe() {
  const board = [null, null, null, null, null, null, null, null, null];

  const currentPlayer = {
    nextMove: 'X',
  };

  const isValidRangeOfCell = (value) => {
    return value < 0 || value >= board.length;
  };

  const isCellOccupied = (value) => {
    return board[value] !== null && board[value];
  };

  function move(value) {
    if (isValidRangeOfCell(value)) throw new Error('Cannot occupy a non-existing cell');

    if (isCellOccupied(value)) throw new Error('Cannot make a move. The cell is already occupied');
    
    board[value] = currentPlayer.nextMove;

    if (currentPlayer.nextMove === 'X') {
      currentPlayer.nextMove = '0';
      return;
    }
    currentPlayer.nextMove = 'X';
  }

  const restart = () => {
    currentPlayer.nextMove = 'X';
    return board.splice(0, board.length, null, null, null, null, null, null, null, null, null);
  };

  const isWin = () => {
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];

      if (board[a] === board[b] && board[b] === board[c] && board[c] === '0') return true;
      
      if (board[a] === board[b] && board[b] === board[c] && board[c] === 'X') return true;
    }

    return false;
  };

  const isTie = () => {
    return !board.includes(null);
  };

  return { move, restart, isWin, isTie, board, currentPlayer };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { move, restart, isWin, isTie, board, currentPlayer } = ticTacToe();

const printField = () => {
  let result = ``;
  const copyIndex = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      copyIndex.push(`>${i + 1}`);
      continue; 
    } 
    copyIndex.push(`${board[i]} `);
  }

  for (let i = 0; i < copyIndex.length; i++) {
    if (i === 0) {
      result += `|  ${copyIndex[i]} `;
      continue;
    }
    if (i === (copyIndex.length - 1)) {
      result += `|  ${copyIndex[i]} |`;
      continue;
    }
    if ((i + 1) % 3 === 0) {
      result += `|  ${copyIndex[i]} |\n`;
      continue;
    }
    
    result += `|  ${copyIndex[i]} `;
  }

  return result;
};

const isValidValue = (value) => {
  return isNaN(Number(value));
};

console.log(`Let's play a game of Tic-Tac-Toe!
Enter a cell number (without '>') to make a move!
X starts first`);
console.log(printField());

rl.prompt();

rl.on('line', input => {
  if (input.toLowerCase() === 'q') {
    rl.close();

    return;
  }

  if (input.toLowerCase() === 'r') {
    restart();
    console.log(`The game has been restarted!`);
    console.log(`X starts first`);
    console.log(printField());
    rl.prompt();

    return; 
  }

  if (isValidValue(input)) {
    console.log(`Enter a valid cell number`);
    console.log(`Try again:`);
    console.log(printField());
    console.log(`Next move is ${currentPlayer.nextMove}`);
    rl.prompt();

    return; 
  }
  
  const endGame = isWin() || isTie();

  if (endGame && input !== 'r' && input !== 'q') {
    console.log('The game is finished. Hit R to restart or Q to quit');
    rl.prompt();

    return;
  }

  if (input === '') {
    console.log(`Next move is ${currentPlayer.nextMove}`);
    rl.prompt();

    return; 
  }

  const index = input - 1;

  try {
    move(index);
  } catch(err) {
    console.log(`${err.message}`);
    console.log(`Try again:`);
    console.log(printField());
    console.log(`Next move is ${currentPlayer.nextMove}`);

    rl.prompt();
    return; 
  }

  console.log(printField());
    
  if (isWin()) {
    if (currentPlayer.nextMove === 'X') {
      console.log(`0 won! Hit R to restart the game`);
      rl.prompt();

      return;
    }
    console.log(`X won! Hit R to restart the game`);
    rl.prompt();

    return; 
  }

  if (isTie()) {
    console.log(`It's a tie! Hit R to restart`);
    rl.prompt();

    return;
  }

  console.log(`Next move is ${currentPlayer.nextMove}`);

  rl.prompt();
});

rl.on('close', () => {
  console.log('You quitted the game');
  process.exit(0);
});