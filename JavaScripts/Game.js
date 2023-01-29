class Game{

    constructor(){
        this.player = createSprite(600, windowHeight - 200, 50, 240)
        this.score = 0;
        this.player.visible = false
        this.gameOverVisibility = 0;
        this.pause = createButton("")
        this.pauseText = createElement("h1")
        this.scorePaused = createElement("h3")
        this.player.collider = 'static'
        this.returnHome = createButton("Back To Main Screen")
        this.coinCollected = 0;
        this.speed = 1.00
    }

    start(){
        var form = new MainScreen();
        form.display();
    }

    
    generateCoins = function(timePeriod){
        if(frameCount%timePeriod === 0){

            let coin = new Sprite(coinIMG, windowWidth + 300, windowHeight - 250, 60, 60)
            coin.velocity.x = -10  * this.speed
            coin.scale = 0.125
            coinGroup.add(coin)
        }
    }

    

    detectCoinCollect = function(){
        

            this.player.collide(coinGroup, function(player, coin){
                game.score += 5
                game.coinCollected += 1
                cCM.amp(0.5)
                cCM.play()
                coin.remove()
            })

        
        
    }
    
    
     generateObstacles = function(timePeriod){
        if(frameCount%timePeriod === 0){

            var obsImg = round(random(0,2))
            let obstacle = new Sprite(objects[obsImg], windowWidth + 300, windowHeight - 138, 60, 100)


            obstacle.velocity.x = -10 * this.speed
            
        

            obstacleGroup.add(obstacle)

            console.log(obstacleGroup.length)
            console.log(this.speed)
        }
    }

    #enemyImage = 0;
    #playerImage = 0;
    #playerPos = 0;


    detectTouch = function(){
        

        if(this.player.collides(obstacleGroup)){
            gameState = 'end'
        }
        
    }


    performActions(){
        if(currentCMD === "run"){
            if(this.#playerImage < (running.length - 0.5)){
                if(this.#playerPos > 0){
                    this.#playerPos -= 7
                }
                this.player.position.y = (windowHeight - 220) - this.#playerPos
                image(running[Math.round(this.#playerImage)], 400, (windowHeight - 360) - this.#playerPos, 641 / 2, 542 / 2)
            }
        } else if(currentCMD === "jump"){
            if(this.#playerImage < (jump.length - 0.5)){
                if(this.#playerPos < 150){
                    this.#playerPos += 7
                }
                this.player.position.y = (windowHeight - 220) - this.#playerPos

                image(jump[5], 400, (windowHeight - 360) - this.#playerPos, 641 / 2, 542 / 2)
            
            }
        }
    }



    setElementProperties(){
        this.pauseText.html("Paused")
        this.scorePaused.html("Score: " + round(this.score))

        this.pauseText.class("gameTitle")
        this.scorePaused.class("gameSubtitle")
        this.returnHome.position(width / 2.6, height / 2 + 300)

        if(gameState === "running"){
            this.pause.html("Pause")
            this.pause.position(width - 200, 10)
            this.pause.class("gameButton")
            this.pause.show()
            this.returnHome.hide()

            this.pauseText.hide()
            this.scorePaused.hide()
        } else if(gameState === "end"){
            this.pause.hide()
            this.returnHome.hide()
            this.pauseText.hide()
            this.scorePaused.hide()
        } else if(gameState === "pause"){
            this.pause.html("Resume")
            this.pause.position(width / 2.75, height / 2 + 100)
            this.pause.class("gameButtonPaused")
            this.returnHome.class("gameButtonHome")
            this.pauseText.position(width / 2.5, 100)
            this.scorePaused.position(width / 2.25, 300)
            this.pauseText.show()
            this.scorePaused.show()
            this.returnHome.show()
        }
        

    }

    hide(){
        this.pause.hide();
        this.returnHome.hide();
        this.pauseText.hide();
        this.scorePaused.hide();
        this.score = 0.0
        this.coinCollected = 0
    }

    setElementConditions(){

        this.pause.mousePressed(() => {
            if(gameState === "running"){
                gameState = "pause"
                this.player.y = 10
                
            } else if(gameState === "pause") {
                gameState = "running"

                
                if(this.player.y !== windowHeight - 120){
                    this.player.y = windowHeight - 120
                } 
            }
        })

        this.returnHome.mousePressed(() => {
            state = false;
            this.start()
            this.hide()
            gameState = "running"
        })

    }


    play(){

        this.setElementProperties()
        this.setElementConditions()

        this.#enemyImage += 0.3
        this.#playerImage += 0.2
        push()
        textSize(36)
        text("Score: " + round(this.score), 10, 50)
        text("Coins: " + round(this.coinCollected), 10, 120)
        pop()


        if(gameState === "running"){
           
            //#region "Detect Touches"
            this.detectTouch();
            this.detectCoinCollect();
            //#endregion

            this.score += (2 * this.speed) // Score Increment

            //#region "Image Change"

            if(this.#enemyImage >= (enemyRunning.length - 0.5)){
                this.#enemyImage = 0;
            }

            if(this.#enemyImage < (enemyRunning.length - 0.5)){
                image(enemyRunning[Math.round(this.#enemyImage)], 100, windowHeight - 575, 376 / 1.05, 520 / 1.05)
            }

            if(this.#playerImage >= (running.length - 0.5)){
                this.#playerImage = 0;
            }

            //#endregion
            
            this.performActions();

            this.generateObstacles(round(180))
            this.generateCoins(round(60 / (this.speed)))
            

            this.gameOverVisibility = 0;
            this.speed += 0.000125

        } else if(gameState === "end"){



            //#region "Image Change"
            if(this.#enemyImage >= (enemyIdle.length - 0.5)){
                this.#enemyImage = 0;
            }

            if(this.#enemyImage < (enemyIdle.length - 0.5)){
                image(enemyIdle[Math.round(this.#enemyImage)], 100, windowHeight - 575, 290 / 1.05, 500 / 1.05)
            }

            if(this.#playerImage >= (dead.length - 0.5)){
                this.#playerImage = dead.length - 2;
            }

            if(this.#playerImage < (dead.length - 0.5)){
                image(dead[Math.round(this.#playerImage)], 400, windowHeight - 360, 605 / 2, 604 / 2)
            }

            //#endregion

            this.gameOverVisibility += 0.25
            

            this.gameOverDisplay();

            

            if(mouseIsPressed){
                gameState = "running"
                this.score = 0.0
                this.coinCollected = 0

                // window.location.reload();
                this.speed = 1.00
                
            }

            obstacleGroup.remove();
            coinGroup.remove();
            // this.player.x = 600; this.player.y = windowHeight - 120;
            
        }

        drawSprites();
        
    }

    

    gameOverDisplay(){
        push()
            textSize(96)
            fill("rgba(255, 0, 0, " + this.gameOverVisibility + ")")
            strokeWeight(10)
            stroke(0)
            text("Game Over", windowWidth / 2 - 200, (windowHeight / 2) - 100)
            pop()

            push()
            textSize(48)
            fill("rgba(255, 0, 0, " + this.gameOverVisibility + ")")
            strokeWeight(4)
            stroke(0)
            text("Your Score:- " + Math.round(this.score), windowWidth / 2 - 100, windowHeight / 2 - 25)
            pop()


            push()
            textSize(36)
            fill("white")
            text("Click Anywhere To Restart...", windowWidth / 2 - 175, windowHeight - 25)
            pop() 
    }

}
