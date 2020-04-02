import GameLogic from './GameLogic';


let platforms;
let score = 0;
let scoreText;
let bombs;
let bomb;
let that;
let rifle;
let blues;
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }


    preload() {

        this.load.image('dude1', 'assets/cowboy/sprite_05.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude2', 'assets/cowboy/sprite_06.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude3', 'assets/cowboy/sprite_07.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude4', 'assets/cowboy/sprite_08.png', { frameWidth: 32, frameHeight: 48 })

        this.load.image('baddude-4-1', 'assets/cowboy/sprite_17.png', { frameWidth: 32, frameHeight: 48 })

        this.load.image('baddude-2-1', 'assets/cowboy/sprite_19.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('baddude-2-2', 'assets/cowboy/sprite_20.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('baddude-2-3', 'assets/cowboy/sprite_21.png', { frameWidth: 32, frameHeight: 48 })


        this.load.image('baddude-3-1', 'assets/cowboy/sprite_09.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('baddude-3-2', 'assets/cowboy/sprite_10.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('baddude-3-3', 'assets/cowboy/sprite_11.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('baddude-3-4', 'assets/cowboy/sprite_12.png', { frameWidth: 32, frameHeight: 48 })

        this.load.image('robot-1', 'assets/cowboy/sprite_03.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('robot-2', 'assets/cowboy/sprite_04.png', { frameWidth: 32, frameHeight: 48 })

        this.load.spritesheet('bombExplosion', 'assets/Explosion.png', { frameWidth: 96, frameHeight: 96 });
        this.load.image('ground', 'assets/platform.png');
        this.load.image('salon', './assets/transparent.png');
        this.load.image('king', 'assets/king.svg', { frameWidth: 32, frameHeight: 48 })

        this.load.audio('blues', 'assets/blues.ogg');
        //  this.load.audio('pistol', 'assets/pistol.wav');
        this.load.audio('rifle', 'assets/rifle.wav');
        //    this.load.audio('shotgun', 'assets/shotgun.wav');

    }
    create() {

        platforms = this.physics.add.staticGroup();
        platforms.create(600, 510, 'ground');
        platforms.create(80, 310, 'ground');
        this.add.image(400, 300, 'salon');

        that = this;


        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        this.anims.create({
            key: 'expl',
            frames: this.anims.generateFrameNumbers('bombExplosion', { start: 1, end: 12 }),
            frameRate: 40,
            killOnComplete: true,
            msPerFrame: 400

        });


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

        this.anims.create({
            key: 'robot',
            frames: [
                { key: 'robot-1' },
                { key: 'robot-2' }


            ],
            frameRate: 2,
            repeat: -1,
            yoyo: true
        });

        bombs = this.physics.add.group();

        const { robotsprite, dudesprite, dude3sprite, dude4sprite } = GameLogic(that).createCharacters();
        GameLogic(that).createKing()

        this.setScore([robotsprite, dudesprite, dude3sprite, dude4sprite])
        blues = this.sound.add('blues');
        blues.play();

        rifle = this.sound.add('rifle');
        //     shotgun = this.sound.add('shotgun');
        //   pistol = this.sound.add('pistol');

    }


    setScore(arr) {

        arr.forEach((enem) => {
            console.log(enem)
            enem.on('pointerdown', function(pointer) {
                if (pointer.isDown) {
                    score += 5
                    GameLogic().savedScore(score)
                    scoreText.setText('Score: ' + score);



                }
            });


        })

    }

    showExplosion(x, y) {


        const rand = Math.random();
        bomb = bombs.create(x, y, 'bombExplosion');
        bomb.setDisplaySize(65, 65);
        bomb.anims.play('expl', true)
        if (rand < 0.21) rifle.play();
        if (rand > 0.91) rifle.play();

    }


    update() {
        let pointerIsFree;
        let pointer = this.input.activePointer;
        that = this;

        if (pointer.isDown) {

            let touchX = pointer.x;
            let touchY = pointer.y;
            this.showExplosion(touchX, touchY)
            GameLogic(that).checkEnemVisibility();
            pointerIsFree = false;
        }

    }
}
export default GameScene;
//