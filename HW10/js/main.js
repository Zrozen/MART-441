let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let collisionSound = document.getElementById("collisionSound");

let player = new Shape(100, 100, 50, 50, "blue", true); // circle
let enemy = new Shape(300, 300, 50, 50, "red"); // square

let keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

let lastCollision = false;
let collisionCooldown = false;

function update() {
    // Player movement
    if (keys["ArrowUp"]) player.y -= 5;
    if (keys["ArrowDown"]) player.y += 5;
    if (keys["ArrowLeft"]) player.x -= 5;
    if (keys["ArrowRight"]) player.x += 5;

    player.stayInBounds(canvas);

    // Autonomous movement
    enemy.moveAutonomous(canvas);

    // Collision detection
    let isColliding = player.isCollidingWith(enemy);

    if (isColliding && !lastCollision && !collisionCooldown) {
        // Collision just started
        canvas.style.backgroundColor =
            "rgb(" +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
        
        player.width = player.height = 80;
        enemy.width = enemy.height = 60;
    
        collisionCooldown = true;
        collisionSound.currentTime = 0; // rewind sound
        collisionSound.play(); // play sound
        
        setTimeout(() => {
            collisionCooldown = false;
        }, 1000); // 1 second cooldown
    } else if (!isColliding) {
      
        player.width = player.height = 50;
        enemy.width = enemy.height = 50;
    }
    
    lastCollision = isColliding;
    

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    enemy.draw(ctx);
}

update();
