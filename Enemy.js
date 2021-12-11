class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 5000;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 25, 25);
        fill(255);
        fill(0);
        text(this.health, this.x, this.y + 30);
    }

    move(player) {
        if (player.getX() > this.x) {
            this.x++;
        } else {
            this.x--;
        }
        if (player.getY() > this.y) {
            this.y++;
        } else {
            this.y--;
        }
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