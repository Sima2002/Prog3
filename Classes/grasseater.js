let LivingCreature = require("./LivingCreature")
module.exports = class Eatgrass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 0;
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

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    eat() {
        var fundCords = this.chooseCell(1);
        var cord = Math.floor(Math.random(fundCords));

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.multiply == 2) {
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

            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
                break;
            }
        }
    }
}    