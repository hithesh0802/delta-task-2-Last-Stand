class defense{
    constructor(game,x,y){
        this.game=game;
        this.x=x;
        this.y=y;
        this.width=40;
        this.height=28;
        this.markedfordeletion=false;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){

    }
}


class Mine extends defense{
    constructor(game, x, y) {
        super(game, x, y);
        this.color = 'yellow';
        this.image= document.getElementById('landmine');
        this.lifespan = 15000;
        this.creationTime = Date.now();
        this.blastZombie=new Audio('mixkit-arcade-game-explosion-2759.wav');
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
    }

    update() {
        if (Date.now() - this.creationTime > this.lifespan) {
            this.markedForDeletion = true; 
        }
    }

    applyEffect(zombie) {
        this.markedForDeletion = true;
        zombie.markedForDeletion = true;
        this.blastZombie.currentTime=0;
        this.blastZombie.play();
    }
}

class Trap extends defense{
    constructor(game, x, y) {
        super(game, x, y);
        this.color = 'brown';
        this.image=document.getElementById('trap');
    }

    draw(ctx) {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    update() {
        this.lifespan = 20000; 
        this.creationTime = Date.now();
    }

    applyEffect(zombie) {
        zombie.speed *= 0.5;
        this.markedForDeletion = true;
    }
}

class Block extends defense{
    constructor(game, x, y) {
        super(game, x, y);
        this.color = 'brown';
        this.durability = 3;
        this.arr=[];
        this.blastZombie=new Audio('mixkit-arcade-game-explosion-2759.wav');
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        super.draw(ctx);
    }

    update() {

    }

    applyEffect(zombie) {
        if(zombie.maxframe ===5){
            zombie.y -= 30;
            setTimeout(()=>{
                zombie.y +=30;
            },150);            
        }else{
            if(zombie.freeze==='false'){
                this.arr.push(zombie);
                zombie.freeze='true';
                this.durability-=1;
            }
        }
        if (this.durability === 0) {
            this.markedForDeletion = true;
            this.blastZombie.currentTime=0;
            this.blastZombie.play();
            this.arr.forEach(z=>{
                z.freeze='false';
            })
            }
        
    }
}
