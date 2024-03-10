class Bullet {
    constructor(x, y, speed, angle, ctx) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.ctx = ctx;
        this.width = 10;
        this.height = 5;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed * Math.cos(this.angle * Math.PI / 180); 
        this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
        this.draw();
    }
}

const bullets = [];

document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        const bullet = new Bullet(player.x + player.w, player.y + player.h / 2, 5, player.angle, ctx); 
        bullets.push(bullet);
    }
});

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.x + bullet.width > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

function update() {
    clear();
    player.newPos();
    updateBullets();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
