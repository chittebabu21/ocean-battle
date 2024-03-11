export default class InputHandler {
    constructor(game) {
        this.game = game;

        // key down event
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            } else if (e.key === ' ') {
                this.game.player.shoot();
            } else if (e.key === 'd') {
                this.game.player.debug = !this.game.player.debug;
            }
        });
        

        // key up event
        window.addEventListener('keyup', (e) => {
            const indexKey = this.game.keys.indexOf(e.key);

            if (indexKey !== -1) {
                this.game.keys.splice(indexKey, 1);
            }
        });
    }
}