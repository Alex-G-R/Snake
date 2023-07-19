
// board
let blockSize = 25;
let rows = 25;
let cols = 25;
let board;
let context;

// snake head
let snakeX = blockSize * 12;
let snakeY = blockSize * 12;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];


// food
let foodX;
let foodY;

// score
const scoreContaier = document.getElementById('score');
let score = 1;

let gameOver = false;



window.addEventListener('load', e => {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // used for drawing on the board

    placeFood();
    document.addEventListener('keyup', changeDirection)
    
    setInterval(update, 1000/10) //100 miliseconds
});

function update () {
    if(gameOver) {
        return;
    }

    context.fillStyle='black';
    context.fillRect(0, 0, board.width, board.height);

    
    context.fillStyle='red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score++;
        scoreContaier.innerHTML = 'Score: '+score;
        placeFood();
    }

    for(let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }


    context.fillStyle='lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //game over conditions
    if(snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        alert("Game Over!");
    }

    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) { // Modified condition
            gameOver = true;
            alert("Game Over!");
        }
    }
    
}


function changeDirection (event) {
    if (event.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood () {
    // 0-1 * cols -> (0-19) * blockSize(25)
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}