// establish variables

var userChoice = "something that indicates the thing property the user clicked on";
var questionIndex = 0;
var maxSeconds = 100;
var timerInterval = null;
var secondsLeft = document.getElementById("seconds-left");
var wordBlank = document.querySelector(".word-blank");
var startButton = document.getElementById("start");
var questionAreaDiv = document.getElementById('question-area');
var title = document.getElementById("header-1");
var subtitle = document.getElementById("header-2");
var instructions = document.getElementById("description");

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
    title.setAttribute('style', 'visibility:hidden');
    subtitle.setAttribute('style', 'visibility:hidden');
    instructions.setAttribute('style', 'visibility:hidden');

    setTime();
    loadQuestion();
}


function loadQuestion() {
    questionAreaDiv.textContent = '';
    var currentQuestion = questionBank[questionIndex];
    var currentOptions = currentQuestion.options;
    var currentAnswer = currentQuestion.answer;
    var test = "test";

    // var correctAnswer = document.getElementById('answer');
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
        // correctAnswer.textContent = currentAnswer;
        // console.log(currentAnswer);
        // answer.id = 'answer'
        option.textContent = currentQuestion.options[i];
        option.id = 'option-' + Number.toString(i);
        questionAreaDiv.appendChild(option);
    }

    // add click event listener to each button that calls check answer 
    option.addEventListener("click", function () {
        console.log(currentAnswer);
        var guess = option.textContent;
        if (guess === currentAnswer) {
            wordBlank.textContent = "That's right!";
            console.log("right");
        } else {
            wordBlank.textContent = "Not quite right!";
            console.log(test);
            secondsLeft - 10;
        }
    })
}

startButton.addEventListener("click", function () {
    startQuiz();
});

// write .click function to give a correct or incorrect answer

// if the index of questions reaches its length OR if timer runs out the game is over (change button visibility to visible)
var submitButton = document.getElementById('submit');
// ADD IF STATEMENT
submitButton.setAttribute('style', "visibility:visibile");

// then, save initials and score using local storage
submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    var results = {
        initials: saveInitials.value,
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
