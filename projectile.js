class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.speed = 5;
        this.dx = 5 * Math.cos(Math.PI / 4); // 45 degree angle
        this.dy = -5 * Math.sin(Math.PI / 4); // 45 degree angle
        this.gravity = 0.2;
    }

    update() {
        this.x += this.dx;
        this.dy += this.gravity;
        this.y += this.dy;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}