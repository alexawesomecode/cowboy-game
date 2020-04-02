import 'phaser';
import GameScene from './GameScene';
import GameOverScene from './GameOverScene';
import LeaderBoardScene from './LeaderBoardScene';
var config = {
    type: Phaser.AUTO,
    parent: 'divId',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }

        }
    },
    scene: [GameScene, GameOverScene, LeaderBoardScene]

};

let game = new Phaser.Game(config);