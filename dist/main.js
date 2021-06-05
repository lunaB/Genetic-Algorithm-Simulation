/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/basic/Component.ts":
/*!********************************!*\
  !*** ./src/basic/Component.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nvar Component = /** @class */ (function () {\n    function Component(ctx, x, y, width, height, direction, color, shape) {\n        if (color === void 0) { color = '#00FFFF'; }\n        if (shape === void 0) { shape = 'square'; }\n        this.ctx = ctx;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.direction = direction;\n        this.color = color;\n        this.shape = shape;\n        this.UID = Component.generateUID;\n        Component.generateUID += 1;\n        this.draw();\n    }\n    Component.prototype.draw = function () {\n        this.ctx.save();\n        this.ctx.translate(this.x, this.y);\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(0, 0, this.width, this.height);\n        var center = {\n            x: this.x + this.width * 0.5,\n            y: this.y + this.height * 0.5\n        };\n        this.ctx.translate(center.x, center.y);\n        this.ctx.rotate((Math.PI / 180) * this.direction);\n        this.ctx.translate(-center.x, -center.y);\n        this.ctx.restore();\n    };\n    Component.prototype.move = function (direction, distence) {\n        this.x += distence * Math.cos(direction);\n        this.y += distence * Math.sin(direction);\n    };\n    Component.prototype.moveTo = function (x, y, distence) {\n        var dx = x - this.x;\n        var dy = y - this.y;\n        var radian = Math.atan2(y, x);\n    };\n    Component.prototype.evaluation = function () { };\n    Component.prototype.step = function () { };\n    Component.prototype.clear = function () { };\n    Component.prototype.update = function () {\n        this.step();\n        this.draw();\n    };\n    Component.generateUID = 0;\n    return Component;\n}());\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/basic/Component.ts?");

/***/ }),

/***/ "./src/basic/Simulator.ts":
/*!********************************!*\
  !*** ./src/basic/Simulator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Simulator\": () => (/* binding */ Simulator)\n/* harmony export */ });\nvar Simulator = /** @class */ (function () {\n    function Simulator(ctx, width, height, components) {\n        if (components === void 0) { components = {}; }\n        this.ctx = ctx;\n        this.width = width;\n        this.height = height;\n        this.components = components;\n        /* init */\n    }\n    Simulator.prototype.setComponents = function (components) {\n        if (components === void 0) { components = {}; }\n        this.components = components;\n    };\n    Simulator.prototype.add = function (name, component) {\n        if (!(name in this.components)) {\n            this.components[name] = [];\n        }\n    };\n    Simulator.prototype.update = function () {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        for (var k in this.components) {\n            for (var i = 0; i < this.components[k].length; i++) {\n                var component = this.components[k][i];\n                component.update();\n            }\n        }\n    };\n    return Simulator;\n}());\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/basic/Simulator.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _basic_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basic/Component */ \"./src/basic/Component.ts\");\n/* harmony import */ var _basic_Simulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic/Simulator */ \"./src/basic/Simulator.ts\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    var canvas = document.getElementById(\"canvas\");\n    var ctx = canvas.getContext(\"2d\");\n    var FPS = 30;\n    var option = {\n        width: 800,\n        height: 600\n    };\n    /* component draw */\n    var test = new _basic_Component__WEBPACK_IMPORTED_MODULE_0__.Component(ctx, 100, 20, 20, 20, 0);\n    // test.draw()\n    /* component simulate */\n    var simulator = new _basic_Simulator__WEBPACK_IMPORTED_MODULE_1__.Simulator(ctx, option.width, option.height);\n    simulator.add('test unit', test);\n});\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/index.ts?");

/***/ })

/******/ 	});
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;