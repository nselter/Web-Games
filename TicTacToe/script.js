const statusDisplay = document.querySelector(".game-status");

let currPlayer = 'X';
let player1;
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
        randomMove();
    } else if (gameMode==='minmax' && currPlayer!=player1) {
        minmaxMove();
    } else {
        statusDisplay.innerHTML = getPlayerString();
    }
}

function checkWin(board, player) {
    for (i in winConditions) {
        // If currPlayer is a winnner
        if (board[winConditions[i][0]] == player && board[winConditions[i][1]] == player && board[winConditions[i][2]] == player) {
            return true;
        }
    }
    return false;
}

function submitTurn() {
    const gameWin = checkWin(gameBoard, currPlayer);
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

function randomMove() {
    const cells = openCells(gameBoard);

    let random = Math.floor(Math.random()*cells.length);
    handleBoardChange(document.querySelector(`[cell-index="${cells[random]}"]`), cells[random]);
    submitTurn();
}

function openCells(board) {
    let openCells = [];
    for (let i=0;i<9;i++) {
        if (board[i]=='') openCells.push(i);
    }
    return openCells
}

function minmaxMove() {
    let moves = [];
    let moveVal = -Infinity;
    let board = gameBoard.slice(); 
    for (let newMove of openCells(board)) {
        board[newMove] = currPlayer;

        const newMoveVal = minmax(board, 0, false);

        board[newMove] = '';

        if (newMoveVal > moveVal) {
            moveVal = newMoveVal;
            moves = [];
            moves.push(newMove);
        } else if (newMoveVal === moveVal) {
            moves.push(newMove);
        }
    }

    const random = Math.floor(Math.random()*moves.length);
    handleBoardChange(document.querySelector(`[cell-index="${moves[random]}"]`), moves[random]);
    submitTurn();
}

function minmax(board, depth, isCurrPlayerTurn) {
    if (checkWin(board, isCurrPlayerTurn ? currPlayer : currPlayer==='X' ? 'O' : 'X')) {
        return isCurrPlayerTurn ? 10-depth : -10;
    } else if (!board.includes('')) {
        return 0;
    }

    
    if (isCurrPlayerTurn) { 
        // If Current Player's Move, find the best move for them
        let bestMoveVal = -Infinity;
        for (let move of openCells(board)) {
            board[move] = currPlayer;

            bestMoveVal = Math.max(bestMoveVal, minmax(board, depth+1, false));

            board[move] = '';
        }
        return bestMoveVal;
    } else {
        // If not the current player's move, find worst case sinario
        let worstMoveVal = Infinity;
        for (let move of openCells(board)) {
            board[move] = currPlayer==='X' ? 'O' : 'X';

            worstMoveVal = Math.min(worstMoveVal, minmax(board, depth+1, true));

            board[move] = '';
        }
        return worstMoveVal;
    }
}

function handleClickedCell(clickedCellEvent) {
    const cell = clickedCellEvent.target;
    const cellIndex = parseInt(cell.getAttribute("cell-index"));

    if (gameBoard[cellIndex] !== '' || !gameStatus) {
        return;
    }

    handleBoardChange(cell, cellIndex);
    submitTurn();
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currPlayer = 'X';
    gameStatus = true;
    statusDisplay.innerHTML = '';
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = '');
    statusDisplay.innerHTML = getPlayerString();
    choosePlayerChar();
}

function choosePlayerChar() {
    player1 = Math.random()>=0.5 ? 'X' : 'O';
    if (player1==='O') {
        switch (gameMode) {
            case 'minmax':
                statusDisplay.innerHTML = `You are ${player1}`;
                minmaxMove();
                break;
            case 'random':
                statusDisplay.innerHTML = `You are ${player1}`;
                randomMove();
                break;
        }
    }
}

function handleGameModes(modeEvent) {
    restartGame()
    document.querySelector(".game-holder").style.visibility='visible';
    gameMode = modeEvent.target.getAttribute("mode");
}

function init() {
    document.querySelector(".game-holder").style.visibility='hidden';
    statusDisplay.innerHTML = getPlayerString();
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleClickedCell));
    document.querySelectorAll(".game-mode").forEach(cell => cell.addEventListener('click', handleGameModes))
    document.querySelector(".restart").addEventListener('click', restartGame);
}

init();