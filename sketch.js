var runner, ground, ninja;

var bgm;
var engine, world;
var obstacleGroup;
var cmd = ['run', 'jump', 'slide'], currentCMD;

var game;
var state = false;

var obstacleGroup, coinGroup;
var gameState = "running"


// Functions
function preload(){

  //Runner Running Images
  runner1= loadImage("./animations/player/run/Run1.png")
  runner2= loadImage("./animations/player/run/Run2.png")
  runner3= loadImage("./animations/player/run/Run3.png")
  runner4= loadImage("./animations/player/run/Run4.png")

  runner5= loadImage("./animations/player/run/Run5.png")
  runner6= loadImage("./animations/player/run/Run6.png")
  runner7= loadImage("./animations/player/run/Run7.png")
  runner8= loadImage("./animations/player/run/Run8.png")

  //Runner Dead Images

  dead1 = loadImage("./animations/player/dead/Dead (1).png");
  dead2 = loadImage("./animations/player/dead/Dead (2).png");
  dead3 = loadImage("./animations/player/dead/Dead (3).png");
  dead4 = loadImage("./animations/player/dead/Dead (4).png");
  dead5= loadImage("./animations/player/dead/Dead (5).png");

  dead6 = loadImage("./animations/player/dead/Dead (6).png");
  dead7 = loadImage("./animations/player/dead/Dead (7).png");
  dead8 = loadImage("./animations/player/dead/Dead (8).png");
  dead9 = loadImage("./animations/player/dead/Dead (9).png");
  dead10 = loadImage("./animations/player/dead/Dead (10).png");

  // Runner Jump Images
  jump1 = loadImage("./animations/player/jump/Jump (1).png");
  jump2 = loadImage("./animations/player/jump/Jump (2).png");
  jump3 = loadImage("./animations/player/jump/Jump (3).png");
  jump4 = loadImage("./animations/player/jump/Jump (4).png");
  jump5= loadImage("./animations/player/jump/Jump (5).png");

  jump6 = loadImage("./animations/player/jump/Jump (6).png");
  jump7 = loadImage("./animations/player/jump/Jump (7).png");
  jump8 = loadImage("./animations/player/jump/Jump (8).png");
  jump9 = loadImage("./animations/player/jump/Jump (9).png");
  jump10 = loadImage("./animations/player/jump/Jump (10).png");

  //Enemy Idle Images
  enemyidle1 = loadImage("./animations/enemy/idle/Idle__000.png")
  enemyidle2 = loadImage("./animations/enemy/idle/Idle__001.png")
  enemyidle3 = loadImage("./animations/enemy/idle/Idle__002.png")
  enemyidle4 = loadImage("./animations/enemy/idle/Idle__003.png")

  enemyidle5 = loadImage("./animations/enemy/idle/Idle__004.png")
  enemyidle6 = loadImage("./animations/enemy/idle/Idle__005.png")
  enemyidle7 = loadImage("./animations/enemy/idle/Idle__006.png")
  enemyidle8 = loadImage("./animations/enemy/idle/Idle__007.png")

  enemyidle9 = loadImage("./animations/enemy/idle/Idle__008.png")
  enemyidleA = loadImage("./animations/enemy/idle/Idle__009.png")

  //Enemy Running Images
  enemyrun1 = loadImage("./animations/enemy/run/Run__000.png")
  enemyrun2 = loadImage("./animations/enemy/run/Run__001.png")
  enemyrun3 = loadImage("./animations/enemy/run/Run__002.png")
  enemyrun4 = loadImage("./animations/enemy/run/Run__003.png")

  enemyrun5 = loadImage("./animations/enemy/run/Run__004.png")
  enemyrun6 = loadImage("./animations/enemy/run/Run__005.png")
  enemyrun7 = loadImage("./animations/enemy/run/Run__006.png")
  enemyrun8 = loadImage("./animations/enemy/run/Run__007.png")

  enemyrun9 = loadImage("./animations/enemy/run/Run__008.png")
  enemyrunA = loadImage("./animations/enemy/run/Run__009.png")

  //Background Music
  bgm = loadSound("./music/temple_run_female_music.mp3")

  bg = loadImage("./background/bg.png")

  // Coin Collected Sound
  cCM = loadSound("./music/coinCollectedSound.mp3")

  // Objects
  crate = loadImage("./objects/Crate.png")
  stone = loadImage("./objects/Stone.png")
  stone2 = loadImage("./objects/StoneBlock.png")

  // Coin
  coinIMG = loadImage("./objects/coin.png")
  
}

function setup(){

  

  

  

  createCanvas(windowWidth, windowHeight);
 

  running = [runner1, runner2, runner3, runner4,
              runner5, runner6, runner7, runner8];

  enemyRunning = [enemyrun1, enemyrun2, enemyrun3, enemyrun4, enemyrun5,
                  enemyrun6, enemyrun7, enemyrun8, enemyrun9, enemyrunA];

  enemyIdle = [enemyidle1, enemyidle2, enemyidle3, enemyidle4, enemyidle5,
              enemyidle6, enemyidle7, enemyidle8, enemyidle9, enemyidleA]

  dead = [dead1, dead2, dead3, dead4, dead5,
            dead6, dead7, dead8, dead9, dead10];

  jump = [jump1, jump2, jump3, jump4, jump5,
            jump6, jump7, jump8, jump9, jump10];

  objects = [stone, crate, stone2];


  obstacleGroup = new Group();
  coinGroup= new Group();

  currentCMD = cmd[0];

  game = new Game;
  game.start()
 
}

function draw(){
  background(bg)

  push()
  fill("#CCCC00")
  rect(0, windowHeight - 100, windowWidth, 100);
  pop()

  if(state === true){

    if(!bgm.isPlaying()){
     bgm.play()
     bgm.setLoop(true) 
    }
    
    game.play();
    

    if(gameState === "running"){
      game.generateObstacles()
      game.detectTouch();
    }

    if(kb.pressing(UP_ARROW)){
      currentCMD = cmd[1]
    } else {
      currentCMD = cmd[0]
    }
  } else {
    bgm.stop()
  }
  
}

