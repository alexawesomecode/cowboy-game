let robotsprite;
let dudesprite;
let dude3sprite;
let dude4sprite;
let dude2sprite;
let king;
let score;

const GameLogic = function(thats) {


    let that = thats;


    function createCharacters() {

        robotsprite = that.add.sprite(420, 395, 'robot-1').play('robot');
        dudesprite = that.add.sprite(610, 410, 'dude1').play('explosion');
        dude3sprite = that.add.sprite(550, 210, 'baddude-3-2')
        dude4sprite = that.add.sprite(200, 410, 'baddude-3-1')
        dude2sprite = that.add.sprite(300, 210, 'baddude-4-1')

        robotsprite.setDisplaySize(200, 200);
        robotsprite.setInteractive();

        dudesprite.setDisplaySize(160, 160);
        dudesprite.setInteractive();

        dude2sprite.setDisplaySize(150, 150);
        dude2sprite.setInteractive();

        dude3sprite.setDisplaySize(150, 150);
        dude3sprite.setInteractive();


        dude4sprite.setDisplaySize(150, 150);
        dude4sprite.setInteractive();



        [robotsprite, dudesprite, dude3sprite, dude4sprite, dude2sprite].forEach((elem) => {

            elem.on('pointerdown', function(pointer) {
                if (pointer.isDown) {

                    elem.visible = false;

                }
            });
        })

        return { robotsprite, dudesprite, dude3sprite, dude4sprite, dude2sprite }

    }

    function enemEnable(elem) {

        let rand = Math.random();
        if (elem.texture.key === 'dude1') {
            if (dude4sprite.visible === false) {

                elem.visible = false;

            } else {

                elem.visible = true;
            }

        } else if (elem.texture.key === 'baddude-3-1') {

            if (dudesprite.visible === false) {

                elem.visible = true;

            } else {

                elem.visible = false;
            }

        } else if (elem.texture.key === 'robot-1') {


            if (rand > 0.51) {
                if ((robotsprite.visible === false) && (king.visible == false)) {

                    elem.visible = true;

                }
            } else {

                elem.visible = false;
                callKing()
            }

        } else {

            elem.visible = true;
            if (rand > 0.80) callKing();
        }
    }

    function callKing() {
        let xPosition = Phaser.Math.Between(100, 700);
        let yPosition = Phaser.Math.Between(50, 550)
        king.x = xPosition;
        king.y = yPosition;

        if (king.visible == false) king.visible = true;
        else { king.visible = false }

    }

    function checkEnemVisibility() {

        [robotsprite, dude3sprite, dudesprite, dude4sprite].forEach((elem) => {

            let rand = Math.random()
            if (rand > 0.7) {
                if (elem.visible === false) {
                    let msDelay = Phaser.Math.Between(4500, 6000)
                    setTimeout(enemEnable, msDelay, elem)

                }
            }
        });

    };


    function overNextScene() {


        that.scene.start('GameOverScene');
    }

    function gameOver() {

        that.add.text(400, 300, "Game Over", { font: "47px Arial", fill: '#ffffff', backgroundColor: '#000000' });
        setTimeout(overNextScene, 2300);

    }

    function savedScore(total) {

        score = total;
        return total;

    }

    function createKing() {

        king = that.add.image(300, 200, 'king');
        king.setDisplaySize(150, 150)
        king.setInteractive();
        king.visible = false;
        king.on('pointerdown', function(pointer) {
            if (pointer.isDown) {

                king.setTint(0xff0000);
                that.scene.pause();
                gameOver();

            }
        });

    }

    return { createCharacters, checkEnemVisibility, createKing, savedScore }


}

export default GameLogic;