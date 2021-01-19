// establish variables

// var userChoice = "something that indicates the thing property the user clicked on";
var questionIndex = 0;
var timerInterval = null;
var secondsLeft = document.getElementById("seconds-left");
var wordBlank = document.querySelector(".word-blank");
var startButton = document.getElementById("start");
var questionAreaDiv = document.getElementById('question-area');
var title = document.getElementById("header-1");
var subtitle = document.getElementById("header-2");
var instructions = document.getElementById("description");
var timeInterval;
var finalTime;

var questionBank = [
    {
        question: "What language is this from? 'console.log(1+2)'",
        options: ['Javascript', 'CSS', 'Ruby', 'Spanish'],
        answer: 'Javascript'
    },
    {
        question: "What is the skeleton of a webpage?",
        options: ['CSS', 'jQuery', 'femur', 'HTML'],
        answer: 'HTML'
    },
    {
        question: "Which slithery type of snake also has a programming laguage named after it?",
        options: ['Copperhead', 'Python', 'Cobra', 'Corn'],
        answer: 'Python'
    },
    {
        question: "What year was Javascript first put into use?",
        options: ["1992", "1995", "1989", "1999"],
        answer: "1995"
    }
]

// timer
let seconds = 100;

function setTime() {

    timerInterval = setInterval(function () {
        secondsLeft.textContent = `${seconds} seconds`;
        seconds--;

        if (seconds <= 0) {
            clearInterval(timerInterval);
        }

    }, 1000);
}

// onclick event for start button, triggers timer 
function startQuiz() {
    questionIndex = 0;
    maxSeconds = 100;
    questionAreaDiv.style.display = 'block'
    title.setAttribute('style', 'visibility:hidden');
    subtitle.setAttribute('style', 'visibility:hidden');
    instructions.setAttribute('style', 'visibility:hidden');
    startButton.setAttribute('style', 'visibility:hidden');

    setTime();
    loadQuestion();
}


function loadQuestion() {
    questionAreaDiv.textContent = '';
    var currentQuestion = questionBank[questionIndex];
    var currentOptions = currentQuestion.options;
    var currentAnswer = currentQuestion.answer;

    var answer = document.createElement('p');
    var question = document.createElement('p');

    answer.setAttribute('style', 'visibility:hidden');
    questionAreaDiv.appendChild(question);
    questionAreaDiv.appendChild(answer);

    // nested for loop? with outer for loop for answers and questions?
    for (var i = 0; i < currentOptions.length; i++) {

        var option = document.createElement('button')

        // add text content based on the current question
        question.textContent = currentQuestion.question
        question.id = 'question'
        answer.textContent = currentAnswer;
        option.textContent = currentQuestion.options[i];
        option.id = 'option-' + Number.toString(i);
        questionAreaDiv.appendChild(option);


        // add click event listener to each button that calls check answer 
        option.addEventListener("click", function () {
            console.log(currentAnswer);
            var guess = this.textContent;
            if (guess === currentAnswer) {
                wordBlank.textContent = "That's right!";
            } else {
                wordBlank.textContent = "Not quite right!";
                seconds = seconds - 10;
            }

            questionIndex++;
            if (questionIndex < questionBank.length) {
                loadQuestion();
            } else {
                clearInterval(timerInterval)
                endPage();
                finalTime = seconds;
            }
        })
    }
}

startButton.addEventListener("click", function () {
    startQuiz();
});

// if the index of questions reaches its length OR if timer runs out the game is over (change button visibility to visible)
function endPage() {
    var forms = document.getElementById("saveInitials");
    forms.setAttribute('style', 'visibility:visible');

    var submitButton = document.getElementById('submit');
    submitButton.setAttribute('style', "visibility:visibile");

    var letters = document.getElementById('initialsInput');

    // then, save initials and score using local storage
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        var resultsDisplay = document.getElementById('results');
        resultsDisplay.setAttribute('style', "visibility:visibile");

        var results = {
            initials: letters.value,
            score: finalTime,
        };

        console.log(results);

        localStorage.setItem("results", JSON.stringify(results));
        resultsPage();

    });
}

function resultsPage() {
    var newResult = JSON.parse(localStorage.getItem("results"));
    if (newResult !== null) {
        document.querySelector(".display").textContent = newResult.initials +
            " scored a/an " + newResult.score;
    }
}
