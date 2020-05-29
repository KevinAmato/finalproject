class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "explosion");
        scene.add.existing(this);
        this.play("explosionanim");
    }
}

class Laser extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let x = scene.shuttle.x;
        let y = scene.shuttle.y;
        super(scene, x, y, "laser");
        scene.add.existing(this);

        this.play("laseranim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;

        scene.laserGroup.add(this);
    }
}


class Runner extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        //--------------------Add Sprites/Images--------------------//
        //---------------Background---------------//
        this.background = this.add.tileSprite(
            0,
            0,
            config.width,
            config.height,
            "background"
        );
        this.background.setOrigin(0, 0);

        this.watermelon = this.physics.add.image(0, 0, "watermelon");
        this.watermelon.setRandomPosition(
            0,
            0,
            game.config.width,
            game.config.height
        );
        this.watermelon.setVelocity(0, 250);

        this.pretzel = this.physics.add.image(0, 0, "pretzel");
        this.pretzel.setRandomPosition(
            0,
            0,
            game.config.width,
            game.config.height
        );
        this.pretzel.setVelocity(0, 250);

        this.shuttle = this.physics.add.sprite(
            config.width / 2,
            config.height - 80,
            "shuttle"
        );

        //---------------Aliens---------------//
        this.alienA = this.add.sprite(
            config.width / 2 - 50,
            config.height / 2,
            "alienA"
        );
        this.alienA2 = this.add.sprite(
            config.width / 2 - 50,
            config.height / 2,
            "alienA2"
        );
        this.alienA3 = this.add.sprite(
            config.width / 2 - 50,
            config.height / 2,
            "alienA3"
        );
        this.alienB = this.add.sprite(
            config.width / 2,
            config.height / 2,
            "alienB"
        );
        this.alienB2 = this.add.sprite(
            config.width / 2 - 50,
            config.height / 2,
            "alienB2"
        );
        this.alienC = this.add.sprite(
            config.width / 2 + 50,
            config.height / 2 + 25,
            "alienC"
        );

        //--------------------Groups--------------------//
        this.aliens = this.physics.add.group();
        this.aliens.add(this.alienA);
        this.aliens.add(this.alienA2);
        this.aliens.add(this.alienA3);
        this.aliens.add(this.alienB);
        this.aliens.add(this.alienB2);
        this.aliens.add(this.alienC);

        this.food = this.physics.add.group();
        this.food.add(this.watermelon);
        this.food.add(this.pretzel);

        this.laserGroup = this.add.group();

        //--------------------Movement--------------------//
        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.shuttle.setCollideWorldBounds(true);

        //--------------------Play Animations--------------------//
        this.alienA.play("alienAanim");
        this.alienB.play("alienBanim");
        this.alienC.play("alienCanim");

        //--------------------Collission--------------------//

        this.physics.add.overlap(
            this.shuttle,
            this.food,
            this.eatFood,
            null,
            this
        );
        this.physics.add.overlap(
            this.shuttle,
            this.aliens,
            this.takeDamage,
            null,
            this
        );
        this.physics.add.overlap(
            this.laserGroup,
            this.aliens,
            this.hitAlien,
            null,
            this
        );
        //--------------------Score--------------------//

        scoreText = this.add.text(15, 15, "Savage lvl: 0", {
            fontSize: "20px",
            fill: "#ffffff",
            fontWeight: "bold",
        });
        //--------------------Pause--------------------//
        const pauseText = this.add.text(1030, 15, "P: pause\nR: resume", {
            fontSize: "12px",
            fill: "#ffffff",
            fontWeight: "bold",
        });
        this.pause = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.P
        );
        this.resume = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );

        //--------------------Mute--------------------//
        const mute = this.add.text(1120, 15, "M: mute\nU: unmute", {
            fontSize: "12px",
            fill: "#ffffff",
            fontWeight: "bold",
        });

        this.mute = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.M
        );
        this.unmute = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.U
        );

        //--------------------Audio--------------------//
        this.soundtrack = this.sound.add("soundtrack");
        this.soundtrack.play();
        this.laserSound = this.sound.add("laserSound");
        this.explosionSound = this.sound.add("explosionSound");
        this.foodSound = this.sound.add("foodSound");
    }

    update() {
        this.background.tilePositionY -= 0.3;
        this.moveObjects(this.alienA, 1);
        this.moveObjects(this.alienA2, 2);
        this.moveObjects(this.alienA3, 3);
        this.moveObjects(this.alienB, 3);
        this.moveObjects(this.alienB2, 2);
        this.moveObjects(this.alienC, 3);
        this.moveObjects(this.watermelon, 1);
        this.moveObjects(this.pretzel, 2);
        this.moveShuttle();
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.fireLaser();
            this.laserSound.play();
        }
        if (Phaser.Input.Keyboard.JustDown(this.pause)) {
            console.log("trying to pause game");
            this.physics.pause();
            console.log(this.pause)
            this.soundtrack.pause()
        }
        if (Phaser.Input.Keyboard.JustDown(this.resume)) {
            console.log("trying to resume");
            this.physics.resume();
            this.soundtrack.resume();
        }
          if (Phaser.Input.Keyboard.JustDown(this.mute)) {
              console.log("trying to mute game");
              this.soundtrack.pause();
          }
          if (Phaser.Input.Keyboard.JustDown(this.unmute)) {
              console.log("trying to unmute");
              this.soundtrack.resume();
          }
    }

    //--------------------Functions--------------------//
    moveShuttle() {
        if (this.cursors.left.isDown) {
            this.shuttle.setVelocityX(-160);
            this.shuttle.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.shuttle.setVelocityX(160);
            this.shuttle.anims.play("right", true);
        } else {
            this.shuttle.setVelocityX(0);
            this.shuttle.anims.play("turn", true);
        }
        if (this.cursors.up.isDown) {
            this.shuttle.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.shuttle.setVelocityY(300);
        } else {
            this.shuttle.setVelocityY(0);
        }
    }

    fireLaser() {
        // this.laser = this.physics.add.sprite(
        //     this.shuttle.x,
        //     this.shuttle.y,
        //     "laser"
        // );
        // this.laser.body.velocity.y = -250;
        // this.laser.play("laseranim");
        this.laser = new Laser(this);
    }

    moveObjects(object, velocity) {
        object.y += velocity;
        if (object.y > config.height) {
            this.redropObjects(object);
        }
    }
    hitAlien(laser, aliens) {
        let explosion = new Explosion(this, aliens.x, aliens.y);
        laser.destroy();
        this.redropObjects(aliens);
        score += 15;
        scoreText.setText("Savage lvl: " + score);
        this.explosionSound.play();
    }
    redropObjects(object) {
        object.y = 0;
        const randomX = Phaser.Math.Between(0, config.width);
        object.x = randomX;
    }

    eatFood(shuttle, food) {
        food.disableBody(true, true);
        score += 150;
        scoreText.setText("Savage lvl: " + score);
        this.foodSound.play();
    }

    takeDamage(shuttle, aliens) {
        let explosion = new Explosion(this, shuttle.x, shuttle.y);
        this.redropObjects(aliens);
        shuttle.x = config.width / 2;
        shuttle.y = config.height - 80;
        score = 0;
        scoreText.setText("Savage lvl: " + score);
        this.explosionSound.play();
    }
}