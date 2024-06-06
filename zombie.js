class Zombie {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.x = Math.random() < 0.5 ? 0 : this.game.width - this.width;
        this.y = this.game.height - this.height;
        this.speed = 1 + Math.random();
    }

    update() {
        if (this.x < this.game.player.x) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}