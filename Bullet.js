class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.activate = true;
    }
    show() {

    }
    deactivate() {
        this.activate = false;
    }
    getActive() {
        return this.activate;
    }
    move() {
        this.x++;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}