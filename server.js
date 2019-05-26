let rows = 55;
let columns = 70;
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

matrix = [];


for (let y = 0; y < rows; y++) {
    matrix[y] = [];
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 10) {
            matrix[y][x] = 0;
        }
        if (a >= 10 && a < 30) {
            matrix[y][x] = 1;
        }
        else if (a >= 30 && a < 80) {
            matrix[y][x] = 2;
        }
        else if (a >= 80 && a < 87) {
            matrix[y][x] = 3;
        }
        else if (a >= 87 && a < 99) {
            matrix[y][x] = 4;
        }
        else if (a >= 99 && a < 100) {
            matrix[y][x] = 5;
        }
    }
}


let Grass = require('./Classes/grass.js');
let Eatgrass = require('./Classes/grasseater.js');
let Predator = require('./Classes/predator.js');
let Jur = require('./Classes/water.js');
let Mard = require('./Classes/people.js');


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