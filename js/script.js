var playing = false;
var score = 0;
var action;
var timeRemaining;
var correctAnswer;

//if we click on the start/reset
document.querySelector("#startreset").onclick = () => {
    //if we are playing
    if (playing) {
        //reload page
        location.reload();
    } else {
        //change the mode of playing
        playing = true;
        //set score to 0
        score = 0;
        document.querySelector("#scorevalue").innerHTML = score;
        //show countdown box
        showElement("timeremaining");
        //countdown time
        timeRemaining = 60;
        //show countdown in sec
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        //hide the game over box
        hideElement("gameOver");
        //change button to reset
        document.querySelector("#startreset").innerHTML = "Reset Game";
        //start countdown
        startCountdown();
        //generate new Q&A
        generateQA();
    }
}

for (let i = 1; i < 5; i++) {
    //if we click on answer box
    document.querySelector("#box" + i).onclick = () => {
        //if we are playing
        if (playing) {
            //if correct answer
            if (document.querySelector("#box" + i).innerHTML == correctAnswer) {
                //increase score by 1
                score++;
                //set score value
                document.querySelector("#scorevalue").innerHTML = score;
                //hide wrong box and show correct box
                hideElement("wrong");
                showElement("correct");
                setTimeout(() => {
                    hideElement("correct");
                }, 1000);

                //generate new Q&A
                generateQA();
            } else {
                //show wrong box and hide correct box
                hideElement("correct");
                showElement("wrong");
                setTimeout(() => {
                    hideElement("wrong");
                }, 1000);
            }
        }
    }
}

function startCountdown() {
    action = setInterval(() => {
        //reduce time by 1sec in loops
        timeRemaining -= 1;
        //show countdown in sec
        document.querySelector("#timeremainingvalue").innerHTML = timeRemaining;
        //no time left
        if (timeRemaining == 0) {
            //game over
            stopCountdown();
            //show game over box
            showElement("gameOver");
            //show game over message and score
            document.querySelector("#gameOver").innerHTML = "<p>Game Over!</p><p>Your score is : " + score + ".</p>";
            //hide countdown
            hideElement("timeremaining");
            //hide correct box
            hideElement("correct");
            //hide wrong box
            hideElement("wrong");
            //change the mode of playing
            playing = false;
            //change button to start
            document.querySelector("#startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    //stop countdown
    clearInterval(action);
}

function hideElement(Id) {
    document.querySelector("#" + Id).style.display = "none";
}

function showElement(Id) {
    document.querySelector("#" + Id).style.display = "block";
}

function generateQA() {
    // Generate random numbers
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());

    // Choose a random operation
    var operations = ["+", "-", "x", "/"];
    var operation = operations[Math.floor(Math.random() * operations.length)];

    // Calculate correct answer
    if (operation === "+") {
        correctAnswer = x + y;
    } else if (operation === "-") {
        correctAnswer = x - y;
    } else if (operation === "x") {
        correctAnswer = x * y;
    } else {
        // For division, avoid division by zero and use integer division
        correctAnswer = (x * y) / y;
    }

    // Set the question
    document.querySelector("#question").innerHTML = x + " " + operation + " " + y;

    // Set random position for correct answer
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.querySelector("#box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    // Generate wrong answers
    for (let i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1)

            document.querySelector("#box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
