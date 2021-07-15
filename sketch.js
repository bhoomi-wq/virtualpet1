var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var grass, grassImg;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  grassImg = loadImage("grass.jpg")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);


  for (var i = 5; i < 500; i=i+10) 
{

grass = createSprite(i, 5, 3, 3);
grass.addImage(grassImg);
grass.scale = 0.1;
}
for (var i = 5; i < 500; i=i+10)
{
grass= createSprite(i, 485, 3, 3);
grass.addImage(grassImg);
grass.scale = 0.1;
}
}


function draw() {  
  background("cyan")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 20;

}



  drawSprites();
  textSize(17);
  fill("black");
  text("I am Shiro..🐶 I am Hungry..😢😋",100,150);
  fill("black");
  text("Long Press up arrow key to feed your pet Shiro",50,50);
  fill("black");
  text("Food Remaining :  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

