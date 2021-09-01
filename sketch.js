var PLAY = 0;
var END = 1;
var gameState = PLAY;
var sword, swordImage, gameOverImage;
var fruitOne, fruitTwo, fruitThree, fruitFour, fruitGroup;
var monster, monsterGroup, monsterAnimation;
var rn;
var score = 0;
var knifeSwooshSound;
var gameOverSound;
var position;

function preload() {
knifeImage = loadImage("knife.png");
gameOverImage = loadImage("gameover.png");
fruitOne = loadImage("fruit1.png");
fruitTwo = loadImage("fruit2.png");
fruitThree = loadImage("fruit3.png");
fruitFour = loadImage("fruit4.png");
monsterAnimation = loadAnimation("alien1.png", "alien2.png");
knifeSwooshSound = loadSound("knifeSwoosh.mp3");
gameOverSound = loadSound("gameover.mp3");
}

function setup() {
//creating sword
sword = createSprite(40, 200, 20, 20);
sword.addImage(knifeImage);
sword.scale = 0.7;

//Groups
fruitGroup = new Group();
monsterGroup = new Group();
}

function draw() {
background("lightBlue");

if (gameState === PLAY){
//Call fruits and enemy function
fruitSpawn();
monsterSpawn();

//Move sword with mouse
sword.x = World.mouseX; 
sword.y = World.mouseY;

//Increase score if sword is touching fruit
if(sword.isTouching(fruitGroup)){
fruitGroup.destroyEach();
knifeSwooshSound.play();
score = score+2;
}
//Go to end state if sword is touching enemy
if (sword.isTouching(monsterGroup)){
gameState = END;
//game over sound
gameOverSound.play();
}
}
else if(gameState === END){
fruitGroup.destroyEach();
monsterGroup.destroyEach();
fruitGroup.setVelocityXEach(0);
monsterGroup.setVelocityXEach(0);

//Change the animation of sword to gameover and reset its position
sword.x = 200;
sword.y = 200; 
sword.addImage(gameOverImage); 
}
//Display score
  textSize(20);
fill('black');
 text("SCORE: " + score, 300, 40);

//Function to draw the sprites
drawSprites();
}

function fruitSpawn() {
if(frameCount%80 === 0){
var fruit = createSprite(400, 200, 20, 20);
position = Math.round(random(1,2));
if(position==1){
fruit.x=400;
fruit.velocityX=-(7+(score/4));
}
else
{
if(position==2){
fruit.x=0;
  fruit.velocityX=(7+(score/4));
}
}

fruit.scale = 0.2;  
rn = Math.round(random(1, 4))

switch (rn) {
case 1: fruit.addImage(fruitOne);
break;
case 2: fruit.addImage(fruitTwo);
break;
case 3: fruit.addImage(fruitThree);
break;
case 4: fruit.addImage(fruitFour);
}


fruit.y = random(50, 300);

fruit.lifetime = 100;


//increase the velocity of fruit after the score reaches 4 or 10


fruitGroup.add(fruit);
}
}


function monsterSpawn(){
if (frameCount%200 === 0){
monster = createSprite(400, 200, 20, 20);
monster.addAnimation("moving", monsterAnimation);
monster.y = Math.round(random(100,300));
monster.velocityX = -(8+(score/10));
monster.setLifetime=50;
monsterGroup.add(monster);
}
}
