let map = new Map();
let player = new Player(1,0);
let horde = [];
function setup() {
  createCanvas(1200, 700);
  for (let i = 0; i < 10; i++) {
    horde.push(new Enemy(random(-10,1210),random(-10,710)));
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
}

function keyPressed(){
  player.move(map.getGround(),key);
}



function keyRelease(){
}