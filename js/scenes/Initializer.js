class Initializer extends Phaser.Scene {
    constructor() {
        super({key: 'Initializer'});
    }

    preload() {
        this.load.spritesheet('ufo', 'assets/images/ufo/spritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('blueRing', 'assets/images/blue_ring/spritesheet.png', { frameWidth: 200, frameHeight: 200 });
        this.load.spritesheet('flame', 'assets/images/flame.png', { frameWidth: 24, frameHeight: 24 });

        this.load.image('bg', 'assets/images/space.jpg');
        this.load.image('morty','assets/images/morty.png');
        this.load.image('ayu2', 'assets/images/ayu2.png');
        this.load.image('poo', 'assets/images/poo.png');
        this.load.image('saw', 'assets/images/saw.png');
        this.load.image('energyBar', 'assets/images/rastercarpet32.png');
        this.load.image('pillar', 'assets/images/pillar.png');
        this.load.image('blueParticle', 'assets/images/blue.png');
        this.load.image('taiko', 'assets/images/taikodrummaster.jpg');
        this.load.image('archmage', 'assets/images/archmage.png');
        
        this.load.json('shapes', 'assets/images/shapes.json');
        this.load.json('test', 'assets/images/test.json');
    
        this.load.audio('williamtell', 'assets/audio/8bit_williamtell.mp3');
        this.load.audio('billy', 'assets/audio/AAAAAAAH.mp3');
        this.load.audio('van', 'assets/audio/Boy_next_door.mp3');
        this.load.audio('deep', 'assets/audio/deep_dark_fantasies.mp3');
        this.load.audio('ty', 'assets/audio/thank_you_sir.mp3');
        this.load.audio('power', 'assets/audio/that\'s_power_son.mp3');
        this.load.audio('WOO', 'assets/audio/WOO.mp3');
    }

    create() {
        //music
        this.music = this.sound.add('williamtell', { volume: 0.85, loop: true });
        this.music.play();

        console.log('Preload Complete');

        // this.pointer = this.input.activePointer;
        // this.input.on('pointerdown', () => {
        //     if (this.music.isPlaying) {
        //         this.music.pause();
        //     }
        //     else {
        //         this.music.resume();
        //     }
        // })

        this.scene.start('PlayGame');
    }
}

export default Initializer;