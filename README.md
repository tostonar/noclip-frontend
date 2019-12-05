# noclip-frontend

An HTML5 game made with Javascript and Phaser 3, with a Rails API backend.

Use your energy to phase through any obstacles to reach the end, but be careful: if you return to material form on top of an obstacle, you will perish!

Users begin by entering their username. A password is not required.

Once the username is submitted, the instructions are provided to the left, the game window is in the middle, and the high scores are on the right.

## Setup
For use in a local environment, you must setup both the frontend and the backend. You can clone the front end from this repo.


### JavaScript(Frontend)
To run locally, you must use a local server of your choice. [http-server](https://www.npmjs.com/package/http-server) is one option.

Then install http-server:
```
npm install http-server -g
```

Start the server:
```
http-server
```
Click one of the provided links from the terminal to open the page in your browser.

Click index.html file.

## Controls:

Arrow keys: thrust

Space: noclip

Shift: stop

## Current Bugs:
- Collisions not always recognized

## Thanks to:
Framework: [Phaser 3](phaser.io)

Page background: [LuminousDragonGames on opengameart.org](https://opengameart.org/content/perfectly-seamless-night-sky)

UFO sprite: [MillionthVector](http://millionthvector.blogspot.de)

Goal animation: [Grahhhhh on opengameart.org](https://opengameart.org/content/animated-blue-ring-explosion)

Side Pillars: [FunwithPixels on opengameart.org](https://opengameart.org/content/sci-fi-blue-pillar)

The rest of the images: from Phaser 3's examples' assets