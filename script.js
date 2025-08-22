const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 200;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// Initialize stars
function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
}

// Resize canvas & reposition stars
function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Optionally, reinitialize stars to fit new canvas
  initStars();
}

window.addEventListener("resize", resizeCanvas);

let mouse = { x: canvasWidth / 2, y: canvasHeight / 2 };
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let star of stars) {
    star.x += star.vx + (mouse.x - canvasWidth / 2) * 0.00005;
    star.y += star.vy + (mouse.y - canvasHeight / 2) * 0.00005;

    // Wrap around
    if (star.x < 0) star.x = canvasWidth;
    if (star.x > canvasWidth) star.x = 0;
    if (star.y < 0) star.y = canvasHeight;
    if (star.y > canvasHeight) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

// subtle flicker
function flickerStars() {
  for (let star of stars) {
    star.radius += (Math.random() - 0.5) * 0.05;
    if (star.radius < 0.3) star.radius = 0.3;
    if (star.radius > 1.5) star.radius = 1.5;
  }
  setTimeout(flickerStars, 50);
}

// Initialize
resizeCanvas();
animate();
flickerStars();

// subtle flicker
for (let star of stars) {
  star.radius += (Math.random() - 0.5) * 0.05;
  if (star.radius < 0.3) star.radius = 0.3;
  if (star.radius > 1.5) star.radius = 1.5;
}

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
