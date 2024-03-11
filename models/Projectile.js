export default class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 36.25;
        this.height = 20;
        this.speed = Math.random() * 0.2 + 2.8;
        this.markedForDeletion = false;
        this.image = document.getElementById('fireball');
        this.frameX = 0;
        this.maxFrame = 3;
        this.fps = 20;
        this.timer = 0;
        this.interval = 1000 / this.fps;
    }

    update(deltaTime) {
        this.x += this.speed;

        if (this.timer > this.interval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }

            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        

        if (this.x > this.game.width * 0.8) {
            this.markedForDeletion = true;
        }
    }

    draw(contex) {
        contex.drawImage(
            this.image, this.frameX * this.width, 0, this.width, this.height,
             this.x, this.y, this.width, this.height
        );
    }
}