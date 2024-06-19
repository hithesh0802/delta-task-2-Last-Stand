class Projectile {
    constructor(game, x, y,direction,speed,damage) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direction = direction; 
        this.radius = 7;
        this.damage = damage;
        this.speed = speed;
        this.gravity = 0.2;
        this.dx = 0; // Horizontal velocity
        this.dy = 0; // Vertical velocity

        if (direction === 'right' && this.speed ===5) {
            this.dx = this.speed * Math.cos(Math.PI / 4); 
            this.dy = -this.speed * Math.sin(Math.PI / 4); 
        } else if (direction === 'left' && this.speed ===5) {
            this.dx = -this.speed * Math.cos(Math.PI / 4); 
            this.dy = -this.speed * Math.sin(Math.PI / 4); 
        }else{
            if(this.damage ===5){
            if (direction === 'right') {
                this.dx = this.speed * Math.cos(Math.PI / 4); 
                this.dy = -this.speed * Math.sin(Math.PI / 4); 
            } else if (direction === 'left') {
                this.dx = -this.speed * Math.cos(Math.PI / 4); 
                this.dy = -this.speed * Math.sin(Math.PI / 4); 
            }
        }else{
            if (direction === 'right') {
                this.dx = this.speed * Math.cos(Math.PI / 6); 
                this.dy = -this.speed * Math.sin(Math.PI / 6); 
            } else if (direction === 'left') {
                this.dx = -this.speed * Math.cos(Math.PI / 6); 
                this.dy = -this.speed * Math.sin(Math.PI / 6); 
            }
        }
        }
    }

    update() {
        this.x += this.dx;
        this.dy += this.gravity;
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
        ctx.closePath();
    }
}