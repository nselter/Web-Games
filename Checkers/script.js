document.addEventListener("DOMContentLoaded", initalizeBoard);

const board = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']
];

function initalizeBoard() {
    const boardElement = document.getElementById("game-board");

    for (let row=0; row<8; row++) {
        for (let col=0; col<8; col++) {
            const cellElement = document.createElement("div");
            cellElement.className = (row+col)%2 === 0 ? "cell light" : "cell dark";

            // Add pieces to spesific cells
            if (row<3 && (row+col)%2===1) {
                cellElement.appendChild(createPiece("red"));
                board[row][col] = 'R';
            } else if (row>4 && (row+col)%2===1) {
                cellElement.appendChild(createPiece("black"));
                board[row][col] = 'B';
            }

            boardElement.appendChild(cellElement);
        }
    }
};

function createPiece(color) {
    const pieceElement = document.createElement("img");
    pieceElement.className = "piece";
    pieceElement.src = `Assets\\${color}_piece.png`;
    return pieceElement
}

