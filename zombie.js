class Zombie {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 80;
        this.image= document.getElementById('zombie');
        this.imageright= document.getElementById('zombieright');
        this.spritewidth=69.33;
        this.spriteheight= 67;
        this.frameX=0;
        this.frametimer=0;
        this.fps= 5+ Math.random()*10;
        this.frameinterval= 1000/this.fps ;
        this.maxframe=9;
        this.x = Math.random() < 0.5 ? 0 : this.game.width - this.width;
        this.y = this.game.height - this.height;
        this.speed = 2 + Math.random()*0.5;
        this.markedfordeletion='false';
        this.count=0;
        this.freeze='false';
        this.stopped=0;
        this.hitSound = new Audio('mixkit-video-game-blood-pop-2361.wav');
    }

    update(deltaTime) {
        if(this.freeze==='false'){
            if(!this.stopped){
                if (this.x < this.game.player.x) {
                    this.x += this.speed;
                } else {
                    this.x -= this.speed;
                }
            }

        if(this.frametimer > this.frameinterval){
            this.frameX++;
            this.frametimer=0;
        }else{
            this.frametimer+= deltaTime ;
        }

        if(this.frameX < this.maxframe){
            
            // this.markedfordeletion= true;
        }else{
            this.frameX=0;
        }   

        if (this.isCollidingWithPlayer()) {
            this.markedfordeletion=true;
            this.hitSound.currentTime=0;
            this.hitSound.play();
            this.game.player.health -= 25; 
            this.game.zombies = this.game.zombies.filter(z => z.markedfordeletion !== true); 

            if (this.game.player.health <= 0) {
                this.game.endGame();               
            }
        }

        this.game.assistance.forEach(assist =>{
            if(this.isCollidingCannon(assist)){              
                this.markedfordeletion=true;
                this.hitSound.currentTime=0;
                this.hitSound.play();
                assist.health -= 25; 
                this.game.zombies = this.game.zombies.filter(z => z.markedfordeletion !== true); 
            }
        })
    }
    }

    draw(ctx) {
        if(this.x > this.game.player.x)
        ctx.drawImage(this.image,this.frameX * this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
        else
        ctx.drawImage(this.imageright,this.frameX * this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
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

    isCollidingCannon(assist){
        return(
            this.x < assist.x + assist.width &&
            this.x + this.width > assist.x &&
            this.y < assist.y + assist.height &&
            this.y + this.height > assist.y
        )
    }
}