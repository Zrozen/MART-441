function storyFunction(choice) {
    var answer1 = document.getElementById("choice1").innerHTML;
    var answer2 = document.getElementById("choice2").innerHTML;

    if (choice == 1 && answer1 == "Yes, Hatch!") {
        document.getElementById("story").innerHTML = 
            "You crack through the shell and take your first breath. Your tiny wings stretch, and your journey begins! What do you do first?";
        document.getElementById("choice1").innerHTML = "Explore the Nest";
        document.getElementById("choice2").innerHTML = "Call for Mother";
        document.getElementById("story-image").src = "images/baby.webp";
    } 
    else if (choice == 1 && answer1 == "Explore the Nest") {
        document.getElementById("story").innerHTML = 
            "You bravely step forward, exploring every corner of the nest. You find soft feathers, glowing crystals, and even a small hidden tunnel. Your curiosity and bravery earn you a special name: **Seeker of Skies**" +
            "<br><br>With this name, you are destined for adventure!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/explor.webp";
    } 
    else if (choice == 2 && answer2 == "Call for Mother") {
        document.getElementById("story").innerHTML = 
            "You let out a tiny chirp, calling for your mother. Moments later, a great shadow covers you, and a warm presence surrounds you. Your mother gently nuzzles you, her scales warm and protective. You feel safe and loved." +
            "<br><br>You are **Flameheart**, destined for greatness!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/Nuzzle.webp";
    } 
    else if (choice == 1 && answer1 == "Yes, Restart") {
        document.getElementById("story").innerHTML = 
            "You are a **dragon egg**, resting in a warm nest. A crack forms in your shell... **Will you hatch?**";
        document.getElementById("choice1").innerHTML = "Yes, Hatch!";
        document.getElementById("choice2").innerHTML = "No, Stay Inside";
        document.getElementById("story-image").src = "images/Egg.jpg";
    } 
    else if (choice == 2 && answer2 == "No, Quit") {
        document.getElementById("story").innerHTML = "Your legend remains untold...";
        document.getElementById("story-image").src = "images/dark.webp";
    }
    else if (choice == 2 && answer2 == "No, Stay Inside") {
        document.getElementById("story").innerHTML = 
            "You decide to stay in your egg. But the nest shakes as a predator approaches! Do you...";
        document.getElementById("choice1").innerHTML = "Hatch Quickly!";
        document.getElementById("choice2").innerHTML = "Stay Still and Hide";
        document.getElementById("story-image").src = "images/quick.webp";
    } 
    else if (choice == 2 && answer2 == "Stay Still and Hide") {
        document.getElementById("story").innerHTML = 
            "You stay perfectly still, your tiny heartbeat quickening. The predator growls, sniffing around your egg. Suddenly, a **mighty roar shakes the air!**" +
            "<br><br>Your mother has returned! She chases the intruder away with **one powerful strike**." +
            "<br><br>Safe once more, you feel warmth surrounding you as she gently nuzzles your egg. You know it's time...";
        document.getElementById("choice1").innerHTML = "Hatch Now";
        document.getElementById("choice2").innerHTML = "Wait Longer";
        document.getElementById("story-image").src = "images/Egg.jpg";
    } 
    else if (choice == 1 && answer1 == "Hatch Now") {
        document.getElementById("story").innerHTML = 
            "You crack through your shell at last, blinking up at your mother. She gently **nuzzles you close, her warmth surrounding you**." +
            "<br><br>She gives you a name: **Softheart.**" +
            "<br><br>Your story is only beginning!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/soft.webp";
    } 
    else if (choice == 2 && answer2 == "Wait Longer") {
        document.getElementById("story").innerHTML = 
            "You choose to wait a little longer, feeling safe inside your egg. Your mother hums a deep, soothing sound, watching over you." +
            "<br><br>You will hatch when you are truly ready." + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/egg.jpg";
    } 
    else if (choice == 1 && answer1 == "Hatch Quickly!") {
        document.getElementById("story").innerHTML = 
            "You break free just in time! A hungry wolf leaps at the nest, but you let out a tiny roar. Do you...";
        document.getElementById("choice1").innerHTML = "Bite the Wolf";
        document.getElementById("choice2").innerHTML = "Run for Cover";
        document.getElementById("story-image").src = "images/wolf.webp";
    } 
    else if (choice == 1 && answer1 == "Bite the Wolf") {
        document.getElementById("story").innerHTML = 
            "With all your might, you bite the wolf’s nose! The wolf yelps and runs away. You have won your first battle!" +
            "<br><br>Do you return to the nest or explore the forest?";
        document.getElementById("choice1").innerHTML = "Return to the Nest";
        document.getElementById("choice2").innerHTML = "Explore the Forest";
        document.getElementById("story-image").src = "images/bite.webp";
    } 
    else if (choice == 2 && answer2 == "Run for Cover") {
        document.getElementById("story").innerHTML = 
            "You escape the wolf, but now you are lost in the dark forest. Strange eyes watch you from the shadows. What do you do?";
        document.getElementById("choice1").innerHTML = "Find Shelter";
        document.getElementById("choice2").innerHTML = "Call for Help";
        document.getElementById("story-image").src = "images/lost.webp";
    } 
    else if (choice == 1 && answer1 == "Return to the Nest") {
        document.getElementById("story").innerHTML = 
            "You return to your nest, victorious. Your mother arrives and sees your strength. She names you 'Braveheart' for your courage." +
            "<br><br>Your destiny as a powerful dragon begins!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/victor.webp";
    } 
    else if (choice == 2 && answer2 == "Explore the Forest") {
        document.getElementById("story").innerHTML = 
            "You leave the nest and venture into the unknown. The forest is filled with wonders and dangers. Your true adventure has begun!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/explor.webp";
    } 
    else if (choice == 1 && answer1 == "Find Shelter") {
        document.getElementById("story").innerHTML = 
            "You find a small cave to hide in, but something is inside! A **mysterious dragon elder** watches you carefully." + 
            "<br><br>Do you approach or stay hidden?";
        document.getElementById("choice1").innerHTML = "Approach the Elder";
        document.getElementById("choice2").innerHTML = "Stay Hidden";
        document.getElementById("story-image").src = "images/elder.webp";
    } 
    else if (choice == 1 && answer1 == "Approach the Elder") {
        document.getElementById("story").innerHTML = 
            "You step forward cautiously, but without fear. The elder dragon observes you, then nods approvingly." +
            "<br><br>'You are wise beyond your years,' the elder rumbles. 'From now on, you shall be known as **Wisescales**.'" +
            "<br><br>With a powerful wingbeat, the elder lifts you and carries you back to your mother. She is pleased by your return, now carrying the wisdom of the elder." +
            "<br><br>Your journey has only begun!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/wise.webp";
    } 
    else if (choice == 2 && answer2 == "Stay Hidden") {
        document.getElementById("story").innerHTML = 
            "You try to stay perfectly still, but the elder dragon already knows you're there." +
            "<br><br>With a deep chuckle, it carefully picks you up, cradling you in its talons." +
            "<br><br>'You are pale as the moonlight and quiet as the wind,' it says. 'You shall be called **Paleheart.**'" +
            "<br><br>The elder carries you through the sky, taking you back to your mother. She looks at you with love, proud of your name and your adventure." +
            "<br><br>Your story is just beginning!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/pale.webp";
    }
    else if (choice == 2 && answer2 == "Call for Help") {
        document.getElementById("story").innerHTML = 
            "You let out a loud roar, hoping someone hears you. Suddenly, wings flap above. A **great dragon lands before you**!" + 
            "<br><br>Do you trust this dragon or run away?";
        document.getElementById("choice1").innerHTML = "Trust the Dragon";
        document.getElementById("choice2").innerHTML = "Run Away";
        document.getElementById("story-image").src = "images/elder.webp";
    } 
    else if (choice == 1 && answer1 == "Trust the Dragon") {
        document.getElementById("story").innerHTML = 
            "The dragon takes you under its wing and teaches you the ancient ways. You are named **Flameclaw**!" + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/fight.webp";
    } 
    else if (choice == 2 && answer2 == "Run Away") {
        document.getElementById("story").innerHTML = 
            "You flee into the darkness, alone. Your story is not yet over, but it will be a lonely journey..." + "<br>Restart?";
        document.getElementById("choice1").innerHTML = "Yes, Restart";
        document.getElementById("choice2").innerHTML = "No, Quit";
        document.getElementById("story-image").src = "images/lone.webp";
    } 
    else if (choice == 1 && answer1 == "Yes, Restart") {
        document.getElementById("story").innerHTML = 
            "You are a **dragon egg**, resting in a warm nest. A crack forms in your shell... **Will you hatch?**";
        document.getElementById("choice1").innerHTML = "Yes, Hatch!";
        document.getElementById("choice2").innerHTML = "No, Stay Inside";
        document.getElementById("story-image").src = "images/Egg.jpg";
    } 
    else if (choice == 2 && answer2 == "No, Quit") {
        document.getElementById("story").innerHTML = "Your legend remains untold...";
        document.getElementById("story-image").src = "images/dark.webp";
    }
}
