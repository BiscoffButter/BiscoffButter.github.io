// Game State Management
const GameState = {
    memory: {
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        timer: 0,
        timerInterval: null,
        isLocked: false
    },
    tictactoe: {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        gameOver: false,
        scores: { X: 0, O: 0, draw: 0 }
    },
    puzzle: {
        tiles: [],
        emptyIndex: 15,
        moves: 0,
        timer: 0,
        timerInterval: null,
        solved: false
    }
};

// Utility Functions
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTimer(game) {
    game.timerInterval = setInterval(() => {
        game.timer++;
        if (game === GameState.memory) {
            document.getElementById('memory-time').textContent = formatTime(game.timer);
        } else if (game === GameState.puzzle) {
            document.getElementById('puzzle-time').textContent = formatTime(game.timer);
        }
    }, 1000);
}

function stopTimer(game) {
    if (game.timerInterval) {
        clearInterval(game.timerInterval);
        game.timerInterval = null;
    }
}

function resetTimer(game, elementId) {
    stopTimer(game);
    game.timer = 0;
    document.getElementById(elementId).textContent = '0:00';
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${btn.dataset.game}-game`).classList.add('active');
    });
});

// ==================== MEMORY GAME ====================
const emojis = ['🎮', '🎯', '🎲', '🎪', '🎭', '🎨', '🎬', '🎤'];

function initMemoryGame() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';

    const cards = shuffle([...emojis, ...emojis]);
    GameState.memory.cards = cards;
    GameState.memory.flippedCards = [];
    GameState.memory.matchedPairs = 0;
    GameState.memory.moves = 0;
    GameState.memory.isLocked = false;
    document.getElementById('memory-moves').textContent = '0';

    resetTimer(GameState.memory, 'memory-time');

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (GameState.memory.isLocked) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    GameState.memory.flippedCards.push(this);

    if (GameState.memory.flippedCards.length === 2) {
        GameState.memory.moves++;
        document.getElementById('memory-moves').textContent = GameState.memory.moves;

        const [card1, card2] = GameState.memory.flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            GameState.memory.matchedPairs++;
            GameState.memory.flippedCards = [];

            if (GameState.memory.matchedPairs === emojis.length) {
                stopTimer(GameState.memory);
                setTimeout(() => alert(`🎉 Congratulations! You won in ${GameState.memory.moves} moves and ${formatTime(GameState.memory.timer)}!`), 500);
            }
        } else {
            GameState.memory.isLocked = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                GameState.memory.flippedCards = [];
                GameState.memory.isLocked = false;
            }, 1000);
        }

        if (GameState.memory.moves === 1 && !GameState.memory.timerInterval) {
            startTimer(GameState.memory);
        }
    }
}

document.getElementById('memory-restart').addEventListener('click', initMemoryGame);

// ==================== TIC-TAC-TOE ====================
function initTicTacToe() {
    const board = document.getElementById('tictactoe-board');
    board.innerHTML = '';

    GameState.tictactoe.board = Array(9).fill(null);
    GameState.tictactoe.currentPlayer = 'X';
    GameState.tictactoe.gameOver = false;
    document.getElementById('tictactoe-turn').textContent = "Player X's Turn";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'tictactoe-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleTicTacToeMove);
        board.appendChild(cell);
    }
}

function handleTicTacToeMove() {
    if (GameState.tictactoe.gameOver) return;
    if (GameState.tictactoe.board[this.dataset.index]) return;

    const index = this.dataset.index;
    GameState.tictactoe.board[index] = GameState.tictactoe.currentPlayer;
    this.textContent = GameState.tictactoe.currentPlayer;
    this.classList.add(GameState.tictactoe.currentPlayer);

    if (checkTicTacToeWin()) {
        GameState.tictactoe.gameOver = true;
        document.getElementById('tictactoe-turn').textContent = `🎉 Player ${GameState.tictactoe.currentPlayer} Wins!`;
        return;
    }

    if (GameState.tictactoe.board.every(cell => cell)) {
        GameState.tictactoe.gameOver = true;
        document.getElementById('tictactoe-turn').textContent = "It's a Draw!";
        return;
    }

    GameState.tictactoe.currentPlayer = GameState.tictactoe.currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('tictactoe-turn').textContent = `Player ${GameState.tictactoe.currentPlayer}'s Turn`;
}

function checkTicTacToeWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return GameState.tictactoe.board[a] &&
               GameState.tictactoe.board[a] === GameState.tictactoe.board[b] &&
               GameState.tictactoe.board[a] === GameState.tictactoe.board[c];
    });
}

document.getElementById('tictactoe-restart').addEventListener('click', initTicTacToe);

// ==================== 15 PUZZLE ====================
function initPuzzle() {
    const board = document.getElementById('puzzle-board');
    board.innerHTML = '';

    let tiles = Array.from({ length: 15 }, (_, i) => i + 1);
    tiles = shuffle(tiles);

    // Ensure puzzle is solvable
    let inversions = 0;
    for (let i = 0; i < tiles.length - 1; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] > tiles[j]) inversions++;
        }
    }
    if (inversions % 2 !== 0) {
        [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }

    tiles.push(16);
    GameState.puzzle.tiles = tiles;
    GameState.puzzle.emptyIndex = 15;
    GameState.puzzle.moves = 0;
    GameState.puzzle.solved = false;
    document.getElementById('puzzle-moves').textContent = '0';

    resetTimer(GameState.puzzle, 'puzzle-time');

    renderPuzzleBoard();
}

function renderPuzzleBoard() {
    const board = document.getElementById('puzzle-board');
    board.innerHTML = '';

    GameState.puzzle.tiles.forEach((tile, index) => {
        const cell = document.createElement('div');
        cell.className = 'puzzle-cell';
        cell.dataset.index = index;

        if (tile === 16) {
            cell.classList.add('empty');
        } else {
            cell.textContent = tile;
            cell.addEventListener('click', () => movePuzzleTile(index));
        }

        board.appendChild(cell);
    });
}

function movePuzzleTile(index) {
    if (GameState.puzzle.solved) return;

    const emptyIndex = GameState.puzzle.emptyIndex;
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isAdjacent =
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
        GameState.puzzle.tiles[emptyIndex] = GameState.puzzle.tiles[index];
        GameState.puzzle.tiles[index] = 16;
        GameState.puzzle.emptyIndex = index;
        GameState.puzzle.moves++;

        if (GameState.puzzle.moves === 1 && !GameState.puzzle.timerInterval) {
            startTimer(GameState.puzzle);
        }

        document.getElementById('puzzle-moves').textContent = GameState.puzzle.moves;
        renderPuzzleBoard();

        if (checkPuzzleSolved()) {
            GameState.puzzle.solved = true;
            stopTimer(GameState.puzzle);
            setTimeout(() => alert(`🎉 Puzzle Solved! ${GameState.puzzle.moves} moves in ${formatTime(GameState.puzzle.timer)}!`), 500);
        }
    }
}

function checkPuzzleSolved() {
    for (let i = 0; i < 15; i++) {
        if (GameState.puzzle.tiles[i] !== i + 1) return false;
    }
    return GameState.puzzle.tiles[15] === 16;
}

document.getElementById('puzzle-restart').addEventListener('click', initPuzzle);

// Initialize Games
initMemoryGame();
initTicTacToe();
initPuzzle();
