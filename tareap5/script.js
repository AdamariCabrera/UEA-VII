let canvasSize = 600;
let shapes = []; // Array para almacenar nuestras formas

function setup() {
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('p5-canvas-container');

    colorMode(HSB, 360, 100, 100);
    background(0, 0, 95);


   
    for (let i = 0; i < 20; i++) {
        let size = random(30, 120);
        shapes.push({
            x: random(size / 2, width - size / 2),
            y: random(size / 2, height - size / 2),
            w: size,
            h: size * random(0.5, 1.5),
            type: random() < 0.5 ? 'rect' : 'ellipse',
            baseHue: random(360),
            isHovered: false,
            rotation: random(TWO_PI)
        });
    }
}

function draw() {
    background(0, 0, 95, 0.2);
    
    for (let shape of shapes) {
        let d = dist(mouseX, mouseY, shape.x, shape.y);
        let threshold = max(shape.w, shape.h) / 2;

        shape.isHovered = d < threshold;

        let currentHue = shape.baseHue;
        let currentBrightness = 80;

        if (shape.isHovered) {
            currentHue = (shape.baseHue + 180) % 360;
            currentBrightness = 100;
            noStroke();
        } else {
            currentBrightness = 70;

        }

        fill(currentHue, 80, currentBrightness, 0.9);

        push();
        translate(shape.x, shape.y);
        rotate(shape.rotation);

        if (shape.isHovered) {
            shape.rotation += 0.05;
            scale(1.05);
        }

        if (shape.type === 'rect') {
            rectMode(CENTER);
            rect(0, 0, shape.w, shape.h, 5);
        } else {
            ellipse(0, 0, shape.w, shape.h);
        }

        pop();
    }

    noStroke();
    fill(300, 100, 100, 0.8);
    ellipse(mouseX, mouseY, 15, 15);
}
