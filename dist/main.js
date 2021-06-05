/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
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



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basic_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var FPS = 60;
    var width = 800;
    var height = 600;
    var test = new _basic_Component__WEBPACK_IMPORTED_MODULE_0__.Component(ctx, 0, 0, 10, 10, 0);
    test.draw();
});

})();

/******/ })()
;