class defense{
    constructor(game,x,y){
        this.game=game;
        this.x=x;
        this.y=y;
        this.width=30;
        this.height=20;
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
    }
}

class Trap extends defense{
    constructor(game, x, y) {
        super(game, x, y);
        this.color = 'brown';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        super.draw(ctx);
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
        this.color = 'grey';
        this.durability = 3;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        super.draw(ctx);
    }

    update() {

    }

    applyEffect(zombie) {
        this.durability -= 1; 
        if (this.durability <= 0) {
            this.markedForDeletion = true;
        }
        zombie.markedForDeletion = true;
    }
}
