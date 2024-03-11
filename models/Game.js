import Player from "./Player.js";
import InputHandler from "./InputHandler.js";
import UI from "./UI.js";
import Angler from "./Angler.js";
import NightAngler from "./NightAngler.js";
import Lucky from "./Lucky.js";
import Background from "./Background.js";
import Particle from "./Particle.js";
import HiveWhale from "./HiveWhale.js";
import BulbWhale from "./BulbWhale.js";
import Drone from "./Drone.js";
import SmokeExplosion from "./SmokeExplosion.js";
import FireExplosion from "./FireExplosion.js";
import MoonFish from "./MoonFish.js";
import SoundController from "./SoundController.js";
import Shield from "./Shield.js";
import Stalker from "./Stalker.js";
import Razorfin from "./Razorfin.js";

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.sound = new SoundController();
        this.shield = new Shield(this);
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.enemyTimer = 0;
        this.enemyInterval = 2000;
        this.score = 0;
        this.winningScore = 100;
        this.gameTime = 0;
        this.timeLimit = 50000;
        this.speed = 1;
        this.keys = [];
        this.enemies = [];
        this.particles = [];
        this.explosions = [];
        this.gameOver = false;
    }

    update(deltaTime) {
        if (!this.gameOver) {
            this.gameTime += deltaTime;
        }

        if (this.gameTime > this.timeLimit) {
            this.gameOver = true;
        }

        this.background.update();
        this.background.layer4.update();
        this.player.update(deltaTime);

        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
            }

            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        this.shield.update(deltaTime);

        this.particles.forEach((particle) => {
            particle.update()
        });
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);

        this.explosions.forEach((explosion) => {
            explosion.update(deltaTime);
        });
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);

        this.enemies.forEach((enemy) => {
            enemy.update();

            if (this.checkCollision(this.player, enemy)) {
                enemy.markedForDeletion = true;

                this.addExplosion(enemy);
                this.sound.hit();
                this.shield.reset()

                for (let i = 0; i < enemy.score; i++) {
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                }

                if (enemy.type === 'lucky') {
                    this.player.enterPowerUp();
                } else if (!this.gameOver) {
                    this.player.lives--;
                }

                if (this.player.lives <= 0) {
                    this.gameOver = true;
                }
            }

            this.player.projectiles.forEach((projectile) => {
                if (this.checkCollision(projectile, enemy)) {
                    projectile.markedForDeletion = true;
                    this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                    enemy.lives--;

                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;

                        this.addExplosion(enemy);
                        this.sound.explosion();

                        for (let i = 0; i < enemy.score; i++) {
                            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                        }

                        if (enemy.type === 'moon') {
                            this.player.enterPowerUp();
                        }

                        if (enemy.type === 'hive') {
                            for (let i =0; i < Math.random() * 5; i++) {
                                this.enemies.push(new Drone(this, enemy.x + Math.random() * enemy.width, enemy.y + Math.random() * enemy.height * 0.5));
                            }
                        }

                        if (!this.gameOver) {
                            this.score += enemy.score;
                        }
                    }
                }
            });
        });

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    draw(context) {
        this.background.draw(context);
        this.ui.draw(context);
        this.player.draw(context);
        this.shield.draw(context);

        this.particles.forEach((particle) => {
            particle.draw(context);
        });

        this.enemies.forEach((enemy) => {
            enemy.draw(context);
        });

        this.explosions.forEach((explosion) => {
            explosion.draw(context);
        });

        this.background.layer4.draw(context);
    }

    addEnemy() {
        if (Math.random() < 0.1) {
            this.enemies.push(new Angler(this));
        } else if (Math.random() < 0.3) {
            this.enemies.push(new NightAngler(this));
        } else if (Math.random() < 0.5 && this.timeLimit < 20000) {
            this.enemies.push(new Stalker(this));
        } else if (Math.random() < 0.6 && this.timeLimit < 10000) {
            this.enemies.push(new Razorfin(this));
        } else if (Math.random() < 0.7) {
            this.enemies.push(new HiveWhale(this));
        } else if (Math.random() < 0.8) {
            this.enemies.push(new BulbWhale(this));
        } else if (Math.random() < 0.9) {
            this.enemies.push(new MoonFish(this));
        } else {
            this.enemies.push(new Lucky(this));
        }
    }

    addExplosion(enemy) {
        const randomize = Math.random();

        if (randomize < 0.5) {
            this.explosions.push(new SmokeExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        } else {
            this.explosions.push(new FireExplosion(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
        }
    }

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }
}