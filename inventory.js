class inventory {
    constructor(player) {
        this.player = player;
        this.items = {
            mine: { count: 5, img: new Image() },
            trap: { count: 4, img: new Image() },
            block: { count: 3, img: new Image() }
        };
        this.items.mine.img.src = 'WhatsApp Image 2024-06-22 at 08.24.47.jpeg';
        this.items.trap.img.src = 'trap.jpg';
        this.items.block.img.src = 'WhatsApp Image 2024-06-22 at 08.21.35.jpeg';
        this.selectedItem = 'mine';
    }

    selectItem(item) {
        if (this.items[item].count > 0) {
            this.selectedItem = item;
        }
    }

    placeItem(x, y) {
        if (this.items[this.selectedItem].count > 0) {
            switch (this.selectedItem) {
                case 'mine':
                    this.player.game.defensiveItems.push(new Mine(this.player.game, x, y));
                    break;
                case 'trap':
                    this.player.game.defensiveItems.push(new Trap(this.player.game, x, y));
                    break;
                case 'block':
                    this.player.game.defensiveItems.push(new Block(this.player.game, x, y));
                    break;
            }
            this.items[this.selectedItem].count--;
        }
    }

    draw(ctx) {
        const startX = this.player.game.width - 200; 
        const startY = 20; 
        const itemWidth = 50; 
        const itemHeight = 50; 
        let x = startX;
        let y = startY;

        Object.keys(this.items).forEach((item, index) => {
            ctx.strokeStyle = this.selectedItem === item ? 'yellow' : 'white';
            ctx.strokeRect(x, y, itemWidth, itemHeight);
            ctx.drawImage(this.items[item].img, x, y, itemWidth, itemHeight);
            ctx.fillStyle = 'white';
            ctx.font = '15px "Press Start 2P"';
            ctx.fillText(this.items[item].count, x + itemWidth - 15, y + itemHeight - 5);
            x += itemWidth + 10; 
            if (x > this.player.game.width - 50) { 
                x = startX;
                y += itemHeight + 10;
            }
        });

        ctx.fillStyle = 'white';
        ctx.font = '15px "Press Start 2P"';
        ctx.fillText(`Selected: ${this.selectedItem}`, startX -30, y  + 20);
    }
}
