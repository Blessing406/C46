//make all the variables that you require
var canvas
var sea, boat, man, manimage, boatimage, seaimage
var edges
var invisibleWall1,invisibleWall2
var CoinScore=0
var FishScore=0
var coinsGroup,obsGroup,fishGroup
var PLAY=1
var END=0
var gameState=PLAY;
var coinSound

function preload(){
  manimage = loadAnimation("Images/Fishing man 1.png","Images/Fishing Man 2.png")
  boatimage = loadImage("Images/Submarine 1.png")
  seaimage = loadImage("Images/Sea.jpg")
 coinSound=loadSound("Bullet Sound.mp3")
}



function setup() {
  canvas = createCanvas(1000,1000);
  edges=createEdgeSprites();
  sea = createSprite(800, 450, 200, 20);
  sea.velocityX = -3
  sea.x = sea.width / 2;
  sea.scale = 2.8
  sea.addImage(seaimage)
  boat = createSprite(83, 485, 100, 50);
  man = createSprite(90, 360, 50, 40);
  man.scale=2
  man.addAnimation("Fishing",manimage);
  boat.addImage(boatimage);
  boat.scale = 2
  invisibleWall1=createSprite(500,20,1000,10)
  invisibleWall2=createSprite(500,880,1000,10)
  invisibleWall1.visible=false
  invisibleWall2.visible=false
  fishGroup= new Group();
  obsGroup=new Group();
  coinsGroup=new Group()
}

function draw() {
  background(255, 255, 255);

  if(gameState===PLAY){
    sea.velocityX = -4
    if (sea.x < 600) {
      sea.x = sea.width / 2
     
    }
    boat.y=mouseY;
    man.y=boat.y

    if(coinsGroup.isTouching(boat)){
      //play a sound
      coinSound.play()
      CoinScore=CoinScore+10
      coinsGroup.destroyEach()
    }
  
    if(fishGroup.isTouching(boat)){
      //play another sound
      FishScore=FishScore+1
      fishGroup.destroyEach()
    }
    spawnCoins();
  spawnObs();
  spawnFish();

  if(obsGroup.isTouching(boat)){
    gameState=END
  }
  }
  if(gameState===END){
    obsGroup.setVelocityXEach(0);
    fishGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    fishGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    sea.velocityX=0;

  }
  
  boat.collide(invisibleWall1)
  boat.collide(invisibleWall2)
  
  drawSprites();
  fill("black")
  textSize(20)
  text("Number of fish caught: "+FishScore,500,80)
  text("COINS COLLECTED:" +CoinScore,70,80)
   
  text(mouseX + "," + mouseY, mouseX, mouseY)
}

function spawnCoins() {
  if (frameCount % 200 === 0) {
    var coins = createSprite(957, 98, 30, 30)
    coins.shapeColor="gold"
    coins.y = Math.round(random(130, 300))
    coins.velocityX = -3;
    coinsGroup.add(coins)
  }
}
//make function spawnbirds
function spawnObs() {
  if (frameCount % 250 === 0) {
    var obs = createSprite(957, 168, 19, 90)
    obs.shapeColor="black"
    obs.y = Math.round(random(600, 850))
    obs.velocityX = -5;
    obsGroup.add(obs)
  }
}
//make function spawnFish
function spawnFish() {
  if(frameCount % 150 === 0){
    var fish = createSprite(898,674,40,40)
    fish.shapeColor="green"
    fish.y = Math.round(random(890,728))
    fish.velocityX = -4.5;
    fishGroup.add(fish)
  }
}
