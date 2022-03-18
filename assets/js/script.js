var quizText = document.querySelector("#quizText");
var highScoreBtn = document.querySelector("#highScoreBtn");
var startBtn = document.querySelector("#startBtn");
var questionIndex = 0;
var quizHeader = document.querySelector("#quizHeader");
var btnBox = document.querySelector("#btnBox");
var answerGroup;
var quizBox = document.querySelector("#quizBox");
var timerNum = document.querySelector("#timerNum");
var timeLeft = 75;
var quizFinished = false;
var finalScore;

// function to clear extra html and call displayNextQuestion for index 0
var startQuiz = function() {
    console.log("Start quiz");
    timeLeft = 75;
    quizText.remove();
    startBtn.remove();
    displayNextQuestion();
    setInterval(countdown, 1000);
}

// function to display next question
var displayNextQuestion = function() {
    console.log("Display question " + questionIndex);
    // retrieve answer object from array
    var questionObj = questionArr[questionIndex];
    //increment questionIndex for next function call 
    questionIndex++;

    // update html dynamically with values from answer object
    quizHeader.innerHTML = questionObj.question;
    // loop to create the answer buttons
    for(var i=0; i<4; i++) {
        var answerText = questionObj.answers[i];
        // default button to class=wrong
        var answerClass = "wrong";
        var correctAnswer = parseInt(questionObj.correctAnswer, 10);
        // select correct answer and give button class=correct
        if(i===correctAnswer) {
            answerClass = "correct";
        }
        
        // create, append and build content for answer button
        var answerBtn = document.createElement("button");
        btnBox.appendChild(answerBtn);
        answerBtn.outerHTML = "<button class='answerBtn " + answerClass + "'>" + answerText + "</button>";
    }
}

// function that checks answer using class assigned of wrong/correct, deducts seconds if wrong, clears old question and calls next question
var checkAnswer = function(event) {
    var answerClicked = event.target;
    if(answerClicked.matches(".wrong")) {
        console.log("wrong")
        if (timeLeft < 10) {
            timeLeft = 0;
            timerNum.innerHTML = timeLeft;
        }
        else {
            timeLeft = timeLeft - 10;            
            timerNum.innerHTML = timeLeft;
        }

    }
    else if(answerClicked.matches(".correct")) {
        console.log("correct")        
    }

    // remove btnBox to delete old answer buttons, then recreate btnBox to populate with new answers
    btnBox.remove();
    var newBtnBox = document.createElement("div");
    quizBox.appendChild(newBtnBox);
    newBtnBox.id = "btnBox";
    // replace the selector and event listener for btnBox
    btnBox = document.querySelector("#btnBox");        
    btnBox.addEventListener("click", checkAnswer);
    // show next question
    if(questionIndex < questionArr.length){
        displayNextQuestion();
    }
    else {
        displayScore();
    }
}

// function to show final score
var displayScore = function() {
    console.log("game over, show score");
    finalScore = timeLeft;

    // freeze the timer
    quizFinished = true;

    
    quizHeader.textContent = "All done!";

    // build and append final score div
    var finalScoreEl = document.createElement("p");
    quizBox.appendChild(finalScoreEl);
    finalScoreEl.innerHTML = "Your final score is " + finalScore;

    // build and append submit div
    var submitDiv = document.createElement("div");
    quizBox.appendChild(submitDiv);

    var initialsEl = document.createElement("p");
    submitDiv.appendChild(initialsEl);
    initialsEl.innerHTML = "Enter initials: ";

    var inputEl = document.createElement("input");
    submitDiv.appendChild(inputEl);
    inputEl.outerHTML = "<input id='inputEl'>"

    var submitBtn = document.createElement("button");
    submitDiv.appendChild(submitBtn);
    submitBtn.outerHTML = "<button id='submitScore'>Submit</button>";

    // event listener for submit button
    submitScore = document.querySelector("#submitScore");        
    submitScore.addEventListener("click", saveScore);    
}

// function to save score to local storage
var saveScore = function() {
    console.log("saveScore called");

    var scoresArr;
    // retrieve high scores from local storage
    if(JSON.stringify(localStorage.scoresArr)) {
        scoresArr = JSON.parse(localStorage.getItem("scoresArr"));
    }
    else {
        scoresArr = [];
    }

    // retrieve initials from page
    var initialsTemp = document.querySelector("#inputEl").value;
    // create and push new high score object
    console.log(finalScore);
    console.log(initialsTemp);
    var scoreObj = {initials: initialsTemp, score: finalScore};
    console.log(scoreObj);
    scoresArr.push(scoreObj);

    // save new array to local storage
    localStorage.setItem("scoresArr", JSON.stringify(scoresArr));
}

// array of question objects
var questionArr = [
    {
        question: "Commonly used data types DO NOT include: ______.",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "2"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "2"
    }, 
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. console.log"],
        correctAnswer: "3"
    }
]

var countdown = function() {
    if(timeLeft > 0 && !quizFinished) {
        timeLeft = timeLeft - 1;
        timerNum.innerHTML = timeLeft;
    }
    else {
        clearInterval(countdown);
    }
}

startBtn.addEventListener("click", startQuiz);
btnBox.addEventListener("click", checkAnswer);

