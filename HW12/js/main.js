const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const collisionSound = document.getElementById("collisionSound");

let keys = {};
let gameObjects = [];
let collectibles = [];
let lastCollision = false;
let collisionCooldown = false;
let score = 0;

// Player and Enemy
let player = new Shape(100, 100, 50, 50, "blue", true);
let enemy = new Shape(300, 300, 50, 50, "red");

// Input tracking
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Load JSON
function loadJSON(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data));
}

function isCollidingWithPlayer(x, y, width, height) {
    return (
      x < player.x + player.width &&
      x + width > player.x &&
      y < player.y + player.height &&
      y + height > player.y
    );
  }
  
  // Setup
  function setup() {
    let objectsLoaded = false;
    let collectiblesLoaded = false;
  
    loadJSON("data/objects.json", data => {
      data.forEach(obj => {
        let randomX, randomY, placed = false, tries = 0;
        const maxTries = 100;
  
        while (!placed && tries < maxTries) {
          randomX = Math.floor(Math.random() * (canvas.width - obj.width));
          randomY = Math.floor(Math.random() * (canvas.height - obj.height));
  
          const newRect = { x: randomX, y: randomY, width: obj.width, height: obj.height };
  
          const overlapsPlayer = isCollidingWithPlayer(newRect.x, newRect.y, newRect.width, newRect.height);
          const overlapsOtherObjects = gameObjects.some(other =>
            newRect.x < other.x + other.width &&
            newRect.x + newRect.width > other.x &&
            newRect.y < other.y + other.height &&
            newRect.y + newRect.height > other.y
          );
          const overlapsCollectibles = collectibles.some(c =>
            newRect.x < c.x + c.size &&
            newRect.x + newRect.width > c.x &&
            newRect.y < c.y + c.size &&
            newRect.y + newRect.height > c.y
          );
  
          if (!overlapsPlayer && !overlapsOtherObjects && !overlapsCollectibles) {
            gameObjects.push(new GameObject(newRect.x, newRect.y, obj.width, obj.height, obj.color));
            placed = true;
          }
  
          tries++;
        }
  
        if (!placed) {
          console.warn("Could not place an obstacle without overlap.");
        }
      });
  
      objectsLoaded = true;
      checkStart();
    });
  
    loadJSON("data/collectibles.json", data => {
      data.forEach(obj => {
        let randomX, randomY, placed = false, tries = 0;
        const maxTries = 100;
  
        while (!placed && tries < maxTries) {
          randomX = Math.floor(Math.random() * (canvas.width - obj.size));
          randomY = Math.floor(Math.random() * (canvas.height - obj.size));
  
          const tempRect = { x: randomX, y: randomY, size: obj.size };
  
          const overlapsPlayer = isCollidingWithPlayer(tempRect.x, tempRect.y, tempRect.size, tempRect.size);
          const overlapsOthers = collectibles.some(other =>
            tempRect.x < other.x + other.size &&
            tempRect.x + tempRect.size > other.x &&
            tempRect.y < other.y + other.size &&
            tempRect.y + tempRect.size > other.y
          );
  
          if (!overlapsPlayer && !overlapsOthers) {
            collectibles.push(new Collectible(
              tempRect.x + obj.size / 2,
              tempRect.y + obj.size / 2,
              obj.size,
              obj.color
            ));
            placed = true;
          }
  
          tries++;
        }
  
        if (!placed) {
          console.warn("Could not place a collectible without overlap.");
        }
      });
  
      collectiblesLoaded = true;
      checkStart();
    });
  
    function checkStart() {
      if (objectsLoaded && collectiblesLoaded) {
        requestAnimationFrame(update);
      }
    }
  }
  
      
      
      loadJSON("data/collectibles.json", data => {
        data.forEach(obj => {
          let randomX, randomY, placed = false, tries = 0;
          const maxTries = 100;
      
          while (!placed && tries < maxTries) {
            randomX = Math.floor(Math.random() * (canvas.width - obj.size));
            randomY = Math.floor(Math.random() * (canvas.height - obj.size));
      
            const tempRect = {
              x: randomX,
              y: randomY,
              size: obj.size
            };
      
            const overlapsPlayer = (
              tempRect.x < player.x + player.width &&
              tempRect.x + tempRect.size > player.x &&
              tempRect.y < player.y + player.height &&
              tempRect.y + tempRect.size > player.y
            );
      
            const overlapsOthers = collectibles.some(other =>
              tempRect.x < other.x + other.size &&
              tempRect.x + tempRect.size > other.x &&
              tempRect.y < other.y + other.size &&
              tempRect.y + tempRect.size > other.y
            );
      
            if (!overlapsPlayer && !overlapsOthers) {
              // Add as center-based collectible
              collectibles.push(new Collectible(
                tempRect.x + obj.size / 2,
                tempRect.y + obj.size / 2,
                obj.size,
                obj.color
              ));
              placed = true;
            }
      
            tries++;
          }
      
          if (!placed) {
            console.warn("Could not place a collectible without overlapping others.");
          }
        });
      });
      

// Main game update
function update() {
    let speed = 5;
  
    // Handle horizontal movement
    if (keys["ArrowLeft"]) {
      const newX = player.x - speed;
      if (!isCollidingWithObjects(newX, player.y, player.width, player.height)) {
        player.x = newX;
      }
    }
  
    if (keys["ArrowRight"]) {
      const newX = player.x + speed;
      if (!isCollidingWithObjects(newX, player.y, player.width, player.height)) {
        player.x = newX;
      }
    }
  
    // Handle vertical movement
    if (keys["ArrowUp"]) {
      const newY = player.y - speed;
      if (!isCollidingWithObjects(player.x, newY, player.width, player.height)) {
        player.y = newY;
      }
    }
  
    if (keys["ArrowDown"]) {
      const newY = player.y + speed;
      if (!isCollidingWithObjects(player.x, newY, player.width, player.height)) {
        player.y = newY;
      }
    }
  
    player.stayInBounds(canvas);
    enemy.moveAutonomous(canvas);
  
    let isCollidingWithEnemy = player.isCollidingWith(enemy);
  
    if (isCollidingWithEnemy && !collisionCooldown) {
      collisionCooldown = true;
      collisionSound.currentTime = 0;
      collisionSound.play();
  
      setTimeout(() => {
        resetGame();
        collisionCooldown = false;
      }, 500);
    } else if (!isCollidingWithEnemy) {
      player.width = player.height = 50;
      enemy.width = enemy.height = 50;
    }
  
    lastCollision = isCollidingWithEnemy;
  
    draw();
    requestAnimationFrame(update);
  }
  

// Drawing and collectible logic
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameObjects.forEach(obj => obj.draw(ctx));

  collectibles.forEach(c => {
    if (!c.collected && c.collect(player)) {
      score++;
      updateScore();
      collisionSound.currentTime = 0;
      collisionSound.play();
      checkWin();
    }
    c.draw(ctx);
  });

  player.draw(ctx);
  enemy.draw(ctx);
}

// Collision detection for walls
function isCollidingWithObjects(x, y, width, height) {
  return gameObjects.some(obj =>
    x < obj.x + obj.width &&
    x + width > obj.x &&
    y < obj.y + obj.height &&
    y + height > obj.y
  );
}

// Random color helper
function rand255() {
  return Math.floor(Math.random() * 255);
}

// Score and win logic
function updateScore() {
  document.getElementById("score").textContent = "Score: " + score;
}

function checkWin() {
  if (collectibles.every(c => c.collected)) {
    setTimeout(() => alert("You win! 🎉"), 100);
  }
}

// Random movement every 2 seconds
setInterval(() => {
  gameObjects.forEach(obj => {
    if (typeof obj.moveRandom === "function") {
      obj.moveRandom(canvas);
    }
  });
}, 2000);
//reset buttion
document.getElementById("resetBtn").addEventListener("click", () => {
    resetGame();
  });
  
  function isCollidingWithPlayer(x, y, width, height) {
    return (
      x < player.x + player.width &&
      x + width > player.x &&
      y < player.y + player.height &&
      y + height > player.y
    );
  }
  
  function resetGame() {
    // Reset player
    player.x = 100;
    player.y = 100;
    player.width = player.height = 50;
  
    // Reset enemy
    enemy.x = 300;
    enemy.y = 300;
    enemy.width = enemy.height = 50;
  
    // Reset score
    score = 0;
    updateScore();
  
    // Reset background
    canvas.style.backgroundColor = "beige";
  
    // Reset collectibles
    collectibles.forEach((c, index) => {
        c.collected = false;
      
        let randomX, randomY, placed = false, tries = 0;
        const maxTries = 100;
      
        while (!placed && tries < maxTries) {
          randomX = Math.floor(Math.random() * (canvas.width - c.size));
          randomY = Math.floor(Math.random() * (canvas.height - c.size));
      
          const tempRect = { x: randomX, y: randomY, size: c.size };
      
          const overlapsPlayer = isCollidingWithPlayer(tempRect.x, tempRect.y, tempRect.size, tempRect.size);
      
          const overlapsOthers = collectibles.some((other, i) =>
            i !== index &&
            tempRect.x < other.x + other.size &&
            tempRect.x + tempRect.size > other.x &&
            tempRect.y < other.y + other.size &&
            tempRect.y + tempRect.size > other.y
          );
      
          if (!overlapsPlayer && !overlapsOthers) {
            c.x = randomX + c.size / 2;
            c.y = randomY + c.size / 2;
            placed = true;
          }
      
          tries++;
        }
      
        if (!placed) {
          console.warn("Could not reposition collectible without overlap.");
        }
      });
      
    // Reset obstacles
    gameObjects.forEach((obj, index) => {
        let randomX, randomY, placed = false, tries = 0;
        const maxTries = 100;
      
        while (!placed && tries < maxTries) {
          randomX = Math.floor(Math.random() * (canvas.width - obj.width));
          randomY = Math.floor(Math.random() * (canvas.height - obj.height));
      
          const tempRect = { x: randomX, y: randomY, width: obj.width, height: obj.height };
      
          const overlapsPlayer = isCollidingWithPlayer(tempRect.x, tempRect.y, tempRect.width, tempRect.height);
          const overlapsOthers = gameObjects.some((other, i) =>
            i !== index &&
            tempRect.x < other.x + other.width &&
            tempRect.x + tempRect.width > other.x &&
            tempRect.y < other.y + other.height &&
            tempRect.y + tempRect.height > other.y
          );
          const overlapsCollectibles = collectibles.some(c =>
            tempRect.x < c.x + c.size &&
            tempRect.x + tempRect.width > c.x &&
            tempRect.y < c.y + c.size &&
            tempRect.y + tempRect.height > c.y
          );
      
          if (!overlapsPlayer && !overlapsOthers && !overlapsCollectibles) {
            obj.x = randomX;
            obj.y = randomY;
            placed = true;
          }
      
          tries++;
        }
      
        if (!placed) {
          console.warn("Could not reposition obstacle without overlap.");
        }
      });
      
  }
  
setup();
