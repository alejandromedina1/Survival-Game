class Player {
    constructor() {
        this.dirX = 0;
        this.dirY = 0;
        this.x = 600 + this.dirX;
        this.y = 200 + this.dirY;
        this.inventory = [];
    }

    show() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, 50, 50)
        this.move();
    }

    move(key) {
        switch (key) {
            case 'a':
                if (condition) {
                    
                }
                this.dirX = -5;
                this.dirY = 0;
                break;
            case 'd':
                this.dirX = +5;
                this.dirY = 0;
                break;
            case 'w':
                this.dirY = -5;
                this.dirX = 0;
                break;
            case 's':
                this.dirY = +5;
                this.dirX = 0;
                break;
            case 'x':
                this.dirY = 0;
                this.dirX = 0;
                break;

            default:
                break;
        }
        this.updateCoords();
    }

    updateCoords() {
        this.x = this.x + this.dirX;
        this.y = this.y + this.dirY;
    }
}