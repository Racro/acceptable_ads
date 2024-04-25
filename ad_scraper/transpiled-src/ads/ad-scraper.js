"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapeAd = scrapeAd;
exports.scrapeAdsOnPage = scrapeAdsOnPage;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _sharp = _interopRequireDefault(require("sharp"));
var _uuid = require("uuid");
var _db = _interopRequireDefault(require("../util/db.js"));
var _getCrawlOutputDirectory = _interopRequireDefault(require("../util/getCrawlOutputDirectory.js"));
var log = _interopRequireWildcard(require("../util/log.js"));
var _timeout = require("../util/timeout.js");
var _adDetection = require("./ad-detection.js");
var _chumboxHandler = require("./chumbox-handler.js");
var _click = require("./click.js");
var _iframeScraper = require("./iframe-scraper.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function scrapeAdsOnPage(_x, _x2) {
  return _scrapeAdsOnPage.apply(this, arguments);
}
/**
 * Scrapes the content and takes a screenshot of an ad embedded in a page,
 * including all sub-frames, and then saves it in the adscraper database.
 * @param ad A handle to the HTML element bounding the ad.
 * @param page The page the ad appears on.
 * @param metadata Crawler metadata linked to this ad.
 * @returns Promise containing the database id of the scraped ad, once it is
 * done crawling/saving.
 */
function _scrapeAdsOnPage() {
  _scrapeAdsOnPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(page, metadata) {
    var db, ads, adHandleToAdId, i, _iterator, _step, ad, adHandles, chumboxId, platform, chumbox, _iterator2, _step2, adHandle, adId, scrapeTarget, bounds;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          db = _db["default"].getInstance(); // Detect ads
          _context.next = 3;
          return (0, _adDetection.identifyAdsInDOM)(page);
        case 3:
          ads = _context.sent;
          adHandleToAdId = new Map();
          log.info("".concat(page.url(), ": ").concat(ads.size, " ads identified"));
          i = 1; // Main loop through all ads on page
          _iterator = _createForOfIteratorHelper(ads);
          _context.prev = 8;
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context.next = 78;
            break;
          }
          ad = _step.value;
          log.info("".concat(page.url(), ": Scraping ad ").concat(i, " of ").concat(ads.size));
          // An ad can contain multiple sub-ads (a "chumbox"). We store the handles
          // in case this happens.
          adHandles = void 0;
          chumboxId = void 0;
          platform = void 0; // Check and see if the ad is a chumbox.
          _context.next = 18;
          return (0, _chumboxHandler.splitChumbox)(ad);
        case 18:
          chumbox = _context.sent;
          if (!chumbox) {
            _context.next = 27;
            break;
          }
          _context.next = 22;
          return db.insert({
            table: 'chumbox',
            returning: 'id',
            data: {
              platform: chumbox.platform,
              parent_page: metadata.parentPageId
            }
          });
        case 22:
          chumboxId = _context.sent;
          platform = chumbox.platform;
          // And use the array of ad handles for the next part.
          adHandles = chumbox.adHandles;
          _context.next = 28;
          break;
        case 27:
          // Otherwise, the array is just the one ad.
          adHandles = [{
            clickTarget: ad,
            screenshotTarget: ad
          }];
        case 28:
          _iterator2 = _createForOfIteratorHelper(adHandles);
          _context.prev = 29;
          _iterator2.s();
        case 31:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 68;
            break;
          }
          adHandle = _step2.value;
          adId = -1;
          _context.prev = 34;
          // Scrape the ad
          scrapeTarget = adHandle.screenshotTarget ? adHandle.screenshotTarget : adHandle.clickTarget;
          _context.next = 38;
          return scrapeAd(scrapeTarget, page, {
            pageType: metadata.pageType,
            parentPageId: metadata.parentPageId,
            crawlListUrl: metadata.crawlListUrl,
            chumboxId: chumboxId,
            platform: platform
          });
        case 38:
          adId = _context.sent;
          adHandleToAdId.set(ad, adId);
          _context.next = 47;
          break;
        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](34);
          log.warning('Couldn\'t scrape ad: ' + _context.t0);
          i += 1;
          return _context.abrupt("continue", 66);
        case 47:
          _context.prev = 47;
          if (!(FLAGS.scrapeOptions.clickAds !== 'noClick')) {
            _context.next = 60;
            break;
          }
          _context.next = 51;
          return adHandle.clickTarget.boundingBox();
        case 51:
          bounds = _context.sent;
          if (bounds) {
            _context.next = 55;
            break;
          }
          log.warning("Aborting click on ad ".concat(adId, ": no bounding box"));
          return _context.abrupt("continue", 66);
        case 55:
          if (!(bounds.height < 30 || bounds.width < 30)) {
            _context.next = 58;
            break;
          }
          log.warning("Aborting click on ad ".concat(adId, ": bounding box too small (").concat(bounds.height, ",").concat(bounds.width, ")"));
          return _context.abrupt("continue", 66);
        case 58:
          _context.next = 60;
          return (0, _click.clickAd)(adHandle.clickTarget, page, adId, metadata.parentPageId, metadata.crawlListUrl);
        case 60:
          _context.next = 65;
          break;
        case 62:
          _context.prev = 62;
          _context.t1 = _context["catch"](47);
          log.warning('Couldn\'t click ad: ' + _context.t1);
        case 65:
          i += 1;
        case 66:
          _context.next = 31;
          break;
        case 68:
          _context.next = 73;
          break;
        case 70:
          _context.prev = 70;
          _context.t2 = _context["catch"](29);
          _iterator2.e(_context.t2);
        case 73:
          _context.prev = 73;
          _iterator2.f();
          return _context.finish(73);
        case 76:
          _context.next = 10;
          break;
        case 78:
          _context.next = 83;
          break;
        case 80:
          _context.prev = 80;
          _context.t3 = _context["catch"](8);
          _iterator.e(_context.t3);
        case 83:
          _context.prev = 83;
          _iterator.f();
          return _context.finish(83);
        case 86:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 80, 83, 86], [29, 70, 73, 76], [34, 42], [47, 62]]);
  }));
  return _scrapeAdsOnPage.apply(this, arguments);
}
function scrapeAd(_x3, _x4, _x5) {
  return _scrapeAd.apply(this, arguments);
}
/**
 * Collects the content of the ad.
 * - Takes a screenshot
 * - Saves the HTML content of the ad
 * - Collects bid values from prebid.js, if available
 * @param page The page the element appears on
 * @param ad The ad/element to scroll to/scrape
 * @param screenshotDir Where the screenshot should be saved
 * @param screenshotHost The hostname of the machine on which the screenshot
 * will be stored.
 * @param adId The id that references this ad in the database. Optional,
 * uses a UUID otherwise.
 * @returns A promise containing id of the stored ad in the database.
*/
function _scrapeAd() {
  _scrapeAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(ad, page, metadata) {
    var db, _createAsyncTimeout, _createAsyncTimeout2, timeout, timeoutId, adId, _crawlAd, res, dir;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          db = _db["default"].getInstance();
          _createAsyncTimeout = (0, _timeout.createAsyncTimeout)("".concat(page.url(), ": timed out while crawling ad"), AD_CRAWL_TIMEOUT), _createAsyncTimeout2 = _slicedToArray(_createAsyncTimeout, 2), timeout = _createAsyncTimeout2[0], timeoutId = _createAsyncTimeout2[1]; // Declare adId here - we create an empty row in the database before
          // the ad is scraped, so we can use the id for the directory name.
          // If the process fails at an point, we have the adId in
          // scope so we can delete it.
          _crawlAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var adsDir, adContent, scrapedIFrames, _iterator3, _step3, scrapedIFrame;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return db.createEmptyAd();
                case 3:
                  adId = _context2.sent;
                  _context2.next = 6;
                  return page.evaluate(function (e) {
                    e.scrollIntoView({
                      block: 'center'
                    });
                  }, ad);
                case 6:
                  _context2.next = 8;
                  return (0, _timeout.sleep)(AD_SLEEP_TIME);
                case 8:
                  _context2.t0 = _path["default"];
                  _context2.next = 11;
                  return (0, _getCrawlOutputDirectory["default"])();
                case 11:
                  _context2.t1 = _context2.sent;
                  _context2.t2 = 'scraped_ads/ad_' + adId;
                  adsDir = _context2.t0.join.call(_context2.t0, _context2.t1, _context2.t2);
                  if (!_fs["default"].existsSync(adsDir)) {
                    _fs["default"].mkdirSync(adsDir, {
                      recursive: true
                    });
                  }
                  // Scrape ad content
                  _context2.next = 17;
                  return scrapeAdContent(page, ad, adsDir, FLAGS.crawlerHostname, FLAGS.scrapeOptions.screenshotAdsWithContext, adId);
                case 17:
                  adContent = _context2.sent;
                  _context2.next = 20;
                  return db.updateAd(adId, _objectSpread({
                    job_id: FLAGS.jobId,
                    crawl_id: CRAWL_ID,
                    parent_page: metadata.parentPageId,
                    parent_page_url: page.url(),
                    parent_page_type: metadata.pageType,
                    chumbox_id: metadata.chumboxId,
                    platform: metadata.platform
                  }, adContent));
                case 20:
                  log.debug("".concat(page.url(), ": Archived ad content with id ").concat(adId));
                  // Extract 3rd party domains from ad
                  // const adExternals = await extractExternalUrls(ad);
                  // await db.archiveExternalUrls(adExternals, adId);
                  // Scrape iframe content in ad
                  _context2.next = 23;
                  return (0, _iframeScraper.scrapeIFramesInElement)(ad);
                case 23:
                  scrapedIFrames = _context2.sent;
                  _iterator3 = _createForOfIteratorHelper(scrapedIFrames);
                  _context2.prev = 25;
                  _iterator3.s();
                case 27:
                  if ((_step3 = _iterator3.n()).done) {
                    _context2.next = 33;
                    break;
                  }
                  scrapedIFrame = _step3.value;
                  _context2.next = 31;
                  return db.archiveScrapedIFrame(scrapedIFrame, adId, undefined);
                case 31:
                  _context2.next = 27;
                  break;
                case 33:
                  _context2.next = 38;
                  break;
                case 35:
                  _context2.prev = 35;
                  _context2.t3 = _context2["catch"](25);
                  _iterator3.e(_context2.t3);
                case 38:
                  _context2.prev = 38;
                  _iterator3.f();
                  return _context2.finish(38);
                case 41:
                  clearTimeout(timeoutId);
                  return _context2.abrupt("return", adId);
                case 45:
                  _context2.prev = 45;
                  _context2.t4 = _context2["catch"](0);
                  clearTimeout(timeoutId);
                  if (adId) {
                    db.postgres.query('DELETE FROM ad WHERE id=$1', [adId]);
                  }
                  throw _context2.t4;
                case 50:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[0, 45], [25, 35, 38, 41]]);
          }))();
          _context3.prev = 3;
          _context3.next = 6;
          return Promise.race([timeout, _crawlAd]);
        case 6:
          res = _context3.sent;
          return _context3.abrupt("return", res);
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          if (!adId) {
            _context3.next = 21;
            break;
          }
          db.postgres.query('DELETE FROM ad WHERE id=$1', [adId]);
          _context3.t1 = _path["default"];
          _context3.next = 17;
          return (0, _getCrawlOutputDirectory["default"])();
        case 17:
          _context3.t2 = _context3.sent;
          _context3.t3 = 'scraped_ads/ad_' + adId;
          dir = _context3.t1.join.call(_context3.t1, _context3.t2, _context3.t3);
          if (_fs["default"].readdirSync(dir).length == 0) {
            _fs["default"].rmdirSync(dir);
          }
        case 21:
          throw _context3.t0;
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 10]]);
  }));
  return _scrapeAd.apply(this, arguments);
}
function scrapeAdContent(_x6, _x7, _x8, _x9, _x10, _x11) {
  return _scrapeAdContent.apply(this, arguments);
}
/**
 * Attempts to extract the bid price for this ad from the prebid.js library,
 * if available on the page.
 * @param ad The ad to get bid values from.
 */
function _scrapeAdContent() {
  _scrapeAdContent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(page, ad, screenshotDir,
  // externalScreenshotDir: string | undefined,
  screenshotHost, withContext, adId) {
    var _adInContextBB, _adInContextBB2, _adInContextBB3, _adInContextBB4;
    var html, screenshotFile, savePath, screenshotFailed, adInContextBB, abb, viewport, adBB, margin, contextLeft, contextTop, marginTop, marginLeft, marginBottom, marginRight, contextWidth, contextHeight, contextBB, buf, prebid;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return page.evaluate(function (e) {
            return e.outerHTML;
          }, ad);
        case 2:
          html = _context4.sent;
          screenshotFile = (adId ? 'ad_' + adId : (0, _uuid.v4)()) + '.webp';
          savePath = _path["default"].join(screenshotDir, screenshotFile); // const realPath = externalScreenshotDir
          // ? path.join(externalScreenshotDir, screenshotFile)
          // : undefined;
          screenshotFailed = false;
          _context4.next = 8;
          return page.evaluate(function (e) {
            e.scrollIntoView({
              block: 'center'
            });
          }, ad);
        case 8:
          _context4.next = 10;
          return ad.boundingBox();
        case 10:
          abb = _context4.sent;
          if (abb) {
            _context4.next = 13;
            break;
          }
          throw new Error('No ad bounding box');
        case 13:
          if (!(abb.height < 30 || abb.width < 30)) {
            _context4.next = 15;
            break;
          }
          throw new Error('Ad smaller than 30px in one dimension');
        case 15:
          viewport = page.viewport();
          if (viewport) {
            _context4.next = 18;
            break;
          }
          throw new Error('Page has no viewport');
        case 18:
          // Round the bounding box values in case they are non-integers
          adBB = {
            left: Math.max(0, Math.floor(abb.x)),
            top: Math.max(0, Math.floor(abb.y)),
            height: Math.ceil(abb.height),
            width: Math.ceil(abb.width)
          }; // Compute bounding box if a margin is desired
          margin = 150;
          contextLeft = Math.max(adBB.left - margin, 0);
          contextTop = Math.max(adBB.top - margin, 0);
          marginTop = adBB.top - contextTop;
          marginLeft = adBB.left - contextLeft;
          marginBottom = adBB.top + adBB.height + margin < viewport.height ? margin : viewport.height - adBB.height - adBB.top;
          marginRight = adBB.left + adBB.width + margin < viewport.width ? margin : viewport.width - adBB.width - adBB.left;
          contextWidth = adBB.width + marginLeft + marginRight;
          contextHeight = adBB.height + marginTop + marginBottom;
          contextBB = {
            left: contextLeft,
            top: contextTop,
            height: contextHeight,
            width: contextWidth
          }; // Recompute ad bounding box within the crop with context
          if (withContext) {
            adInContextBB = {
              left: adBB.left - contextBB.left,
              top: adBB.top - contextBB.top,
              height: adBB.height,
              width: adBB.width
            };
          }
          _context4.next = 32;
          return page.screenshot();
        case 32:
          buf = _context4.sent;
          _context4.next = 35;
          return (0, _sharp["default"])(buf).extract(withContext ? contextBB : adBB).webp({
            lossless: true
          }).toFile(savePath);
        case 35:
          _context4.next = 37;
          return getPrebidBidsForAd(ad);
        case 37:
          prebid = _context4.sent;
          return _context4.abrupt("return", {
            timestamp: new Date(),
            screenshot: screenshotFailed ? undefined : savePath,
            screenshot_host: screenshotFailed ? undefined : screenshotHost,
            html: html,
            max_bid_price: prebid === null || prebid === void 0 ? void 0 : prebid.max_bid_price,
            winning_bid: prebid === null || prebid === void 0 ? void 0 : prebid.winning_bid,
            with_context: withContext,
            bb_x: (_adInContextBB = adInContextBB) === null || _adInContextBB === void 0 ? void 0 : _adInContextBB.left,
            bb_y: (_adInContextBB2 = adInContextBB) === null || _adInContextBB2 === void 0 ? void 0 : _adInContextBB2.top,
            bb_height: (_adInContextBB3 = adInContextBB) === null || _adInContextBB3 === void 0 ? void 0 : _adInContextBB3.height,
            bb_width: (_adInContextBB4 = adInContextBB) === null || _adInContextBB4 === void 0 ? void 0 : _adInContextBB4.width
          });
        case 39:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _scrapeAdContent.apply(this, arguments);
}
function getPrebidBidsForAd(ad) {
  try {
    return ad.evaluate(function (ad) {
      // Check if the page has prebid
      // @ts-ignore
      if (typeof pbjs === 'undefined' || pbjs.getAllWinningBids === undefined) {
        return {
          max_bid_price: undefined,
          winning_bid: undefined
        };
      }
      function isChildOfAd(element) {
        if (!element) {
          return false;
        }
        if (element === ad) {
          return true;
        }
        var current = element;
        while (current !== document.body && current.parentNode !== null) {
          current = current.parentNode;
          if (element === ad) {
            return true;
          }
        }
        return false;
      }
      // Check if any winning bids match the ad element (or its children).
      // @ts-ignore
      var winningBids = pbjs.getAllWinningBids();
      var matchingWins = winningBids.filter(function (win) {
        return isChildOfAd(document.getElementById(win.adUnitCode));
      });
      if (matchingWins.length !== 0) {
        var matchingWin = matchingWins[0];
        return {
          max_bid_price: matchingWin.cpm,
          winning_bid: true
        };
      }
      // Check if any other bids match the children
      // @ts-ignore
      var bidResponses = pbjs.getBidResponses();
      var matches = Object.keys(bidResponses).filter(function (key) {
        return isChildOfAd(document.getElementById(key));
      });
      if (matches.length === 0) {
        return {
          max_bid_price: undefined,
          winning_bid: undefined
        };
      }
      var match = matches[0];
      if (!bidResponses[match].bids) {
        return {
          max_bid_price: undefined,
          winning_bid: undefined
        };
      }
      return {
        max_bid_price: Math.max.apply(Math, _toConsumableArray(bidResponses[match].bids.map(function (b) {
          return b.cpm;
        }))),
        winning_bid: false
      };
    });
  } catch (e) {
    log.warning('Error in Prebid data collection: ' + e.message);
  }
}