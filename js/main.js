var params = {
    output: document.getElementById('output'),
    result: document.getElementById('result'),
    rounds: document.getElementById('rounds'),
    paperButton: document.getElementById('paper'),
    rockButton: document.getElementById('rock'),
    scissorsButton: document.getElementById('scissors'),
    gameButton: document.getElementById('game'),
    countingRounds: 0,
    roundResult: '',
    userScore: 0,
    computerScore: 0,
    range: '',
    progress: []
};


// Function - Computer move

const computer = () => {
    var gameArr = ['paper', 'rock', 'scissors'];
    return gameArr[Math.floor(Math.random() * 3)];
};

// Function - Write result

var writeResult = function (text, uMove, cMove) {
    output.innerHTML = 'YOU ' + text + ': you played ' + uMove + ', computer played ' + cMove + '<br>';
    params.roundResult = text;
};

// Function - Add points

var addPoints = function (isPlayerWon) {
    if (isPlayerWon) {
        params.userScore++;
    } else {
        params.computerScore++;
    }
    writeScore();
};

// Function - Write Score

var writeScore = () => result.innerHTML = 'Player ' + params.userScore + ' : ' + params.computerScore + ' Computer';

// Function - Finish the game

var checkResult = function (userScore, computerScore) {
    if (params.userScore == params.range) {
        addTable('#modal-won');
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('#modal-won').classList.add('show');
        disabledButton(true);
    } else if (params.computerScore == params.range) {
        addTable('#modal-lose');
        document.querySelector('#modal-overlay').classList.add('show');
        document.querySelector('#modal-lose').classList.add('show');
        disabledButton(true);
    }
};

// Function - Button visible

var disabledButton = function (visible) {
    params.paperButton.disabled = visible;
    params.rockButton.disabled = visible;
    params.scissorsButton.disabled = visible;
};

writeScore();

// Object Constructor

function GameProgress(round, player, comp, roundS, gameS) {
    this.round = round;
    this.playerM = player;
    this.compM = comp;
    this.roundScore = roundS;
    this.gameScore = gameS;
}


// Function - Player Move

var playerMove = function (userMove) {
    var computerMove = computer();
    if (computerMove == userMove) {
        writeResult('DRAW!', userMove, computerMove);
    } else if (userMove == 'paper') {
        if (computerMove == 'rock') {
            writeResult('WON!', userMove, computerMove);
            addPoints(true);
        } else if (computerMove == 'scissors') {
            writeResult('LOST!', userMove, computerMove);
            addPoints(false);
        }
    } else if (userMove == 'rock') {
        if (computerMove == 'paper') {
            writeResult('LOST!', userMove, computerMove);
            addPoints(false);
        } else if (computerMove == 'scissors') {
            writeResult('WON!', userMove, computerMove);
            addPoints(true);
        }
    } else if (userMove == 'scissors') {
        if (computerMove == 'paper') {
            writeResult('WON!', userMove, computerMove);
            addPoints(true);
        } else if (computerMove == 'rock') {
            writeResult('LOST!', userMove, computerMove);
            addPoints(false);
        }
    }
    params.countingRounds++;
    params.progress.push(new GameProgress(params.countingRounds, userMove, computerMove, writeScore(), params.roundResult));
    checkResult(params.userScore, params.computerScore);
};
disabledButton(true);


// Events

var buttonsMove = document.querySelectorAll('.player-move');

for (var i = 0; i < buttonsMove.length; i++) {
    buttonsMove[i].addEventListener('click', function (event) {
        playerMove(event.target.getAttribute('data-move'));
    });
}

// New game button

params.gameButton.addEventListener('click', function () {
    params.range = window.prompt('How many rounds?');
    params.rounds.innerHTML = params.range;
    disabledButton(false);
    params.userScore = 0;
    params.computerScore = 0;
    params.countingRounds = 0;
    params.progress = [];
    writeScore();
});


// Modal

var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    removeTable();
};

var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

// Function - Create table

function addTable(id) {
    var myTableDiv = document.querySelector(id);

    var table = document.createElement('table');
    table.border = '1';

    var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    for (var i = 0; i < params.progress.length; i++) {
        var progressObj = params.progress[i];
        var progressKeys = Object.keys(progressObj);
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);
        for (var j = 0; j < progressKeys.length; j++) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(progressObj[progressKeys[j]]));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
};

// Function - Remove table

function removeTable() {
    var table = document.querySelector('table');
    table.remove();
};