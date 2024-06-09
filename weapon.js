class weapon{
    constructor(player){
        this.player=player;
        this.width=this.player.width;
        this.height=this.player.height;
    }

    shoot() {
        if (Date.now() - this.player.lastShot > this.player.shootDelay){
            this.player.projectiles.push(new Projectile(this.player.game, this.player.x + this.player.width / 2, this.player.y,this.player.facingDirection));
            this.player.lastShot = Date.now();
        }
    }
}

class ranger extends weapon{
    constructor(player){
        super(player);
        this.player=player;
        this.name = "ranger";
        this.damage = 10;
        this.speed = 5;
    }

    shoot(x, y, direction) {
        if (Date.now() - this.player.lastShot > this.player.shootDelay){
        this.player.game.player.projectiles.push(new Projectile(this.player.game, x + this.player.width/2, y, direction, this.speed, this.damage));
        this.player.lastShot= Date.now();
        }
    }
}

class shotgun extends weapon {
    constructor(player) {
        super(player);
        this.name = "shotgun";
        this.damage = 5;
        this.speed = 6;
        this.spread = 3; 
    }

    shoot(x, y, direction) {
        if (Date.now() - this.player.lastShot > this.player.shootDelay){
            console.log(x,'hi');
         
            this.player.game.player.projectiles.push(new Projectile(this.player.game, x + this.player.width/2, y, direction, this.speed, this.damage));
            this.player.game.player.projectiles.push(new Projectile(this.player.game, x+ this.player.width/2, y, direction, this.speed, this.damage + 1));
            this.player.lastShot= Date.now();
        
        }
    }
}