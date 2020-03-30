    import 'phaser';
    // todo: 
    // 1. set custom cursor
    // 2. on click make appear bomb explosion sprite
    // 3. multiple random badbuy position generator
    // 4. on three clicks on badbuy turn into green
    // 5. on three clicks badbuy change sprite
    // 6. make it appear a princess if you shoot you die
    // 7. shake screen / or colour it / when receiving bullet
    // 8. damage/health score for enemies
    // 
    //import { SimpleScene } from './scenes/simple-scene';

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
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var platforms;
    var score = 0;
    var scoreText;
    var bombs;
    let bomb;
    var gameOver = false;
    let groupCowboys;
    let enemies;
    let level = 0;

    function preload() {
        this.load.image('salon', './assets/salon2.jpg');
        this.load.image('dude1', 'assets/cowboy/sprite_05.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude2', 'assets/cowboy/sprite_06.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude3', 'assets/cowboy/sprite_07.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude4', 'assets/cowboy/sprite_08.png', { frameWidth: 32, frameHeight: 48 })

        this.load.spritesheet('bombExplosion', 'assets/Explosion.png', { frameWidth: 96, frameHeight: 96 });
        this.load.image('ground', 'assets/platform.png');


    }



    function create() {



        platforms = this.physics.add.staticGroup();



        platforms.create(600, 510, 'ground');
        platforms.create(80, 310, 'ground');
        this.add.image(400, 300, 'salon');

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
                { key: 'dude2' },
                { key: 'dude1' }

            ],
            frameRate: 10,
            repeat: -1,
            yoyo: true
        });

        bombs = this.physics.add.group();




        enemies = this.add.group()
        enemies = this.physics.add.group()
        enemies.enableBody = true;

        for (let i = 0, c = 0; i < 3; i++) {
            c += 150

            let b = enemies.create(c, 0, 'dude2')

            b.setDisplaySize(150, 150)
            b.name = 'badsscowboy' + i
            b.checkWorldBounds = true;
            this.physics.add.collider(b, platforms);

        }


        var sprite = this.add.sprite(150, 150, 'dude1').play('explosion');


        sprite.setDisplaySize(200, 200);
        sprite.setInteractive();

        sprite.on('pointerdown', function(pointer) {

            if (pointer.isDown) {

                console.log('downn');
                sprite.destroy();
            }


        });

    }



    function killCowboy(groupCowboy) {
        groupCowboys.disableBody(true, true);
        score += 10
        if (groupCowboys.countActive(true) === 0) {
            groupCowboys.children.iterate(function(child) {

                child.enableBody(true, child.x, 0, true, true);

            });
        }

    }



    function getKilled(player) {
        // player.setTint(0xff0000);

        this.physics.pause();
    }
    //


    //
    function collisionHandler(bombs, badsscowboy) {

        badsscowboy.destroy();

    }
    //


    //
    function showExplosion(x, y) {

        bomb = bombs.create(x, y, 'bombExplosion');
        bomb.setDisplaySize(65, 65);

        bomb.anims.play('expl', true)

    }



    function update() {
        let pointerIsFree;
        let pointer = this.input.activePointer;
        if (pointer.isDown) {

            let touchX = pointer.x;
            let touchY = pointer.y;

            showExplosion(touchX, touchY)


            pointerIsFree = false;
        }

        //
        let that = this;
        //

        this.physics.add.collider(bombs, enemies, collisionHandler, null, this);

        function multipleEnemy(cloneEnem) {

            let cloneNum = Math.ceil(level / 2);
            let xs = Phaser.Math.Between(0, 100);
            if ((level % 3 === 0) && (xs > 90)) {


                let clones = enemies.create(cloneEnem.x, cloneEnem.y, 'dude2')
                clones.setDisplaySize(150, 150)
                xs += 100
                clones.setVelocity(xs, -100);
                clones.name = 'badsscowboy' + xs
                clones.checkWorldBounds = true;
                that.physics.add.collider(clones, platforms);


            }
        }
        //
        console.log(enemies.countActive())
        if (enemies.countActive(true) < 2) {
            //  A new batch of stars to collect
            level += 1


            for (let i = 0, c = 100; i < 3; i++) {


                let luckyFactor = Math.random();
                c += Phaser.Math.Between(0, 100);



                if (luckyFactor > 0.90) {

                    if (level % 5 == 0) {
                        enemies.children.iterate(function(child) {

                            multipleEnemy(child)

                        });
                    }

                    let b = enemies.create(c, 0, 'dude2')

                    b.setDisplaySize(150, 150)
                    b.name = 'badsscowboy' + i
                    b.checkWorldBounds = true;
                    this.physics.add.collider(b, platforms);


                }
            }

        }

    }


    //

    function hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        //player.anims.play('turn');

        gameOver = true;
    }

    ////


    let game = new Phaser.Game(config);

    //