import GameScene from './GameScene';
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

    showExplosion(x, y) {
        let bombs = this.physics.add.group()
        let bomb = bombs.create(x, y, 'bombExplosion');
        bomb.setDisplaySize(65, 65);

        bomb.anims.play('expl', true)

    }

    create() {

        rifle = this.sound.add('rifle')
        rifle.play();

        let that = this;
        let buttonTest = this.add.sprite(400, 300, 'testButton');
        buttonTest.setDisplaySize(450, 100)
        buttonTest.setInteractive();
        buttonTest.on('pointerdown', function(pointer) {

            if (pointer.isDown)
                console.log('down');
            rifle.play();
            that.scene.start('LeaderBoardScene');

        })

        this.add.text(380, 280, "SUBMIT", { font: "36px Arial" })
        let text = 'These were skilled cowboys, BUT... \n Your BRAVERY will be recompensated.\n Enter your name';
        let welcomeGuy = this.add.sprite(300, 550, 'dude1');

        welcomeGuy.setDisplaySize(400, 400);


        this.add.text(100, 100, text, { font: "27px Arial", fill: '#ffffff', backgroundColor: '#000000' });

        this.anims.create({
            key: 'expl',
            frames: this.anims.generateFrameNumbers('bombExplosion', { start: 1, end: 12 }),
            frameRate: 40,
            killOnComplete: true,
            msPerFrame: 400

        });



        var element = this.add.dom(400, 0).createFromCache('nameform');

        element.addListener('click');

        element.on('click', function(event) {

            if (event.target.name === 'playButton') {
                var inputText = this.getChildByName('nameField');


                if (inputText.value !== '') {

                    this.removeListener('click');


                    this.setVisible(false);


                    text.setText('Welcome ' + inputText.value);
                }
            }
        });
    }


    update() {

        let pointerIsFree;
        let pointer = this.input.activePointer;


        if (pointer.isDown) {
            console.log(pointer.x)
            let touchX = pointer.x;
            let touchY = pointer.y;
            this.showExplosion(touchX, touchY)
            pointerIsFree = false;
        }
    }

}

export default GameOverScene;