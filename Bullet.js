class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.activate = true;
    }

    show() {
        fill(0, 255, 0);
        circle(this.x, this.y, 5);
        fill(255);
        this.move();
    }
    move() {
        this.x++;
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