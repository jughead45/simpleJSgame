let balloons = 30  // number of balloons
let gBoard = document.getElementById("game-board") // SVG box
let timer = document.getElementById("timer") // time remaining

/**
 * setting the color of the balloons
 * @returns random color with hsl mixture
 */
function color() {
    let h = Math.random() * 360;
    let s = 50 + Math.random() * 50;
    let l = 50 + Math.random() * 30;
    return "hsl(" + h + "," + s + "%," + l + "% )";
}
/**
 * set the timer to constant
 */
function updateTimer() {
    let timeRemaining = timeStop - Date.now();
    if (timeRemaining <= 0) {
        gameOver();
        timeRemaining = 0;
    }
    timer.textContent = (timeRemaining / 1000).toFixed(1);
}
/**
 * all clicked will be added to the score
 */
function updateScore() {
    document.getElementById("score-board").textContent = score.toFixed(0);
}
/**
 * show the balloons on the game board that can be clickable, once clicked it will change to light color
 * @param {location of the balloon} event 
 */
function isClicked(event) {
    let element = event.target;
    if (element.getAttribute("class") == "clickable") {
        element.setAttribute("class", "clicked");
        score++;
        updateScore();
    }
}
/**
 * if the timer runs out, showing the total score
 */
function gameOver() {
    clearInterval(timerInterval);
    gBoard.removeEventListener("click", isClicked);
    document.documentElement.setAttribute("class", "game-over");
}

let score = 0; //number of balloons collected

// initializing the svg and draw the balloons shape ellipse
gBoard.setAttribute("viewBox", [0, 0, 600, 400]);
for (let i = 0; i < balloons; i++) {
    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("class", "clickable");
    ellipse.setAttribute("rx", 35); // fixed x and y size
    ellipse.setAttribute("ry", 50); 
    ellipse.setAttribute("fill", color());
    ellipse.setAttribute("cx", Math.random() * 600); // random x and y position
    ellipse.setAttribute("cy", Math.random() * 400);
    gBoard.appendChild(ellipse);
}

let timeStop = Date.now() + 10 * 1000;
updateTimer();
let timerInterval = setInterval(updateTimer, 100);
updateScore();
gBoard.addEventListener("click", isClicked);