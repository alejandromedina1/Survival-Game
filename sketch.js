let map = new Map();
let horde = [];
let player;

//Imagenes
let imgFP;
let imgBP;
let imgLP;
let imgRP;
let imgFPB;
let imgLPB;
let imgRPB;
let imgFPR;
let imgLPR;
let imgRPR;
let imgZombie;
let imgMedKit;
let imgRifle;
  
function setup() {
  createCanvas(1200, 700);
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
   imgMedKit = loadImage ("Botiquín.png");

   //Rifle
   imgRifle= loadImage ("AK-47.png");
   
  player = new Player(12, 7, imgFP, imgBP, imgRP, imgLP);

  for (let i = 0; i < 4; i++) {
    horde.push(new Enemy(1,1, imgZombie));
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