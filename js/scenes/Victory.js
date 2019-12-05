class Victory extends Phaser.Scene {
    constructor() {
        super({key: 'Victory'});
    }

    create() {
        this.van = this.sound.add('van', { loop: false });
        this.deep = this.sound.add('deep', { loop: false });
        this.ty = this.sound.add('ty', { loop: false });
        this.power = this.sound.add('power', { loop: false });
        this.woo = this.sound.add('WOO', { loop: false });
        this.van.play();

        let taiko = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'taiko');
        let victorytext = this.add.text((this.game.config.width / 2) - 200, (this.game.config.height - 60), 'YOU\'RE WINNER!', 
            { font: '48px Arial', fill: '#00ff00' });

        let scoreText = this.add.text((this.game.config.width / 2) + 210, (this.game.config.height - 40), `Score: ${this.registry.values.score}`,
            { font: '24px Arial', fill: 'yellow' });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.submitScore();
    }
    
    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('PlayGame');
        }
        if (this.cursors.left.isDown) {
            this.deep.play()
        }
        if (this.cursors.up.isDown) {
            this.ty.play()
        }
        if (this.cursors.down.isDown) {
            this.power.play();
        }
        if (this.cursors.right.isDown) {
            this.woo.play();
        }
    }

    submitScore() { 
        fetch('http://localhost:3000/scores', {
            method: "POST",
            headers: {
                'Content_Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                score: {
                  'user_id': localStorage.userId,
                  'score': this.registry.values.score
                }
            })
        })
        
        //slap it on the DOM
        let gamescores = `<h3>${localStorage.username} - ${this.registry.values.score}</h3>`
        document.getElementById('topgames').innerHTML += gamescores
    }
}

export default Victory;