config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
        },
    },
};

game = new Phaser.Game(config);
game.state.add("menu", MenuState);
game.state.add("game", GameState);
game.state.add("gameOver", GameOverState);
game.state.start("menu");

game.config = {};
game.config.backgroundMusic = {};
game.config.backgroundMusic.defaultPath = ["../assets/common/sound/back.mp3", "../assets/common/sound/back.ogg"];
game.config.backgroundMusic.on = true;

game.config.currentLevel = 1;
