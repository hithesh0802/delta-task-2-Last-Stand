const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let game = new Game(ctx, canvas.width, canvas.height);
let lastTime =0;

function gameLoop(timeStamp) {
    const deltaTime= timeStamp- lastTime ;
    // console.log(deltaTime);
    lastTime= timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(0);