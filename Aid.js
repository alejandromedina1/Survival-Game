class Aid{
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
    }

    show() {
        rectMode(CENTER);
        fill(0, 255, 0);
        rect(this.x, this.y, 20, 20);
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