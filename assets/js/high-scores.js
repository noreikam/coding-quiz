var goBack = document.querySelector("#goBack");
var clearScoresBtn = document.querySelector("#clearScores");

var clearLocalStorage = function() {
    var emptyArray = [];
    localStorage.setItem("scoresArr", JSON.stringify(emptyArray));
}



clearScoresBtn.addEventListener("click", clearLocalStorage)