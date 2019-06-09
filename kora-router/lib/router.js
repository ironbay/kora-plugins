"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./types");
require("./types");
var QS = require("query-string");
var Router = /** @class */ (function () {
    function Router(kora) {
        var _this = this;
        this.kora = kora;
        kora.before_mutation(['router'], function (_path, mut) { return __awaiter(_this, void 0, void 0, function () {
            var url, old, parsed, parts, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = mut.merge.url;
                        if (!url)
                            return [2 /*return*/];
                        old = kora.query_path(['router', 'url']);
                        parsed = new URL(url);
                        parts = this.split(parsed.pathname);
                        route = {
                            parts: parts,
                            query: QS.parse(parsed.search),
                        };
                        return [4 /*yield*/, kora.local_merge(['router'], route)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.set(location.toString());
        window.addEventListener('popstate', function () { return _this.set(location.toString()); });
    }
    Router.prototype.match_prefix = function (input) {
        var path = this.split(input);
        var parts = this.parts();
        return path.filter(function (part, index) {
            var value = parts[index];
            return (value === part) || (value && part === '+');
        }).length === path.length;
    };
    Router.prototype.match_exact = function (input) {
        var path = this.split(input);
        var parts = this.parts();
        if (parts.length !== path.length)
            return false;
        return path.filter(function (part, index) {
            var value = parts[index];
            return (value === part) || (value && part === '+');
        }).length === parts.length;
    };
    Router.prototype.parts = function () {
        return this.kora.local_values(['router', 'parts']) || [];
    };
    Router.prototype.url = function () {
        return this.kora.local_path(['router', 'url']);
    };
    Router.prototype.query = function () {
        return this.kora.local_path(['router', 'query']) || {};
    };
    Router.prototype.push = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        history.pushState({}, null, path);
                        return [4 /*yield*/, this.set(location.toString())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.set = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.kora.local_merge(['router', 'url'], url)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Router.prototype.append = function (path) {
        return new URL(path, location.toString());
    };
    Router.prototype.split = function (path) {
        return path.split('/').filter(function (item) { return item; });
    };
    return Router;
}());
exports.default = Router;
//# sourceMappingURL=router.js.map