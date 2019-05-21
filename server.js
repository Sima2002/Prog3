var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
eatArr = [];
gishatichArr = [];
jurArr = [];
mardArr = [];

let matrix = [];
// let random = require('./Classes/random');
// function matrixGenerator(matrixSize, grassArr, eatArr, gishatichArr, jurArr, mardArr) {
//     for (let y = 0; y < matrixSize; y++) {
//         matrix[y] = [];
//         for (let x = 0; x < matrixSize; x++) {
//             matrix[y][x] = 0;
//         }
//     }
//     for (let y = 0; y < grassArr; y++) {
//         let customX = Math.floor(Math.random(matrixSize)); // 0 - 39
//         let customY = Math.floor(Math.random(matrixSize));
//         matrix[customY][customX] = 1;
//     }
//     for (let y = 0; y < eatArr; y++) {
//         let customX = Math.floor(Math.random(matrixSize));
//         let customY = Math.floor(Math.random(matrixSize));
//         matrix[customY][customX] = 2;
//     }
//     for (let y = 0; y < gishatichArr; y++) {
//         let customX = Math.floor(Math.random(matrixSize));
//         let customY = Math.floor(Math.random(matrixSize));
//         matrix[customY][customX] = 3;
//     }
//     for (let y = 0; y < jurArr; y++) {
//         let customX = Math.floor(Math.random(matrixSize));
//         let customY = Math.floor(Math.random(matrixSize));
//         matrix[customY][customX] = 4;
//     }
//     for (let y = 0; y < mardArr; y++) {
//         let customX = Math.floor(Math.random(matrixSize));
//         let customY = Math.floor(Math.random(matrixSize));
//         matrix[customY][customX] = 5;
//     }
// }
// matrixGenerator(10, 5, 1);


let Grass = require("./Classes/grass.js");
let Eatgrass = require("./Classes/grasseater.js");
let Predator = require("./Classes/predator.js");
let Jur = require("./Classes/water.js");
let Mard = require("./Classes/people.js");


function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new Eatgrass(x, y);
                eatArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                gishatichArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let norjur = new Jur(x, y);
                jurArr.push(norjur);
            }
            else if (matrix[y][x] == 5) {
                let mard = new Mard(x, y);
                mardArr.push(mard);
            }
        }
    }
}
creatingObjects();


function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (eatArr[0] !== undefined) {
        for (var i in eatArr) {
            eatArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (jurArr[0] !== undefined) {
        for (var i in jurArr) {
            jurArr[i].move();
        }
    }
    if (mardArr[0] !== undefined) {
        for (var i in mardArr) {
            mardArr[i].eat();
        }
    }
    let sendData = {
        matrix: matrix
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)