class Projectile {
    constructor(game, x, y,direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        // this.speed = 10; // Increase the speed for better gameplay
        this.direction = direction; // Store the direction of the projectile
        this.radius = 5;
        this.speed = 5;
        this.gravity = 0.2;
        this.dx = 0; // Horizontal velocity
        this.dy = 0; // Vertical velocity

        if (direction === 'right') {
            this.dx = 5 * Math.cos(Math.PI / 4); // 45 degree angle
            this.dy = -5 * Math.sin(Math.PI / 4); // 45 degree angle
        } else if (direction === 'left') {
            this.dx = -5 * Math.cos(Math.PI / 4); // 45 degree angle
            this.dy = -5 * Math.sin(Math.PI / 4); // 45 degree angle
        }

    }

    update() {
        this.x += this.dx;
        this.dy += this.gravity;

        // Remove the projectile if it goes out of bounds
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