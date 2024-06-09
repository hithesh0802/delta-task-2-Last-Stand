class Projectile {
    constructor(game, x, y,direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction; 
        this.radius = 5;
        this.speed = 10;
        this.gravity = 0.2;
        this.dx = 0; // Horizontal velocity
        this.dy = 0; // Vertical velocity

        if (direction === 'right') {
            this.dx = 6 * Math.cos(Math.PI / 4); 
            this.dy = -6 * Math.sin(Math.PI / 4); 
        } else if (direction === 'left') {
            this.dx = -6 * Math.cos(Math.PI / 4); 
            this.dy = -6 * Math.sin(Math.PI / 4); 
        }

    }

    update() {
        this.x += this.dx;
        this.dy += this.gravity;

        // Remove the projectile if out of bounds
        if (this.x < 0 || this.x > this.game.width || this.y < 0 || this.y > this.game.height) {
            this.game.player.projectiles = this.game.player.projectiles.filter(p => p !== this);
            return;
        }
        this.y += this.dy;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}