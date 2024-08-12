const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let board = Array(9).fill(null);
let gameActive = true;

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] || !gameActive) return;

    board[index] = isXTurn ? 'X' : 'O';
    cell.textContent = board[index];
    cell.classList.add(isXTurn ? 'x' : 'o');

    if (checkWinner()) {
        message.textContent = `${isXTurn ? 'X' : 'O'} wins!`;
        gameActive = false;
        restartButton.style.display = 'inline-block';
    } else if (board.every(cell => cell)) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
        restartButton.style.display = 'inline-block';
    } else {
        isXTurn = !isXTurn;
        message.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    board = Array(9).fill(null);
    isXTurn = true;
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    message.textContent = `Player X's turn`;
    restartButton.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

// Initialize game message
message.textContent = `Player X's turn`;
