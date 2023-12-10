var canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = window.innerWidth;
canvas.height = window.innerWidth;


var context = canvas.getContext('2d');


var mouseX = 0;


document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX / window.innerWidth; 
});


var birdCount = 5;
var birdSize = 5;
var birdSpeed = 2;


var birds = [];


for (var i = 0; i < birdCount; i++) {
    birds[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        speed: birdSpeed + Math.random() * birdSpeed
    };
}

function drawBird(bird) {
    context.beginPath();
    context.arc(bird.x, bird.y, birdSize, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
}

function updateBird(bird) {
    bird.x = (bird.x + bird.speed) % canvas.width;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var mountainColors = [getRandomColor(), getRandomColor(), getRandomColor()];

function drawSun() {
    context.beginPath();
    context.arc(canvas.width * 0.8, canvas.height * 0.2, 50, 0, Math.PI * 2);
    context.fillStyle = 'yellow';
    context.fill();
}

function drawSunRays() {
    var rayLength = 70;
    var rayCount = 12;
    var sunX = canvas.width * 0.8;
    var sunY = canvas.height * 0.2;

    for (var i = 0; i < rayCount; i++) {
        var angle = (i / rayCount) * Math.PI * 2;
        var endX = sunX + rayLength * Math.cos(angle);
        var endY = sunY + rayLength * Math.sin(angle);

        context.beginPath();
        context.moveTo(sunX, sunY);
        context.lineTo(endX, endY);
        context.strokeStyle = 'yellow';
        context.lineWidth = 2;
        context.stroke();
    }
}

function drawGrass() {
    var grassHeight = 20;
    var grassWidth = 10;
    for (var i = 0; i < canvas.width; i += grassWidth) {
        for (var j = canvas.height * 0.7; j < canvas.height; j += grassHeight) {
            context.beginPath();
            context.moveTo(i, j);
            context.lineTo(i + grassWidth / 2, j - grassHeight);
            context.lineTo(i + grassWidth, j);
            context.closePath();
            context.fillStyle = 'green';
            context.fill();
        }
    }
}


function drawRectangle(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}


function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
}


function drawClouds() {
    var cloudRadius = 20;
    var cloudSpacing = 50;

    
    for (var i = 0; i < 3; i++) {
        context.beginPath();
        context.arc(i * canvas.width / 4 + cloudSpacing, canvas.height * 0.2, cloudRadius, 0, Math.PI * 2);
        context.arc(i * canvas.width / 4 + cloudSpacing * 2, canvas.height * 0.2 - cloudRadius, cloudRadius, 0, Math.PI * 2);
        context.arc(i * canvas.width / 4 + cloudSpacing * 3, canvas.height * 0.2, cloudRadius, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
        context.closePath();
    }
}


function drawTree(x, y) {
    var trunkHeight = 50;
    var trunkWidth = 10;
    var canopyRadius = 30;

   
    drawRectangle(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight, 'brown');

    
    drawCircle(x, y - trunkHeight - canopyRadius, canopyRadius, 'green');
}


function animate() {
    
    var moveAmount = 10;
    canvas.style.marginLeft = mouseX * moveAmount + 'px';

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'lightblue'; 
    context.fillRect(0, 0, canvas.width, canvas.height * 2); 
    drawSun();
    drawSunRays();
    context.fillStyle = 'lightgreen';
    context.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
    drawGrass();
    drawClouds();
    context.fillStyle = mountainColors[0];
    context.beginPath();
    context.moveTo(canvas.width / 4, canvas.height * 0.7);
    context.lineTo(3 * canvas.width / 4, canvas.height * 0.7);
    context.lineTo(canvas.width / 2, canvas.height * 0.5);
    context.closePath();
    context.fill();
    for (var i = 0; i < 3; i += 2) {
        context.fillStyle = mountainColors[i / 2 + 1];
        context.beginPath();
        context.moveTo(i * canvas.width / 4, canvas.height * 0.7);
        context.lineTo((i + 2) * canvas.width / 4, canvas.height * 0.7);
        context.lineTo((i + 1) * canvas.width / 4, canvas.height * 0.5);
        context.closePath();
        context.fill();
    }
    for (var i = 0; i < 7; i++) {
        drawTree((i + 1) * canvas.width / 8, canvas.height * 0.7);
    }
    for (var i = 0; i < birdCount; i++) {
        drawBird(birds[i]);
        updateBird(birds[i]);
    }
    requestAnimationFrame(animate);
}


animate();

