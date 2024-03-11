/** @type {HTMLCanvasElement} */
import Game from './models/Game.js';

window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1768;
    canvas.height = 500;

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    // animation loop
    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }

    animate(0);
})