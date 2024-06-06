class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.zombies = [];
        this.spawnZombie();
    }

    spawnZombie() {
        this.zombies.push(new Zombie(this));
        setTimeout(() => this.spawnZombie(), 2000); // spawn a zombie every 2 seconds
        this.checkCollisions();
    }

    update() {
        this.player.update();
        this.zombies.forEach(zombie => zombie.update());
    }

    draw() {
        this.player.draw(this.ctx);
        this.zombies.forEach(zombie => zombie.draw(this.ctx));
    }

    checkCollisions() {
        this.player.projectiles.forEach(projectile => {
            this.zombies.forEach(zombie => {
                if (this.isColliding(projectile, zombie)) {
                    // Remove zombie and projectile on collision
                    this.zombies = this.zombies.filter(z => z !== zombie);
                    this.player.projectiles = this.player.projectiles.filter(p => p !== projectile);
                }
            });
        });
    }

    isColliding(projectile, zombie) {
        return (
            projectile.x < zombie.x + zombie.width &&
            projectile.x + projectile.radius > zombie.x &&
            projectile.y < zombie.y + zombie.height &&
            projectile.y + projectile.radius > zombie.y
        );
    }
}