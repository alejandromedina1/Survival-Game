class Enemy {
    constructor(column, row) {
        this.row = row;
        this.column = column
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.health = 250;
    }

    show(player) {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 25, 25);
        fill(255);
        fill(0);
        this.move(player);
        text(this.health, this.x, this.y + 30);
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
                if (bullet.getActive() && dist(this.x, this.y, bullet.getX(), bullet.getY()) <= 30) {
                    this.hurt(10);
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

    getHealth() {
        return this.health;
    }
}