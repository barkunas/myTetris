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
                console.log('rotate');
                break;
            case 'Space':
                if (game.checkRotate()) game.moveItemRotate()
                console.log('Down');
                break;
        }
    }
    initGameLoop(){
        this.setGameEvents()
        this.gameLoop = setInterval(() => {
            if (game.checkDown()) { game.moveItemDown() } else { game.checkFullLine() }
        }, 1000)
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
}