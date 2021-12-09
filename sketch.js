let map = new Map();
let player = new Player( 1, 0, loadImage('/imagenes/NF.png'));
let horde = [];
let imgPlayer = [4];
let imgGunPlayer = [4];
let imgGun = [1];
let imgEnemy = [];

function setup() {
  createCanvas(1200, 700);
  for (let i = 0; i < 10; i++) {
    horde.push(new Enemy(random(-10, 1210), random(-10, 710)));
  }
}

function draw() {
  background(220);
  map.show();
  horde.forEach(enemy => {
    enemy.show();
    enemy.move(player);

  });
  player.show();
  takeWeapon();
  takeAid();
  player.shoot();
  enemyDie();
  player.hitBox(horde);
}

function enemyDie() {
  for (let i = 0; i < horde.length; i++) {
    horde[i].hitBox(player);
    if (horde[i] !== undefined && horde[i].getHealth() <= 0) {
      horde.splice(i, 1);
    }
  }
}


function takeWeapon() {
  if (map.getRifle() !== null) {
    if (dist(map.getRifle().getX(), map.getRifle().getY(), player.getX(), player.getY()) < 50) {
      player.addToInventory(map.getRifle());
      map.freeRifle();
    }
  }
}

function takeAid() {
  if (map.getAid() !== null) {
    if (dist(map.getAid().getX(), map.getAid().getY(), player.getX(), player.getY()) < 50) {
      map.freeAid();
      player.setHealth();
    }
  }
}

function keyPressed() {
  player.move(map.getGround(), key);
}