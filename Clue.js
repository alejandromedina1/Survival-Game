class Clue{
    constructor(image){
        this.image = image;
    }
    show(){
        imageMode(CENTER);
        image(this.image, 1200, 700);
        imageMode(CENTER);
    }
}