class Pictures {
    constructor(image,x, y) {
      this.image = image;
      this.x = x;
      this.y = y;
    }
  
    show() {
      imageMode(CENTER);
      image(this.image, this.x, this.y);
      imageMode(CORNER);
    }
  }