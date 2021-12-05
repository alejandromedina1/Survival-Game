class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.health = 50;
    }

    show() {

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