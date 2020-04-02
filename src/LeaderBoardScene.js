let finalScore;
let scores;


class LeaderBoardScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'LeaderBoardScene'

        });

    }

    init(data) {

        scores = data.scores.then((el) => el);

        console.log(scores)

    }

    preload() {
        this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');

    }

    fadeLeaderBoard(that) {
        //

        that.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);

        for (let i = 1; i < 6; i++) {
            if (scores[i - 1]) {
                that.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     ${scores[i-1].score}  ${scores[i-1].user}`).setTint(0xffffff);
            } else {
                that.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}     0  ---`).setTint(0xffffff);
            }
        }
    }
    create() {

        setTimeout(this.fadeLeaderBoard, 2300, this)
    }
}

export default LeaderBoardScene;