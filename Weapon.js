class Weapon {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.ammo = []
    }

    show() {
        rectMode(CENTER);
        fill(0, 255, 0);
        rect(this.x, this.y, 20, 20);
        fill(255);
        rectMode(CORNER);
        for (let i = 0; i < this.ammo.length; i++) {
            const bullet = this.ammo[i];
            bullet.show();
            bullet.move();
        }
    }

    getAmmo() {
        return this.ammo;
    }

    shoot() {
        let nBullet = new Bullet(this.x, this.y);
        this.ammo.push(nBullet);
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