var socket = io();
var side = 13;
var season = "Summer";
var seasonCount = 0;
// var explosionCount = 0;

// var weather = document.getElementById("weather")
// weather.innerHTML = season;


function setup() {
    frameRate(5);
    }    
    
socket.on("data", creating);

function creating(data) {
    if (frameCount % 60 == 0) {
        stats = {
            "frameCount": frameCount,
            "seasons": seasonCount,
            "grassC": grassArr.length,
            "eatC": eatArr.length,
            "predatorC": gishatichArr.length,
            "waterC": jurArr.length,
            "peopleC": mardArr.length,
            // "explosionC": explosionCount,
        }
        socket.emit("send stats", stats);
    }

    matrix = data.matrix;
    noStroke();
    background('#acacac');
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (season == "summer"){
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if (season == "winter"){
                    fill('#93a090');
                    rect(x * side, y * side, side, side);
                }
                else if (season == "autumn"){
                    fill('#1d5111');
                    rect(x * side, y * side, side, side);
                }    
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                if (season == "summer"){
                    fill("yellow");
                    rect(x * side, y * side, side, side);
                }
                else if (season == "winter"){
                    fill('#5b4e17');
                    rect(x * side, y * side, side, side);
                }
                else if (season == "autumn"){
                    fill('#ba9c1d');
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 3) {
                if (season == "summer"){
                    fill("red");
                    rect(x * side, y * side, side, side);
                }
                else if (season == "winter"){
                    fill('#913025');
                    rect(x * side, y * side, side, side);
                }   
                else if (season == "autumn"){
                    fill('#5e0e05');
                    rect(x * side, y * side, side, side);
                }
            }
        
            else if (matrix[y][x] == 4) {
                if (season == "summer"){
                    fill("blue");
                    rect(x * side, y * side, side, side);
                }
                else if (season == "winter"){
                    fill('#5672ff');
                    rect(x * side, y * side, side, side);
                }   
                else if (season == "autumn"){
                    fill('#001584');
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            // if (matrix[y][x] == 1 && season == "summer") {
            //     fill("green");
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 1 && season == "winter"){
            //     fill('#93a090');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 1 && season == "autumn"){
            //     fill('#1d5111');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 2 && season == "summer"){
            //     fill("yellow");
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 2 && season == "winter"){
            //     fill('#5b4e17');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 2 && season == "autumn"){
            //     fill('#ba9c1d');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 3 && season == "summer") {
            //     fill("red");
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 3 && season == "winter"){
            //     fill('#913025');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 3 && season == "autumn"){
            //     fill('#5e0e05');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 4 && season == "summer") {
            //     fill("blue");
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 4 && season == "winter"){
            //     fill('#5672ff');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 4 && season == "autumn"){
            //     fill('#001584');
            //     rect(x * side, y * side, side, side);
            // }
            // if (matrix[y][x] == 5) {
            // fill("black");
            // rect(x * side, y * side, side, side);
            // }
        }
    }
}

function pushgrass()
{
    socket.emit('pushgrass');
}
function pushGrassEater()
{
    socket.emit('pushGrassEater');
}
function pushPeople()
{
    socket.emit('pushPeople');
}
function killGrassEater()
{
    socket.emit('killeater');
}