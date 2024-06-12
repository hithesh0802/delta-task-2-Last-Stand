class defense{
    constructor(game,x,y){
        this.game=game;
        this.x=x;
        this.y=y;
        this.width=20;
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

        this.lifespan = 15000; // Mine lasts for 5 seconds
        this.creationTime = Date.now();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        super.draw(ctx);
    }

    update() {
        // Logic for mine activation (e.g., explode when a zombie steps on it)
        if (Date.now() - this.creationTime > this.lifespan) {
            this.markedForDeletion = true; // Remove the mine after its lifespan
        }
    }

    applyEffect(zombie) {
        // Mine explodes and removes both itself and the zombie
        this.markedForDeletion = true;
        zombie.markedForDeletion = true;
        // Optionally, you can add explosion effect here
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
        // Logic for trap activation (e.g., slow down zombies)

        this.lifespan = 20000; // Trap lasts for 10 seconds
        this.creationTime = Date.now();
    }

    applyEffect(zombie) {
        // Trap slows down the zombie
        zombie.speed *= 0.5;
        this.markedForDeletion = true;
    }
}

class Block extends defense{
    constructor(game, x, y) {
        super(game, x, y);
        this.color = 'grey';
        this.durability = 2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        super.draw(ctx);
    }

    update() {
        // Blocks might not need any update logic
    }

    applyEffect(zombie) {
        // Block stops the zombie
        this.durability -= 1; // Decrease durability each time a zombie hits it
        if (this.durability <= 0) {
            this.markedForDeletion = true;
        }
        zombie.markedForDeletion = true;
    }
}
