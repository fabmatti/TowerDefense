class Enemy{
    constructor(initialX, initialY, imageSource){
        this.x = initialX;
        this.y = initialY;
        this.speed = 5;  //Geschwindigkeit

        this.image = new Image();
        this.image.src = imageSource;

        this.armorPower = 10;
    }

    type() { return("Enemy");}

    moveElement()
    {
        this.y = this.y + this.speed;
        context.drawImage(this.image, this.x, this.y, 100, 100);
        
        var beginX = this.x + (this.image.width / 2) - 26;

        context.fillStyle = "lightgray";
        context.fillRect(beginX,
                        this.y + 9, 
                        52, 
                        12);

        context.fillStyle = "red";
        context.fillRect(beginX + 1,
                        this.y + 10, 
                        5 * this.armorPower, 
                        10);
    }

    getHit(bulletPower)
    {
        this.armorPower -= bulletPower;
    }
}