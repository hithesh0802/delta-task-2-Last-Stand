class Shooterassist {
    constructor(game,x,y,direction) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 25;
        this.speed = 0;
        this.dx = 0;
        this.dy = 0;
        this.gravity = 0;
        this.jumpStrength = 0;
        this.isJumping = false;
        this.health = 100;
        this.image= document.getElementById('cannon');
        // this.initControls();
        this.projectiles = [];
        this.shootDelay = 500; 
        this.lastShot = Date.now();
        this.facingDirection = direction;
        this.weapons = [new ranger(this), new shotgun(this)];
        this.currentWeaponIndex = 0;
        this.currentWeapon = this.weapons[this.currentWeaponIndex]; 
        const intervalId= setInterval(()=>{
            if(this.health<=0){
                clearInterval(intervalId);
            }
            this.shoot(this.facingDirection);
        },8000)
        this.markedforDeletion='false';
    }

    update() {
        if(this.health <=0){
            this.markedforDeletion='true';
        }
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => projectile.y > 0);
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
        this.projectiles.forEach(projectile => projectile.draw(ctx));
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 10, this.width * (this.health / 100), 5);
    }

    shoot(direction) {
        this.currentWeapon.shoot(this.x, this.y, direction);
    }

}

