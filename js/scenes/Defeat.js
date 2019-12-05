

class Defeat extends Phaser.Scene {
    constructor() {
        super({key: 'Defeat'});
    }

    create() {
        console.log(this.registry);

        this.billy = this.sound.add('billy', { loop: false });
        this.billy.play();
        this.cameras.main.setBackgroundColor('#ffffff');

        let poo = this.add.image((this.game.config.width / 2), (this.game.config.height / 2), 'archmage');
        let text = this.add.text((this.game.config.width / 2) - 200, (this.game.config.height - 60), 'YOU\'RE LOSSER!',
            { font: '48px Arial', fill: 'orange' });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.space.isDown) {
            this.scene.start('PlayGame');
        }
    }
  }

  export default Defeat;