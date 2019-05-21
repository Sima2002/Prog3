let LivingCreature = require("./LivingCreature")
module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 5;
        this.directions = [];
    }

    newDirections() {
        return super.newDirections();
    }
    chooseCell(t) {
        this.newDirections();
        return super.chooseCell(t);
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = Math.floor(Math.random(fundCords));
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = Math.floor(Math.random(fundCords));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiply >= 2) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = Math.floor(Math.random(fundCords));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norgishatich = new Predator(x, y);
            gishatichArr.push(norgishatich);

            matrix[y][x] = 3;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gishatichArr) {
            if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                gishatichArr.splice(i, 1);
                break;
            }
        }
    }
}    