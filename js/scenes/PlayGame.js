class PlayGame extends Phaser.Scene {
    constructor() {
        super({key: 'PlayGame'});
    }

    create() {
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;

        let shapes = this.cache.json.get('shapes');
        let test = this.cache.json.get('test');

        this.playerCollisionCat = 1;
        this.obstacleCollisionCat = 2;
        this.otherCollisionCat = 4;
        this.flameCollisionCat = 8;

        //background image
        let image = this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'bg')
        let scaleX = this.gameWidth / image.width
        let scaleY = this.gameHeight / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        //edge objects
        for(let i = 0; i < 4; i++){
            //left side
            let pillar = this.matter.add.image(0, 100 + (i * 200), 'pillar');
            pillar.setCollisionCategory(this.otherCollisionCat);
            pillar.setCollidesWith([this.playerCollisionCat, this.obstacleCollisionCat]);
            pillar.setStatic(true).setScale(.6);
            pillar.setFriction(0).setFrictionAir(0).setFrictionStatic(0);

            //right side
            pillar = this.matter.add.image(this.gameWidth, 100 + (i * 200), 'pillar');
            pillar.setCollisionCategory(this.otherCollisionCat);
            pillar.setCollidesWith([this.playerCollisionCat, this.obstacleCollisionCat]);
            pillar.setStatic(true).setScale(.6);
            pillar.setFriction(0).setFrictionAir(0).setFrictionStatic(0);

            //bottom side
            pillar = this.matter.add.image(100 + (i * 200), this.gameHeight, 'pillar');
            pillar.setCollisionCategory(this.otherCollisionCat);
            pillar.setCollidesWith([this.playerCollisionCat, this.obstacleCollisionCat]);
            pillar.setStatic(true).setScale(.6);
            pillar.setFriction(0).setFrictionAir(0).setFrictionStatic(0);
            pillar.angle = 90;

            //top side
            pillar = this.matter.add.image(100 + (i * 200), 0, 'pillar');
            pillar.setCollisionCategory(this.otherCollisionCat);
            pillar.setCollidesWith([this.playerCollisionCat, this.obstacleCollisionCat]);
            pillar.setStatic(true).setScale(.6);
            pillar.setFriction(0).setFrictionAir(0).setFrictionStatic(0);
            pillar.angle = 90;
        }

        //player object
        this.player = this.matter.add.sprite((this.gameWidth / 2), 575, 'ufo', null, {
            shape: shapes.alien10001
        });
        this.player.setCollisionCategory(this.playerCollisionCat);

        this.anims.create({
            key: 'playerFly',
            frames: this.anims.generateFrameNumbers('ufo', { start: 0, end: 14 }),
            frameRate: 20,
            repeat: -1
        })

        this.player.angle = 270;
        this.player.setFixedRotation();
        this.player.setScale(.7);
        this.player.setFrictionAir(.05);
        this.player.setMass(100);

        //particles for player object
        let playerParticles = this.add.particles('blueParticle');

        let playerEmitter = playerParticles.createEmitter({
            speed: 10,
            scale: { start: 0.08, end: 0 },
            blendMode: 'ADD'
        });

        playerEmitter.startFollow(this.player);

        //obstacle objects
        let obstacleNames = ['ayu2', 'morty', 'poo', 'saw'];
        for(let i = 0; i < obstacleNames.length; i++) {
            for(let j = 0; j < 4; j++) {
                let spawnX = Math.floor((Math.random() * this.gameWidth) - 50);
                let spawnY = (Math.floor(Math.random() * 5) + 1.5) * 100;
                let obstacle = this.matter.add.image(spawnX, spawnY, obstacleNames[i], null,
                    { shape: shapes[obstacleNames[i]] });

                obstacle.setCollisionCategory(this.obstacleCollisionCat);

                obstacle.setScale(0.28);

                let velocityX = Math.floor(Math.random() * 2) + 1;
                if (Math.random() >= .5) {
                    velocityX *= -1;
                }
                let velocityY = 0;
                obstacle.setVelocity(velocityX, velocityY).setBounce(1).setFriction(0);
            }
        }

        this.flame = this.matter.add.sprite((this.gameWidth / 2), (this.gameHeight / 2), 'flame', null, 
            { shape: test['flame'] });
        this.anims.create({
            key: 'flameBurn',
            frames: this.anims.generateFrameNumbers('flame', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        })
        this.flame.setStatic(true);
        this.flame.setScale(10);
        this.flame.setCollisionCategory(this.flameCollisionCat);
        this.flame.setCollidesWith(this.playerCollisionCat);

        //goal object
        this.goal = this.matter.add.sprite(this.gameWidth / 2, 80, 'blueRing', null, { shape: shapes.blueRing });
        this.goal.setScale(0.5);
        this.goal.setCollisionCategory(this.otherCollisionCat);
        this.goal.setCollidesWith(this.playerCollisionCat);

        this.anims.create({
            key: 'goalPulse',
            frames: this.anims.generateFrameNumbers('blueRing', { start: 0, end: 14 }),
            frameRate: 20,
            repeat: -1
        })

        //energy bar
        this.energyBar = this.add.sprite(50, (this.gameHeight / 2), 'energyBar').setScale(.5);
        this.energyBar.alpha = 1;
        this.energyBar.angle = 90;
        this.energyBar.displayWidth = 150;

        this.energyMask = this.add.sprite(this.energyBar.x, this.energyBar.y, "energyBar").setScale(.5);
        this.energyMask.alpha = 1;
        this.energyMask.angle = 90;
        this.energyMask.displayWidth = 150;
        this.energyMask.visible = false;

        this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

        this.noEnergyText = this.add.text(this.energyBar.x - 10, this.energyBar.y, 'ENERGY DEPLETED',
            { font: '8px Arial', fill: '#00ff00' });
        this.noEnergyText.alpha = 0.9;
        this.noEnergyText.visible = false;

        //score
        this.registry.values.score = 1000;
        this.timedEvent = this.time.addEvent({ delay: 10, callback: () => { this.registry.values.score -= 1 }, callbackScope: this, loop: true });
        this.scoreText = this.add.text(this.gameWidth - 150, 50, `Score: ${this.registry.values.score}`,
            { font: '20px Arial' });

        //collision handling
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            // console.log(`bodyA: ${bodyA.parent.label}`);
            // console.log(`bodyB: ${bodyB.parent.label}`);
            if ((bodyA.parent.label === 'player') && (bodyB.parent.label === 'goal')) {
                this.win();
            }
            else if (bodyA.parent.label === 'player'){
                this.loss();
            }
        })

        //input keys
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.anims.play('playerFly', true);
        this.goal.anims.play('goalPulse', true);
        this.flame.anims.play('flameBurn', true);

        //update score text
        this.scoreText.setText(`Score: ${this.registry.values.score}`);

        //check if energy depleted to display message
        if ((this.energyMask.y >= ((this.gameHeight / 2) + this.energyBar.displayWidth)) && this.noEnergyText.visible === false) {
            this.noEnergyText.visible = true;
        }

        //keyboard input handling
        if (this.cursors.space.isDown) {
            this.noclip();
        }
        else {
            this.clip();
        }

        if (this.cursors.shift.isDown) {
            this.player.setVelocity(0, 0);
        }
        else {
            if (this.cursors.left.isDown) {
                if (!this.cursors.right.isDown) {
                    this.player.thrustLeft(0.1);
                }
            }
            else if (this.cursors.right.isDown) {
                this.player.thrustRight(0.1);
            }

            if (this.cursors.up.isDown) {
                if (!this.cursors.down.isDown) {
                    this.player.thrust(0.1);
                }
            }
            else if (this.cursors.down.isDown) {
                this.player.thrustBack(0.1);
            }
        }
    }

    noclip() {
        //check if player has energy left
        if (this.energyMask.y < ((this.gameHeight / 2) + this.energyBar.displayWidth)) {
            //player becomes transparent and can noclip through anything
            this.player.alpha = 0.5;
            this.player.setCollidesWith(this.otherCollisionCat);

            //drains energy
            this.energyMask.y += 2;
        }
        else {
            this.clip();
        }
    }

    clip() {
        //player is no longer transparent nor able to noclip
        this.player.alpha = 1;
        this.player.setCollidesWith([this.obstacleCollisionCat, this.flameCollisionCat, this.otherCollisionCat]);
    }

    loss() {
        console.log('game loss');
        this.scene.start('Defeat');
    }

    win() {
        console.log('game win');
        this.scene.start('Victory');
    }
}

export default PlayGame;