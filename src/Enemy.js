//
let robotsprite;
let dudesprite;
let dude3sprite;
let dude4sprite;
let enemyScore = 0;

let windowEnemies = function(thats) {


    let that = thats;


    function createEnemies() {

        robotsprite = that.add.sprite(350, 350, 'robot-1').play('robot');
        dudesprite = that.add.sprite(550, 450, 'dude1').play('explosion');
        dude3sprite = that.add.sprite(450, 150, 'baddude-3-2')
        dude4sprite = that.add.sprite(150, 150, 'baddude-3-1')

        //

        robotsprite.setDisplaySize(200, 200);
        robotsprite.setInteractive();

        dudesprite.setDisplaySize(200, 200);
        dudesprite.setInteractive();

        dude3sprite.setDisplaySize(200, 200);
        dude3sprite.setInteractive();


        dude4sprite.setDisplaySize(200, 200);
        dude4sprite.setInteractive();

        [robotsprite, dudesprite, dude3sprite, dude4sprite].forEach((elem) => {

            elem.on('pointerdown', function(pointer) {
                if (pointer.isDown) {
                    console.log('downn', elem.visible);
                    elem.visible = false;
                    enemyScore += 5
                }
            });
        })

    }

    function enemEnable(elem) {

        let rand = Math.random();
        if (elem.texture.key === 'robot-1') {
            if (dude4sprite.visible === false) {

                elem.visible = true;
                console.log('enem  visibility to true')
            } else {

                elem.visible = false;
            }

        } else if (elem.texture.key === 'baddude-3-1') {

            if (robotsprite.visible === false) {

                elem.visible = true;
                console.log('enem  visibility to true')
            } else {

                elem.visible = false;
            }

        } else {

            elem.visible = true;
        }
    }

    function checkEnemVisibility() {


        [robotsprite, dude3sprite, dudesprite, dude4sprite].forEach((elem) => {
            console.log(robotsprite)
            let rand = Math.random()
            if (rand > 0.7) {
                if (elem.visible === false) {
                    let msDelay = Phaser.Math.Between(4500, 6000)
                    setTimeout(enemEnable, msDelay, elem)

                }
            }
        });

    };

    function getEnemyScore() {
        return enemyScore;
    }

    return { createEnemies, checkEnemVisibility, getEnemyScore }


}

export default windowEnemies;