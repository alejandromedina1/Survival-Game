//AkaGuille
let map = [];
let horde = [];
let player = [];
let clue;

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
let imgCiudad;
let imgBarco;
let imgBosque;
let imgCarretera;
let imgCementerio;
let imgPlaya;

//Pistas
let imgPista1;
let imgPista2;
let imgPista3;
let imgPista4;
let imgPista5;

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
  imgCiudad = loadImage("Mapaciudad.png");
  imgBarco = loadImage("Barco.png");
  imgBosque = loadImage("Bosque.png");
  imgCarretera = loadImage("Carretera.png");
  imgCementerio = loadImage("Cementerio.png");
  imgPlaya = loadImage("Playa.png");

  //Pistas
  imgPista1 = loadImage("Pista 1.png");
  imgPista2 = loadImage("Pista 2.png");
  imgPista3 = loadImage("Pista 3.png");
  imgPista4 = loadImage("Pista 4.png");
  imgPista5 = loadImage("Pista 5.png");

  map[0] = new Map(imgBarco, 12 , 7 , 8, 8);
  map[1] = new Map(imgPlaya);
  map[2] = new Map(imgCarretera);
  map[3] = new Map(imgCiudad);
  map[4] = new Map(imgBosque);
  map[5] = new Map(imgCementerio);



  player[0] = new Player(21, 7, imgFP, imgBP, imgRP, imgLP);
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
      map[0].ground(0);
      map[0].show();
      horde.forEach(enemy => {
        enemy.show(player);
      });
      player[0].show();
      takeWeapon();
      takeAid();
      enemyDie();
      player[0].hitBox(horde);
      for (let i = 0; i < horde.length; i++) {
        player[0].closeAttack(horde[i]);
      }
      if (player[0].changeLevel(map[0].getLevel()) === true) {
        screen = 4;
      }
      break;
    case 3: // Pista 1

      break;
    case 4: // Nivel 2
      map[1].ground(1);
      map[1].show();
      break;
    case 5: // Pista 2

      break;
    case 6: // Nivel 3
      map[2].ground(2);
      map[2].show();
      break;
    case 7: // Pista 3

      break;
    case 8: // Nivel 4
      map[3].ground(3);
      map[3].show();
      break;
    case 9: // Pista 4

      break;
    case 10: // Nivel 5
      map[4].ground(4);
      map[4].show();
      break;
    case 11: // Pista 5

      break;
    case 12: // Nivel 6
      map[5].ground(5);
      map[5].show();
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
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < player.length; j++) {
      if (map[i].getRifle() !== null) {
        if (dist(map[i].getRifle().getX(), map[i].getRifle().getY(), player[j].getX(), player[j].getY()) < 50) {
          player[j].addToInventory(map[i].getRifle());
          map[i].freeRifle();
        }
      }
    }
  }
}


function takeAid() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < player.length; j++) {
      if (map[i].getAid() !== null) {
        if (dist(map[i].getAid().getX(), map[i].getAid().getY(), player[j].getX(), player[j].getY()) < 50) {
          map[i].freeAid();
          player[j].setHealth();
        }
      }
    }
  }
}

//Movimiento del personaje y ataque cuerpo a cuerpo
function keyPressed() {
  for (let j = 0; j < map.length; j++) {
    for (let u = 0; u < player.length; u++) {
      player[u].move(map[j].getLevel(), key);
      for (let i = 0; i < horde.length; i++) {
        player[u].closeAttack(horde[i], key);
      }
    }
  }
}


function mousePressed() {
  for (let i = 0; i < player.length; i++) {
    player[i].shoot(); 
  }
}