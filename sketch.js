let map = new Map();
let imgPlayer = [4];
let imgGunPlayer = [4];
let imgGun = [1];
let imgEnemy = [];
let player = new Player(12, 7);
let horde = [];


function setup() {
  createCanvas(1200, 700);
  for (let i = 0; i < 100; i++) {
    horde.push(new Enemy(random( -300, -100), random(0, 700)));
    horde.push(new Enemy(random( 0,1200), random(-300, -100)));
    horde.push(new Enemy(random( 1300, 1500), random(0, 700)));
    horde.push(new Enemy(random( 0,1200), random(800, 1000)));
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
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i]);
  }
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

function mouseIsPressed(){
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i], "RIGHT");
  }

}

function keyPressed() {
  player.move(map.getGround(), key);
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i],key);
  }
}