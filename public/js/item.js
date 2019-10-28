class Item {
    constructor(posX,posY,type) {
        this.type = type
        this.color = this.type["color"]
        this.currentModel = this.type["configuration"]
        this.x = posX;
        this.y = posY;
        this.model = {}
        this.currentModel.forEach((elem, ind) => {
            let positionX = this.x
            let positionY = this.y+ind
            elem.forEach((e, i) => {
                if (e) {
                    this.model["" + ind + ":" + i] = new Block(positionX+i, positionY,this.color)
                }
            })
        })
    }
    moveDown(){
        var deltaY = 1
        this.move(0,deltaY)
    }
    moveLeft(){
        var deltaX = -1
        this.move(deltaX,0)
    }
    moveRight(){
        var deltaX = 1
        this.move(deltaX,0)
    }
    move(deltaX,deltaY){
        this.x = this.x+deltaX;
        this.y = this.y+deltaY
        for(let block in this.model){
            this.model[block].move(deltaX,deltaY)
        }        
    }
    rotate(){
        this.currentModel = transpose(this.currentModel)
        this.model = {}
        this.currentModel.forEach((elem, ind) => {
            let positionX = this.x
            let positionY = this.y+ind
            elem.forEach((e, i) => {
                if (e) {
                    this.model["" + ind + ":" + i] = new Block(positionX+i, positionY,this.color)
                }
            })
        })
    }
}
function transpose(array){
    return array[0].map((x,i) => array.map(x => x[i]))
}