class Controller {
    constructor() {
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    console.log('toLeft');
                    break;
                case 'ArrowRight':
                    console.log('toRight');
                    break;
                case 'Space':
                    console.log('rotate');
                    break;
                case 'ArrowDown':
                    console.log('Down');
                    break;
            }
        });
    }
}