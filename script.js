let h = 50;
let w = 50;
let matrix = [];
let socket = io();
let side = 15;

function setup() {
    frameRate(5);
        for (let y = 0; y < h; y++) {
            matrix[y] = [];
            for (let x = 0; x < w; x++) {
                let rand = random(100);
                let index = 0;
                if (rand < 30) index = 0;
                else if (rand < 55) index = 1;
                else if (rand < 75) index = 2;
                else if (rand < 95) index = 3;
                else if (rand < 99) index = 4;
                else if (rand < 99.9) index = 5;
                // else if (rand <= 100) index = 6;
                matrix[y][x] = index;               
                }
        }
    
    // let grassCount = document.getElementById('grassCount');
    // let grassEaterCount = document.getElementById('grassEaterCount');
    // let predatorCount = document.getElementById('predatorCount');
    // let waterCount = document.getElementById('water');
    // let peopleCount = document.getElementById('people');

socket.on("data", creating);

function creating(data) {
    matrix = data.matrix;
    background('#acacac');
    createCanvas(matrix[0].length * side, matrix.length * side);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
}
}