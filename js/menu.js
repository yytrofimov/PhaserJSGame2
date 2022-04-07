class MenuState {
    preload() {
        game.load.image("startGameButton", "../assets/menu/img/button_play-game.png");
        game.load.image("back", "../assets/menu/img/back.jpg");
        game.load.spritesheet("backgroundMusicButton", "../assets/menu/img/button_music.png", 200, 50);
        game.load.audio("defaultBackgroundMusic", game.config.backgroundMusic.defaultPath);
    }
    create() {
        game.scale.setGameSize(800, 600);
        this.backgroundMusic = game.add.audio("defaultBackgroundMusic");
        this.backgroundMusic.play();
        this.backgroundMusic.pause();
        if (game.config.backgroundMusic.on) {
            this.backgroundMusic.resume();
        }

        game.add.tileSprite(0, 0, 800, 600, "back");
        this.nameLabel = game.add.text(game.width / 2, 80, "Start Game!", {
            font: "50px Arial",
            fill: "#ffffff",
        });
        this.nameLabel.anchor.setTo(0.5, 0.5);
        this.startGameButton = game.add.button(game.width / 2 - 110, 160, "startGameButton", this.start, this);
        this.backgroundMusicButton = new BackgroungMusicButton(this);
    }
    start() {
        game.state.start("game");
    }

    shutdown() {
        this.backgroundMusic.stop();
    }
}

class BackgroungMusicButton extends Phaser.Button {
    constructor(context) {
        super(game, game.width / 2, 260, "backgroundMusicButton", BackgroungMusicButton.handler, context);
        this.frame = 1;
        game.world.add(this);
    }
    static handler() {
        console.log(this.backgroundMusic);
        if (this.backgroundMusic.paused) {
            this.backgroundMusicButton.frame = 1;
            this.backgroundMusic.resume();
            game.config.backgroundMusic.on = true;
        } else {
            this.backgroundMusicButton.frame = 0;
            this.backgroundMusic.pause();
            game.config.backgroundMusic.on = false;
        }
    }
}
