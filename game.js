var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;

var bestScore = localStorage.getItem("bestScore");
if (bestScore === null) {
    bestScore = 0;
    localStorage.setItem("bestScore", bestScore);
}


$(document).keypress(function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } else {
        // Check which key was pressed
        var keyPressed = event.key.toLowerCase();
        switch (keyPressed) {
            case "r":
                handleColorClick("red");
                break;
            case "b":
                handleColorClick("blue");
                break;
            case "g":
                handleColorClick("green");
                break;
            case "y":
                handleColorClick("yellow");
                break;
        }
    }
});


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    handleColorClick(userChosenColour);
});

function handleColorClick(color) {
    userClickedPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

            score++;
            if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            }

            $("#your-score").text("Your Score: " + score);
            $("#best-score").text("Best Score: " + bestScore);
        
        }

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-title").css("font-size", "2rem");

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    score = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("#your-score").text("Your Score: 0");
}
