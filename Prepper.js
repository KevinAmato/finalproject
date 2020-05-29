class Prepper extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    preload() {

//--------------------Load images/sprites--------------------//
//----------images-----------//        
        this.load.image("menubackground", "assets/images/menubackground2.png");
        this.load.image("background", "assets/images/background.png");
        this.load.image("watermelon", "assets/images/watermelon.png");
        this.load.image("pretzel", "assets/images/pretzel.png");

//----------sprites-----------//
        this.load.spritesheet("shuttleM", "assets/sprites/shuttleMiddle.png", {
            frameWidth: 24,
            frameHeight: 32,
        });
        this.load.spritesheet("shuttleL", "assets/sprites/shuttleLeftFar.png", {
            frameWidth: 24,
            frameHeight: 32,
        });
        this.load.spritesheet("shuttleR", "assets/sprites/shuttleRightFar.png", {
            frameWidth: 24,
            frameHeight: 32,
        });

        this.load.spritesheet("laser", "assets/sprites/laser.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        
        this.load.spritesheet("alienA", "assets/sprites/alienA.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("alienA2", "assets/sprites/alienA.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("alienA3", "assets/sprites/alienA.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("alienB", "assets/sprites/alienB.png", {
            frameWidth: 32,
            frameHeight: 16,
        });
        this.load.spritesheet("alienB2", "assets/sprites/alienB.png", {
            frameWidth: 32,
            frameHeight: 16,
        });
        this.load.spritesheet("alienC", "assets/sprites/alienC.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("explosion", "assets/sprites/explosion.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

//----------audio-----------//
        this.load.audio("soundtrack", "assets/audio/soundtrack.wav");
        this.load.audio("laserSound", "assets/audio/laser.wav");
        this.load.audio("explosionSound", "assets/audio/explosion.wav");
        this.load.audio("foodSound", "assets/audio/food.wav");
  
        
    }
    create() {
//--------------------Intro tile--------------------//

        this.menubackground = this.add.image(
            0,
            0,
            "menubackground"
        );
        this.menubackground.setOrigin(0, 0);

        // this.add.text(150, 125, "AlienInvaderz2", {
        //     font: '48px Arial',
        //     fill: 'white'
        // })
        

        // this.add.text(150, 200, "Press the Space Bar to Play", {
        //     font: '25px Arial',
        //     fill: 'white'
        // })

        // this.add.text(800, 150, "Stop the AlienInvaderz!", {
        //     font: "24px Arial",
        //     fill: "white",
        // });

        // this.add.text(800, 200, "As Earth's last line of defense,\nit is your duty to kick as much \ngreen butt as possible!!\n\nFor extra Savage points,\nremember to top up on \nspace watermelons \nand galactic pretzels! ", {
        //     font: "28px Arial",
        //     fill: "white",
        // });

        // this.add.text(
        //     150,
        //     300,
        //     "Spacebar: fire your Laser cannon\nArrow keys: manouvering your spacecraft\nP: pauses game\nR: resumes game\nM: mutes soundtrack\nU: unmutes soundtrack ",
        //     {
        //         font: "18px Arial",
        //         fill: "white",
        //     }
        // );
        // this.watermelon = this.physics.add.image(1057, 403, "watermelon");
        // this.pretzel = this.physics.add.image(1075, 433, "pretzel");

//--------------------Animations--------------------//
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("shuttleL", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: this.anims.generateFrameNumbers("shuttleM", {
                start: 0,
                end: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("shuttleR", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1,
        });




        this.anims.create({
            key: "laseranim",
            frames: this.anims.generateFrameNumbers("laser"),
            frameRate: 20,
            repeat: -1,
        });
        

        this.anims.create({
            key: "alienA2anim",
            frames: this.anims.generateFrameNumbers("alienA2"),
            frameRate: 20,
            repeat: -1,
        });
         this.anims.create({
            key: "alienA3anim",
            frames: this.anims.generateFrameNumbers("alienA3"),
            frameRate: 20,
            repeat: -1,
        });
         this.anims.create({
             key: "alienAanim",
             frames: this.anims.generateFrameNumbers("alienA"),
             frameRate: 20,
             repeat: -1,
         });
        this.anims.create({
            key: "alienBanim",
            frames: this.anims.generateFrameNumbers("alienB"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "alienB2anim",
            frames: this.anims.generateFrameNumbers("alienB2"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "alienCanim",
            frames: this.anims.generateFrameNumbers("alienC"),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "explosionanim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0, //only once
            hideOnComplete: true,
        });
        
        this.space = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.scene.start("playGame");
        }
    }
}



