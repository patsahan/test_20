let canvas = document.querySelector("#canvas-animation");
const ctx = canvas.getContext("2d");
const image = document.querySelector("#source");


const player = {
    x: 20, 
    y: 200,
    w: 60,
    h: 50,
    speed: 4,
    dx: 0,
    dy: 0,
    angle:0,
    newPos: function(){
        this.x += this.dx;
        this.y += this.dy;
        this.detectBorder();
        if (this.dx>0 && this.dy==0){
            this.angle = 0
        } else if (this.dx<0 && this.dy==0){
            this.angle = 180;
        } else if (this.dy<0 && this.dx==0) {
            this.angle = 270 ;
        }
        else if (this.dy>0 && this.dx==0) {
            this.angle = 90;
        } else {}
        drawRotate(this.angle);
    },
    moveRight: function(){
        player.dx = player.speed;
    },
    moveLeft: function(){
        player.dx = -player.speed;
    },

    moveUp: function(){
        player.dy = -player.speed;
    },
    moveDown: function(){
        player.dy = player.speed;
    },
    detectBorder: function (){
        if (this.x < 0){
            this.x = 0;
        }
        if (this.y < 0) {
            this.y =0;
        }

        if (this.x + this.w > canvas.width ){
            this.x = canvas.width - this.w;
        }

        if (this.y + this.h > canvas.height ){
            this.y = canvas.height - this.h;
        }
    }
}



function drawRotate(deg=0){
    console.log(deg);
    clear();
    // Зберігаємо попередній контекст
    ctx.save();

    //Переміщаємо координатну сітку в центр корабля
    ctx.translate(player.x + player.w, player.y + player.h);

    //Rotating
    ctx.rotate(deg*Math.PI/180);

    // Image show
    ctx.drawImage(image, 0, 0, player.w, player.h);
    
    //Відновлюємо координати і всі налаштування контексту
    ctx.restore();
}


function drawPlayer(){
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}


function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


// Точка входу анімації
function update() {
    // Очищаємо канву
    clear();
    //drawPlayer();

    // Оновлюємо позицію корабля
    player.newPos();
    // Формуємо наступний фрейм
    requestAnimationFrame(update);
}
// Формуємо наступний фрейм
requestAnimationFrame(update);





// EVENT LIsTENERs

document.addEventListener("keydown", (e)=>{
    
    if (e.key === "ArrowRight"){
        player.moveRight();
    } else if (e.key ==="ArrowLeft"){
        player.moveLeft();
    } else if (e.key ==="ArrowUp"){
        player.moveUp();
    } else if (e.key ==="ArrowDown"){
        player.moveDown();
    }
});


document.addEventListener("keyup", (e)=>{
    if (e.key === "ArrowRight" || e.key ==="ArrowLeft") {
        player.dx = 0;
    }

    if (e.key === "ArrowUp" || e.key ==="ArrowDown") {
        player.dy = 0;
    }
})