import Phaser from 'phaser';

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

    fadeLeaderBoard(that) {
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Q5divoCqxdtUm0ypBU7C/scores/';
        const configurations = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        const results = fetch(url, configurations).then((elem) => elem.json());

        scores = results.result
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
        setTimeout(this.fadeLeaderBoard, 2300, this);
    }
}

export default LeaderBoardScene;