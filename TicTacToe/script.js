const statusDisplay = document.querySelector(".game-status");

let currPlayer = 'X';
let player1 = Math.random()>=0.5 ? 'X' : 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStatus = true;
let gameMode;

const getPlayerString = () => `It's ${currPlayer}'s turn`;
const getWinningString = () => `Player ${currPlayer} has Won!`;
const getTieString = () => `It's a Tie!`;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleBoardChange(cell, cellIndex) {
    gameBoard[cellIndex] = currPlayer;
    cell.innerHTML = currPlayer;
}

function changeTurn() {
    currPlayer = currPlayer == 'X' ? 'O' : 'X';
    if (gameMode==='random' && currPlayer!=player1) {
        return;
    } else if (gameMode==='minmax' && currPlayer!=player1) {
        return;
    } else {
        statusDisplay.innerHTML = getPlayerString();
    }
}

function checkWin() {
    let gameWin = false;
    for (i in winConditions) {
        // If currPlayer is a winnner
        if (gameBoard[winConditions[i][0]] == currPlayer && gameBoard[winConditions[i][1]] == currPlayer && gameBoard[winConditions[i][2]] == currPlayer) {
            gameWin = true;
        }
    }

    if (gameWin) {
        statusDisplay.innerHTML = getWinningString();
        gameStatus = false;
        return;
    }


    let gameDraw = !gameBoard.includes('');
    if (gameDraw) {
        statusDisplay.innerHTML = getTieString();
        gameStatus = false;
        return;
    }

    changeTurn();
};

function handleClickedCell(clickedCellEvent) {
    const cell = clickedCellEvent.target;
    const cellIndex = parseInt(cell.getAttribute("cell-index"));

    if (gameBoard[cellIndex] !== '' || !gameStatus) {
        return;
    }

    handleBoardChange(cell, cellIndex);
    checkWin();
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currPlayer = 'X';
    gameStatus = true;
    statusDisplay.innerHTML = '';
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = '');
    statusDisplay.innerHTML = getPlayerString();
}

function handleTwoPlayer() {
    document.querySelector(".game-holder").style.visibility='visible';
    gameMode = 'two-player';
}

function handleRandom() {
    document.querySelector(".game-holder").style.visibility='visible';
    gameMode = 'random';
}

function handleMinMax() {
    document.querySelector(".game-holder").style.visibility='visible';
    gameMode = 'minmax';
}

function init() {
    document.querySelector(".game-holder").style.visibility='hidden';
    statusDisplay.innerHTML = getPlayerString();
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleClickedCell));
    document.querySelector(".restart").addEventListener('click', restartGame);
    document.querySelector(".two-player").addEventListener('click', handleTwoPlayer);
    document.querySelector(".random").addEventListener('click', handleRandom);
    document.querySelector(".minmax").addEventListener('click', handleMinMax);
}

init();