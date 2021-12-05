class Weapon {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 50;
        this.y = (row * 50) + 50
        this.ammo = []
    }

    show() {

    }

    getAmmo() {
        return this.ammo;
    }

    shoot() {
        let newBullet = new Bullet(this.x, this.y);
        this.ammo.push(newBullet);
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