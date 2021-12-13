//AkaGuille
let map;
let player;
let clue;
//Zombies
let horde1 = [];
let horde2 = [];
let horde3 = [];
let horde4 = [];
let horde5 = [];
let horde6 = [];

//Level 1 clue (treasure)
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
let imgMedKit;
let imgRifle;

//Zombies
let imgZombie1;
let imgZombie2;
let imgZombie3;
let imgZombie4;
let imgZombie5;

//Map images
let imgCity;
let imgShip;
let imgForest;
let imgRoad;
let imgGraveyard;
let imgBeach;

//Clues
let imgHint1;
let imgHint2;
let imgHint3;
let imgHint4;
let imgHint5;

// Menús
let mainMenu;
let instructionMenu;
let victoryMenu;
let gameOverMenu;

function setup() {
  createCanvas(1200, 700);
  //Base player images
  imgFP = loadImage("NF.png");
  imgBP = loadImage("NB.png");
  imgLP = loadImage("NL.png");
  imgRP = loadImage("NR.png");

  //Club player images
  imgFPB = loadImage("NF_Bolillo de frente.png");
  imgLPB = loadImage("NL_Bolillo de lado.png");
  imgRPB = loadImage("NR_Bolillo de lado.png");

  //Rifle player images
  imgFPR = loadImage("NF_Rifle.png");
  imgLPR = loadImage("NL_Rifle.png");
  imgRPR = loadImage("NR_Rifle.png");

  //Zombies
  imgZombie1 = loadImage("ZombieAlas.png");
  imgZombie2 = loadImage("ZombieAlas2.png");
  imgZombie3 = loadImage("ZombieAlas3.png");
  imgZombie4 = loadImage("ZombieAlas4.png");
  imgZombie5 = loadImage("ZombieAlas5.png");

  //MedKit
  imgMedKit = loadImage("Botiquín.png");

  //Rifle
  imgRifle = loadImage("AK-47.png");

  //Maps
  imgCity = loadImage("Mapaciudad.png");
  imgShip = loadImage("Barco.png");
  imgForest = loadImage("Bosque.png");
  imgRoad = loadImage("Carretera.png");
  imgGraveyard = loadImage("Cementerio.png");
  imgBeach = loadImage("Playa.png");

  //Clues
  imgHint1 = loadImage("Pista 1.png");
  imgHint2 = loadImage("Pista 2.png");
  imgHint3 = loadImage("Pista 3.png");
  imgHint4 = loadImage("Pista 4.png");
  imgHint5 = loadImage("Pista 5.png");

  //Menus
  mainMenu = loadImage("Portada.png");
  instructionMenu = loadImage("Instrucciones.png");
  victoryMenu = loadImage("Victory.jpg");
  gameOverMenu = loadImage("Game Over.jpg");

  map = new Map(12, 7, 8, 8);

  hint = loadImage("Clue.png");
  clue1 = new Clue(590, 430);
  clue2 = new Clue(290, 530);
  clue3 = new Clue(130, 594);
  clue4 = new Clue(641, 323);
  clue5 = new Clue(720, 434);


  player = new Player(21, 7, imgFP, imgBP, imgRP, imgLP);

  horde1.push(new Enemy(0, 0, imgZombie1));
  horde1.push(new Enemy(0, 7, imgZombie1));
  horde1.push(new Enemy(0, 14, imgZombie1));

  horde2.push(new Enemy(0, 3, imgZombie1));
  horde2.push(new Enemy(0, 7, imgZombie1));
  horde2.push(new Enemy(12, 14, imgZombie1));
  horde2.push(new Enemy(23, 14, imgZombie1));

  horde3.push(new Enemy(23, 3, imgZombie2));
  horde3.push(new Enemy(23, 7, imgZombie2));
  horde3.push(new Enemy(12, 14, imgZombie2));
  horde3.push(new Enemy(0, 14, imgZombie2));

  horde4.push(new Enemy(12, 0, imgZombie3));
  horde4.push(new Enemy(24, 0, imgZombie3));
  horde4.push(new Enemy(24, 7, imgZombie3));
  horde4.push(new Enemy(24, 14, imgZombie3));
  horde4.push(new Enemy(12, 14, imgZombie3));
  horde4.push(new Enemy(12, 7, imgZombie3));

  horde5.push(new Enemy(12, 0, imgZombie4));
  horde5.push(new Enemy(24, 0, imgZombie4));
  horde5.push(new Enemy(24, 7, imgZombie4));
  horde5.push(new Enemy(24, 14, imgZombie4));
  horde5.push(new Enemy(12, 14, imgZombie4));
  horde5.push(new Enemy(12, 9, imgZombie4));
  horde5.push(new Enemy(12, 5, imgZombie4));

  horde6.push(new Enemy(12, 0, imgZombie5));
  horde6.push(new Enemy(24, 0, imgZombie5));
}

function draw() {
  background(220);
  switch (screen) {
    case 0: // Pantalla inicial
      imageMode(CENTER);
      image(mainMenu, 600, 350, 1200, 700);
      imageMode(CORNER);
      break;
    case 1: // Instrucciones
      imageMode(CENTER);
      image(instructionMenu, 600, 350, 1200, 700);
      imageMode(CORNER);
      break;
    case 2: // Nivel 1
      map.ground(0);
      map.show();
      image(imgShip, 600, 350, 1200, 700);
      player.updateCoords();
      for (let i = 0; i < horde1.length; i++) {
        horde1[i].updateCoords();
      }
      map.showObj();
      player.show();
      horde1.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde1.length === 0) {
        if (player.changeLevel(map.getLevel()) === true) {
          map.ground(1);
          player.setColumn(20);
          player.setRow(4);
          screen = 3;
        }
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
      player.updateCoords();
      player.show();
      horde2.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde2.length === 0) {
        if (player.changeLevel(map.getLevel()) === true) {
          map.ground(2);
          player.setColumn(2);
          player.setRow(3);
          screen = 5;
        }
      }
      break;
    case 5: // Pista 2
      image(imgHint2, 600, 350);
      clue2.selected();
      clue2.show();
      break;
    case 6: // Nivel 3
      map.ground(2);
      map.show();
      image(imgRoad, 600, 350, 1200, 700);
      player.updateCoords();
      player.show();
      horde3.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde3.length === 0) {
        if (player.changeLevel(map.getLevel()) === true) {
          map.ground(3);
          player.setColumn(0);
          player.setRow(8);
          screen = 7;
        }
      }
      break;
    case 7: // Pista 3
      image(imgHint3, 600, 350);
      clue3.selected();
      clue3.show();
      break;
    case 8: // Nivel 4
      map.ground(3);
      map.show();
      image(imgCity, 600, 350, 1200, 700);
      player.updateCoords();
      player.show();
      horde4.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde4.length === 0) {
        if (player.changeLevel(map.getLevel()) === true) {
          map.ground(4);
          player.setColumn(0);
          player.setRow(7);
          screen = 9;
        }
      }
      break;
    case 9: // Pista 4
      image(imgHint4, 600, 350);
      clue4.selected();
      clue4.show();
      break;
    case 10: // Nivel 5
      map.ground(4);
      map.show();
      image(imgForest, 600, 350, 1200, 700);
      player.updateCoords();
      player.show();
      horde5.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde5.length === 0) {
        if (player.changeLevel(map.getLevel()) === true) {
          map.ground(5);
          player.setColumn(12);
          player.setRow(13);
          screen = 11;
        }
      }
      break;
    case 11: // Pista 5
      image(imgHint5, 600, 350);
      clue5.selected();
      clue5.show();
      break;
    case 12: // Nivel 6
      map.ground(5);
      map.show();
      image(imgGraveyard, 600, 350, 1200, 700);
      player.show();
      horde6.forEach(enemy => {
        enemy.show();
        enemy.move(player);
      });
      if (horde6.length === 0) {
        screen = 14;
      }
      break;
    case 13: // Game Over
      image(gameOverMenu, 600, 350, 1200, 700);
      break;
    case 14: // Victory
      image(victoryMenu, 600, 350, 1200, 700);
      break;
    default:
      screen = 0;
      break;
  }
  player.hitBox(horde1);
  player.hitBox(horde2);
  player.hitBox(horde3);
  player.hitBox(horde4);
  player.hitBox(horde5);
  player.hitBox(horde6);
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde1[i]);
  }
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde2[i]);
  }
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde3[i]);
  }
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde4[i]);
  }
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde5[i]);
  }
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde6[i]);
  }
  if (player.getHealth() < 0) {
    screen = 13;
  }
  takeWeapon();
  takeAid();
  enemyDie();
}

function enemyDie() {
  for (let i = 0; i < horde1.length; i++) {
    horde1[i].hitBox(player);
    if (horde1[i] !== undefined && horde1[i].getHealth() <= 0) {
      horde1.splice(i, 1);
    }
  }
  for (let i = 0; i < horde2.length; i++) {
    horde2[i].hitBox(player);
    if (horde2[i] !== undefined && horde2[i].getHealth() <= 0) {
      horde2.splice(i, 1);
    }
  }
  for (let i = 0; i < horde3.length; i++) {
    horde3[i].hitBox(player);
    if (horde3[i] !== undefined && horde3[i].getHealth() <= 0) {
      horde3.splice(i, 1);
    }
  }
  for (let i = 0; i < horde4.length; i++) {
    horde4[i].hitBox(player);
    if (horde4[i] !== undefined && horde4[i].getHealth() <= 0) {
      horde4.splice(i, 1);
    }
  }
  for (let i = 0; i < horde5.length; i++) {
    horde5[i].hitBox(player);
    if (horde5[i] !== undefined && horde5[i].getHealth() <= 0) {
      horde5.splice(i, 1);
    }
  }
  for (let i = 0; i < horde6.length; i++) {
    horde6[i].hitBox(player);
    if (horde6[i] !== undefined && horde6[i].getHealth() <= 0) {
      horde6.splice(i, 1);
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
      player.setHealth(player.getHealth() + 100);
    }
  }
}

//Movimiento del personaje y ataque cuerpo a cuerpo
function keyPressed() {
  player.move(map.getLevel(), key);
  for (let i = 0; i < horde1.length; i++) {
    player.closeAttack(horde1[i], key);
  }
  for (let i = 0; i < horde2.length; i++) {
    player.closeAttack(horde2[i], key);
  }
  for (let i = 0; i < horde3.length; i++) {
    player.closeAttack(horde3[i], key);
  }
  for (let i = 0; i < horde4.length; i++) {
    player.closeAttack(horde4[i], key);
  }
  for (let i = 0; i < horde5.length; i++) {
    player.closeAttack(horde5[i], key);
  }
  for (let i = 0; i < horde6.length; i++) {
    player.closeAttack(horde6[i], key);
  }
}


function mousePressed() {
  player.shoot();
  if (clue1.selected()) {
    screen = 4;
  }
  if (clue2.selected()) {
    screen = 6;
  }
  if (clue3.selected()) {
    screen = 8;
  }
  if (clue4.selected()) {
    screen = 10;
  }
  if (clue5.selected()) {
    screen = 12;
  }
  if (screen === 0) {
    if (473 < mouseX && mouseX < 723 && 501 < mouseY && mouseY < 555) {
      screen = 2;
    }
    if (473 < mouseX && mouseX < 723 && 568 < mouseY && mouseY < 622) {
      screen = 1;
    }
  } 
  if (screen === 1) {
    if (818 < mouseX && mouseX < 1116 && 535 < mouseY && mouseY < 620) {
      screen = 2;
    }
  }
  if (screen === 13) {
    if (400 < mouseX && mouseX < 800 && 400 < mouseY && mouseY < 500) {
      for (let i = 0; i < horde.length; i++) {
        screen = 2;
        horde[i].setColumn(0);
        horde[0].setRow(1);
        horde[1].setRow(7);
        horde[2].setRow(14);
        horde[i].setHealth(250);
      }
      player.setHealth(100);
      player.setColumn(21);
      player.setRow(7);
    }
  }
  if (screen === 14) {
    if (200 < mouseX && mouseX < 600 && 350 < mouseY && mouseY < 450) {
      screen = 2;
      player.setHealth(100);
      player.setColumn(21);
      player.setRow(7);
      for (let i = 0; i < horde.length; i++) {
        horde[i].setColumn(0);
        horde[0].setRow(1);
        horde[1].setRow(7);
        horde[2].setRow(14);
        horde[i].setHealth(250);
      }
    }
  }
}