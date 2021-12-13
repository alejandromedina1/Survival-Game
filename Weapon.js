class Weapon {
    constructor(column, row, akImg) {
        this.row = row;
        this.column = column;
        this.x = (column * 50) + 25;
        this.y = (row * 50) + 25;
        this.ammo = []
        this.akImg = akImg;
        this.width = 50;
        this.height = 25;
    }

    show() {
       image(this.akImg, this.x, this.y, this.width, this.height);
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

    setWidth(nW){
        this.width = nW;
    }

    setHeight(nH){
        this.height = nH;
    }

    updatePos(nx, ny) {
        this.x = nx;
        this.y = ny;
    }
}