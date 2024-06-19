class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.assistance= [new Shooterassist(this,this.width*0.4, this.height-30,'left') , new Shooterassist(this, this.width*0.6, this.height-30,'right')]
        this.zombies = [];
        this.spawnZombie();
        this.powerups=[];
        this.defensiveItems = [];
        this.spawnpowerup();
        this.paused='false';
        this.score=0;
        this.gameOver='false';
        this.speed=2;
        this.preparationPhase = 'true';
        this.hitSound=new Audio('mixkit-sword-strikes-armor-2765.wav');
        this.powered=new Audio('mixkit-quick-positive-video-game-notification-interface-265_4afHzuGq.wav');
        window.addEventListener('load',()=>{
            this.gameOver=!this.gameOver;
            this.paused=!this.paused;
        })
        
        // Event listener for pause/play
        window.addEventListener('keydown', (event) => {
            if (event.key === 'p') {
                this.paused = !this.paused;
            }
            if (event.key === 'w') {
                this.player.switchWeapon();
            }
            if (event.key === '1') {
                this.player.selectItem('mine');
            }
            if (event.key === '2') {
                this.player.selectItem('trap');
            }
            if (event.key === '3') {
                this.player.selectItem('block');
            }
        });

        this.ctx.canvas.addEventListener('click', (e) => {
            if (this.preparationPhase) {
                const rect = this.ctx.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if(y>= this.height - 30)
                this.player.placeItem(x, y);
            }
        });
        this.loadLeaderboard();
    }

    spawnZombie() {
        if(Math.random() >= 0.5)
        this.zombies.push(new Zombie(this));
        else
        this.zombies.push(new climberZombie(this));
        setTimeout(() => this.spawnZombie(), 4500); 
    }

    spawnpowerup(){
        this.powerups.push(new powerup(this));
        setTimeout(() => this.spawnpowerup(), 15000);   
    }

    update(deltaTime) {
        if (this.paused || this.gameOver) return;

        this.player.update(deltaTime);
        this.zombies.forEach(zombie => zombie.update(deltaTime));
        this.powerups.forEach(powerup => powerup.update());
        this.player.projectiles.forEach(projectile => projectile.update());
        this.defensiveItems.forEach(item => item.update());
        this.checkCollisions();
    }

    draw() {
        this.assistance.forEach(assist =>{
            assist.draw(this.ctx);
        })
        this.player.draw(this.ctx);
        this.zombies.forEach(zombie => zombie.draw(this.ctx));
        this.powerups.forEach(powerup => powerup.draw(this.ctx));
        this.defensiveItems.forEach(item => item.draw(this.ctx));
         // Draw score
         this.ctx.fillStyle = 'white';
         this.ctx.font = '20px Arial';
         this.ctx.fillText(`Score: ${this.score}`, 10, 20);
         
         if (this.paused) {
             this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
             this.ctx.fillRect(0, 0, this.width, this.height);
             this.ctx.fillStyle = 'white';
             this.ctx.font = '40px Arial';
             this.ctx.fillText('Paused', this.width / 2 - 60, this.height / 2);
        }

        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '40px Arial';
            this.ctx.fillText('Game Over', this.width / 2 - 100, this.height / 2);
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Final Score: ${this.score}`, this.width / 2 - 60, this.height / 2 + 40);
            this.ctx.font='15px Arial';
            this.ctx.fillText(`LeaderBoard`,this.width/2 -40,this.height/2 + 60);
            this.ctx.font='10px Arial';
            this.leaderboard.forEach((score,index)=>{
                this.ctx.fillText(`${Number(index)+1}. ${score}`,this.width/2 -40 ,this.height/2 + 80 + index*15);
            })

        }
    }

    saveScore() {
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(this.score);
        scores.sort((a, b) => b - a);
        scores = scores.slice(0, 3); // top 3 scores
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    loadLeaderboard(){
        this.leaderboard=JSON.parse(localStorage.getItem('scores')) || [];
    }

    displayLeaderboard() {
        console.log('Leaderboard:');
        this.leaderboard.forEach((score, index) => {
            console.log(`${index + 1}. ${score}`);
        });
    }

    endGame() {
        // this.paused='true';
        this.gameOver = 'true';
        this.saveScore();
        this.loadLeaderboard();
        this.displayLeaderboard(); 

        const audio=document.getElementById('endgame');
        audio.play();
        setTimeout(()=>{
            audio.pause();
            audio.currentTime=0;
        },2000) ;
    }

    checkCollisions() {
        this.player.projectiles.forEach(projectile => {
            this.zombies.forEach(zombie => {
                if (this.isColliding(projectile, zombie)) {
                    this.hitSound.currentTime=0;
                    this.hitSound.play();
                    this.zombies = this.zombies.filter(z => z !== zombie);
                    this.score+=1;
                    this.player.projectiles = this.player.projectiles.filter(p => p !== projectile);
                }
            });
        });

        this.powerups.forEach((powerup, powerupIndex) => {
            if (this.isCollidingpowerup(this.player, powerup) && powerup.active) {
                this.powered.currentTime=0;
                this.powered.play();
                powerup.applypowerup();
                this.powerups.splice(powerupIndex, 1); // powerup collide player
            }
        }); 
        
        this.defensiveItems.forEach((item, itemIndex) => {
            this.zombies.forEach((zombie, zombieIndex) => {
                if (this.isColliding(item, zombie)) {
                    item.applyEffect(zombie);
                    if (item.markedForDeletion) {
                        this.defensiveItems.splice(itemIndex, 1);
                    }
                    if (zombie.markedForDeletion) {
                        this.zombies.splice(zombieIndex, 1);
                    }
                }
            });
        });

        this.assistance.forEach((assist,index) =>{
            if(assist.health <=0 || assist.markedforDeletion==='true'){
                this.assistance.splice(index,1);
            }
        })
    }

    isCollidingpowerup(player, powerup){
        return (
            ((player.x  <= powerup.x && player.x + player.width  >= powerup.x) ||
            player.x >= powerup.x && player.x <= powerup.x + powerup.width) &&
            player.y+player.width >= powerup.y
        );
    }

    isColliding(projectile, zombie){
        return (            
            projectile.x  < zombie.x + zombie.width &&
            projectile.x  > zombie.x &&
            projectile.y < zombie.y + zombie.height &&
            projectile.y  > zombie.y
        );
    }
}