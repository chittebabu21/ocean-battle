import Explosion from "./Explosion.js";

export default class SmokeExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('smokeExplosion');
    }
}