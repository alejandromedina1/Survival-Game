let map = new Map();
let horde = [];
let player;

function preload(){
  //Base player images
  imgFP = loadImage("NF.png");
  imgBP = loadImage("NB.png");
  imgLP = loadImage("NL.png");
  imgRP = loadImage("NR.png");

  //Bolillo player images
  imgFPB = loadImage("NF_Bolillo de frente.png");
  imgLPB = loadImage("NL_Bolillo de lado.png");
  imgRPB = loadImage("NR_Bolillo de lado.png");

  //Rifle player images
  imgFPR = loadImage("NF_Rifle.png");
  imgLPR = loadImage("NL_Rifle.png");
  imgRPR = loadImage("NR_Rifle.png");

  //Zombie
  imgZombie = loadImage ("Zombie.png");

  //Med kit
  imgMedKit = loadImage ("Botiquín.png")


}
function setup() {
  createCanvas(1200, 700);
  let player = new Player(12, 7, imgFP, imgBP, imgRP, imgLP);
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
  preload();
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