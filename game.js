class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.zombies = [];
        this.spawnZombie();
        this.powerups=[];
        this.spawnpowerup();
        this.paused='false';
        this.score=0;
        this.gameOver='false';
        window.addEventListener('load',()=>{
            this.gameOver=!this.gameOver;
        })

        // Event listener for pause/play
        window.addEventListener('keydown', (event) => {
            if (event.key === 'p') {
                this.paused = !this.paused;
            }
        });
        this.loadLeaderboard();
    }

    spawnZombie() {
        this.zombies.push(new Zombie(this));
        setTimeout(() => this.spawnZombie(), 5000); 
        // this.checkCollisions();
    }

    spawnpowerup(){
        this.powerups.push(new powerup(this));
        setTimeout(() => this.spawnpowerup(), 15000);
        // this.checkCollisions();    
    }

    update() {
        if (this.paused || this.gameOver) return;

        this.player.update();
        this.zombies.forEach(zombie => zombie.update());
        this.powerups.forEach(powerup => powerup.update());
        this.player.projectiles.forEach(projectile => projectile.update());
        this.checkCollisions();
    }

    draw() {
        this.player.draw(this.ctx);
        this.zombies.forEach(zombie => zombie.draw(this.ctx));
        this.powerups.forEach(powerup => powerup.draw(this.ctx));
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
        }
    }

    saveScore() {
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(this.score);
        scores.sort((a, b) => b - a);
        scores = scores.slice(0, 5); // Keep top 5 scores
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
        
    }


    checkCollisions() {
        this.player.projectiles.forEach(projectile => {
            this.zombies.forEach(zombie => {
                if (this.isColliding(projectile, zombie)) {
                    
                    // Highlight the zombie and projectile on collision
                    // this.ctx.fillStyle = 'yellow';
                    // this.ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
                    // this.ctx.beginPath();
                    // this.ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
                    // this.ctx.fill();

                    // Remove zombie and projectile on collision
                    this.zombies = this.zombies.filter(z => z !== zombie);
                    this.score+=1;
                    this.player.projectiles = this.player.projectiles.filter(p => p !== projectile);
                }
            });
            // console.log(this.powerups);
        });

        this.powerups.forEach((powerup, powerupIndex) => {
            if (this.isCollidingpowerup(this.player, powerup) && powerup.active) {
                console.log('Collision detected!',this.player.health);
                powerup.applypowerup();
                this.powerups.splice(powerupIndex, 1); // Remove the power-up after applying effect
            }
        });        
    }

    isCollidingpowerup(player, powerup){
        //console.log('hi',player.x,powerup.x,powerup.y,player.y,player.width);
        return (
            ((player.x  <= powerup.x && player.x + player.width  >= powerup.x) ||
            player.x >= powerup.x && player.x - player.width <= powerup.x )&&
            player.y >= powerup.y+ player.width
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