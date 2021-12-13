class Aid{
    constructor(column, row, imgMedKit) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.imgMedKit = imgMedKit;
    }

    show() {
        rectMode(CENTER);
        fill(0, 255, 0);
        image(this.imgMedKit, this.x, this.y, 50, 50);
        fill(255);
        rectMode(CORNER);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    updatePos(nx, ny) {
        this.x = nx;
        this.y = ny;
    }
}