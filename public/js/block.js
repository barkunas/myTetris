class Block{
    constructor(x,y,color){
        this.activeBlock = true
        this.x = x
        this.y = y
        this.isEmpty = true
        this.color = color
    }
    setPos(x,y){
        this.x = x;
        this.y = y
    }
    move(deltaX,deltaY){
        this.x = this.x+deltaX;
        this.y = this.y+deltaY
    }
}