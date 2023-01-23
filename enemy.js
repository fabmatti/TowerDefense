class Enemy{
    constructor(initialX, initialY, imageSource){
        this.x = initialX;
        this.y = initialY;
        this.speed = 5;  //Geschwindigkeit

        this.image = new Image();
        this.image.src = imageSource;
    }

    type() { return("Enemy");}

    moveElement()
    {
        this.y = this.y + this.speed;
        context.drawImage(this.image, this.x, this.y, 100, 100);
    }
}