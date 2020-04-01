
class WelcomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomeScene' });
  }
    preload() {
        this.load.image('dude1', 'assets/cowboy/sprite_05.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude2', 'assets/cowboy/sprite_06.png', { frameWidth: 32, frameHeight: 48 })
         this.load.image('testButton', "assets/testButton.png");
//	this.load.image('clouds', "assets/clouds.png");

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

       
	
}

    create() {


	
	let  buttonTest = this.add.sprite(400,300,'testButton');
        buttonTest.setDisplaySize(450,100)
	buttonTest.setInteractive();
	buttonTest.on('pointerdown', function(pointer) {
	    
	    if (pointer.isDown)

		console.log('down');
	    this.scene.start("GameScene");
	})

	this.add.text(400,300, "Play", {font: "28px Arial"})
	let text = "A playful king has been captured\n... by some bad cowboys.\n Shoot every single one.\n Be careful not to kill the king."
	let welcomeGuy = this.add.sprite(300,550, 'dude1');
//	let cloudsBox = this.add.sprite(200, 200, 'clouds');
	welcomeGuy.setDisplaySize(400,400);
//	this.add.text(202, 200, text, { fontFamily: "Roboto Condensed", backgroundColor: "#fff"});

	
	this.add.text(100, 100, text,  { font: "27px Arial", fill: '#ffffff', backgroundColor: '#000000' });

	this.anims.create({
            key: 'expl',
            frames: this.anims.generateFrameNumbers('bombExplosion', { start: 1, end: 12 }),
            frameRate: 40,
            killOnComplete: true,
            msPerFrame: 400

        });

    
    }

    
    showExplosion(x, y) {
	let bombs = this.physics.add.group()
        let bomb = bombs.create(x, y, 'bombExplosion');
        bomb.setDisplaySize(65, 65);

        bomb.anims.play('expl', true)

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

//

export default WelcomeScene;
