let rows = 55;
let columns = 70;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

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

// let obj = {
//     'season': "summer",
//     'matrix': matrix,
// }
season = "summer"
time = 0;
function game() {
    time++
    if (time % 7 == 0)
    {
        if (season == "summer")
        season = "winter"
    
    else if (season == "winter")
    {
        season = "autumn"
    }
    else if (season == "autumn")
    {
        season = "summer"
    }
    else {
        time = 0;
    }
}


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
        matrix: matrix,
        season: season
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)

// var statistics = {};
//  setInterval(function(){
//      statistics.xArr = grassArr.length;
//      statistics.eArr = eatArr.length;

//     fs.writeFile("statistics.json", JSON.stringify(statistics))
//  },10)

// var stats = { };
//     setInterval(function(){
//         stats.xArr = grassArr.length;
//         stats.eArr = eatArr.length;
//         fs.writeFile("stats.json", JSON.stringify(stats))
//     },10)

io.on('connection', function (socket) {
    socket.on('pushgrass', function () {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y))
            }
        }
    })
    socket.on('pushGrassEater', function () {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
            matrix[y][x] = 2;
            eatArr.push(new grassEater(x, y))
            }
        }
    })
    socket.on('pushPeople', function () {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 0) {
            matrix[y][x] = 5;
            mardArr.push(new Mard(x, y))
            }
        }
    })
    socket.on('killeater', function () {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] = 2) {
            matrix[y][x] = 0;
            }
        }
    })
    socket.on("send stats", function (data) {
        stats.push(data);
        fs.writeFile('public/stats.json', JSON.stringify(stats));
        
    });
})

