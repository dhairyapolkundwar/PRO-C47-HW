class MainScreen{
    constructor(){
        this.playBtn = createButton("Play")
        this.title = createElement("h1")
        this.subtitle = createElement("h3")
    }

    setElementsAttributes(){
        this.playBtn.class("gameButton");
        this.title.class("gameTitle")
        this.subtitle.class("gameSubtitle")
        this.title.html("Temple Run")
        this.subtitle.html("Female Version")
        this.title.position(width/2 - 300, 100)
        this.subtitle.position(width/2 - 200, 250)
        this.playBtn.position(width/2 - 100, 400)

        this.title.debug = true;
    }


    display(){
        this.setElementsAttributes()
        this.playBtn.mousePressed(() => {
            this.playBtn.hide();
            this.title.hide();
            this.subtitle.hide();
            state = true;
        })
    }

}