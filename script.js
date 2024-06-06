window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas1');
    const ctx= canvas.getContext('2d');
    canvas.width = 500;
    canvas.height= 500;

    class Game{
        constructor(width,height){
            this.width= width;
            this.height= height;
            
        }
    //     update(deltaTime){
    //         this.time += deltaTime;
    //         if(this.time > this.maxTime){
    //             this.gameOver=true;
    //         }
    //         this.backGround.update();
    //         this.player.update(this.input.keys , deltaTime);
    //         //handle enemies
    //         if(this.enemyTimer > this.enemyInterval){
    //             this.addEnemy();
    //             this.enemyTimer=0;
    //         }else{
    //             this.enemyTimer += deltaTime;
    //         }
    //         this.enemies.forEach(enemy => {
    //             enemy.update(deltaTime);
    //             if(enemy.markedforDeletion) this.enemies.splice(this.enemies.indexOf(enemy) ,1) ;
    //         })
    //         //handle particles
    //         this.particles.forEach((particle, index) =>{
    //             particle.update();
    //             if(particle.markedforDeletion) this.particles.splice(index,1) ;
    //         });
    //         if(this.particles.length > this.maxParticles){
    //             this.particles.length= this.maxParticles;
    //         }
    //         //handle collisions
    //         this.collisions.forEach((collision,index) =>{
    //             collision.update(deltaTime);
    //             if (collision.markedforDeletion) this.collisions.splice(index,1);
    //         })

    //     }
    //     draw(context){
    //         this.backGround.draw(context);
    //         this.player.draw(context);
    //         this.enemies.forEach(enemy => {
    //             enemy.draw(context);
    //         })
    //         this.UI.draw(context);

    //         this.particles.forEach(particle => {
    //             particle.draw(context);
    //         })

    //         this.collisions.forEach(collision => {
    //             collision.draw(context);
    //         })
    //     }
    //     addEnemy(){
    //         if(this.speed > 0 && Math.random() <0.5) this.enemies.push(new GroundEnemy(this));
    //         else if(this.speed >0) this.enemies.push(new ClimbingEnemy(this));
    //         this.enemies.push(new FlyingEnemy(this));
            
    //     }
    }

    const game= new Game(canvas.width, canvas.height);
    let lastTime =0;

    function animate(timeStamp){
        const deltaTime= timeStamp- lastTime ;
        lastTime= timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver)requestAnimationFrame(animate);
    }
    animate(0);

})