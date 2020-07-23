const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const grid = 15;
const platformHeight = grid * 7;
const maxPlatformY = canvas.height - grid - platformHeight;
let platformSpeed = 6;
let ballSpeed = 5;

const leftPlatform = {
  x: grid,
  y: canvas.height / 2 - platformHeight / 2,
  width: grid / 2,
  height: platformHeight,
  dy: 0
};

const rightPlatform = {
  x: canvas.width - grid * 2,
  y: canvas.height / 2 - platformHeight / 2,
  width: grid / 2,
  height: platformHeight,
  dy: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: grid,
  height: grid,
  resetting: false,
  dx: ballSpeed,
  dy: -ballSpeed
};

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
  obj1.x + obj1.width > obj2.x &&
  obj1.y < obj2.y + obj2.height &&
  obj1.y + obj1.height > obj2.y;
}

function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);
  leftPlatform.y += leftPlatform.dy;
  rightPlatform.y += rightPlatform.dy;
  if (leftPlatform.y < grid) {
    leftPlatform.y = grid;
  } else if (leftPlatform.y > maxPlatformY) {
    leftPlatform.y = maxPlatformY;
}

if (rightPlatform.y < grid) {
  rightPlatform.y = grid;
} else if (rightPlatform.y > maxPlatformY) {
 rightPlatform.y = maxPlatformY;
}

context.fillStyle = 'white';
context.fillRect(leftPlatform.x, leftPlatform.y, leftPlatform.width, leftPlatform.height);
context.fillRect(rightPlatform.x, rightPlatform.y, rightPlatform.width, rightPlatform.height);

ball.x += ball.dx;
ball.y += ball.dy;

if (ball.y < grid) {
  ball.y = grid;
  ball.dy *= -1;
} else if (ball.y + grid > canvas.height - grid) {
  ball.y = canvas.height - grid * 2;
  ball.dy *= -1;
}

if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
  ball.resetting = true;
  setTimeout(() => {
    ball.resetting = false;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }, 1000);
}

if (collides(ball, leftPlatform)) {
  ball.dx *= -1;
  ball.x = leftPlatform.x + leftPlatform.width;
} else if (collides(ball, rightPlatform)) {
  ball.dx *= -1;
  ball.x = rightPlatform.x - ball.width;
}

context.fillRect(ball.x, ball.y, ball.width, ball.height);

context.fillStyle = 'lightgrey';
context.fillRect(0, 0, canvas.width, grid);
context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
for (let i = grid; i < canvas.height - grid; i += grid * 2) {
}

document.addEventListener('keydown', function(e) {

if (e.which === 38) {
  rightPlatform.dy = -platformSpeed;
  leftPlatform.dy = -platformSpeed;
} else if (e.which === 40) {
  rightPlatform.dy = platformSpeed;
  leftPlatform.dy = platformSpeed;
}
});
document.addEventListener('keyup', function(e) {
if (e.which === 38 || e.which === 40) {
  rightPlatform.dy = 0;
  leftPlatform.dy = 0;
}

  });
    }

requestAnimationFrame(loop);