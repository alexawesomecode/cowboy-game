import Phaser from 'phaser';
import GameScene from './GameScene';
import GameOverScene from './GameOverScene';
import LeaderBoardScene from './LeaderBoardScene';

const config = {
  type: Phaser.AUTO,
  parent: 'divId',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 600,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },

    },
  },
  scene: [GameScene, GameOverScene, LeaderBoardScene],

};

const newGame = Phaser.Game(config);
newGame();
