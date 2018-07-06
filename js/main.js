var output = document.getElementById('output');
var result = document.getElementById('result');
var rounds = document.getElementById('rounds');

var paperButton = document.getElementById('paper');
var rockButton = document.getElementById('rock');
var scissorsButton = document.getElementById('scissors');
var gameButton = document.getElementById('game');

var userScore = 0;
var computerScore = 0;
var range;

// Function - Computer move

const computer = () => Math.floor((Math.random() * 3) + 1);

// Function - Write result

var writeResult = function (text, cMove, uMove) {
    output.innerHTML = 'YOU ' + text + ': you played ' + uMove + ', computer played' + cMove + '<br>';
};

// Function - Add points

var addPoints = function (isPlayerWon) {
    if (isPlayerWon) {
        userScore++;
    } else {
        computerScore++;
    }
    writeScore();
};

// Function - Write Score

var writeScore = () => result.innerHTML = 'Player ' + userScore + ' : ' + computerScore + ' Computer';

// Function - Finish the game

var checkResult = function (userScore, computerScore) {
    if (userScore == range) {
        output.insertAdjacentHTML('beforeend', ' YOU WON THE ENTIRE GAME!!!' + '<br><br>' + 'Please press the new game button!');
        disabledButton(true);
    } else if (computerScore == range) {
        output.insertAdjacentHTML('beforeend', ' YOU LOST THE ENTIRE GAME!!!' + '<br><br>' + 'Game over, please press the new game button!');
        disabledButton(true);
    }
};

// Function - Button visible

var disabledButton = function (visible) {
    paperButton.disabled = visible;
    rockButton.disabled = visible;
    scissorsButton.disabled = visible;
};

writeScore();

// Function - Player Move

var playerMove = function (userMove, uMove) {
    var computerMove = computer();
    if (computerMove == userMove) {
        writeResult('DRAW!', uMove, uMove);
    } else if (userMove == 1) {
        if (computerMove == 2) {
            writeResult('WON!', ' Rock', uMove);
            addPoints(true);
        } else if (computerMove == 3) {
            writeResult('LOST!', ' Scissors', uMove);
            addPoints(false);
        }
    } else if (userMove == 2) {
        if (computerMove == 1) {
            writeResult('LOST!', ' Paper', uMove);
            addPoints(false);
        } else if (computerMove == 3) {
            writeResult('WON!', ' Scissors', uMove);
            addPoints(true);
        }
    } else if (userMove == 3) {
        if (computerMove == 1) {
            writeResult('WON!', ' Paper', uMove);
            addPoints(true);
        } else if (computerMove == 2) {
            writeResult('LOST!', ' Rock', uMove);
            addPoints(false);
        }
    }
    checkResult(userScore, computerScore);
};

disabledButton(true);

// Events

paperButton.addEventListener('click', function () {
    playerMove(1, ' Paper');
});
rockButton.addEventListener('click', function () {
    playerMove(2, ' Rock');
});
scissorsButton.addEventListener('click', function () {
    playerMove(3, ' Scissors');
});

gameButton.addEventListener('click', function () {
    range = window.prompt('How many rounds?');
    rounds.innerHTML = range;
    disabledButton(false);
    userScore = 0;
    computerScore = 0;
    writeScore();
});