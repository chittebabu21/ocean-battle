import Enemy from "./Enemy.js";

export default class MoonFish extends Enemy {
    constructor(game) {
        super(game);
        this.width = 227;
        this.height = 240;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('moonfish');
        this.frameY = 0;
        this.lives = 10;
        this.score = this.lives;
        this.type = 'moon';
        this.speedX = Math.random() * -1.2 - 2;
    }
}