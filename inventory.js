class inventory {
    constructor(player) {
        this.player = player;
        this.items = {
            mine: 5,
            trap: 5,
            block: 5
        };
        this.selectedItem = 'mine';
    }

    selectItem(item) {
        if (this.items[item] > 0) {
            this.selectedItem = item;
        }
    }

    placeItem(x, y) {
        if (this.items[this.selectedItem] > 0) {
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
            this.items[this.selectedItem]--;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Mines: ${this.items.mine}`, 10, 40);
        ctx.fillText(`Traps: ${this.items.trap}`, 10, 60);
        ctx.fillText(`Blocks: ${this.items.block}`, 10, 80);
        ctx.fillText(`Selected: ${this.selectedItem}`, 10, 100);
    }
}
