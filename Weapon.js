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
        fill(0);
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
        for (let i = 0; i < this.ammo.length; i++) {
            const bullet = this.ammo[i];
            switch (bullet.getX()) {
                case bullet.getX() < 0:
                    this.ammo.splice(bullet, 1);
                    break;
                case 1200 < bullet.getX():
                    this.ammo.splice(bullet, 1);
                    break;
                case bullet.getY() < 0:
                    this.ammo.splice(bullet, 1);
                    break;
                case 700 < bullet.getY():
                    this.ammo.splice(bullet, 1);
                    break;
                default:
                    break;
            }
        }
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