var jokerRunning, joker;
var BatmanRunning, Batman,BatmanDead;
var GothamImg, Gotham;
var obstacleGroup, Obstacle1 , Obstacle2, Obstacle3;
var gameState = play;
var play = 1;
var END = 0;
var invisibleGround;

function preload()
{
GothamImg = loadImage("Gotham.png");


batmanSound = loadSound("batmanSound.mp3");

BatmanRunning = loadAnimation("batmanrunning.png","batman2.png");
BatmanDead = loadAnimation("batmanDead.png");

jokerRunning = loadAnimation("jokerRunning.png");
joker = loadAnimation("cartoonJoker.png");


Obstacle1 = loadImage("Obstacle1.png");
Obstacle2 = loadImage("Obstacle2.png");
Obstacle3 = loadImage("Obstacle3.png");

}

function setup()
 {
  createCanvas(600,600);

  Gotham = createSprite(300,400,800,800);
  Gotham.addImage("Gotham",GothamImg);
  Gotham.x = Gotham.width/2;
  Gotham.scale=2;

  obstacleGroup = createGroup()

  Batman = createSprite(250,550,50,50);
  Batman.scale = 0.2 ;
  Batman.addAnimation("ALive",BatmanRunning);
  Batman.addAnimation("Dead",BatmanDead);

  joker = createSprite(100,550,50,50);
  joker.scale = 0.1;
  joker.addAnimation("running",jokerRunning);
  joker.addAnimation("joker",joker);
 
  invisibleGround = createSprite(250,600,500,20);
  invisibleGround.visible = false;

  Batman.setCollider("circle",15,15,200)
  Batman.debug=true;
 
 }

function draw()
 {
   background(255);
  
   if(gameState = play)
   {
       if(keyDown("space") && Batman.y >= 500)
       {
           Batman.velocityY=-12;
           
       }

       Batman.velocityY= Batman.velocityY +0.8;
       joker.velocityY= Batman.velocityY-0.8;
       Gotham.velocityX = -3;

       if(Gotham.x<0)
       {
          Gotham.x = Gotham.width/2;
       }

       
       spawnObstacles();

       if(obstacleGroup.isTouching(Batman))
       {
           gameState=== END;
       }
      }
     
    else if(gameState === END)
    {
        Gotham.velocityX= 0;
        Batman.velocityY=0;
        joker.velocityY=0;

        joker.changeAnimation("joker",joker);
        Batman.changeAnimation("Dead",BatmanDead);

        obstacleGroup.setLifeTimeEach(-1);
        obstacleGroup.setVelocityXEach(0);
     }

  Batman.collide(invisibleGround)
  
   joker.collide(invisibleGround);

   
   drawSprites();
}

 function spawnObstacles()
 {
   if(frameCount % 150 === 0)
 { 
  var obstacle = createSprite(550,570,10,40);
  obstacle.velocityX = -4;
  
  var rand = Math.round(random(1,3));
  switch(rand)
  {
      case 1: obstacle.addImage(Obstacle1);
      break;
      case 2: obstacle.addImage(Obstacle2);
      break;
      case 3: obstacle.addImage(Obstacle3);
      break;
     default: break;
  }

   obstacle.scale = 0.1;
   obstacle.lifetime =300;

   obstacleGroup.add(obstacle);

   
   
   
 }
}