let LivingCreature = require("./LivingCreature");
let random = require('./random');
module.exports = class Mard extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.multiply = 3;
        this.energy = 3;
    }

    newDirections() {
        return super.newDirections();
    }
    chooseCell(t) {
        this.newDirections();
        return super.chooseCell(t);
    }
    move() {
        var foundCords1 = this.chooseCell(0);
        var foundCords2 = this.chooseCell(1);
        var foundCords = foundCords1.concat(foundCords2);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 1;
            }
            this.x = x;
            this.y = y;
        }
        //console.log(this.multiply);

    }
    eat() {
        var fundCords = this.chooseCell(3);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in gishatichArr) {
                if (x == gishatichArr[i].x && y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            if (this.multiply == 20) {
                this.mul()
                this.multiply = 0;
            }

        } else {
            this.move();
            this.energy++;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norMard = new Mard(x, y);
            mardArr.push(norMard);

            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in mardArr) {
            if (this.x == mardArr[i].x && this.y == mardArr[i].y) {
                mardArr.splice(i, 1);
                break;
            }
        }
    }
}