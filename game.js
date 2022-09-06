const buttonColors = ['green', 'red', 'yellow', 'blue'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern += randomChosenColor;
    document.querySelector(`#${randomChosenColor}`).classList.add('flash');
    setTimeout( () => {
        document.querySelector(`#${randomChosenColor}`).classList.toggle('flash')}, '100');
    playSound(randomChosenColor);
    level++;
    document.querySelector('#level-title').textContent = `Level ${level}`;
}

window.addEventListener('keydown', nextSequence);

for (button of document.querySelectorAll('.btn')) {
    button.addEventListener('click', (event) => {
        var userChosenColor = event.target.classList[1];
        playSound(userChosenColor);
        document.querySelector(`#${userChosenColor}`).classList.add('pressed');
        setTimeout( () => {
            document.querySelector(`#${userChosenColor}`).classList.toggle('pressed')}, '100');
        userClickedPattern += userChosenColor;
        checkAnswer(userClickedPattern.length - 1);
    })
}

function playSound(name) {
    new Audio(`./sounds/${name}.mp3`).play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, '1000');
            return true
        }
    }
    else {
        playSound('wrong');
        document.querySelector('body').classList.add('game-over');
        document.querySelector('#level-title').textContent = 'Game Over, Press Any Key to Restart'
        setTimeout( () => {
            document.querySelector('body').classList.toggle('game-over')}, '200');
        gamePattern = [];
        level = 0;
        
    }
}