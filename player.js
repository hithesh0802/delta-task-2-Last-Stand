class Player {
    constructor(game) {
        this.game = game;
        this.x = this.game.width / 2;
        this.y = this.game.height - 60;
        this.width = 50;
        this.height = 50;
        this.speed = 10;
        this.dx = 0;
        this.dy = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.isJumping = false;
        this.health = 100;
        this.initControls();
        this.projectiles = [];
        this.shootDelay = 500; 
        this.lastShot = Date.now();
        this.facingDirection = 'right'; 
        this.immunity='false';
    }

    initControls() {
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') this.dx = 0;
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.dx = this.speed;
                this.facingDirection = 'right';
            }
            if (e.key === 'ArrowLeft') {
                this.dx = -this.speed;
                this.facingDirection = 'left';
            }
            if (e.key === ' ' && !this.isJumping) {
                this.dy = this.jumpStrength;
                this.isJumping = true;
            }
            if (e.key === 'f') this.shoot();
            
        });
    }

    update() {
        this.x += this.dx;
        this.dy += this.gravity;
        this.y += this.dy;
        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height;
            this.dy = 0;
            this.isJumping = false;
        }
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => projectile.y > 0);
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(projectile => projectile.draw(ctx));

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width * (this.health / 100), 5);
    }

    shoot() {
        if (Date.now() - this.lastShot > this.shootDelay) {
            this.projectiles.push(new Projectile(this.game, this.x + this.width / 2, this.y,this.facingDirection));
            this.lastShot = Date.now();
        }
    }
}

