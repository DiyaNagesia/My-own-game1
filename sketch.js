var shark,rock1,rock2,rock3;
var sharkR,sharkL,sharkU,sharkD;
var sea;
var gDot,sFood,mFood,lFood;
var won,lost;
var gameState = "play";
var score = 0

function preload(){
	sea = loadImage("seaImage.jpg")
	sharkR = loadImage("shark_Images/shark_right.png")
	sharkL = loadImage("shark_Images/shark_left.png")
	sharkU = loadImage("fishesImage/shark.png")
	sharkD = loadImage("shark_Images/shark_down.png")
	gDot = loadImage("fishesImage/dot.png")
	sFood = loadImage("food/small_food.png")
	mFood = loadImage("food/medium_food.png")
	lFood = loadImage("food/large_food.png")
	rock1 = loadImage("rocks/pointed_rock1.png")
	rock2 = loadImage("rocks/pointed_rock2.png")
	rock3 = loadImage("rocks/pointed_rock3.png")

}
function setup(){
	createCanvas(windowWidth,windowHeight)
	shark = createSprite(100,windowHeight-100,50,50)
	shark.addImage(sharkU)
	shark.scale = 0.3
	shark.debug = false
	shark.setCollider("rectangle",0,0,100,300)


	dotGroup = new Group()
	sFGroup = new Group()
	mFGroup = new Group()
	lFGroup = new Group()
	obstacle1Group = new Group()
	obstacle2Group = new Group()
	obstacle3Group = new Group()

}
function draw(){ 
	background(sea)
    textSize(20)
	fill ("red")
    text("score : "+score,50,50)

	if(gameState === "play"){

	if(keyDown(UP_ARROW)){
		shark.addImage(sharkU)
		shark.velocityX = 0
		shark.velocityY = -5
	}
	if(keyDown(DOWN_ARROW)){
		shark.addImage(sharkD)
		shark.velocityX = 0
		shark.velocityY = 5
	}
	
	if(keyDown(RIGHT_ARROW)){
		shark.addImage(sharkR)
		shark.velocityX = 5
		shark.velocityY = 0
	}
	if(keyDown(LEFT_ARROW)){
		shark.addImage(sharkL)
		shark.velocityX = -5
		shark.velocityY = 0
	}


	

      spawnObstacles()
	 for (var d = 0; d < obstacle1Group.length; d++) {
		if (obstacle1Group.get(d).isTouching(shark)) {
			score = 0
		}
	}
	for (var e = 0; e < obstacle2Group.length; e++) {
	if (obstacle2Group.get(e).isTouching(shark)) {
		score = 0
		}
	}
	for (var f = 0; f < obstacle3Group.length; f++) {
		if (obstacle3Group.get(f).isTouching(shark)) {
			score = 0
		}
	}

	spawnDot()
for (var i = 0; i < lFGroup.length; i++) {
			if (lFGroup.get(i).isTouching(shark)) {
				lFGroup.get(i).destroy();
				score = score+1
			}
		}
			spawnFood()
	for (var a = 0; a < sFGroup.length; a++) {
		if (sFGroup.get(a).isTouching(shark)) {
			sFGroup.get(a).destroy();
			score = score+1
		}
	}
	for (var b = 0; b < mFGroup.length; b++) {
		if (mFGroup.get(b).isTouching(shark)) {
			mFGroup.get(b).destroy();
			score = score+1
		}	
	}
	for (var c = 0; c < dotGroup.length; c++) {
		if (dotGroup.get(c).isTouching(shark)) {
			dotGroup.get(c).destroy();
			score = score+1
		}
	}

	if(score>20){
		gameState = "won"
        textSize(150)
  fill("blue")
  text("You Won 😃",windowWidth/4,windowHeight/2)
  score = 20
  dotGroup.destroyEach();
  sFGroup.destroyEach();
  mFGroup.destroyEach();
  lFGroup.destroyEach();
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroy();
  shark.destroy();
  score.destroy();
	  }
	  
	   if(gameState === "lost"){

		   if(shark.isTouching(obstacle1Group)){
		   }
		   if(shark.isTouching(obstacle2Group)){
		   }
		   if(shark.isTouching(obstacle3Group)){
		}
	   }
	}
	drawSprites()


function spawnDot(){
	if(frameCount % 20 === 0){
		var dot = createSprite(windowWidth,Math.round(random(20,windowHeight-60)))
		 
	dot.addImage(gDot)
	dot.scale = 0.2
	dot.velocityX = -5

		dotGroup.add(dot)
	}
}

function spawnFood(){
	if(frameCount % 50 === 0){
		var sF = createSprite(windowWidth,Math.round(random(20,windowHeight-60)))
		var mF = createSprite(windowWidth,Math.round(random(20,windowHeight-60)))
		var lF = createSprite(windowWidth,Math.round(random(20,windowHeight-60)))

  sF.addImage(sFood)
	sF.scale = 0.2
	sF.velocityX = -5

	mF.addImage(mFood)	
    mF.scale = 0.9
	mF.velocityX = -5

	lF.addImage(lFood)
	lF.scale = 0.6
	lF.velocityX = -5

		sFGroup.add(sF)
		mFGroup.add(mF)
		lFGroup.add(lF)

	}
}
function spawnObstacles(){
	if(frameCount % 150 === 0){
      var obstacle1 = createSprite(windowWidth,Math.round(random(10,windowHeight-60)))
   var obstacle2 = createSprite(windowWidth,Math.round(random(10,windowHeight-60)))
      var obstacle3 = createSprite(windowWidth,Math.round(random(10,windowHeight-60)))

      obstacle1.addImage(rock1)
        obstacle1.scale = 0.7
	   obstacle1.velocityX = -5

   obstacle2.addImage(rock2)
     obstacle2.scale = 0.7
	obstacle2.velocityX = -5

		obstacle3.addImage(rock3)
		obstacle3.scale = 0.7
		obstacle3.velocityX = -5
	   
      obstacle1Group.add(obstacle1)
		obstacle2Group.add(obstacle2)
       obstacle3Group.add(obstacle3)

	}

}

if(gameState == "won"){
    textSize(100)
  fill("yellow")
  text("You Won ",windowWidth/2,windowHeight/2)
  dotGroup.destroyEach();
  sFGroup.destroyEach();
  mFGroup.destroyEach();
  lFGroup.destroyEach();
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroy();
  shark.destroy();
}

else if(gameState == "lost"){
	textSize(100)
  fill("red")
  text("You lost ",windowWidth/2,windowHeight/2)
  dotGroup.destroyEach();
  sFGroup.destroyEach();
  mFGroup.destroyEach();
  lFGroup.destroyEach();
  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroy();
  shark.destroy();
}
}