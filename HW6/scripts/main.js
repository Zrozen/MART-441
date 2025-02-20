
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", 
    "image7", "image8", "image9", "image10", "image11", "image12"];
var blankImagePath = "images/back.jpg";
var firstNumber = -1;
var secondNumber = -1;
var score = 0;
var allFound = 0;

var player = {
    "firstname": "",
    "lastname": "",
    "age": 0,
    "score": 0,
    "attempts": 0
};

var actualImages = [];

var firstImageIndex = -1;
var secondImageIndex = -1;
var canFlip = true; 
var matchedPairs = 0; 


function printBlanks() {
    createRandomImageArray();
    for (var i = 0; i < imageTags.length; i++) {
        let backImage = document.getElementById(imageTags[i] + "-back");
        
        if (backImage) {
            backImage.src = actualImages[i]; // Assign actual images to the back side
            console.log(`Assigned ${actualImages[i]} to ${imageTags[i]}-back`);
        } else {
            console.error(`Element #${imageTags[i]}-back not found`);
        }
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
        if (count[randomNumber] < 2) { 
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}


function flipImage(index) {
    let card = document.getElementsByClassName("card")[index];

    // Prevent flipping more than two at once or flipping an already flipped card
    if (!canFlip || card.classList.contains("flipped")) return;

    // Flip the selected card
    card.classList.add("flipped");

    if (firstImageIndex === -1) {
        firstImageIndex = index;
    } else if (secondImageIndex === -1) {
        secondImageIndex = index;
        canFlip = false; // Prevent clicking more than two at a time

        setTimeout(checkForMatch, 1000);
    }
}



// Function to check if two images match
function checkForMatch() {
    let card1 = document.getElementsByClassName("card")[firstImageIndex];
    let card2 = document.getElementsByClassName("card")[secondImageIndex];

    // Retrieve existing player data
    var player = getPlayerData();
    // Increment attempts and update player object
    player.attempts = (player.attempts || 0) + 1;
    console.log("Current Attempts:", player.attempts);
    localStorage.setItem("playerInfo", JSON.stringify(player));

   
    if (actualImages[firstImageIndex] !== actualImages[secondImageIndex]) {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 50);
    } else {
       
        setTimeout(() => {
            
            card1.classList.add("fade-out");
            card2.classList.add("fade-out");

            
            setTimeout(() => {
                card1.style.visibility = "hidden";
                card2.style.visibility = "hidden";
            }, 100);
        }, 100); 
        
        
        matchedPairs++;
    
        if (matchedPairs === imageTags.length / 2) {
            showVictoryAnimation();
        }
    }

    firstImageIndex = -1;
    secondImageIndex = -1;
    canFlip = true;
}




function imagesDisappear()
{

    console.log(firstNumber);
    document.getElementById(imageNames[firstNumber]).src = blankImagePath;
    document.getElementById(imageNames[secondNumber]).src = blankImagePath;
    firstNumber = -1;
    secondNumber = -1;
}





function addToPlayer() {
    var firstName = document.getElementById("txtFirstName").value.trim();
    var lastName = document.getElementById("txtLastName").value.trim();
    var age = document.getElementById("txtAge").value.trim();

    // Basic input validation
    if (firstName === "" || lastName === "" || age === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Parse age as a number
    age = parseInt(age);
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    // Create a player object
    var player = {
        firstname: firstName,
        lastname: lastName,
        age: age,
        attempts: 0  // Start attempts at zero
    };

    // Save player object to LocalStorage
    localStorage.setItem("playerInfo", JSON.stringify(player));
    console.log("Player Info Saved:", localStorage.getItem("playerInfo")); // Debugging line
    
    // Redirect to index.html (the game page)
    window.location.href = "index.html";
}



function displayResult() {
    var player = getPlayerData();
    if (player) {
        var str = `
            Name: ${player.firstname} ${player.lastname} <br>
            Age: ${player.age} <br>
            Attempts: ${player.attempts || 0}
        `;
        
        console.log("Displaying Result:", str); // Debugging line
        
        if (document.getElementById("endInformation")) {
            document.getElementById("endInformation").innerHTML = str;
        }
    }
}



function showVictoryAnimation() {
    let victoryMessage = document.createElement("div");
    victoryMessage.id = "victoryMessage";
    victoryMessage.innerHTML = "YOU WIN!";
    document.body.appendChild(victoryMessage);
    
    startConfetti();
    
    setTimeout(() => {
        document.body.removeChild(victoryMessage);
        stopConfetti();
        window.location.href = 'end.html';
    }, 3000);
}


function finishGame() {
    
    var player = getPlayerData();
    console.log("Before Update:", player); 

    
    player.attempts = (player.attempts || 0) + 1;
    console.log("Updated Attempts:", player.attempts); 
    
    
    localStorage.setItem("playerInfo", JSON.stringify(player));
    console.log("After Update:", localStorage.getItem("playerInfo")); 
    
   
    window.location.href = "end.html";
}



function getPlayerData() {
    var playerInformation = localStorage.getItem("playerInfo");
    if (playerInformation) {
        try {
            var player = JSON.parse(playerInformation);
            console.log("Retrieved Player Data:", player); // Debugging line
            return player;
        } catch (error) {
            console.error("Error parsing player information:", error);
            alert("An error occurred. Please restart the game.");
            localStorage.removeItem("playerInfo");
            window.location.href = "intro.html";
        }
    } else {
        console.error("No player information found in LocalStorage.");
        window.location.href = "intro.html";
    }
}

    
    function resetGame() {
        firstImageIndex = -1;
        secondImageIndex = -1;
        matchedPairs = 0;
        canFlip = true;
        actualImages = [];
    
        // Remove "flipped" class from all cards
        let cards = document.getElementsByClassName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("flipped");
        }
    
        // Regenerate images and reassign them
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
    