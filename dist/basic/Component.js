"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var Component = /** @class */ (function () {
    function Component(ctx, x, y, width, height, direction, color, shape) {
        if (color === void 0) { color = '#00FFFF'; }
        if (shape === void 0) { shape = 'square'; }
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.color = color;
        this.shape = shape;
        this.UID = Component.generateUID;
        Component.generateUID += 1;
        this.draw();
    }
    Component.prototype.draw = function () {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.width, this.height);
        var center = {
            x: this.x + this.width * 0.5,
            y: this.y + this.height * 0.5
        };
        this.ctx.translate(center.x, center.y);
        this.ctx.rotate((Math.PI / 180) * this.direction);
        this.ctx.translate(-center.x, -center.y);
        this.ctx.restore();
    };
    Component.prototype.move = function (direction, distence) {
        this.x += distence * Math.cos(direction);
        this.y += distence * Math.sin(direction);
    };
    Component.prototype.moveTo = function (x, y, distence) {
        var dx = x - this.x;
        var dy = y - this.y;
        var radian = Math.atan2(y, x);
    };
    Component.prototype.evaluation = function () { };
    Component.prototype.step = function () { };
    Component.prototype.clear = function () { };
    Component.prototype.update = function () {
        this.step();
        this.draw();
    };
    Component.generateUID = 0;
    return Component;
}());
exports.Component = Component;
