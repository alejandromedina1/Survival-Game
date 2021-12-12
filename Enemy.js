class Enemy {
    constructor(column, row,zombieImg) {
        this.row = row;
        this.column = column
        this.zombieImg = zombieImg;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.health = 250;
    }

    show(player) {
        imageMode (CENTER);
        image(this.zombieImg, this.x, this.y, 50, 80);
        this.move(player);
        fill(0);
        text(this.health, this.x - 10, this.y - 45);
        fill(255);
    }

    move(player) {
        for (let i = 0; i < player.length; i++) {
            if (frameCount % 20 === 0) {
                if (this.x < player[i].getX()) {
                    this.column = this.column + 1;
                }
                if (this.x > player[i].getX()) {
                    this.column = this.column - 1;
                }
                if (this.y < player[i].getY()) {
                    this.row = this.row + 1;
                }
                if (this.y > player[i].getY()) {
                    this.row = this.row - 1;
                }
                this.updateCoords();
            }
        }
    }

    updateCoords() {
        this.x = (this.column * 50) + 25;
        this.y = (this.row * 50) + 25;
    }

    hitBox(player) {
        for (let i = 0; i < player.length; i++) {
            let rifleReference = player[i].getRifle();
        if (rifleReference !== null) {
            let bullets = rifleReference.getAmmo();
            bullets.forEach(bullet => {
                if (bullet.getActive() && dist(this.x, this.y, bullet.getX(), bullet.getY()) <= 30) {
                    this.hurt(10);
                }
            });
        } 
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

    getHealth() {
        return this.health;
    }
}