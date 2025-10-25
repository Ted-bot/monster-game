import { Game } from "./app/game.js";

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'transparent';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.rect(20, 20, 150, 100);

    const game = new Game(canvas);

    game.render(ctx);
    console.log({game: game});



    function animate() {

    }
})