CanvasRenderingContext2D.prototype.fillRectRound = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.strokeStyle = "white";
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    this.stroke();

    this.fillStyle = "white";
    this.fill();
}

var pontuacao = 0;
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let food = {};
let direction = "right";
let directionPress = "right";
let jogo = null;

Iniciar();

function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "white";
    //context.fillRect(food.x, food.y, box, box);
    context.fillRectRound(food.x, food.y, box, box, 100);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') directionPress = 'left';
    if (event.keyCode == 38 && direction != 'down') directionPress = 'up';
    if (event.keyCode == 39 && direction != 'left') directionPress = 'right';
    if (event.keyCode == 40 && direction != 'up') directionPress = 'down';
}

function GameOver() {
    clearInterval(jogo);

    let record = document.getElementById("record");
    if (pontuacao > parseInt(record.innerHTML)) {
        record.innerHTML = pontuacao;
    }


    alert('Game Over :(');
}

function iniciarJogo() {

    if (snake[0].x > 15 * box) GameOver(); //snake[0].x = 0;
    if (snake[0].x < 0) GameOver(); //snake[0].x = 16 * box;
    if (snake[0].y > 15 * box) GameOver(); //snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = GameOver(); //16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            GameOver();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    direction = directionPress;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        GerirPontos();
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}


function Iniciar() {
    tempo = 300;
    pontuacao = 0;
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    direction = "right";
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    document.getElementById("level").innerHTML = 1;
    document.getElementById("pontos").innerHTML = 0;

    clearInterval(jogo);

    jogo = setInterval(iniciarJogo, tempo);
}

function GerirPontos() {
    pontuacao++;
    document.getElementById("pontos").innerHTML = pontuacao;
    if ((pontuacao % 10) == 0 && tempo > 100) {
        document.getElementById("level").innerHTML = parseInt(document.getElementById("level").innerHTML) + 1;
        tempo -= 25;
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, tempo);
    }
}

function Pausar() {
    let btn = document.getElementById("btnPausar");
    clearInterval(jogo);
    if (btn.innerText == "PAUSAR") {
        btn.innerText = "CONTINUAR";
    } else {
        btn.innerText = "PAUSAR";
        jogo = setInterval(iniciarJogo, tempo);
    }
}