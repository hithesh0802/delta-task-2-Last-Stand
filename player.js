class Player {
    constructor(game) {
        this.game = game;
        this.x = this.game.width / 2;
        this.y = this.game.height - 60;
        this.width = 50;
        this.height = 50;
        this.speed = 6;
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
        this.weapons = [new ranger(this), new shotgun(this)];
        this.currentWeaponIndex = 0;
        this.currentWeapon = this.weapons[this.currentWeaponIndex];
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
            if (e.key === 'f') this.shoot(this.facingDirection);
            
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

    shoot(direction) {
        // if (Date.now() - this.lastShot > this.shootDelay) {
        //     // for (let i = 0; i < this.spread; i++) {
        //     //     const angle = (i - Math.floor(this.spread / 2)) * 0.1; // Spread effect
        //     //     this.projectiles.push(new Projectile(this.game, this.x + this.width/2, this.y, this.facingDirection,this.speed,this.damage));
        //     // }
        //     this.projectiles.push(new Projectile(this.game, this.x + this.width/2, this.y, this.facingDirection,this.speed,this.damage));
        //     this.lastShot = Date.now();
        // }
        this.currentWeapon.shoot(this.x, this.y, direction);
    }

    switchWeapon() {
        this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weapons.length;
        this.currentWeapon = this.weapons[this.currentWeaponIndex];
        console.log(`Switched to ${this.currentWeapon.name}`);
    }

}

