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
  imgZombie = loadImage("ZombieAlas.png");

  //Med kit
  imgMedKit = loadImage("Botiquín.png");

  //Rifle
  imgRifle = loadImage("AK-47.png");

  player = new Player(12, 7, imgFP, imgBP, imgRP, imgLP);
  for (let i = 0; i < 4; i++) {
    horde.push(new Enemy(1, 1, imgZombie));
  }

}

function draw() {
  background(220);
  switch (screen) {
    case 0: // Pantalla inicial

      break;
    case 1: // Instrucciones

      break;
    case 2: // Nivel 1
      map.ground(0);
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
      break;
    case 3: // Pista 1

      break;
    case 4: // Nivel 2
      map.ground(1);
      map.show();
      break;
    case 5: // Pista 2

      break;
    case 6: // Nivel 3
      map.ground(2);
      map.show();
      break;
    case 7: // Pista 3

      break;
    case 8: // Nivel 4
      map.ground(3);
      map.show();
      break;
    case 9: // Pista 4

      break;
    case 10: // Nivel 5
      map.ground(4);
      map.show();
      break;
    case 11: // Pista 5

      break;
    case 12: // Nivel 6
      map.ground(5);
      map.show();
      break;
    case 13: // Game Over

      break;
    case 14: // Victory

      break;
    default:
      screen = 2;
      break;
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
//Movimiento del personaje y ataque cuerpo a cuerpo
function keyPressed() {
  player.move(map.getLevel(), key);
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i], key);
  }
}

function mousePressed() {
  player.shoot();
}