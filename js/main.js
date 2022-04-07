class GameState {
    create() {
        game.state.add("level1", Level1);
        game.state.add("level2", Level2);
    }
    update() {
        if (game.config.currentLevel == 1) {
            game.state.start("level1");
        } else if (game.config.currentLevel == 2) {
            game.state.start("level2");
        }
    }
}

class Level1 {
    preload() {
        game.load.tilemap("map", "../assets/game/map_1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("player", "../assets/game/img/player.png", 20, 20);
        game.load.spritesheet("progressbar", "../assets/common/img/progressbar_sprite.png", 400, 40);
        game.load.image("ground_1x1", "../assets/game/tiles/ground_1x1.png");
        game.load.image("back", "../assets/game/img/back.jpg");
        game.load.spritesheet("coin", "../assets/game/img/coin.png", 20, 20);
        game.load.image("enemy", "../assets/game/img/enemy.png");
        game.load.audio("coin", ["../assets/game/sound/coin.mp3", "../assets/game/sound/coin.ogg"]);
        game.load.audio("jump", ["../assets/game/sound/jump.mp3", "../assets/game/sound/jump.ogg"]);
        game.load.audio("lost", ["../assets/game/sound/lost.mp3", "../assets/game/sound/lost.ogg"]);
    }

    create() {
        game.scale.setGameSize(800, 600);
        this.map = game.add.tilemap("map");
        this.map.addTilesetImage("ground_1x1");
        this.map.setCollisionBetween(1, 12);
        this.layer = this.map.createLayer("world");
        this.layer.resizeWorld();
        this.player = new Player(this);
        game.camera.follow(this.player);
        this.cursors = game.input.keyboard.createCursorKeys();

        var coins_coordinates = [
            [400, 30],
            [300, 30],
            [200, 300],
            [100, 120],
            [403, 234],
        ];
        this.coinsRemaining = game.add.text(100, 510, "", {
            font: "18px Arial bold",
            fill: "#FFFFFF",
            align: "center",
        });
        this.progressbar = game.add.sprite(260, 502, "progressbar");
        this.coins = new Coins(coins_coordinates, this, 1);
        this.progressbar.scale.setTo(0.75, 0.75);
        this.enemies1 = new Enemies(this, 220, 10, 2);
        this.enemies2 = new Enemies(this, 600, 10, 1);
        this.enemies3 = new Enemies(this, 750, 10, 1);
        this.jumpSound = game.add.audio("jump");
        this.takeCoinSound = game.add.audio("coin");
        this.lostSound = game.add.audio("lost");
        this.backgroundMusic = game.add.audio("defaultBackgroundMusic");
        if (game.config.backgroundMusic.on) {
            this.backgroundMusic.play();
        }
    }
    update() {
        if (!this.coins.remainingCoins) {
            game.config.currentLevel = 2;
            game.state.start("game");
        }
    }
    shutdown() {
        this.backgroundMusic.stop();
    }
}

class Level2 {
    preload() {
        game.load.tilemap("map", "../assets/game/map_2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet("player", "../assets/game/img/player.png", 20, 20);
        game.load.spritesheet("progressbar", "../assets/common/img/progressbar_sprite.png", 400, 40);
        game.load.image("ground_1x1", "../assets/game/tiles/ground_1x1.png");
        game.load.image("back", "../assets/game/img/back.jpg");
        game.load.spritesheet("coin", "../assets/game/img/coin.png", 20, 20);
        game.load.image("enemy", "../assets/game/img/enemy.png");
        game.load.audio("coin", ["../assets/game/sound/coin.mp3", "../assets/game/sound/coin.ogg"]);
        game.load.audio("jump", ["../assets/game/sound/jump.mp3", "../assets/game/sound/jump.ogg"]);
        game.load.audio("lost", ["../assets/game/sound/lost.mp3", "../assets/game/sound/lost.ogg"]);
    }
    create() {
        game.scale.setGameSize(1280, 960);
        this.map = game.add.tilemap("map");
        this.map.addTilesetImage("ground_1x1");
        this.map.setCollisionBetween(1, 12);
        this.layer = this.map.createLayer("world");
        this.layer.resizeWorld();
        this.player = new Player(this);
        game.camera.follow(this.player);
        this.cursors = game.input.keyboard.createCursorKeys();
        var coins_coordinates = [
            [400, 30],
            [300, 30],
            [200, 300],
            [100, 120],
            [403, 234],
        ];
        this.coinsRemaining = game.add.text(100, 910, "", {
            font: "18px Arial bold",
            fill: "#FFFFFF",
            align: "center",
        });
        this.progressbar = game.add.sprite(260, 902, "progressbar");
        this.coins = new Coins(coins_coordinates, this, 1);
        this.progressbar.scale.setTo(0.75, 0.75);
        this.enemies1 = new Enemies(this, 220, 10, 1);
        this.enemies2 = new Enemies(this, 600, 10, 1);
        this.enemies3 = new Enemies(this, 750, 10, 1);
        this.enemies4 = new Enemies(this, 400, 500, 1);
        this.enemies5 = new Enemies(this, 1100, 200, 1);
        this.enemies6 = new Enemies(this, 750, 600, 1);
        this.jumpSound = game.add.audio("jump");
        this.takeCoinSound = game.add.audio("coin");
        this.lostSound = game.add.audio("lost");
        this.backgroundMusic = game.add.audio("defaultBackgroundMusic");
        if (game.config.backgroundMusic.on) {
            this.backgroundMusic.play();
        }
    }
    shutdown() {
        this.backgroundMusic.stop();
    }

    update() {
        if (!this.coins.remainingCoins) {
            game.config.currentLevel = 1;
            game.state.start("gameOver");
        }
    }
}
class Player extends Phaser.Sprite {
    constructor(stateContext, x = 260, y = 70) {
        super(game, x, y, "player", 1);
        this.scale.setTo(1.5, 1.5);
        this.state = stateContext;
        this.animations.add("changeFrameAnimation");
        this.animations.play("changeFrameAnimation", 5, true);
        game.world.add(this);
        game.physics.arcade.enable(this);
        this.body.gravity.y = 200;
    }
    moveLeft() {
        this.body.velocity.x = -200;
    }
    jump() {
        this.body.velocity.y = -300;
    }
    moveRigth() {
        this.body.velocity.x = 200;
    }
    stop() {
        this.body.velocity.x = 0;
    }

    update() {
        let playerLayerCollide = game.physics.arcade.collide(this, this.state.layer);
        if (this.state.cursors.up.isDown && playerLayerCollide) {
            this.state.jumpSound.play();
            this.jump();
        } else if (this.state.cursors.left.isDown) {
            this.moveLeft();
        } else if (this.state.cursors.right.isDown) {
            this.moveRigth();
        } else {
            this.stop();
        }

        if (!this.inWorld) {
            this.state.state.start("gameOver");
        }
    }
}

class Coins extends Phaser.Group {
    constructor(coordinates, stateContext, coinsToAdd = 15, limit = 5) {
        super(game);
        this.avaliableCoins = 0;
        this.pool = [];
        this.coinsToAdd = coinsToAdd;
        if (coinsToAdd > coordinates.length) {
            this.remainingCoins = coinsToAdd;
        } else {
            this.remainingCoins = coordinates.length;
        }
        this.state = stateContext;
        this.totalCoins = coinsToAdd;
        for (let coordinate of coordinates) {
            var coin = new Coin(coordinate[0], coordinate[1]);
            this.pool.push(coin);
            this.coinsToAdd -= 1;
        }
        while (this.coinsToAdd > 0) {
            this.pool.push(new Coin());
            this.coinsToAdd -= 1;
        }
        while (this.avaliableCoins < limit) {
            this.add();
            this.avaliableCoins += 1;
        }
    }

    kill(coin) {
        coin.kill();
        this.avaliableCoins -= 1;
        this.remainingCoins -= 1;
    }

    add() {
        if (!this.pool[0]) {
            return;
        }
        let el = this.pool.pop(0);
        super.add(el);
        el.updateTransform();
        var rect = el.getBounds();
        while (
            this.state.map.getTileWorldXY(el.conf.x + game.camera.x, el.conf.y + game.camera.y) ||
            this.state.map.getTileWorldXY(rect.topLeft.x + game.camera.x, rect.topLeft.y + game.camera.y) ||
            this.state.map.getTileWorldXY(
                rect.topLeft.x + game.camera.x,
                rect.topLeft.y - rect.height + game.camera.y
            ) ||
            this.state.map.getTileWorldXY(rect.bottomRight.x + game.camera.x, rect.bottomRight.y + game.camera.y) ||
            this.state.map.getTileWorldXY(
                rect.bottomRight.x + game.camera.x,
                rect.bottomRight.y + rect.height + game.camera.y
            ) ||
            this.state.map.getTileWorldXY(rect.centerX + game.camera.x, rect.centerY + game.camera.y)
        ) {
            el.destroy();
            el = new Coin();
            super.add(el);
            el.updateTransform();
            rect = el.getBounds();
        }
        super.add(el);
    }

    update() {
        game.physics.arcade.overlap(
            this.state.player,
            this,
            function (player, coin) {
                this.takeCoinSound.play();
                this.coins.kill(coin);
                this.coinsRemaining.setText(`Coins remaining: ${this.remainingCoins}`);
                this.coins.add();
            },
            null,
            this.state
        );
        this.state.coinsRemaining.setText(`Coins remaining: ${this.remainingCoins}`);
        this.state.progressbar.frame = Math.trunc((1 - this.remainingCoins / this.totalCoins) * 10);
        this.state.coinsRemaining.x = 100 + game.camera.x;
        this.state.progressbar.x = 260 + game.camera.x;
    }
}

class Coin extends Phaser.Sprite {
    constructor(x = game.world.randomX * 0.9, y = game.world.randomY * 0.9) {
        super(game, x, y, "coin", 0);
        this.enableBody = true;
        this.conf = {};
        this.conf.x = x;
        this.conf.y = y;
        game.physics.arcade.enable(this);
        this.animations.add("changeFrameAnimation");
        this.animations.play("changeFrameAnimation", 5, true);
    }
}

class Enemies extends Phaser.Group {
    constructor(stateContext, x = 200, y = 10, amount = 2) {
        super(game);
        this.conf = {};
        this.conf.x = x;
        this.conf.y = y;
        this.state = stateContext;
        this.pool = [];
        this.updateCounter = 0;
        for (let i = 0; i < amount; i++) {
            this.pool.push(new Enemy(x, y));
        }
        for (let _ of this.pool) {
            this.add(_);
        }
    }

    update() {
        this.updateCounter += 1;
        for (let _ of this.children) {
            _.aliveCounter += 1;
            var x = this.conf.x;
            var y = this.conf.y;
            if (_.aliveCounter > 1000) {
                _.destroy();
                this.add(new Enemy(x, y));
                _.aliveCounter = 0;
                break;
            }
            if (_.body.velocity.x == 0) {
                _.body.velocity.x = getRandomArbitrary(-300, -200) | getRandomArbitrary(200, 300);
            }
            if (!_.inWorld) {
                _.destroy();
                this.add(new Enemy(x, y));
                break;
            }
        }
        if (this.updateCounter > 150) {
            for (let _ of this.children) {
                _.body.velocity.x = -_.body.velocity.x * (Math.random() + 1);
            }
            this.updateCounter = 0;
        }
        game.physics.arcade.collide(this, this.state.layer);
        game.physics.arcade.overlap(
            this.state.player,
            this,
            function (player, enemy) {
                this.lostSound.play();
                this.state.start("gameOver");
            },
            null,
            this.state
        );
    }
}

class Enemy extends Phaser.Sprite {
    constructor(
        x,
        y,
        velocityX = getRandomArbitrary(-400, -200) | getRandomArbitrary(200, 400),
        velocityY = getRandomArbitrary(200, 400)
    ) {
        super(game, x, y, "enemy", 1);
        this.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable(this);
        this.body.gravity.y = 200;
        this.body.tilePadding.set(32);
        this.body.velocity.x = velocityX;
        this.body.velocity.y = velocityY;
        this.aliveCounter = 0;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
