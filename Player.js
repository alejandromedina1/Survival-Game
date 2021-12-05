class Player {
    constructor(column, row) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.inventory = [];
    }
    show() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, 50, 50)
        this.move();
        fill(255);
        rectMode(CENTER);
        if (this.takeRifle()) {
            fill(0, 255, 0);
            rect(this.x, this.y, 20, 20);
            this.inventory[0].show();
        }
        rectMode(CORNER);
    }

    takeRifle() {
        let equipped = false;
        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i] instanceof Weapon) {
                equipped = true;
            }
        }
        return equipped;
    }

    shoot() {
        if (this.takeRifle()) {
            this.inventory[0].shoot();
        }
    }

    move(mapReference, key) {
        switch (key) {
            case 'a' || 'A':
                if (this.column - 1 >= 0 && mapReference[this.row][this.column - 1] === 0) {
                    this.column--;
                }
                break;
            case 'd' || 'D':
                if (this.column + 1 < 24 && mapReference[this.row][this.column + 1] === 0) {
                    this.column++;
                }
                break;
            default:
                break;
        }
        switch (key) {
            case 'w' || 'W':
                if (this.row - 1 >= 0 && mapReference[this.row - 1][this.column] === 0) {
                    this.row--;
                }
                break;
            case 's' || 'S':
                if (this.row + 1 < 14 && mapReference[this.row + 1][this.column] === 0) {
                    this.row++;
                }
                break;
            default:
                break;
        }
        this.updateCoords();
        if (this.takeRifle()) {
            this.inventory[0].updatePos(this.x, this.y);
        }
    }

    addToInventory(newItem) {
        this.inventory.push(newItem);
    }

    updateCoords() {
        this.x = (this.column * 50) + 25;
        this.y = (this.row * 50) + 25;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getInventory() {
        return this.inventory;
    }
    
    getRifle() {
        if (this.takeRifle()) {
            return this.inventory[0]
        }
        return null;
    }
}