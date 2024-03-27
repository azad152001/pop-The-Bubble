var timer = 60;
var score = 0;
var hitrn = 0;
var timerInterval;
var isFirstTime = true;

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function getNewHit() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

function makeBubble() {
    var clutter = "";

    for (var i = 1; i <= 102; i++) {
        var rn = Math.floor(Math.random() * 10)
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = clutter;

    // Add event listener to bubbles
    var bubbles = document.querySelectorAll(".bubble");
    bubbles.forEach(function(bubble) {
        bubble.addEventListener("click", function() {
            var clickednum = Number(bubble.textContent);
            if (clickednum === hitrn) {
                increaseScore();
                playSound();
                makeBubble();
                getNewHit();
            }
        });
    });
}

function runTimer() {
    timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            clearInterval(timerInterval);
            document.querySelector("#gamePanel").style.display = "none";
            document.querySelector("#scoreDisplay").style.display = "block";
            document.querySelector("#finalScore").textContent = score;
        }
    }, 1000);
}

function playSound() {
    var sound = document.getElementById("touchSound");
    sound.play();
}

document.querySelector("#startButton").addEventListener("click", function() {
    document.querySelector("#startButton").style.display = "none";
    document.querySelector("#gamePanel").style.display = "block";
    runTimer();
    makeBubble();
    getNewHit();
    playSound();
});

document.querySelector("#playAgainButton").addEventListener("click", function() {
    if (isFirstTime) {
        document.querySelector("#startButton").style.display = "none";
        document.querySelector("#gamePanel").style.display = "block";
        runTimer();
        makeBubble();
        getNewHit();
        isFirstTime = false;
    } else {
        timer = 60;
        score = 0;
        document.querySelector("#timerval").textContent = timer;
        document.querySelector("#scoreval").textContent = score;
        document.querySelector("#scoreDisplay").style.display = "none";
        document.querySelector("#gamePanel").style.display = "block";
        runTimer();
        makeBubble();
        getNewHit();
    }
    playSound();
});
