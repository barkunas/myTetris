class Controller {
    constructor() {
        this.status = true
        this.gameLoop
        this.initGameLoop()
    }
    gameEvents(event) {
        switch (event.code) {
            case 'ArrowLeft':
                if (game.checkLeft()) game.moveItemLeft()
                console.log('toLeft');
                break;
            case 'ArrowRight':
                if (game.checkRight()) game.moveItemRight()
                console.log('toRight');
                break;
            case 'ArrowDown':
                if (game.checkDown()) { game.moveItemDown() } else { game.checkFullLine() }
                console.log('Down');
                break;
            case 'ArrowUp':
                if (game.checkRotate()) game.moveItemRotate()
                console.log('rotate');
                break;
        }
    }
    initGameLoop(){
        this.setGameEvents()
        this.gameLoop = setInterval(() => {
            this.checkAndStopGame()
            if (game.checkDown()) { game.moveItemDown() } else { game.checkFullLine() }
        }, 100)
    }
    stopGameLoop(){
        this.delGameEvents()
        clearInterval(this.gameLoop)
    }
    setGameEvents(){
        document.addEventListener('keyup', this.gameEvents);
    }
    delGameEvents(){
        document.removeEventListener('keyup', this.gameEvents);
    }
    checkAndStopGame(){
        if(game.checkLose()){
            console.log("you lose")
           this.stopGameLoop()
        }
    }
}