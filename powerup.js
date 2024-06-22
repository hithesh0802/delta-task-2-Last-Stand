class powerup{
    constructor(game){
        this.game=game;
        this.ctx= this.game.ctx;
        this.x= this.game.width / 2;
        this.y= this.game.height - 155;
        this.width=40;
        this.height=40;
        this.type=(Math.random() > 0.4)?'immunity':'freeze';
        this.active='true';
        this.image= document.getElementById('health');
        this.freezeimage=document.getElementById('freezeimage');
        this.lifespan = 3000; 
        this.freeze='false';
        this.creationTime = Date.now();
    }

    draw(ctx){
        if(this.active && this.type==='immunity'){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }else if(this.type==='freeze' && this.active){
            ctx.drawImage(this.freezeimage,this.x,this.y,this.width,this.height);
        } 
    }

    applypowerup(){
        if(this.type === 'immunity'){
        this.game.player.immunity='true';
        if(this.game.player.health > 75){
            this.game.player.health=100;
        }else{
            this.game.player.health +=25;
        }
        this.game.player.draw(this.ctx);
        this.active = false;
        }else{
            this.game.zombies.forEach(element => {
                element.freeze='true';
            });
            this.freeze='true';
            this.game.player.draw(this.ctx);
            setTimeout(()=>{
                this.game.zombies.forEach(element=>{
                    element.freeze='false';
                })
            },3000)
            this.freeze='false';
            this.active='false';
        }
    }

    update() {
        if (Date.now() - this.creationTime >= this.lifespan) {
            this.active = false; 
        }
    }
}