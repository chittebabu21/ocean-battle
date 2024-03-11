import Enemy from "./Enemy.js";

export default class Razorfin extends Enemy {
    constructor(game) {
        super(game);
        this.width = 187;
        this.height = 149;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('stalker');
        this.frameY = 0;
        this.lives = 8;
        this.score = this.lives;
        this.speedX = Math.random() * -1 - 1;
    }
}