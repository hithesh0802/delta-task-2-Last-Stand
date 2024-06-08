class powerup{
    constructor(game){
        this.game=game;
        this.ctx= this.game.ctx;
        this.x= this.game.width / 2;
        this.y= this.game.height - 100;
        this.width=20;
        this.height=20;
        this.type='immunity';
        this.active='true';

        // Set a lifespan for the power-up
        this.lifespan = 3000; // 5 seconds
        this.creationTime = Date.now();
    }

    draw(ctx){
        if(this.active){
            ctx.fillStyle='purple';
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }    
    }

    applypowerup(){
        this.game.player.immunity='true';
        if(this.game.player.health > 75){
            this.game.player.health=100;
        }else{
            this.game.player.health +=25;
        }
        this.game.player.draw(this.ctx);
        setTimeout(() => {
            this.game.player.immunity = false;    
        }
        , 5000);
        this.active = false;
    }

    update() {
        // Check if the power-up has exceeded its lifespan
        if (Date.now() - this.creationTime >= this.lifespan) {
            this.active = false; // Mark the power-up as inactive
        }
    }
}