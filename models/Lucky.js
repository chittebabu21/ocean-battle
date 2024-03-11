import Enemy from "./Enemy.js";

export default class Angler extends Enemy {
    constructor(game) {
        super(game);
        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.image = document.getElementById('lucky');
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3;
        this.score = this.lives * 5;
        this.type = 'lucky';
    }
}