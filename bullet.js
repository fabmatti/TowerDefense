class Bullet{
    constructor(initialX, initialY, directionX, directionY){
        this.x = initialX;
        this.y = initialY;
        
        this.targetX = directionX;
        this.targetY = directionY;

        this.power = 1;
     }

    type() { return("Bullet");}

    drawElement(){
        let canvas = document.getElementById("PIX");
        let context = canvas.getContext("2d");

        context.beginPath();
        context.moveTo(this.x, this.y);        
        context.lineTo(this.targetX, this.targetY);
        context.stroke();
    }
}