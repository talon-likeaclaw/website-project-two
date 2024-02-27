'use strict';
// Rocket League Game
/* Attributions
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
* https://ucfcdl.github.io/html5-tutorial/
* HTML5 Canvas Tutorials for Beginners | Become a Canvas Pro by Chris Courses: 
* https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL
* I used the tutorial above to get a basic understanding of OOP and canvas
* But once I understood it all, I made the object functions myself
* Pretty excited about learning OOP, I want to make some PICO-8 games now!
*
* I just realized looking through the instructions that I was supposed to
* get your permission to make a game. But since lessy made a quiz I figure
* our website fulfils the DOM requirements, and I got to learn and apply JS canvas!
*/
// Get Canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const gravity = 0.2;
const friction = 0.94;

// Functions
// detectCollision function taken from chatGPT 
// I did watch a few collision detection videos from the tutorial series
function detectCollision(ball, rect) {
  return (
    ball.x - ball.radius < rect.x + rect.width &&
    ball.x + ball.radius > rect.x &&
    ball.y - ball.radius < rect.y + rect.height &&
    ball.y + ball.radius > rect.y
  );
}

// Objects
// BALL OBJECT
function Ball(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = '#666666';

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = '#3F3F3F';
    c.fill();
    c.stroke();
    c.closePath();
  };

  this.update = function() {
    // Apply friction and gravity to the ball
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
      this.dx = this.dx * friction;
    } else {
      this.dy += gravity;
    }
    // Ball bouncing off walls/floor
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * friction;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}
// NET OBJECT
function Net(x, y, color) {
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 180;
  this.color = color;

  this.draw = function() {
    // Draw the net
    c.beginPath();
    c.lineWidth = '6';
    c.rect(this.x, this.y, this.width, this.height);
    c.strokeStyle = this.color;
    c.stroke();
  };
}
// CAR OBJECT
function Car(x, y, color) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.height = 30;
  this.width = 45;
  this.color = color;

  this.draw = function() {
    // Draw the body
    c.beginPath();
    c.lineWidth = '6';
    c.rect(this.x, this.y, this.width, this.height);
    c.strokeStyle = this.color;
    c.stroke();

    // Draw the wheels
    c.fillStyle = '#666666';
    c.beginPath();
    c.arc(this.x + 5, this.y + 30, 10, 0, 2 * Math.PI);
    c.fill();

    c.beginPath();
    c.arc(this.x + 40, this.y + 30, 10, 0, 2 * Math.PI);
    c.fill();
  };
  // Code adapted from ChatGPT code and modified to fit my use case.
  this.handleCollision = function() {
    // Check collision with the wall
    if (this.x + this.width >= canvas.width) {
      this.x = canvas.width - this.width;
    } else if (this.x <= 0) {
      this.x = 0;
    }
    // Check collision with the ball
    if (detectCollision(ball, this)) {
      // If the player is moving, update the ball's velocity
      if (this.dx !== 0) {
        // Give the ball some upward momentum
        ball.dy -= 0.2;

        // Update the ball's horizontal velocity based on player's velocity
        ball.dx += this.dx * 0.1;
      } else {
        // If the player is stationary, stop the ball
        ball.dx = 0;
      }
    }
  };

  this.update = function() {
    // Apply gravity to the car
    if (this.y + this.height + 10 < canvas.height) {
      this.dy += gravity;
      // Floor collision detection
    } else if (this.y + this.height + 10 >= canvas.height) {
      this.dy = 0;
    }
    // Add velocity
    this.y += this.dy;
    this.x += this.dx;
    this.handleCollision();
    this.draw();
  };
}
// Variables
let ball;
let netOne;
let netTwo;
let playerOne;
let playerTwo;

// Initialization
function init() {
  ball = new Ball(400, 560, (Math.random() - 0.5) * 0.5, 0, 30);
  netOne = new Net(20, canvas.height * 0.75, '#FC540C');
  netTwo = new Net(canvas.width - 25 - 20, canvas.height * 0.75, '#0E2BFC');
  playerOne = new Car(100, canvas.height - 50, '#FF660B');
  playerTwo = new Car(canvas.width - 100 - 45, canvas.height - 50, '#0D86FE');
}

// Keyboard Input
document.addEventListener('keydown', function(event) {
  // Player One controls (A + D)
  if (event.key === 'a') {
    playerOne.dx = -6;
  } else if (event.key === 'd') {
    playerOne.dx = 6;
  }

  // Player Two controls (Arrow keys)
  if (event.key === 'ArrowLeft') {
    playerTwo.dx = -6;
  } else if (event.key === 'ArrowRight') {
    playerTwo.dx = 6;
  }
});
// This function causes some weirdness in the player movemnet
document.addEventListener('keyup', function(event) {
  // Stop playerOne movement on key release
  if (event.key === 'a') {
    playerOne.dx = 0;
  } else if (event.key === 'd') {
    playerOne.dx = 0;
  }

  // Stop playerTwo movement on key release
  if (event.key === 'ArrowLeft') {
    playerTwo.dx = 0;
  } else if (event.key === 'ArrowRight') {
    playerTwo.dx = 0;
  }
});

// Player Score Trackers
let playerOneScore = 0;
let playerTwoScore = 0;
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Check collision with netOne
  if (detectCollision(ball, netOne)) {
    // Handle collision with netOne
    // Add score if ball goes in net
    playerOneScore++;
    // Reset game but maintain score
    init();
  }

  // Check collision with netTwo
  if (detectCollision(ball, netTwo)) {
    // Add score if ball goes in net
    // Handle collision with netTwo
    playerTwoScore++;
    // Reset game but maintain score
    init();
  }

  // Check collision with eachother
  // This code can break the game sometimes if the players overlap
  // Couldn't think of a better way and wanted to limit AI and stackoverflow usage
  if (playerOne.x + playerOne.width >= playerTwo.x) {
    playerOne.dx *= -1;
  }
  if (playerTwo.x <= playerOne.x + playerOne.width) {
    playerTwo.dx *= -1;
  }

  ball.update();
  playerOne.update();
  playerTwo.update();
  playerOne.handleCollision();
  playerTwo.handleCollision();
  netOne.draw();
  netTwo.draw();
  // PlayerOne Controls Display
  c.fillStyle = '#FC540C';
  c.font = '16px sans-serif';
  c.fillText('Player 1: Left = A, Right = D', 120, 25);
  // PlayerTwo Controls Display
  c.fillStyle = '#0D86FE';
  c.font = '16px sans-serif';
  c.fillText('Player 2: Left = ArrowLeft, Right = ArrowRight', canvas.width - 460, 25);
  // PlayerTwo Score Display
  c.fillStyle = '#FC540C';
  c.font = '30px sans-serif';
  c.fillText('Score:' + playerTwoScore, 5, 30);
  // PlayerOne Score Display
  c.fillStyle = '#0D86FE';
  c.font = '30px sans-serif';
  c.fillText('Score:' + playerOneScore, canvas.width - 120, 30);
}
init();
animate();

