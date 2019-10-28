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
                    if (game.checkDown()) game.moveItemDown()
                    console.log('rotate');
                    break;
                case 'Space':
                    if (game.checkRotate()) game.moveItemRotate()
                    console.log('Down');
                    break;
            }
        });
    }
}