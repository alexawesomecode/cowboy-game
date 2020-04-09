import Phaser from 'phaser';
import callApi from './leaderboardApi';

let scores;

class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LeaderBoardScene',

    });
  }

  preload() {
    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
  }

  async pullResults() {
    scores = await callApi().getScore();
  }

  static fadeLeaderBoard(that) {
    that.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);

    for (let i = 1; i < 6; i += 1) {
      if (scores[i - 1]) {
        that.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     ${scores[i - 1].score}  ${scores[i - 1].user}`).setTint(0xffffff);
      } else {
        that.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     0  ---`).setTint(0xffffff);
      }
    }
  }

  create() {
    this.pullResults();
    setTimeout(this.constructor.fadeLeaderBoard, 4300, this);
  }
}

export default LeaderBoardScene;
