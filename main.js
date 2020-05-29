let config = {
    width: 1265,
    height: 565,
    backgroundColor: 0x000000,
    scene: [Prepper, Runner],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
};
    let game = new Phaser.Game(config);
    let score = 0;
    let scoreText; 
    let timetText;
    let bombs;

