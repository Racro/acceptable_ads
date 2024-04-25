"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pg = _interopRequireDefault(require("pg"));
var log = _interopRequireWildcard(require("./log.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Wrapper over the postgres client for inserting data from the crawler.
 * Singleton class - call initialize() at the beginning, call getInstance()
 * subsequently from any other scope.
 */
var DbClient = exports["default"] = /*#__PURE__*/function () {
  function DbClient(conf) {
    _classCallCheck(this, DbClient);
    this.postgres = new _pg["default"].Client(conf);
  }
  /**
   * Sets up a new DbClient. Must be called the first time this is used in
   * the script.
   * @param conf Postgres config
   * @returns A DbClient instance.
   */
  return _createClass(DbClient, [{
    key: "end",
    value: (
    /**
     * Ends the client connection to the database.
     * @returns
     */
    function () {
      var _end = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.postgres.end());
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function end() {
        return _end.apply(this, arguments);
      }
      return end;
    }()
    /**
     * Generic insert wrapper
     * @param options
     * @returns
     */
    )
  }, {
    key: "insert",
    value: (function () {
      var _insert = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(options) {
        var columns, valuesStr, params, insert, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              columns = Object.keys(options.data).join(', ');
              valuesStr = _toConsumableArray(Array(Object.keys(options.data).length).keys()).map(function (v) {
                return "$".concat(v + 1);
              }).join(', ');
              params = Object.values(options.data);
              insert = "INSERT INTO ".concat(options.table, " (").concat(columns, ") VALUES (").concat(valuesStr, ")");
              if (options.returning) {
                insert += " RETURNING ".concat(options.returning);
              }
              insert += ';';
              _context2.next = 8;
              return this.postgres.query(insert, params);
            case 8:
              result = _context2.sent;
              if (options.returning) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return");
            case 11:
              if (!(result.rowCount !== 1)) {
                _context2.next = 13;
                break;
              }
              throw new Error('Insert query didn\'t return a value');
            case 13:
              return _context2.abrupt("return", result.rows[0][options.returning]);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function insert(_x) {
        return _insert.apply(this, arguments);
      }
      return insert;
    }())
  }, {
    key: "updateById",
    value: function () {
      var _updateById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(options) {
        var columns, params, update, result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              columns = Object.keys(options.data).map(function (col, idx) {
                return "".concat(col, "=$").concat(idx + 1);
              }).join(', ');
              params = Object.values(options.data);
              params.push(options.id);
              update = "UPDATE ".concat(options.table, " SET ").concat(columns, " WHERE id=$").concat(params.length);
              _context3.next = 6;
              return this.postgres.query(update, params);
            case 6:
              result = _context3.sent;
              if (!result.rowCount || result.rowCount == 0) {
                log.warning("Could not update row in table ".concat(options.table, " with id ").concat(options.id));
              } else if (result.rowCount > 1) {
                log.warning("Updated more than one row in ".concat(options.table, " with id ").concat(options.id));
              }
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function updateById(_x2) {
        return _updateById.apply(this, arguments);
      }
      return updateById;
    }() // Saves a scraped iframe to the database, and recursively saves any child
    // iframes as well.
  }, {
    key: "archiveScrapedIFrame",
    value: function () {
      var _archiveScrapedIFrame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(iframe, adId, parentId) {
        var frameId, _iterator, _step, child;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.insert({
                table: 'iframe',
                returning: 'id',
                data: {
                  timestamp: iframe.timestamp,
                  url: iframe.url,
                  parent_ad: adId,
                  parent_iframe: parentId ? parentId : null,
                  html: iframe.html
                }
              });
            case 3:
              frameId = _context4.sent;
              if (!iframe.externals) {
                _context4.next = 7;
                break;
              }
              _context4.next = 7;
              return this.archiveExternalUrls(iframe.externals, adId, frameId);
            case 7:
              _iterator = _createForOfIteratorHelper(iframe.children);
              _context4.prev = 8;
              _iterator.s();
            case 10:
              if ((_step = _iterator.n()).done) {
                _context4.next = 16;
                break;
              }
              child = _step.value;
              _context4.next = 14;
              return this.archiveScrapedIFrame(child, adId, frameId);
            case 14:
              _context4.next = 10;
              break;
            case 16:
              _context4.next = 21;
              break;
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](8);
              _iterator.e(_context4.t0);
            case 21:
              _context4.prev = 21;
              _iterator.f();
              return _context4.finish(21);
            case 24:
              _context4.next = 30;
              break;
            case 26:
              _context4.prev = 26;
              _context4.t1 = _context4["catch"](0);
              log.strError('Error while archiving iframe ' + iframe.url);
              log.error(_context4.t1);
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 26], [8, 18, 21, 24]]);
      }));
      function archiveScrapedIFrame(_x3, _x4, _x5) {
        return _archiveScrapedIFrame.apply(this, arguments);
      }
      return archiveScrapedIFrame;
    }()
  }, {
    key: "createAd",
    value: function () {
      var _createAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ad) {
        var adId;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.insert({
                table: 'ad',
                returning: 'id',
                data: ad
              });
            case 2:
              adId = _context5.sent;
              return _context5.abrupt("return", adId);
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function createAd(_x6) {
        return _createAd.apply(this, arguments);
      }
      return createAd;
    }()
  }, {
    key: "createEmptyAd",
    value: function () {
      var _createEmptyAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.postgres.query('INSERT INTO ad DEFAULT VALUES RETURNING id');
            case 2:
              result = _context6.sent;
              return _context6.abrupt("return", result.rows[0].id);
            case 4:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function createEmptyAd() {
        return _createEmptyAd.apply(this, arguments);
      }
      return createEmptyAd;
    }()
  }, {
    key: "updateAd",
    value: function () {
      var _updateAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, ad) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", this.updateById({
                table: 'ad',
                id: id,
                data: ad
              }));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function updateAd(_x7, _x8) {
        return _updateAd.apply(this, arguments);
      }
      return updateAd;
    }()
  }, {
    key: "archivePage",
    value: function () {
      var _archivePage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(page) {
        var pageId;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.insert({
                table: 'page',
                returning: 'id',
                data: page
              });
            case 2:
              pageId = _context8.sent;
              return _context8.abrupt("return", pageId);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function archivePage(_x9) {
        return _archivePage.apply(this, arguments);
      }
      return archivePage;
    }()
  }, {
    key: "insertAdDomain",
    value: function () {
      var _insertAdDomain = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(adDomain) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              this.insert({
                table: 'ad_domain',
                data: adDomain
              });
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function insertAdDomain(_x10) {
        return _insertAdDomain.apply(this, arguments);
      }
      return insertAdDomain;
    }()
  }, {
    key: "archiveExternalUrls",
    value: function () {
      var _archiveExternalUrls = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(externals, adId, iframeId) {
        var _this = this;
        var anchorHrefs, iframeSrcs, scriptSrcs, imgSrcs, insertDomains;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              anchorHrefs = externals.anchorHrefs, iframeSrcs = externals.iframeSrcs, scriptSrcs = externals.scriptSrcs, imgSrcs = externals.imgSrcs;
              insertDomains = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(domains, type) {
                  var _iterator2, _step2, d, hostname;
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _iterator2 = _createForOfIteratorHelper(domains);
                        _context10.prev = 1;
                        _iterator2.s();
                      case 3:
                        if ((_step2 = _iterator2.n()).done) {
                          _context10.next = 16;
                          break;
                        }
                        d = _step2.value;
                        _context10.prev = 5;
                        hostname = new URL(d).hostname;
                        _context10.next = 9;
                        return _this.insertAdDomain({
                          ad_id: adId,
                          iframe_id: iframeId,
                          url: d,
                          hostname: hostname,
                          type: type
                        });
                      case 9:
                        _context10.next = 14;
                        break;
                      case 11:
                        _context10.prev = 11;
                        _context10.t0 = _context10["catch"](5);
                        return _context10.abrupt("continue", 14);
                      case 14:
                        _context10.next = 3;
                        break;
                      case 16:
                        _context10.next = 21;
                        break;
                      case 18:
                        _context10.prev = 18;
                        _context10.t1 = _context10["catch"](1);
                        _iterator2.e(_context10.t1);
                      case 21:
                        _context10.prev = 21;
                        _iterator2.f();
                        return _context10.finish(21);
                      case 24:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10, null, [[1, 18, 21, 24], [5, 11]]);
                }));
                return function insertDomains(_x14, _x15) {
                  return _ref.apply(this, arguments);
                };
              }();
              _context11.next = 4;
              return insertDomains(anchorHrefs, "".concat(iframeId ? 'subframe_' : '', "anchor_href"));
            case 4:
              _context11.next = 6;
              return insertDomains(iframeSrcs, "".concat(iframeId ? 'subframe_' : '', "iframe_src"));
            case 6:
              _context11.next = 8;
              return insertDomains(scriptSrcs, "".concat(iframeId ? 'subframe_' : '', "script_src"));
            case 8:
              _context11.next = 10;
              return insertDomains(imgSrcs, "".concat(iframeId ? 'subframe_' : '', "img_src"));
            case 10:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function archiveExternalUrls(_x11, _x12, _x13) {
        return _archiveExternalUrls.apply(this, arguments);
      }
      return archiveExternalUrls;
    }()
  }, {
    key: "archiveRequest",
    value: function () {
      var _archiveRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(request) {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.insert({
                table: 'request',
                data: request
              });
            case 2:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function archiveRequest(_x16) {
        return _archiveRequest.apply(this, arguments);
      }
      return archiveRequest;
    }()
  }], [{
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(conf) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (!DbClient.instance) {
                _context13.next = 3;
                break;
              }
              _context13.next = 3;
              return DbClient.instance.postgres.end();
            case 3:
              DbClient.instance = new DbClient(conf);
              _context13.next = 6;
              return DbClient.instance.postgres.connect();
            case 6:
              log.info('Postgres driver initialized');
              return _context13.abrupt("return", DbClient.instance);
            case 8:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function initialize(_x17) {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Gets the DbClient.
     * @returns The global DbClient.
     */
    )
  }, {
    key: "getInstance",
    value: function getInstance() {
      if (!DbClient.instance) {
        throw new Error('DbClient must be initialized before use');
      }
      return DbClient.instance;
    }
  }]);
}();