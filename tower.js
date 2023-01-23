class Tower{
    constructor(initialX, initialY, imageSource){
        this.x = initialX;
        this.y = initialY;
        this.angle = 0;
        
        this.image = new Image();
        this.image.src = imageSource;
    }

    type() { return("Tower");}

    //Die Zeichen-Funktion eines Turms
    drawElement(aimX, aimY)
    {
        //Festlegen der x- und y-Differenzen zw. Turm und anvisiertem Gegner
        var diffX = aimX - this.x + 50;
        var diffY = aimY - this.y + 50;

        //Berechnung des Winkels (nicht Grad, sondern Radiant!!!)
        let angle = Math.atan2(diffY, diffX) + Math.PI / 2;
        
        //Context speichern
        context.save(); 

        //Nullpunkt auf die Mitte des Turmes legen
        context.translate(this.x + this.image.width /2, this.y + this.image.height /2);
        //Zeichenfläche um den brechneten Winkel drehen
        context.rotate(angle);

        //Den Turm zeichnen
        context.drawImage(this.image, 0 - this.image.width /2, 0 - this.image.height /2, this.image.width, this.image.height);  

        //Den Context wiederherstellen
        context.restore();
    }
}