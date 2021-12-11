let map = new Map();
let player = new Player(12, 7);
let horde = [];

function preload(){
  //Base player images
  imgFP = loadImage("imagenes/NF.png");
  imgBP = loadImage("imagenes/NB.png");
  imgLP = loadImage("imagenes/NL.png");
  imgRP = loadImage("imagenes/NR.png");

  //Bolillo player images
  imgFPB = loadImage("imagenes/NF_Bolillo de frente.png");
  imgLPB = loadImage("imagenes/NL_Bolillo de lado.png");
  imgRPB = loadImage("imagenes/NR_Bolillo de lado.png");

  //Rifle player images
  imgFPR = loadImage("imagenes/NF_Rifle.png");
  imgLPR = loadImage("imagenes/NL_Rifle.png");
  imgRPR = loadImage("imagenes/NR_Rifle.png");

  //Zombie
  imgZombie = loadImage ("imagenes/Zombie.png");

  //Med kit
  imgMedKit = loadImage ("imagenes/Botiquín.png")


}
function setup() {
  createCanvas(1200, 700);
  for (let i = 0; i < 4; i++) {
    horde.push(new Enemy(1,1));
  }
}

function draw() {
  background(220);
  map.show();
  horde.forEach(enemy => {
    enemy.show(player);

  });
  player.show();
  takeWeapon();
  takeAid();
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

function keyPressed() {
  player.move(map.getGround(), key);
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i], key);
  }
}

function mousePressed(){
  player.shoot();
}