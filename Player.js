class Player {
    constructor(column, row) {
        this.row = row;
        this.column = column;
        this.x = (column * 50)+25;
        this.y = (row * 50)+25;
        this.inventory = [];
    }

    show() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, 50, 50)
        this.move();
        fill(255);
    }

    move(mapReference, key) {
        switch (key) {
            case 'a':
                if (this.column-1 >= 0 && mapReference[this.row][this.column-1] === 0) {
                    this.column--;
                }
                break;
            case 'd':
                if (this.column+1 < 24 && mapReference[this.row][this.column+1] === 0) {
                    this.column++;
                }
                break;
            case 'w':
                if (this.row-1 > 0 && mapReference[this.row-1][this.column] === 0) {
                    this.row--;
                }
                break;
            case 's':
                if (this.row+1 < 14 && mapReference[this.row+1][this.column] === 0) {
                    this.row++;
                }
                break;
            case 'x':

                break;

            default:
                break;
        }
        this.updateCoords();
    }

    updateCoords() {
        this.x=(this.column *50) +25;
        this.y=(this.row*50)+25;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}