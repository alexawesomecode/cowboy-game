let scores;
import callApi from './leaderboardApi.js';

class LeaderBoardScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'LeaderBoardScene'

        });

        scores = callApi().getScore()
    }

    preload() {
        this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
    }

    create() {
        this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);

        for (let i = 1; i < 6; i++) {
            if (scores[i - 1]) {
                this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     ${scores[i-1].score}  ${scores[i-1].user}`).setTint(0xffffff);
            } else {
                this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     0  ---`).setTint(0xffffff);
            }
        }
    }
}

export default LeaderBoardScene;