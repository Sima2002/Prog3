let LivingCreature = require("./LivingCreature")
module.exports = class Jur extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.multiply = 0;
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

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 1;
            grassArr.push(new Grass(this.x, this.y))

            this.x = x;
            this.y = y;
        }
    }
}
