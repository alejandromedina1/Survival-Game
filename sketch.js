let map = new Map();
let player = new Player();
function setup() {
  createCanvas(1200, 700);
}

function draw() {
  background(220);
  map.show();
  player.show();
}

function keyPressed(){
  player.move(key);
}

function keyRelease(){
}