class Player {
    constructor(game) {
        this.game = game;
        this.x = this.game.width / 2;
        this.y = this.game.height - 115;
        this.width = 100;
        this.height = 100;
        this.speed = 7;
        this.dx = 0;
        this.dy = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.isJumping = false;
        this.health = 100;
        this.imgright=document.getElementById('player');
        this.imgleft=document.getElementById('playerRight');
        this.jumpimage=document.getElementById('jumpright');
        this.jumpimageleft=document.getElementById('jumpleft');
        this.initControls();
        this.projectiles = [];
        this.spritewidth=170.75;
        this.spriteheight=243;
        this.spritelength=172.33;
        this.spritedepth=173;
        this.framehorizontal=0;
        this.frameMax=5;
        this.ftimer=0;
        this.finterval=1000/(5 + 10*Math.random());
        this.shootDelay = 500; 
        this.lastShot = Date.now();
        this.facingDirection = 'right'; 
        this.immunity='false';
        this.jumpCount=0;
        this.weapons = [new ranger(this), new shotgun(this)];
        this.currentWeaponIndex = 0;
        this.currentWeapon = this.weapons[this.currentWeaponIndex];
        this.inventory = new inventory(this);
        this.frameX=0;
        this.jumpMax=4;
        this.frametimer=0;
        this.fps= 5+ Math.random()*10;
        this.frameinterval= 1000/this.fps ;
        this.moving=false;
        this.ammo1 = 30; 
        this.ammo2= 20;
        this.maxAmmo1 = 30;
        this.maxAmmo2= 20;
        this.fuel = 100; 
        this.maxFuel = 100;
    }

    initControls() {
        window.addEventListener('keyup', (e) => {
            this.moving=false;
            if (e.key === 'ArrowRight') {
                this.dx = 0;
                this.facingDirection='right';
            }else if( e.key === 'ArrowLeft'){
                this.dx = 0;
                this.facingDirection='left';
            }
        });

        window.addEventListener('keydown', (e) => {
            this.moving=true;
            if (e.key === 'ArrowRight') {
                this.dx = this.speed;
                this.facingDirection = 'right';
            }
            if (e.key === 'ArrowLeft') {
                this.dx = -this.speed;
                this.facingDirection = 'left';
            }
            if (e.key === ' ' || e.key==='ArrowUp') {
                if(this.fuel >0){
                if(this.jumpCount < 3){
                this.dy = this.jumpStrength;
                this.jumpCount++;
                this.isJumping = true;
                }
                else{
                    setTimeout(()=>{
                        this.jumpCount=0;
                    },1000)
                }
            }
            }

            if (e.key === 'f') {
                if((this.currentWeaponIndex ===0 && this.ammo1 > 0) || (this.currentWeaponIndex ===1 && this.ammo2 > 0))
                this.shoot(this.facingDirection);

                if(this.currentWeaponIndex ===0){
                    if(this.ammo1 > 0)
                    this.ammo1 -=1;
                }else{
                    if(this.ammo2 >0)
                    this.ammo2 -=1;
                }
            }
            
        });
    }

    update(deltaTime) {
        this.x += this.dx;
        this.dy += this.gravity;
        this.y += this.dy;
        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height;
            this.dy = 0;
            this.isJumping = false;
        }

        if(this.isJumping){
            if(this.frametimer > this.frameinterval){
                this.frameX++;
                this.frametimer=0;
            }else{
                this.frametimer+= deltaTime ;
            }
    
            if(this.frameX < this.jumpMax){
                
                // this.markedfordeletion= true;
            }else{
                this.frameX=0;
            } 
        }else{
            if(this.moving){
                if(this.ftimer > this.finterval){
                    this.framehorizontal++;
                    this.ftimer=0;
                }else{
                    this.ftimer+= deltaTime ;
                }
        
                if(this.framehorizontal < this.frameMax){
                    
                    // this.markedfordeletion= true;
                }else{
                    this.framehorizontal=0;
                } 
            }else{
                this.framehorizontal=0;
            }
        }

        if (this.isJumping && this.fuel > 0) {
            this.fuel -= 0.7;
        }
        
        this.projectiles.forEach(projectile => projectile.update());
        this.projectiles = this.projectiles.filter(projectile => projectile.y > 0);
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font='15px "Press start 2P"';
        ctx.fillText('Fuel',10,62);
        if(this.currentWeaponIndex === 0)
        ctx.fillText(`ShotGun`,10, 82);
        else
        ctx.fillText(`Ranger`,10, 82);

        ctx.fillStyle = 'blue';
        ctx.fillRect(70, 50, this.fuel, 10);

        ctx.fillStyle='orange';
        if(this.currentWeaponIndex === 0)
            ctx.fillRect(120,70,this.ammo1 * 3.33, 10);
        else
            ctx.fillRect(110,70,this.ammo2 * 5, 10);

        if(this.facingDirection==='right' && !this.isJumping){
            ctx.drawImage(this.imgright,this.framehorizontal * this.spritelength,0,this.spritelength,this.spritedepth,this.x,this.y,this.width,this.height);
        }else if(this.isJumping && this.facingDirection==='right'){
            ctx.drawImage(this.jumpimage,this.frameX * this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
        }else if(this.facingDirection ==='left' && !this.isJumping){
            ctx.drawImage(this.imgleft,this.framehorizontal * this.spritelength,0,this.spritelength,this.spritedepth,this.x,this.y,this.width,this.height);
        }else if(this.facingDirection ==='left' && this.isJumping){
            ctx.drawImage(this.jumpimageleft,this.frameX * this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
        }
        this.projectiles.forEach(projectile => projectile.draw(ctx));
        this.inventory.draw(ctx);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - 5, this.width * (this.health / 100), 5);
    }

    shoot(direction) {
        this.currentWeapon.shoot(this.x, this.y, direction);
    }

    switchWeapon() {
        this.currentWeaponIndex = (this.currentWeaponIndex + 1) % this.weapons.length;
        this.currentWeapon = this.weapons[this.currentWeaponIndex];
        console.log(`Switched to ${this.currentWeapon.name}`);
    }

    placeItem(x, y){
        this.inventory.placeItem(x, y);
    }

    selectItem(item) {
        this.inventory.selectItem(item);
    }
}