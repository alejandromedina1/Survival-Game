class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.activate = true;
        this.diameter = 5;
    }

    show() {
        fill(0, 255, 0);
        noStroke();
        circle(this.x, this.y, this.diameter);
        fill(255);
        this.move();
        stroke(0);
    }
    move() {
        let a = atan2(mouseX - this.x, mouseY - this.y);
        this.x = this.x + 20 * sin(a);
        this.y = this.y + 20 * cos(a);
        if (dist(this.x,this.y,mouseX,mouseY) < 20) {
            this.activate = false;
            this.diameter = 0;
        }
    }
    deactivate() {
        this.activate = false;
    }
    getActive() {
        return this.activate;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}