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

/***/ "./src/Basic/Component.ts":
/*!********************************!*\
  !*** ./src/Basic/Component.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nvar Component = /** @class */ (function () {\n    function Component(ctx, x, y, width, height, direction, color, shape) {\n        if (color === void 0) { color = '#00FFFF'; }\n        if (shape === void 0) { shape = 'square'; }\n        this.ctx = ctx;\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.direction = direction;\n        this.color = color;\n        this.shape = shape;\n        this.UID = Component.generateUID;\n        Component.generateUID += 1;\n        this.draw();\n    }\n    Component.prototype.draw = function () {\n        this.ctx.save();\n        this.ctx.translate(this.x, this.y);\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(0, 0, this.width, this.height);\n        var center = {\n            x: this.x + this.width * 0.5,\n            y: this.y + this.height * 0.5\n        };\n        this.ctx.translate(center.x, center.y);\n        this.ctx.rotate((Math.PI / 180) * this.direction);\n        this.ctx.translate(-center.x, -center.y);\n        this.ctx.restore();\n    };\n    Component.prototype.move = function (direction, distence) {\n        this.x += distence * Math.cos(direction);\n        this.y += distence * Math.sin(direction);\n    };\n    Component.prototype.moveTo = function (x, y, distence) {\n        var dx = x - this.x;\n        var dy = y - this.y;\n        var radian = Math.atan2(y, x);\n    };\n    Component.prototype.evaluation = function () { };\n    Component.prototype.step = function () { };\n    Component.prototype.clear = function () { };\n    Component.prototype.update = function () {\n        this.step();\n        this.draw();\n    };\n    Component.generateUID = 0;\n    return Component;\n}());\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Component.ts?");

/***/ }),

/***/ "./src/Basic/Components/Bacteria/BacteriaGene.ts":
/*!*******************************************************!*\
  !*** ./src/Basic/Components/Bacteria/BacteriaGene.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BacteriaGene\": () => (/* binding */ BacteriaGene)\n/* harmony export */ });\n/* harmony import */ var _Gene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Gene */ \"./src/Basic/Gene.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\nvar BacteriaGene = /** @class */ (function (_super) {\n    __extends(BacteriaGene, _super);\n    function BacteriaGene(chromosome_size, chromosome) {\n        if (chromosome === void 0) { chromosome = []; }\n        var _this = _super.call(this, chromosome_size, ['A', 'G', 'C', 'T'], chromosome) || this;\n        _this.move_system = [];\n        return _this;\n        /* init */\n    }\n    // override\n    BacteriaGene.prototype.initSystem = function () {\n        var start = false;\n        var ms_tmp = [];\n        for (var i = 2; i < this.chromosome.length; i++) {\n            // push\n            if (start) {\n                ms_tmp.push(this.chromosome[i]);\n            }\n            // movement system start [A, G, C]\n            else if (this.chromosome[i - 2] == 'A' &&\n                this.chromosome[i - 1] == 'G' &&\n                this.chromosome[i] == 'C') {\n                start = true;\n            }\n        }\n        // drop odd\n        if (ms_tmp.length % 2 != 0) {\n            ms_tmp.pop();\n        }\n        // pair set\n        while (ms_tmp.length) {\n            var sp = ms_tmp.splice(0, 2);\n            var ms = [0, 0];\n            if (sp[0] == 'A')\n                ms[0] = 0;\n            else if (sp[0] == 'G')\n                ms[0] = 90;\n            else if (sp[0] == 'C')\n                ms[0] = 180;\n            else if (sp[0] == 'T')\n                ms[0] = 270;\n            if (sp[1] == 'A')\n                sp[1] = ms[1] = 1;\n            else if (sp[1] == 'G')\n                ms[1] = 0.9;\n            else if (sp[1] == 'C')\n                ms[1] = 0.8;\n            else if (sp[1] == 'T')\n                ms[1] = 0.7;\n            this.move_system.push(ms);\n        }\n        console.log(this.move_system);\n    };\n    return BacteriaGene;\n}(_Gene__WEBPACK_IMPORTED_MODULE_0__.Gene));\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Components/Bacteria/BacteriaGene.ts?");

/***/ }),

/***/ "./src/Basic/Components/Bacteria/index.ts":
/*!************************************************!*\
  !*** ./src/Basic/Components/Bacteria/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Basic_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Basic/Component */ \"./src/Basic/Component.ts\");\n/* harmony import */ var _BacteriaGene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BacteriaGene */ \"./src/Basic/Components/Bacteria/BacteriaGene.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar Bacteria = /** @class */ (function (_super) {\n    __extends(Bacteria, _super);\n    function Bacteria(ctx, simulator, speed, x, y, width, height, direction, color, shape) {\n        if (color === void 0) { color = '#00FFFF'; }\n        if (shape === void 0) { shape = 'square'; }\n        var _this = _super.call(this, ctx, x, y, width, height, direction, color, shape) || this;\n        _this.simulator = simulator;\n        _this.speed = speed;\n        /* init */\n        _this.gene = new _BacteriaGene__WEBPACK_IMPORTED_MODULE_1__.BacteriaGene(30);\n        _this.move_iter = 0;\n        _this.fullness = 0;\n        return _this;\n    }\n    // override\n    Bacteria.prototype.evaluation = function () {\n        var res = this.fullness;\n        return res;\n    };\n    Bacteria.prototype.step = function () {\n        // move system\n        if (this.gene.move_system.length) {\n            if (this.move_iter == this.gene.move_system.length) {\n                this.move_iter = 0;\n            }\n            var ms = this.gene.move_system[this.move_iter];\n            var direction = ms[0];\n            var speed_rate = ms[1];\n            _super.prototype.move.call(this, direction, this.speed * speed_rate);\n            this.move_iter += 1;\n        }\n        // phagocytosis\n        // 한 step에 한개만 먹을 수 있슴\n        if ('Food' in this.simulator.components) {\n            for (var i = 0; i < this.simulator.components['Food'].length; i++) {\n                var food = this.simulator.components['Food'][i];\n                if (this.x < food.x + food.width &&\n                    this.x + this.width > food.x &&\n                    this.y < food.y + food.height &&\n                    this.y + this.height > food.y) {\n                    this.fullness += 1;\n                    this.simulator.components['Food'].splice(i, 1);\n                    break;\n                }\n            }\n        }\n    };\n    // override\n    Bacteria.prototype.clear = function () {\n        this.fullness = 0;\n    };\n    return Bacteria;\n}(_Basic_Component__WEBPACK_IMPORTED_MODULE_0__.Component));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bacteria);\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Components/Bacteria/index.ts?");

/***/ }),

/***/ "./src/Basic/Gene.ts":
/*!***************************!*\
  !*** ./src/Basic/Gene.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Gene\": () => (/* binding */ Gene)\n/* harmony export */ });\nvar Gene = /** @class */ (function () {\n    function Gene(chromosome_size, chromosome_base, chromosome) {\n        if (chromosome === void 0) { chromosome = []; }\n        this.chromosome_size = chromosome_size;\n        this.chromosome_base = chromosome_base;\n        this.chromosome = chromosome;\n        /* init */\n    }\n    Gene.prototype.initRandom = function () {\n        for (var i = 0; i < this.chromosome_size; i++) {\n            var base = Math.floor(Math.random() * this.chromosome_base.length);\n            this.chromosome.push(this.chromosome_base[base]);\n        }\n        this.initSystem();\n    };\n    Gene.prototype.setChromosome = function (chromosome) {\n        this.chromosome = chromosome;\n        this.initSystem();\n    };\n    return Gene;\n}());\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Gene.ts?");

/***/ }),

/***/ "./src/Basic/Simulator.ts":
/*!********************************!*\
  !*** ./src/Basic/Simulator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Simulator\": () => (/* binding */ Simulator)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar Simulator = /** @class */ (function () {\n    function Simulator(ctx, width, height, components) {\n        if (components === void 0) { components = {}; }\n        this.ctx = ctx;\n        this.width = width;\n        this.height = height;\n        this.components = components;\n        /* init */\n    }\n    Simulator.prototype.setComponents = function (components) {\n        if (components === void 0) { components = {}; }\n        this.components = components;\n    };\n    Simulator.prototype.add = function (name, component) {\n        if (!(name in this.components)) {\n            this.components[name] = [];\n        }\n        this.components[name].push(component);\n    };\n    // step\n    Simulator.prototype.step = function () {\n        for (var k in this.components) {\n            for (var i = 0; i < this.components[k].length; i++) {\n                var component = this.components[k][i];\n                component.step(); // no draw\n            }\n        }\n    };\n    // step -> simulate\n    Simulator.prototype.simulate = function (step_cnt) {\n        if (step_cnt === void 0) { step_cnt = 1000; }\n        for (var i = 0; i < step_cnt; i++) {\n            this.step();\n        }\n    };\n    // update\n    Simulator.prototype.update = function () {\n        this.ctx.clearRect(0, 0, this.width, this.height);\n        for (var k in this.components) {\n            for (var i = 0; i < this.components[k].length; i++) {\n                var component = this.components[k][i];\n                component.update(); // draw\n            }\n        }\n    };\n    // update -> test\n    Simulator.prototype.test = function (step_cnt, FPS) {\n        if (step_cnt === void 0) { step_cnt = 1000; }\n        if (FPS === void 0) { FPS = 30; }\n        return __awaiter(this, void 0, void 0, function () {\n            var step;\n            var _this = this;\n            return __generator(this, function (_a) {\n                step = 0;\n                return [2 /*return*/, new Promise(function (resolve, reject) {\n                        var interval = setInterval(function () {\n                            _this.update(); // draw\n                            step += 1;\n                            if (step > step_cnt) {\n                                clearInterval(interval);\n                                resolve(null);\n                            }\n                        }, FPS);\n                    })];\n            });\n        });\n    };\n    Simulator.prototype.clear = function () {\n        this.components = {};\n    };\n    return Simulator;\n}());\n\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Simulator.ts?");

/***/ }),

/***/ "./src/Basic/Util.ts":
/*!***************************!*\
  !*** ./src/Basic/Util.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    random: function (min, max) {\n        return Math.random() * (max - min) + min;\n    },\n    randomInt: function (min, max) {\n        return Math.floor(this.random(min, max));\n    }\n});\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/Basic/Util.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Basic_Simulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Basic/Simulator */ \"./src/Basic/Simulator.ts\");\n/* harmony import */ var _Basic_Components_Bacteria__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Basic/Components/Bacteria */ \"./src/Basic/Components/Bacteria/index.ts\");\n/* harmony import */ var _Basic_Util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Basic/Util */ \"./src/Basic/Util.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () { return __awaiter(void 0, void 0, void 0, function () {\n    var canvas, ctx, FPS, option, simulator, i, width, height, x, y, bacteria;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                canvas = document.getElementById(\"canvas\");\n                ctx = canvas.getContext(\"2d\");\n                FPS = 30;\n                option = {\n                    width: 800,\n                    height: 600\n                };\n                simulator = new _Basic_Simulator__WEBPACK_IMPORTED_MODULE_0__.Simulator(ctx, option.width, option.height);\n                for (i = 0; i < 10; i++) {\n                    width = 20;\n                    height = 20;\n                    x = _Basic_Util__WEBPACK_IMPORTED_MODULE_2__.default.random(0, option.width - width);\n                    y = _Basic_Util__WEBPACK_IMPORTED_MODULE_2__.default.random(0, option.height - height);\n                    bacteria = new _Basic_Components_Bacteria__WEBPACK_IMPORTED_MODULE_1__.default(ctx, simulator, 5, x, y, width, height, 2, \"#FBCEB1\");\n                    bacteria.gene.initRandom();\n                    simulator.add('Bacteria', bacteria);\n                }\n                /* test */\n                return [4 /*yield*/, simulator.test(200, FPS)];\n            case 1:\n                /* test */\n                _a.sent();\n                return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack://genetic-algorithm-simulation/./src/index.ts?");

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