import Initializer from './scenes/Initializer.js';
import PlayGame from './scenes/PlayGame.js';
import Victory from './scenes/Victory.js';
import Defeat from './scenes/Defeat.js';

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 650,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false,
            setBounds: true
        }
    },
    title: 'noclip',
    version: '.0001',
    scene: [
        Initializer,
        PlayGame,
        Victory,
        Defeat
    ],
    parent: 'game'
};

const userForm = document.getElementById('user_form');
const BASE_URL = "http://localhost:3000";
const userURL = `${BASE_URL}/users`;
const SCORES_URL = `${BASE_URL}/scores`;
const instruct = document.getElementById('instructions');



userForm.addEventListener('submit', createUser);

// get top 10 game scores
function fetchData() {
    fetch(SCORES_URL)
    .then(res => res.json())
    .then((data) => {
        data.sort(function(a, b) {return b.score - a.score})
        let topTen = data.slice(0, 10)
        topTen.forEach(score => {
            let gamescores = `<h3>${score.user.username} - ${score.score}</h3>`
            document.getElementById('topgames').innerHTML += gamescores
        })
    })
}

function addUser(username) {
    fetch(userURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                'username': username
            }
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('userId', data.id)
        localStorage.setItem('username', data.username)
        // welcome user by their username
        let greeting = document.createElement('h4');
        greeting.classList.add('text-center');
        greeting.textContent = `Welcome ${localStorage.username}!`;
        // insert greeting inside greeting but before first child
        instruct.insertAdjacentElement('afterbegin', greeting);
    })
}

function createUser(e) {
    e.preventDefault();
    let elem = document.getElementById('form-wrapper');
    // remove from DOM
    elem.parentNode.removeChild(elem);

    // show high scores and instructions
    document.getElementById('users').style.display = "";
    instruct.style.display = '';

    let username = e.target[0].value;
    // clear out localStorage
    localStorage.clear();
    addUser(username);

    fetchData();

    let game = new Phaser.Game(config);
}