class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 50;
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

    hurt(damage) {
        this.health -= damage;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}