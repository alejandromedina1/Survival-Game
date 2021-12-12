class Clue{
    constructor(image){
        this.image = image;
    }
    show(){
        imageMode(CENTER);
        image(this.image, 600, 350);
        imageMode(CENTER);
    }
}