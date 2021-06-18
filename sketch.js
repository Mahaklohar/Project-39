var PLAY =1;
var END =0;

var gamestate = PLAY;

var back, backImage;
var player, playerAnimation;
var terrorist, terroristAnimation, terroristGroup;
var bullet, bulletGroup, bulletImage, num = 5;
var refill, refillImage, refillGroup;
var kills = 0;
var survival = 0;
var gameover, gameoverImage; 
var ground

function preload(){
  backImage = loadImage("back.jfif");

  playerAnimation = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png")

  
  terroristAnimation = loadAnimation("terrorist1.png","terrorist1.png", "terrorist2.png", "terrorist2.png");
  
  bulletImage = loadImage("bullet.png");
  
  refillImage = loadImage("refil.png");
  
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}

function setup(){
  createCanvas(800, 500);

  console.log(camera.position);

  
  back = createSprite(400, 200);
  back.addImage("background", backImage);
  back.scale = 5;
  
  ground = createSprite(300, 500, 600, 10);
  ground.visible = false;
 
  player = createSprite(100, 450);
  player.addAnimation("playerAnimation", playerAnimation);
  player.scale = 0.5;
  
  bulletGroup = new Group();
  terroristGroup = new Group();
  refillGroup = new Group();
}

function draw(){
  background("White");
  
if(gamestate === PLAY){ 

  camera.position.x += 5;
  player.x = camera.position.x-320;

  if(camera.position.x>820){
    camera.position.x = 350;
  }
  
  if (keyDown("up_arrow") && player.y>330){
    player.velocityY = -12;
  }
  
  player.velocityY = player.velocityY + 0.5 ;
  player.collide(ground);
  
  if(player.isTouching(refillGroup)){
    refillGroup.destroyEach();
    num = num+3;
  }
  
  if(bulletGroup.isTouching(terroristGroup)){
    bulletGroup.destroyEach();
    terroristGroup.destroyEach();
    kills = kills + 1;
  }
  
  if(player.isTouching(terroristGroup)){
    
    
    gamestate = END;
  }
  survival = survival + Math.round(getFrameRate()/60);
  
  spawnTerrorist();
  makeBullets();
  bulletRefill();
  
}
  
  if(gamestate === END){
    end();
    
  }

  drawSprites();
  textSize(20);
  fill("black")
  text("Bullet: "+num, camera.position.x-370, camera.position.y -200);
  text("kills: "+kills, camera.position.x-370, camera.position.y -170)
  text("Survival time: "+survival, camera.position.x-370, camera.position.y -140)
  

}
function spawnTerrorist(){
 if (camera.position.x === 430){
   terrorist = createSprite(810,460,10,40);
   terrorist.velocityX = -7;
   
            
    
   terrorist.lifetime = 75;
   terrorist.addAnimation("terrorist", terroristAnimation);
   

   terroristGroup.add(terrorist);
 }
}

function makeBullets(){
  if(keyDown("space") && num>0&& frameCount % 15 === 0){
    bullet = createSprite(100, 355);
    bullet.y = player.y;
    bullet.x = player.x;
    
    bullet.addImage("bullet", bulletImage);
    bullet.velocityX = 15;
    bullet.lifetime = 50 
    num = num-1;
    
    bulletGroup.add(bullet)
  }
}

function bulletRefill()
{
   if(camera.position.x === 430)
  { 
    refill = createSprite(810, Math.round(random(180, 220)), 50, 50);
    refill.addImage(refillImage);
    refill.velocityX = -4;
   
    refill.lifetime = 80;
    
    refillGroup.add(refill);    

  } 
}

function end(){
  player.visible = false;
  back.visible = false;  
  terroristGroup.visible = false;
  bulletGroup.visible = false;
  refillGroup.visible = false;
  

  terroristGroup.destroyEach(0);
  bulletGroup.destroyEach(0);
  refillGroup.destroyEach(0);
    
  gameover = createSprite(camera.position.x, camera.position.y);
  gameover.addImage("gameover", gameoverImage);
  
  textSize(50);
  text("😢😒", camera.position.x-50, camera.position.y+80)
  

  
}
