class View {
    constructor() {
        this.field = game.gameField
        const APPWIDTH = BOARDX * BLOCKSIZE
        const APPHEIGHT = BOARDY * BLOCKSIZE
        this.app = new PIXI.Application({
            width: APPWIDTH, height: APPHEIGHT, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(this.app.view);
        this.app.ticker.add(()=>this.draw())
        //this.draw()
    }
    draw() {
        this.app.stage.removeChildren()
        const testSprite = PIXI.Texture.from('img/testSprite.png');
        for (let i = 3, p = 0; i < this.field.length; i++ , p++) {
            var line = this.field[i]
            for (let k = 0; k < line.length; k++) {
                if (this.field[p][k].activeBlock) {
                    const testBlock = new PIXI.Sprite(testSprite)
                    testBlock.x = k * BLOCKSIZE
                    testBlock.y = p * BLOCKSIZE
                    this.app.stage.addChild(testBlock)
                }
            }
        }
    }
}