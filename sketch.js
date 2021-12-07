let map = new Map();
let player = new Player(1, 0);
let horde = [];

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
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      player.shoot();
    }
  }
  enemyHitBox();
  playerHitBox();
}

function enemyHitBox() {
  for (let i = 0; i < horde.length; i++) {
    let rifleReference = player.getRifle();
    if (rifleReference !== null) {
      let bullets = rifleReference.getAmmo();
      bullets.forEach(bullet => {
        if (bullet.getActive() && dist(horde[i].getX(), horde[i].getY(), bullet.getX(), bullet.getY()) < 10) {
          horde[i].hurt(10);
          bullet.deactivate();
          if (horde[i].getHealth() <= 0) {
            horde.splice(i,1);
          }
        }
      });
    }
  }
}

function playerHitBox(){
  for (let i = 0; i < horde.length; i++) {
    if (dist(player.getX(),player.getY(), horde[i].getX(), horde[i].getY())<45) {
      player.hurt(1);
      if (player.getHealth()<=0) {
        console.log("GAME OVER");
      }
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

function keyPressed() {
  player.move(map.getGround(), key);
}