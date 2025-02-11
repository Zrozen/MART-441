// Function to update the scene dynamically
function updateScene(image, color, text) {
    document.getElementById("mainImage").src = image;
    document.body.style.backgroundColor = color;
    document.getElementById("question").innerHTML = text;
}

// Function to validate user input properly using a loop
function getValidInput(id, validChoices) {
    let inputField = document.getElementById(id);
    let input = inputField.value.trim().toLowerCase();

    if (!validChoices.includes(input)) {
        document.getElementById("question").innerHTML = "Invalid choice. Please enter: " + validChoices.join(" or ");
        inputField.value = "";      
         return ""; 
    }

    inputField.value = ""; 
    return input; 
}


// First choice: Mountain or Ocean
function getChoice1() {
    let choice = getValidInput("choice", ["mountain", "ocean"]);
    if (!choice) return; // Stop if invalid input

    document.getElementById("choice").style.display = "none";
    document.getElementById("btnSubmit").style.display = "none";

    if (choice === "mountain") {
        document.getElementById("choice2").style.display = "block";
        document.getElementById("btnSubmit2").style.display = "block";

        updateScene(
            "./images/MT.jpg",
            "#87CEEB",
            "Towering mountains rise with rugged splendor. Do you prefer to climb to the <b>peak</b> or explore a hidden <b>valley</b>?"
        );
    } else {
        document.getElementById("choice3").style.display = "block";
        document.getElementById("btnSubmit3").style.display = "block";

        updateScene(
            "./images/o.jpg",
            "#1E90FF",
            "The ocean is vast and full of mystery. Do you prefer to <b>dive</b> deep or <b>sail</b> to a distant island?"
        );
    }
}

// Second choice: Peak or Valley 
function getChoice2() {
    let answer = getValidInput("choice2", ["peak", "valley"]);
    if (!answer) return;

    document.getElementById("choice2").style.display = "none";
    document.getElementById("btnSubmit2").style.display = "none";

    document.getElementById("choice4").style.display = "block";
    document.getElementById("btnSubmit4").style.display = "block";

    if (answer === "peak") {
        updateScene("./images/peak.jpg", "#A9A9A9", 
            "You reach the peak and take in a breathtaking view. Do you explore a <b>cave</b> or climb a <b>cliff</b>?");
    } else {
        updateScene("./images/vally.jpg", "#228B22", 
            "You find a flower field and a peaceful sanctuary. Do you search for hidden <b>treasure</b> or <b>rest</b> under a tree?");
    }
}

// Third choice: Dive or Sail 
function getChoice3() {
    let answer = getValidInput("choice3", ["dive", "sail"]);
    if (!answer) return;

    document.getElementById("choice3").style.display = "none";
    document.getElementById("btnSubmit3").style.display = "none";

    document.getElementById("choice5").style.display = "block";
    document.getElementById("btnSubmit5").style.display = "block";

    if (answer === "dive") {
        updateScene("./images/reef.jpg", "#00CED1", 
            "You see a beautiful coral reef. Do you explore a <b>shipwreck</b> or go into the <b>deep sea</b>?");
    } else {
        updateScene("./images/island.jpg", "#FFD700", 
            "You set sail and find an uncharted island with lush landscapes. Do you search for <b>food</b> or build a <b>shelter</b>?");
    }
}

// Fourth choice: Cave or Cliff / Treasure or Rest 
function getChoice4() {
    let answer = getValidInput("choice4", ["cave", "cliff", "treasure", "rest"]);
    if (!answer) return;

    document.getElementById("choice4").style.display = "none";
    document.getElementById("btnSubmit4").style.display = "none";

    if (answer === "cave") {
        updateScene("./images/cave.webp", "#5C4033", "You explore a dark cave and discover ancient markings on the walls.");
    } else if (answer === "cliff") {
        updateScene("./images/cliff.webp", "#D2691E", "You climb the cliff and enjoy a breathtaking view.");
    } else if (answer === "treasure") {
        updateScene("./images/treasure.webp", "#FFD700", "You dig through the valley and find a hidden treasure chest.");
    } else {
        updateScene("./images/rest.webp", "#2d4b2d", "You rest under a tree, listening to the peaceful sounds of nature.");
    }
}

// Fifth choice: Shipwreck or Deep Sea / Food or Shelter 
function getChoice5() {
    let answer = getValidInput("choice5", ["shipwreck", "deep sea", "food", "shelter"]);
    if (!answer) return;

    document.getElementById("choice5").style.display = "none";
    document.getElementById("btnSubmit5").style.display = "none";

    if (answer === "shipwreck") {
        updateScene("./images/shipwreck.webp", "#4682B4", "You explore a sunken shipwreck and discover hidden artifacts.");
    } else if (answer === "deep sea") {
        updateScene("./images/deepsea.webp", "#191970", "You dive deep into the ocean and encounter bioluminescent creatures.");
    } else if (answer === "food") {
        updateScene("./images/food.webp", "#FFA500", "You gather fruits and fish to sustain yourself.");
    } else {
        updateScene("./images/shelter.webp", "#A52A2A", "You build a sturdy shelter to protect yourself from the elements.");
    }
}

// Restart the story
function restartStory() {
    do {
        document.querySelectorAll(".input-container input, .input-container button").forEach(el => el.style.display = "none");
        document.getElementById("choice").style.display = "block";
        document.getElementById("btnSubmit").style.display = "block";

        document.querySelectorAll("input").forEach(input => input.value = "");

        updateScene(
            "./images/start.jpg",
            "rgb(128, 102, 72)",
            "Would you like to explore the Mountain or the Ocean? The choice is up to you."
        );
    } while (false); 
}
