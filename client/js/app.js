var playerName;
var playerNameInput = document.getElementById('playerNameInput');
var socket;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var c = document.getElementById('cvs');
var canvas = c.getContext('2d');
c.width = screenWidth; c.height = screenHeight;

var KEY_ENTER = 13;

var game = new Game();

function startGame() {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '');
    document.getElementById('gameAreaWrapper').style.display = 'block';
    document.getElementById('startMenuWrapper').style.display = 'none';
    socket = io();
    SetupSocket(socket);
    animloop();
}

// check if nick is valid alphanumeric characters (and underscores)
function validNick() {
    var regex = /^\w*$/;
    console.log('Regex Test', regex.exec(playerNameInput.value));
    return regex.exec(playerNameInput.value) !== null;
}

window.onload = function() {
    'use strict';

    var btn = document.getElementById('startButton'),
        nickErrorText = document.querySelector('#startMenu .input-error');

    btn.onclick = function () {

        // check if the nick is valid
        if (validNick()) {
            startGame();
        } else {
            nickErrorText.style.display = 'inline';
        }
    };

    playerNameInput.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;

        if (key === KEY_ENTER) {
            if (validNick()) {
                startGame();
            } else {
                nickErrorText.style.display = 'inline';
            }
        }
    });
};

function SetupSocket(socket) {
  game.handleNetwork(socket);
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();

function animloop(){
    requestAnimFrame(animloop);
    gameLoop();
}

function gameLoop() {
  game.handleLogic();
  game.handleGraphics(canvas);
}

window.addEventListener('resize', function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    c.width = screenWidth;
    c.height = screenHeight;
}, true);
