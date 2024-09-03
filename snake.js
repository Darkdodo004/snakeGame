const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
canvas.width = canvas.height = 500;

let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = {x: getRandomCoordinate(), y: getRandomCoordinate()};
let score = 0;
let gameSpeed = 100;  
let gameInterval;

function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
}

function drawSnake() {
    ctx.fillStyle = 'red';
    snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));
}

function drawFood() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);  // Display the score at the top-left corner
}

function updateSnakePosition() {
    const head = {x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize};

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {x: getRandomCoordinate(), y: getRandomCoordinate()};
        if (score % 3 === 0) {
            increaseSpeed();  
        }
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(part => part.x === head.x && part.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);
}

function resetGame() {
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
    food = {x: getRandomCoordinate(), y: getRandomCoordinate()};
    score = 0;
    gameSpeed = 100;  
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

function changeDirection(event) {
    const {keyCode} = event;
    switch (keyCode) {
        case 37: 
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 38: 
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 39: 
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
        case 40: 
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
    }
}

function increaseSpeed() {
    gameSpeed = Math.max(30, gameSpeed - 20); 
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();  
    updateSnakePosition();
}

document.addEventListener('keydown', changeDirection);
gameInterval = setInterval(gameLoop, gameSpeed);

