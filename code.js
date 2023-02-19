"use strict";

var canvas = document.getElementById("PIX");
var context = canvas.getContext("2d");
var maxEnemies = 50;
var enemyCounter = 0;
var frameRate = 25; //Bilder pro Sekunde
var nextEnemyRate = 25; //nach wie vielen Durchläufen kommt der nächste Feind
var fireRate = 10; //nach wie vielen Durchläufen kommt der nächste Schuss

canvas.width = window.innerWidth-30;
canvas.height = window.innerHeight-30;

// Bild
var imageSrcEnemy = "EnemyJeep1.svg";
var imageSrcTower = "Tower1.svg";

// Globale Variablen
var x = canvas.width / 2; 
var y = 50; 
var delayTime;

var currentClickPositionX = 0;
var currentClickPositionY = 0;

var lastEnemyPositionX = 0;
var lastEnemyPositionY = 0;

var enemies = [];
var towers = [];

var loopCounter = 0;
var intervalId = null;

var budget = 50;
var myArmor = 10;

//const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    currentClickPositionX = event.clientX - rect.left;
    currentClickPositionY = event.clientY - rect.top;

    if(budget >= 20)
    {
        towers.push(new Tower(currentClickPositionX, currentClickPositionY, imageSrcTower));
        budget = budget - 25;
    }
}

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

    //Wenn es Gegner gibt, dann wird der Turm gezeichnet und die Koordinaten des ersten Gegners zum Zielen übermittelt
    //Der Turm richtet sich dann mit seiner Kanone dahin aus
    towers.forEach(function callback(item, index)
    {
        var tower = item;

        if(enemies.length > 0)
        {
            tower.drawElement(enemies[0].x, enemies[0].y);
            lastEnemyPositionX = enemies[0].x;
            lastEnemyPositionY = enemies[0].y;
        }
        else
        {
            tower.drawElement(lastEnemyPositionX, lastEnemyPositionY);
        }
    });
    
    //Alle 5 Wiederholungen wird abgefeuert
    if(loopCounter % fireRate == 0)
    {
        //Nur, wenn es einen Turm und auch Gegner gibt
        if(towers.length > 0)
        {
            towers.forEach(function callback(item, index)
            {
                var tower = item;
        
                if(enemies.length > 0)
                {
                    var bullet = new Bullet(tower.x + tower.image.width / 2, //die Mitte vom Turm
                                    tower.y + tower.image.height / 2, 
                                    enemies[0].x + enemies[0].image.width / 2, //die Mitte vom Gegner-Bild
                                    enemies[0].y + enemies[0].image.height / 2);
                    bullet.drawElement();
                    enemies[0].getHit(bullet.power);
                }
            });
        }
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

    context.font = "20px Arial";
    context.fillText("Eigene Stärke: " + myArmor, 25, 120);

    context.font = "20px Arial";
    context.fillText("Budget: " + budget + " €", 25, 150);

    context.font = "20px Arial";
    context.fillText(enemyCounter + " / " + maxEnemies + " Feinde", 25, 180);

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
            myArmor--;
        }

        if(item.armorPower <= 0)
        {            
            enemies.splice(index,1);
            budget = budget + 5;
        }
    });

    //hier wird der Zähler der Schleifen (also der Wiederholungen) um +1 hochgezählt
    loopCounter++;

    //Wenn die ID der Wiederholungsfunktion noch aktiv ist (also nicht "null" ist)
    //und wenn die Anzahl der Feinde = 0 ist (also alle durchgelaufen oder abgeschossen sind)
    if(intervalId != null && enemies.length == 0 && enemyCounter == maxEnemies)
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