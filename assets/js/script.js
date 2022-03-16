var quizText = document.getElementById("quizText");
var highScoreBtn = document.getElementById("highScoreBtn");
var startBtn = document.getElementById("startBtn");

var startQuiz = function() {
    quizText.textContent = "Start quiz";
}

var viewHighScores = function() {
    quizText.textContent = "Show high scores";
    console.log("view high scores function called");

}

highScoreBtn.addEventListener("click", viewHighScores);
startBtn.addEventListener("click", startQuiz);