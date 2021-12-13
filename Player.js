class Player {
    constructor(column, row, imgFront, imgBackward, imgRight, imgLeft) {
        this.row = row;
        this.column = column;
        this.imgFront = imgFront;
        this.imgBackward = imgBackward;
        this.imgRight = imgRight;
        this.imgLeft = imgLeft;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.inventory = [];
        this.health = 100;
    }
    show() {
        imageMode(CENTER); 
        switch (key) {
            case 'a' || 'A': //Lateral izquierda
                this.x = (this.column * 50) + 25; //
                this.y = (this.row * 50) + 25;
                image(this.imgLeft, this.x, this.y, 37, 50);
                break;
            case 'w' || 'W': // Trasera
                this.x = (this.column * 50) + 25; //
                this.y = (this.row * 50) + 25;
                image(this.imgBackward, this.x, this.y, 37, 50);
                break;
            case 'd' || 'D': //Lateral derecha
                this.x = (this.column * 50) + 25; //
                this.y = (this.row * 50) + 25;
                image(this.imgRight, this.x, this.y, 37, 50);
                break;
            case 's' || 'S': //Frontal
                this.x = (this.column * 50) + 25; //
                this.y = (this.row * 50) + 25;
                image(this.imgFront, this.x, this.y, 37, 50);
                break;
            default:
                image(this.imgFront, this.x, this.y, 37, 50);
                break;
        }
        this.move();
        fill(255);
        rectMode(CENTER);
        if (this.takeRifle()) {
            fill(0);
            rect(this.x, this.y, 20, 20);
            this.inventory[0].showObj();
        }
        rectMode(CORNER);
        fill(0);
        text(this.health, this.x - 10, this.y - 45);
        fill(255);
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

    closeAttack(enemy, key) {
        let active = false;
        if (key === 'q' || key === 'Q') {
            active = true
            if (active === true && dist(this.x, this.y, enemy.getX(), enemy.getY()) < 100) {
                enemy.hurt(500);
                active = false;
            }
            active = false;
        }
    }

    shoot() {
        if (this.takeRifle()) {
            this.inventory[0].shoot();
        }
    }

    move(mapReference, key) {
        switch (key) {
            case 'a' || 'A':
                if (this.column - 1 >= 0 && mapReference[this.row][this.column - 1] !== 1) {
                    this.column--;
                }
                break;
            case 'd' || 'D':
                if (this.column + 1 < 24 && mapReference[this.row][this.column + 1] !== 1) {
                    this.column++;
                }
                break;
            default:
                break;
        }
        switch (key) {
            case 'w' || 'W':
                if (this.row - 1 >= 0 && mapReference[this.row - 1][this.column] !== 1) {
                    this.row--;
                }
                break;
            case 's' || 'S':
                if (this.row + 1 < 14 && mapReference[this.row + 1][this.column] !== 1) {
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

    changeLevel(mapReference){
        if (mapReference [this.row][this.column] === 2) {
            return true;
        }
    }

    showClue(mapReference){
        if (mapReference [this.row][this.column] === 3) {
            return true;
        }
    }

    getX() {
        return this.x;
    }

    hitBox(enemy) {
        for (let i = 0; i < enemy.length; i++) {
            if (dist(this.x, this.y, enemy[i].getX(), enemy[i].getY()) < 25) {
                if (frameCount % 60 === 0) {
                    this.hurt(5);   
                }
            }
        }
    }
    getY() {
        return this.y;
    }
    getY() {
        return this.y;
    }
    getRow() {
        return this.row;
    }
    getColumn() {
        return this.column;
    }
    setRow(nRow){
        this.row = nRow;
    }
    setColumn(nColumn){
        this.column = nColumn;
    }
    getInventory() {
        return this.inventory;
    }
    getRifle() {
        if (this.takeRifle()) {
            return this.inventory[0];
        }
        return null;
    }
    hurt(damage) {
        this.health -= damage;
    }
    getHealth() {
        return this.health;
    }
    setHealth(nHealth) {
        this.health = nHealth;
    }
}