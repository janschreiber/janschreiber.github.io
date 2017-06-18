var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');
var guessesLeft = document.querySelector('.guessesLeft');

var guessCount = 1;

function validateInput(inp) {
    if (isNaN(inp) || inp < 1 || inp > 100 || !Number.isInteger(inp)) {
        alert("Please enter a number between 1 and 100!");
        return false;
    }
    return true;
}

function checkGuess() {
    var userGuess = parseInt(guessField.value, 10);
    if (validateInput(userGuess) === false) {
        guessField.value = '';
        return;
    }
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    if (guessCount > 1) {
        guesses.textContent += ', ';
    }
    guesses.textContent += userGuess;

    if (userGuess === randomNumber) {
        lastResult.innerHTML = 'Congratulations!<br>You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }
    if (guessCount == 9) {
        guessesLeft.textContent = 'One guess left!';
    } else {
        guessesLeft.textContent = 10 - guessCount + ' guesses left';
    }
    guessCount += 1;
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    document.getElementById('restartBtn').style.display = 'inline';
}

function resetGame(firstTime) {
    guessCount = 1;

    guesses = document.querySelector('.guesses');
    lastResult = document.querySelector('.lastResult');
    lowOrHi = document.querySelector('.lowOrHi');

    guessSubmit = document.querySelector('.guessSubmit');
    guessField = document.querySelector('.guessField');
    guessesLeft = document.querySelector('.guessesLeft');

    guessCount = 1;
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    guessesLeft.textContent = '10 guesses left';
    if (!firstTime) {
        document.getElementById('restartBtn').style.display = 'none';
    }
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Determine if user pressed enter
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    if (guessField == document.activeElement && guessField.value !== '' && (charCode == 13 || charCode == 187)) {
        checkGuess();
    }
};
