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

        if (this.isCollidingWithPlayer()) {
            this.game.player.health -= 25; 
            this.game.zombies = this.game.zombies.filter(z => z !== this); 

            // End game if player's health reaches zero
            if (this.game.player.health <= 0) {
                this.game.endGame();               
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isCollidingWithPlayer(){
        const player = this.game.player;
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        );
    }
}