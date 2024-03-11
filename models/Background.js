import Layer from "./Layer.js";

export default class Background {
    constructor(game) {
        this.game = game;
        this.image1 = document.getElementById('layer1');
        this.layer1 = new Layer(this.game, this.image1, 0.2);
        this.image2 = document.getElementById('layer2');
        this.layer2 = new Layer(this.game, this.image2, 0.5);
        this.image3 = document.getElementById('layer3');
        this.layer3 = new Layer(this.game, this.image3, 1);
        this.image4 = document.getElementById('layer4');
        this.layer4 = new Layer(this.game, this.image4, 1.5);
        this.layers = [this.layer1, this.layer2, this.layer3];
    }

    update() {
        this.layers.forEach((layer) => {
            layer.update();
        })
    }

    draw(context) {
        this.layers.forEach((layer) => {
            layer.draw(context);
        })
    }
}