import callApi from './leaderboardApi.js'
import GameLogic from './GameLogic'
let rifle;


class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    preload() {
        this.load.image('dude1', 'assets/cowboy/sprite_05.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude2', 'assets/cowboy/sprite_06.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('testButton', "assets/testButton.png");
        this.load.spritesheet('bombExplosion', 'assets/Explosion.png', { frameWidth: 96, frameHeight: 96 });

        this.anims.create({
            key: 'explosion',
            frames: [
                { key: 'dude1' },
                { key: 'dude2' }

            ],
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });


        this.load.audio('rifle', 'assets/rifle.wav');
        this.load.html('nameform', 'assets/nameform.html');


    }


    create() {

        let that = this;
        let buttonTest = this.add.sprite(400, 300, 'testButton');
        let text = 'These were skilled cowboys, BUT... \n Your BRAVERY will be recompensated.\n\n ';
        let welcomeGuy = this.add.sprite(300, 550, 'dude1');
        let element = this.add.dom(300, 220).createFromCache('nameform');
        welcomeGuy.setDisplaySize(400, 400);

        rifle = this.sound.add('rifle')
        rifle.play();

        this.anims.create({
            key: 'expl',
            frames: this.anims.generateFrameNumbers('bombExplosion', { start: 1, end: 12 }),
            frameRate: 40,
            killOnComplete: true,
            msPerFrame: 400

        });


        buttonTest.setDisplaySize(450, 100)
        buttonTest.setInteractive();
        buttonTest.on('pointerdown', function(pointer) {

            rifle.play();
            let child = element.getChildByID('nameField')
            let userName = child.value
            let score = GameLogic().savedScore();
            that.scene.start('LeaderBoardScene');
            userName !== '' ? callApi().submitScore(userName, score) : callApi().submitScore('Anonymous', score)



        })

        this.add.text(350, 280, "SUBMIT", { font: "36px Arial" })
        this.add.text(100, 100, text, { font: "27px Arial", fill: '#ffffff', backgroundColor: '#000000' });


    }


    update() {

    }

}

export default GameOverScene;