class Zombie {
    constructor(game) {
        this.game = game;
        this.width = 69.33;
        this.height = 66;
        this.image= document.getElementById('zombie');
        this.spritewidth=this.width;
        this.spriteheight= this.height;
        this.frameX=0;
        this.frametimer=0;
        this.fps= 15;
        this.frameinterval= 80800 ;
        this.maxframe=8;
        this.x = Math.random() < 0.5 ? 0 : this.game.width - this.width;
        this.y = this.game.height - this.height;
        this.speed = 1 + Math.random()*0.5;
        this.markedfordeletion='false';
        this.count=0;
    }

    update(deltaTime) {
        
        if (this.x < this.game.player.x) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }
        
        if(this.frametimer > this.frameinterval){
            this.frameX++;
            this.frametimer=0;
        }else{
            this.frametimer+= deltaTime ;
        }

        if(this.frameX < this.maxframe){
            setTimeout(this.frameX+=1,125); 
            // this.markedfordeletion= true;
        }else{
            this.frameX=0;
        }   

        if (this.isCollidingWithPlayer()) {
            this.markedfordeletion=true;
            this.game.player.health -= 25; 
            this.game.zombies = this.game.zombies.filter(z => z.markedfordeletion !== true); 

            if (this.game.player.health <= 0) {
                this.game.endGame();               
            }
        }
    }

    //update(deltaTime){
    //     this.x-= this.speed;
    //     if(this.frametimer > this.frameinterval){
    //         this.frameX++;
    //         this.frametimer=0;
    //     }else{
    //         this.frameTimer+= deltaTime;
    //     }
    //     if(this.frameX > this.maxframe){
    //         this.markedfordeletion= true;
    //     }
    // }

    draw(ctx) {
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(this.image,this.frameX * this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
    }

    isCollidingWithPlayer(){
        const player = this.game.player;
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        );
    }
}