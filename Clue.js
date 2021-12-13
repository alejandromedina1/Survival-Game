class Clue {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.reveal = false;
        this.click = false;
    }
    show() {
        if (this.reveal === true) {
            noFill();
            stroke(0, 255, 0);
            strokeWeight(5);
            circle(this.x, this.y, 50);
            strokeWeight(1);
            stroke(0);
            fill(255);
        }
    }
    selected() {
        if (dist(this.x, this.y, mouseX, mouseY) < 50) {
            this.reveal = true;
        }else{
            this.reveal = false;
        }
        return this.reveal;
    }
    clicked(){
        if (dist(this.x, this.y, mouseX, mouseY) < 50) {
            return click = true;
        }else{
            return click = false;
        }
        return this.click;
    }
    
    getX(){
        return this.x;
    }
    getY(){
        return this.y
    }
    setReveal(nReveal){
        this.reveal = nReveal;
    }

}