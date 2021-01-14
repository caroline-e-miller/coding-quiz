// establish variables
var userChoice = "something that indicates the thing property the user clicked on";
var correct1 = question1.math;
var correct2 = question2.HTML;
var correct3 = question3.dialup;
var correct4 = question4.css;
var timer = document.getElementById("timer");
var secondsLeft = document.getElementById("seconds-left");
var wordBlank = document.querySelector(".word-blank");

// ask Brian about matching keys to indicate correct answer (look at mini-project), also should I use arrays and look for matching indexes? if userguess === question1[3]|| question2[3], etc. then send success alert?
var question1 = {
    booleans: false,
    strings: false,
    math: true,
    numbers: false
}

var question2 = {
    javascript: false,
    python: false,
    HTML: true,
    anaconda: false
}

var question3 = {
    dialup: true,
    phoneup: false,
    keypad: false,
    iphone: false
}

var question4 = {
    paint: false,
    css: true,
    kss: false,
    html: false
}

// timer
function setTime() {

    var timerInterval = setInterval(function () {
        secondsLeft.textContent = 100;
        secondsLeft--;
        timer.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            resultsPage();
        }

    }, 1000);
}

// onclick event for start button, triggers timer 
function startButton() {
    document.getElementById("start").click();
    setTime();
}

setTime();

// write .click function to give a correct or incorrect answer
// write a function to progress to display the next question

// if index of users answer matches index of correct answer, give alert 
function correctAnswer() {
    if (userChoice === correct1 || userChoice === correct2 || userChoice === correct3 || userChoice === correct4) {
        wordBlank.textContent = "That's right!";
        // if it is wrong, give alert & move to the next page with 10-second timer penalty
    } else {
        wordBlank.textContent = "Not quite right!";
        secondsLeft = (secondsLeft - 10);
    }
}

// if the index of questions reaches its length OR if timer runs out the game is over

// then, save initials and score using local storage