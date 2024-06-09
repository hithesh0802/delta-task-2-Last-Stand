class powerup{
    constructor(game){
        this.game=game;
        this.ctx= this.game.ctx;
        this.x= this.game.width / 2;
        this.y= this.game.height - 100;
        this.width=30;
        this.height=30;
        this.type='immunity';
        this.active='true';
        this.image= document.getElementById('health');
        this.lifespan = 3000; 
        this.creationTime = Date.now();
    }

    draw(ctx){
        if(this.active){
            // ctx.fillStyle='purple';
            // ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
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
        , 10000);
        this.active = false;
    }

    update() {
        if (Date.now() - this.creationTime >= this.lifespan) {
            this.active = false; 
        }
    }
}