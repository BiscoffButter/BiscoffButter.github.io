const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = (Math.random() - 0.5) * 4;
        this.velocityY = (Math.random() - 0.5) * 4;
        this.isDragging = false;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!this.isDragging) {
            this.x += this.velocityX;
            this.y += this.velocityY;

            // Bounce off walls
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.velocityY = -this.velocityY;
            }
        }

        this.draw();
    }

    containsPoint(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.radius;
    }
}

const balls = [];
const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#fd79a8', '#00b894'];

// Spawn 20 random balls
for (let i = 0; i < 20; i++) {
    const radius = Math.random() * 30 + 20;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    balls.push(new Ball(x, y, radius, color));
}

let draggedBall = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].containsPoint(x, y)) {
            draggedBall = balls[i];
            draggedBall.isDragging = true;
            dragOffsetX = x - draggedBall.x;
            dragOffsetY = y - draggedBall.y;

            // Move dragged ball to end of array so it renders on top
            balls.splice(i, 1);
            balls.push(draggedBall);
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (draggedBall) {
        const rect = canvas.getBoundingClientRect();
        draggedBall.x = e.clientX - rect.left - dragOffsetX;
        draggedBall.y = e.clientY - rect.top - dragOffsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    if (draggedBall) {
        draggedBall.isDragging = false;
        draggedBall = null;
    }
});

canvas.addEventListener('mouseleave', () => {
    if (draggedBall) {
        draggedBall.isDragging = false;
        draggedBall = null;
    }
});

// Touch support for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    for (let i = balls.length - 1; i >= 0; i--) {
        if (balls[i].containsPoint(x, y)) {
            draggedBall = balls[i];
            draggedBall.isDragging = true;
            dragOffsetX = x - draggedBall.x;
            dragOffsetY = y - draggedBall.y;

            balls.splice(i, 1);
            balls.push(draggedBall);
            break;
        }
    }
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (draggedBall) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draggedBall.x = touch.clientX - rect.left - dragOffsetX;
        draggedBall.y = touch.clientY - rect.top - dragOffsetY;
    }
});

canvas.addEventListener('touchend', () => {
    if (draggedBall) {
        draggedBall.isDragging = false;
        draggedBall = null;
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();
    });

    requestAnimationFrame(animate);
}

animate();
