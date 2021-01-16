// establish variables
// var correct1 = question1.math;
// var correct2 = question2.HTML;
// var correct3 = question3.dialup;
// var correct4 = question4.css;
// var timer = document.getElementById("timer");
// // ask Brian about matching keys to indicate correct answer (look at mini-project), also should I use arrays and look for matching indexes? if userguess === question1[3]|| question2[3], etc. then send success alert?
// var question1 = {
//     booleans: false,
//     strings: false,
//     math: true,
//     numbers: false
// }

// var question2 = {
//     javascript: false,
//     python: false,
//     HTML: true,
//     anaconda: false
// }

// var question3 = {
//     dialup: true,
//     phoneup: false,
//     keypad: false,
//     iphone: false
// }

// var question4 = {
//     paint: false,
//     css: true,
//     kss: false,
//     html: false
// }

var userChoice = "something that indicates the thing property the user clicked on";
var questionIndex = 0;
var maxSeconds = 100;
var timerInterval = null;
var secondsLeft = document.getElementById("seconds-left");
var wordBlank = document.querySelector(".word-blank");
var startButton = document.getElementById("start");
var questionAreaDiv = document.getElementById('question-area');

var questionBank = [
    {
        question: "What language is this from? 'console.log(1+2)'",
        options: ['javascript', 'css', 'ruby', 'button'],
        answer: 'javascript'
    },
    {
        question: "What is the skeleton of a webpage?",
        options: ['CSS', 'HTML', 'femur', 'jQuery'],
        answer: 'HTML'
    },
    {
        question: "Which slithery type of snake also has a programming laguage named after it?",
        options: ['copperhead', 'python', 'cobra', 'corn'],
        answer: 'python'
    },
    {
        question: "What year was Javascript first put into use?",
        options: ["1992", "1995", "1989", "1999"],
        answer: "1995"
    }
]

// timer
function setTime() {
    let seconds = maxSeconds;

    timerInterval = setInterval(function () {
        secondsLeft.textContent = `${seconds} seconds`;
        seconds--;

        if (seconds === 0) {
            clearInterval(timerInterval);
            // resultsPage();
        }

    }, 1000);
}

// onclick event for start button, triggers timer 
function startQuiz() {
    questionIndex = 0;
    maxSeconds = 100;
    questionAreaDiv.style.display = 'block'
    setTime();
    loadQuestion();
    // setAttribute to make homepage go away?
}


function loadQuestion() {
    questionAreaDiv.textContent = '';
    var currentQuestion = questionBank[questionIndex];
    var currentOptions = currentQuestion.options;
    var currentAnswer = currentQuestion.answer;
    var java = currentOptions[0];
    console.log(java);

    var correctAnswer = document.getElementById('answer');
    var question = document.createElement('p');
    questionAreaDiv.appendChild(question);

    for (var i = 0; i < currentOptions.length; i++) {

        var option = document.createElement('button')

        // add text content based on the current question
        question.textContent = currentQuestion.question
        question.id = 'question'
        correctAnswer.textContent = currentAnswer;
        // answer.id = 'answer'
        option.textContent = currentQuestion.options[i];
        option.id = 'option-' + Number.toString(i);
        questionAreaDiv.appendChild(option);
    }

    // add click event listener to each button that calls check answer
    option.addEventListener("click", function () {
        var guess = option.textContent;
        if (guess === correctAnswer.textContent) {
            wordBlank.textContent = "That's right!";
        } else {
            wordBlank.textContent = "Not quite right!";
            seconds = seconds - 10;
        }
    })

    // append elements to question area

}

startButton.addEventListener("click", function () {
    startQuiz();
});

// write .click function to give a correct or incorrect answer
// write a function to progress to display the next question

// if (userChoice === correct1 || userChoice === correct2 || userChoice === correct3 || userChoice === correct4) {
//     wordBlank.textContent = "That's right!";
//     // if it is wrong, give alert & increment questions 10-second timer penalty
// } else {
//     wordBlank.textContent = "Not quite right!";
//     secondsLeft = (secondsLeft - 10);
// }

// if index of users answer matches index of correct answer, give alert 
// 

// correctAnswer();

// if the index of questions reaches its length OR if timer runs out the game is over

// then, save initials and score using local storage
var submitButton = document.getElementById('submit');

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    var results = {
        initials: saveInitials.value.trim(),
        score: secondsLeft.value,
    };

    localStorage.setItem("results", JSON.stringify(results));
    resultsPage();

});

function resultsPage() {
    var newResult = JSON.parse(localStorage.getItem("results"));
    if (newResult !== null) {
        document.querySelector(".display").textContent = newResult.initials +
            " scored a/an " + newResult.score;
    }
}
