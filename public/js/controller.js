class Controller {
    constructor() {
        document.addEventListener('keyup', (event) => {
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
                    if (game.checkDown()){ game.moveItemDown()}else{game.checkFullLine()}
                    console.log('rotate');
                    break;
                case 'Space':
                    if (game.checkRotate()) game.moveItemRotate()
                    console.log('Down');
                    break;
            }
        });
        setInterval(()=>{
            if (game.checkDown()){ game.moveItemDown()}else{game.checkFullLine()}
        },1000)
    }
}