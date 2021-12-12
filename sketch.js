let map1;
let map2;
let map3;
let map4;
let map5;
let map6;
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
  map1 = new Map(imgBarco);
  map2 = new Map(imgPlaya);
  map3 = new Map(imgCarretera);
  map4 = new Map(imgCiudad);
  map5 = new Map(imgBosque);
  map6 = new Map(imgCementerio);



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
      map1.ground(0);
      map1.show();
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
      if (player.changeLevel(map1.getLevel())===true) {
        screen = 4;
      }
      break;
    case 3: // Pista 1

      break;
    case 4: // Nivel 2
      map2.ground(1);
      map2.show();
      break;
    case 5: // Pista 2

      break;
    case 6: // Nivel 3
      map3.ground(2);
      map3.show();
      break;
    case 7: // Pista 3

      break;
    case 8: // Nivel 4
      map4.ground(3);
      map4.show();
      break;
    case 9: // Pista 4

      break;
    case 10: // Nivel 5
      map5.ground(4);
      map5.show();
      break;
    case 11: // Pista 5

      break;
    case 12: // Nivel 6
      map6.ground(5);
      map6.show();
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
  if (map1.getRifle() !== null) {
    if (dist(map1.getRifle().getX(), map1.getRifle().getY(), player.getX(), player.getY()) < 50) {
      player.addToInventory(map1.getRifle());
      map1.freeRifle();
    }
  }
}

function takeAid() {
  if (map1.getAid() !== null) {
    if (dist(map1.getAid().getX(), map1.getAid().getY(), player.getX(), player.getY()) < 50) {
      map1.freeAid();
      player.setHealth();
    }
  }
}
//Movimiento del personaje y ataque cuerpo a cuerpo
function keyPressed() {
  player.move(map1.getLevel(), key);
  for (let i = 0; i < horde.length; i++) {
    player.closeAttack(horde[i], key);
  }
}

function mousePressed() {
  player.shoot();
}