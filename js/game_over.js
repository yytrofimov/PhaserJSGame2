class GameOverState {
    preload() {
        game.load.image("button", "../assets/game_over/img/button_play-again.png");
        game.load.image("back", "../assets/game_over/img/game_over.jpg");
    }
    create() {
        game.scale.setGameSize(800, 600);
        this.timer = 0;
        this.back = game.add.tileSprite(0, 0, 800, 600, "back");
        this.nameLabel = game.add.text(game.width / 2, 80, "Game over:c", {
            font: "50px Arial",
            fill: "#ffffff",
        });
        this.nameLabel.anchor.setTo(0.5, 0.5);
        this.button = game.add.button(game.width / 2 - 110, 160, "button", Button.startGame);
    }

    update() {
        this.timer += 1;
        if (this.timer >= 3 * 60) {
            game.state.start("menu");
            this.timer = 0;
        }
    }
}

class Button {
    static startGame() {
        game.state.start("game");
    }
}
