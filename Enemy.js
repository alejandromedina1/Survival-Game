class Enemy {
    constructor(column, row, zombieImg) {
        this.row = row;
        this.column = column
        this.zombieImg = zombieImg;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.health = 250;
        this.width = 50;
        this.height = 80
    }

    show() {
        imageMode(CENTER);
        image(this.zombieImg, this.x, this.y, this.width, this.height);
        fill(0);
        text(this.health, this.x - 10, this.y - 45);
        fill(255);
    }

    move(player) {
        if (frameCount % 20 === 0) {
            if (this.x < player.getX()) {
                this.column = this.column + 1;
            }
            if (this.x > player.getX()) {
                this.column = this.column - 1;
            }
            if (this.y < player.getY()) {
                this.row = this.row + 1;
            }
            if (this.y > player.getY()) {
                this.row = this.row - 1;
            }
            this.updateCoords();
        }
    }

    updateCoords() {
        this.x = (this.column * 50) + 25;
        this.y = (this.row * 50) + 25;
    }

    hitBox(player) {
        let rifleReference = player.getRifle();
            if (rifleReference !== null) {
                let bullets = rifleReference.getAmmo();
                bullets.forEach(bullet => {
                    if (bullet.getActive() && dist(this.x, this.y, bullet.getX(), bullet.getY()) <= 35) {
                        this.hurt(50);
                    }
                });
            }
    }

    hurt(damage) {
        this.health -= damage;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    setRow(nRow){
        this.row = nRow;
    }
    setColumn(nColumn){
        this.column = nColumn;
    }

    getHealth() {
        return this.health;
    }
    setHealth(nHealth){
        this.health = nHealth
    }
    setWidth(nW){
        this.width = nW;
    }
    setHeight(nH){
        this.height = nH;
    }
}