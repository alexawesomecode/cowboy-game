
class WelcomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WelcomeScene' });
  }
    preload() {
        this.load.image('dude1', 'assets/cowboy/sprite_05.png', { frameWidth: 32, frameHeight: 48 })
        this.load.image('dude2', 'assets/cowboy/sprite_06.png', { frameWidth: 32, frameHeight: 48 })
       
	this.load.spritesheet('bombExplosion', 'assets/Explosion.png', { frameWidth: 96, frameHeight: 96 });


	this.load.spritesheet('bombExplosion', 'assets/Explosion.png', { frameWidth: 96, frameHeight: 96 });

	
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
            key: 'expl',
            frames: this.anims.generateFrameNumbers('bombExplosion', { start: 1, end: 12 }),
            frameRate: 40,
            killOnComplete: true,
            msPerFrame: 400

        });

	
    }
    create() {
	let welcomeGuy = this.add.sprite(400,250, 'dude1').play('explosion');
	welcomeGuy.setDisplaySize(400,400);
    this.add.text(12, 12, 'Hello World', { fontFamily: "Roboto Condensed"});
}
    showExplosion(x, y) {

        bomb = bombs.create(x, y, 'bombExplosion');
        bomb.setDisplaySize(65, 65);

        bomb.anims.play('expl', true)

    }

update() {

        let pointerIsFree;
        let pointer = this.input.activePointer;
        that = this;

        if (pointer.isDown) {

            let touchX = pointer.x;
            let touchY = pointer.y;
            showExplosion(touchX, touchY)
            pointerIsFree = false;
        }
}
}

//

export default WelcomeScene;
