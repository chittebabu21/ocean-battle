import Enemy from "./Enemy.js";

export default class HiveWhale extends Enemy {
    constructor(game) {
        super(game);
        this.width = 400;
        this.height = 227;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('hivewhale');
        this.frameY = 0;
        this.lives = 20;
        this.score = this.lives;
        this.type = 'hive';
        this.speedX = Math.random() * -1.2 - 0.2;
    }
}