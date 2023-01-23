"use strict";

var canvas = document.getElementById("PIX");
var context = canvas.getContext("2d");
var maxEnemies = 5;
var enemyCounter = 0;
var frameRate = 25; //Bilder pro Sekunde
var nextEnemyRate = 30; //nach wie vielen Durchläufen kommt der nächste Feind

canvas.width = window.innerWidth-30;
canvas.height = window.innerHeight-30;

// Bild
var imageSrcEnemy = "EnemyJeep1.svg";
var imageSrcTower = "Tower1.svg";

// Globale Variablen
var x = canvas.width / 2; 
var y = 50; 
var delayTime;

var enemies = [];
var tower = null;

var loopCounter = 0;
var intervalId = null;

function startGame() 
{
    //Setze die wichtigsten Variablen zurück
    loopCounter = 0;
    enemyCounter = 0;
   
    intervalId = window.setInterval(startAnimation, 1000 / frameRate);

    //Deaktiviere den Start-Button
    document.querySelector('#BTN1').disabled = true;
}

//DIE Animationsfunktion für alles
function startAnimation()
{
    //Das Spielfeld bereinigen
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    if(loopCounter == 0) //Am Anfang wird EIN Turm fest platziert
    {
        tower = new Tower(400, canvas.height/2, imageSrcTower);
    }

    //Wenn es Gegner gibt, dann wird der Turm gezeichnet und die Koordinaten des ersten Gegners zum Zielen übermittelt
    //Der Turm richtet sich dann mit seiner Kanone dahin aus
    if(enemies.length > 0)
    {
        tower.drawElement(enemies[0].x, enemies[0].y);
    }
    
    //Alle 50 Wiederholungen wird ein neuer Gegner erzeugt und losgeschickt
    if(loopCounter % 50 == 0)
    {
        //neuen Gegner anlegen, wenn die Maximal-Anzahl noch nicht erreicht wurde
        if(enemyCounter++ < maxEnemies)
        {
            enemies.push(new Enemy(x, y, imageSrcEnemy));
        }
    }
 
    //Der aktuelle Stand zur Anzahl der Feinde
    context.font = "20px Arial";
    context.fillText("Feinde: " + enemies.length, 25, 70);

    //Hier die Feinde "verarbeiten"
    //Für jeden existierenden Gegner wird dessen moveElement-Funktion aufgerufen
    enemies.forEach(function callback(item, index)
    {
        item.moveElement();

        //Wenn der aktuelle Gegner unten (also 50px vom unteren Rand entfernt) angekommen ist,
        //wird er aus der Liste "enemies[]" entfernt
        if(item.y > canvas.height - 50)
        {            
            enemies.splice(index,1);
        }
    });

    //hier wird der Zähler der Schleifen (also der Wiederholungen) um +1 hochgezählt
    loopCounter++;

    //Wenn die ID der Wiederholungsfunktion noch aktiv ist (also nicht "null" ist)
    //und wenn die Anzahl der Feinde = 0 ist (also alle durchgelaufen oder abgeschossen sind)
    if(intervalId != null && enemies.length == 0)
    {
        //Stoppe die Interval-Wiederholungen
        window.clearInterval(intervalId);

        //Bereinige die Zeichenfläche
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        //Schreibe "Ende" 
        context.fillText("Ende", 25, 70);
        
        //Aktiviere den Start-Button
        document.querySelector('#BTN1').disabled = false;

    }
}