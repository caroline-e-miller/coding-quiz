var scoresArea = document.getElementById("scores");

function showScores() {
    var highScores = JSON.parse(localStorage.getItem('results'))
    for (var i = 0; i < highScores.slice(0, 5).length; i++) {
        // console.log(highScores[i])
        var scoreContainer = document.createElement("p")
        scoreContainer.className = 'score-item'
        var initials = document.createElement("span")
        var score = document.createElement("span")

        initials.textContent = highScores[i].initials;
        initials.className = "score-initials"

        score.textContent = highScores[i].score;
        score.className = "score-score"

        scoreContainer.appendChild(initials)
        scoreContainer.appendChild(score)
        scoresArea.appendChild(scoreContainer);
    }
}

showScores();