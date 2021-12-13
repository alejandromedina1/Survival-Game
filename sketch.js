//AkaGuille
let map;
let horde = [];
let player;
let clue;

//Pista del nivel 1 ( cofre del tesoro)
let hint;

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
//Imagenes mapas
let imgCity;
let imgShip;
let imgForest;
let imgRoad;
let imgGraveyard;
let imgBeach;

//Pistas
let imgHint1;
let imgHint2;
let imgHint3;
let imgHint4;
let imgHint5;

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

  //Mapas
  imgCity = loadImage("Mapaciudad.png");
  imgShip = loadImage("Barco.png");
  imgForest = loadImage("Bosque.png");
  imgRoad = loadImage("Carretera.png");
  imgGraveyard = loadImage("Cementerio.png");
  imgBeach = loadImage("Playa.png");

  //Pistas
  imgHint1 = loadImage("Pista 1.png");
  imgHint2 = loadImage("Pista 2.png");
  imgHint3 = loadImage("Pista 3.png");
  imgHint4 = loadImage("Pista 4.png");
  imgHint5 = loadImage("Pista 5.png");

  map = new Map(12, 7, 8, 8);

  hint = loadImage("Clue.png");
  clue1 = new Clue(590, 430);
  clue2 = new Clue();
  clue3 = new Clue();
  clue4 = new Clue();
  clue5 = new Clue();

  let xP = 21;
  let yP = 7;
  player = new Player(xP, yP, imgFP, imgBP, imgRP, imgLP);

  for (let i = 0; i < 4; i++) {
    horde.push(new Enemy(0, 0, imgZombie));
    horde.push(new Enemy(1, 7, imgZombie));
    horde.push(new Enemy(1, 14, imgZombie));
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
      image(imgShip, 600, 350, 1200, 700);
      map.showObj();
      player.show();
      horde.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (player.changeLevel(map.getLevel()) === true) {
        map.ground(1);
        screen = 3;
      }
      if (player.showClue(map.getLevel()) === true) {
        image(hint, 600, 350);
      }
      break;
    case 3: // Pista 1
      image(imgHint1, 600, 350);
      clue1.selected();
      clue1.show();
      break;
    case 4: // Nivel 2
      map.ground(1);
      map.show();
      image(imgBeach, 600, 350, 1200, 700);
      xP = 21;
      yP = 4;
      player.show();
      if (player.changeLevel(map.getLevel()) === true) {
        map.ground(2);
        screen = 6;
      }
      break;
    case 5: // Pista 2

      break;
    case 6: // Nivel 3
      map.ground(2);
      map.show();
      image(imgRoad, 600, 350, 1200, 700);
      player.show();
      if (player.changeLevel(map.getLevel()) === true) {
        map.ground(3);
        screen = 8;
      }
      break;
    case 7: // Pista 3

      break;
    case 8: // Nivel 4
      map.ground(3);
      map.show();
      image(imgCity, 600, 350, 1200, 700);
      player.show();
      if (player.changeLevel(map.getLevel()) === true) {
        map.ground(4);
        screen = 10;
      }
      break;
    case 9: // Pista 4

      break;
    case 10: // Nivel 5
      map.ground(4);
      map.show();
      image(imgForest, 600, 350, 1200, 700);
      player.show();
      if (player.changeLevel(map.getLevel()) === true) {
        map.ground(5);
        screen = 12;
      }
      break;
    case 11: // Pista 5

      break;
    case 12: // Nivel 6
      map.ground(5);
      map.show();
      image(imgGraveyard, 600, 350, 1200, 700);
      player.show();
      break;
    case 13: // Game Over

      break;
    case 14: // Victory

      break;
    default:
      screen = 2;
      break;
  }
  player.hitBox(horde);
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i]);
  }
  takeWeapon();
  takeAid();
  enemyDie();
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
  for (let i = 0; i < map.length; i++) {
    if (dist(map.getRifle().getX(), map.getRifle().getY(), player.getX(), player.getY()) < 50) {
      player.addToInventory(map.getRifle());
      map.freeRifle();
    }
  }
}


function takeAid() {
  for (let i = 0; i < map.length; i++) {
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
  if (clue1.selected()) {
    screen = 4;
  }
}