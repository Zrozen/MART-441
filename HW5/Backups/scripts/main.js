// Array 
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", 
    "image7", "image8", "image9", "image10", "image11", "image12"];


var blankImagePath = "images/back.jpg";

var actualImages = [];


var firstImageIndex = -1;
var secondImageIndex = -1;
var canFlip = true; 
var matchedPairs = 0; 


function printBlanks() {
createRandomImageArray();
for (var i = 0; i < imageTags.length; i++) {
document.getElementById(imageTags[i]).src = blankImagePath;
}
}


function createRandomImageArray() {
var actualImagePath = [
"images/cat.webp", "images/wolf.webp", "images/dog.webp", "images/fox.webp", 
"images/tiger.webp", "images/bear.webp"
];
var count = Array(actualImagePath.length).fill(0);

actualImages = [];

while (actualImages.length < imageTags.length) {
var randomNumber = Math.floor(Math.random() * actualImagePath.length);
if (count[randomNumber] < 2) { // Each image appears twice
actualImages.push(actualImagePath[randomNumber]);
count[randomNumber]++;
}
}
}


function flipImage(index) {
if (!canFlip || document.getElementById(imageTags[index]).src.includes(actualImages[index])) {
return; // Prevent flipping more than two images at once
}

document.getElementById(imageTags[index]).src = actualImages[index];

if (firstImageIndex === -1) {
firstImageIndex = index;
} else if (secondImageIndex === -1) {
secondImageIndex = index;
canFlip = false; // Prevent clicking more than two at a time

setTimeout(checkForMatch, 1000);
}
}


function checkForMatch() {
if (actualImages[firstImageIndex] !== actualImages[secondImageIndex]) {
// Images do not match, flip them back
document.getElementById(imageTags[firstImageIndex]).src = blankImagePath;
document.getElementById(imageTags[secondImageIndex]).src = blankImagePath;
} else {
matchedPairs++; // Increment matched pairs
if (matchedPairs === imageTags.length / 2) {
showVictoryAnimation(); // Trigger the victory animation
}
}

firstImageIndex = -1;
secondImageIndex = -1;
canFlip = true; // Allow flipping again
}


function showVictoryAnimation() {
let victoryMessage = document.createElement("div");
victoryMessage.id = "victoryMessage";
victoryMessage.innerHTML = "🎉 YOU WIN! 🎉";
document.body.appendChild(victoryMessage);

// Start confetti animation
startConfetti();


setTimeout(() => {
document.body.removeChild(victoryMessage);
stopConfetti();
resetGame();
}, 3000);
}


function resetGame() {
firstImageIndex = -1;
secondImageIndex = -1;
matchedPairs = 0;
canFlip = true;
actualImages = [];
printBlanks();
}


var confettiCanvas, confettiCtx, confettiParticles = [], confettiInterval;

function startConfetti() {
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = "0";
    confettiCanvas.style.left = "0";
    confettiCanvas.style.width = "100%";
    confettiCanvas.style.height = "100%";
    confettiCanvas.style.pointerEvents = "none";
    document.body.appendChild(confettiCanvas);
    
    confettiCtx = confettiCanvas.getContext("2d");
    confettiParticles = []; // 
    for (var i = 0; i < 1000; i++) { //  confetti amount
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 2 + 1, // confetti size
            d: Math.random() * 5 + 2, // fall speed
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 15 - 7 //  tilting effect
        });
    }

    confettiInterval = setInterval(drawConfetti, 20);
}

function drawConfetti() {
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < confettiParticles.length; i++) {
        var p = confettiParticles[i];

        confettiCtx.beginPath();
        confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fill();

        // Movement
        p.y += p.d; 
        p.x += Math.sin(p.tilt) * 2; 
        p.tilt += Math.random() * 0.2 - 0.1; 

        
        if (p.x < 0) p.x = 0; 
        if (p.x > window.innerWidth) p.x = window.innerWidth; 

        
        if (p.y > window.innerHeight) {
            p.y = -10; 
            p.x = Math.random() * window.innerWidth; 
        }
    }
}

function stopConfetti() {
    clearInterval(confettiInterval);
    document.body.removeChild(confettiCanvas);
}
