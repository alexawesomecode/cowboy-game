    import 'phaser';
//    import windowEnemies from './Enemy'
import WelcomeScene from './WelcomeScene';

    var config = {
        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [WelcomeScene] 
    };

    let game = new Phaser.Game(config);

    //
