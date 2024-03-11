export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 24;
        this.fontFamily = 'Bangers';
        this.color = 'red';
    }

    draw(context) {
        context.save();

        // score
        this.color = 'red';
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'gainsboro';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Score: ' + this.game.score, 20, 40);
        context.fillText('Lives: ' + this.game.player.lives, 180, 40);

        // timer 
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        context.font = '15px ' + this.fontFamily;
        context.fillText('Time: ' + formattedTime, 20, 90);

        // ammo
        if (this.game.player.powerUp) {
            context.fillStyle = 'cyan';
        }

        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(20 + 5 * i, 50, 3, 20);
        }

        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';

            let mainMessage;
            let subMessage;

            if (this.game.score > this.game.winningScore) {
                mainMessage = 'You win!';
                subMessage = 'Well done!';
                context.fillStyle = 'green';
            } else {
                mainMessage = 'You lose!';
                subMessage = 'Try again next time!';
                context.fillStyle = 'red';
            }

            context.font = '70px ' + this.fontFamily;
            context.fillText(mainMessage, this.game.width * 0.5, this.game.height * 0.5 - 25);
            context.font = '35px ' + this.fontFamily;
            context.fillText(subMessage, this.game.width * 0.5, this.game.height * 0.5 + 25);
        }

        context.restore();
    }
}