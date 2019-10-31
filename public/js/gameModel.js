
class GameModel {
    constructor(sizeX, sizeY) {
        this.board = new Board(sizeX, sizeY + 3);
        this.size = [sizeX, sizeY + 3]
        //this.items = {}
        this.currItem
        this.gameField = [];
        for (let i = 0; i < sizeY + 3; i++) {
            this.gameField[i] = []
            for (let k = 0; k < sizeX; k++) {
                this.gameField[i][k] = { "isEmpty": true };
            }
        }
        this.addItem()//временно, потом удалить- для теста

    }
    addItem(type) {
        this.currItem = new Item(0, 0, new Type().type);//temp1 для теста- потом удалить
        this.updateModel()
    };
    moveItemRight() {
        this.setZerro()
        this.currItem.moveRight()
        this.updateModel()
    }
    moveItemLeft() {
        this.setZerro()
        this.currItem.moveLeft()
        this.updateModel()
    }
    moveItemRotate() {
        this.setZerro()
        this.currItem.rotate()
        this.updateModel()
    }
    moveItemDown() {
        this.setZerro()
        this.currItem.moveDown()
        this.updateModel()
    }
    updateModel() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = blocksObj[elem]
        }
        //console.clear()
        //console.table(this.gameField)
    }
    setZerro() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = { "isEmpty": true }
        }
    }
    crashItem() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = { "activeBlock": true, "isEmpty": false, "isIndependent": true, "color": blocksObj[elem].color }
        }
        this.addItem()
    }
    checkFullLine() {
        var winLineArr = []
        this.gameField.forEach((elem, ind) => {
            if (elem.every((e, i) => { return e.isIndependent })) { this.removeLine(ind); winLineArr.push(ind) }
        })
        //console.log(winLineArr)
    }
    removeLine(num) {
        this.gameField[num].forEach((elem, ind) => { this.gameField[num][ind] = { "isEmpty": true } })
        this.dropDownAfterRemoved(num)
    }
    dropDownAfterRemoved(num) {
        var gameHight = num
        for (let i = num; i > 0; i--) {
            this.gameField[i].forEach((elem, ind) => { if (elem.isIndependent) { swap(this.gameField, i, ind, i + 1, ind) } })
        }
        function swap(Arr, a, b, c, d) {
            var temp = Arr[a][b]
            Arr[a][b] = Arr[c][d]
            Arr[c][d] = temp
        }
    }
    checkLose(){
        var result = false
        this.gameField[2].forEach((elem,ind)=>{
            if (elem.isIndependent){result = true}
        })
        return result
    }
    checkLeft() {
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemX == 0) return false;
            var leftFriend = this.gameField[elemY][elemX - 1];
            if (leftFriend.isEmpty == false) return false
        }
        return true
    }
    checkRight() {
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemX == this.size[0] - 1) return false;
            var rightFriend = this.gameField[elemY][elemX + 1];
            if (rightFriend.isEmpty == false) return false
        }
        return true
    }
    checkDown() {
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemY == this.size[1] - 1) { this.crashItem(); return false };
            var downFriend = this.gameField[elemY + 1][elemX];
            if (downFriend.isEmpty == false) { this.crashItem(); return false }
        }
        return true
    }
    checkRotate() {
        var result = true
        var nextConfigModel = transpose(this.currItem.getNextConfig());
        nextConfigModel.forEach((elem, ind) => {
            let positionY = this.currItem.y + ind
            elem.forEach((e, i) => {
                if (e) {
                    let positionX = this.currItem.x + i
                    try {
                        var tempElem = this.gameField[positionY][positionX]
                        //console.log([positionX,positionY])
                        if (tempElem && tempElem.isEmpty == true) {
                            return true
                        }
                    } catch{ result = false }
                    result = false
                }
            })
        })
        return result
    }
}