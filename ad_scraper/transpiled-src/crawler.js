"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crawl = crawl;
var _fs = _interopRequireDefault(require("fs"));
var _publicIp = require("public-ip");
var _puppeteerExtra = _interopRequireDefault(require("puppeteer-extra"));
var _puppeteerExtraPluginStealth = _interopRequireDefault(require("puppeteer-extra-plugin-stealth"));
var _sourceMapSupport = _interopRequireDefault(require("source-map-support"));
var _findPage = require("./pages/find-page.js");
var _pageScraper = require("./pages/page-scraper.js");
var _db2 = _interopRequireDefault(require("./util/db.js"));
var log = _interopRequireWildcard(require("./util/log.js"));
var _timeout = require("./util/timeout.js");
var _adScraper = require("./ads/ad-scraper.js");
var _path = _interopRequireDefault(require("path"));
var _csvParser = _interopRequireDefault(require("csv-parser"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
_sourceMapSupport["default"].install();
;
function setupGlobals(crawlerFlags) {
  globalThis.FLAGS = crawlerFlags;
  // How long the crawler can spend on each clickthrough page
  globalThis.CLICKTHROUGH_TIMEOUT = 30 * 1000; // 30s
  // How long the crawler should wait for something to happen after clicking an ad
  globalThis.AD_CLICK_TIMEOUT = 10 * 1000; // 10s
  // How long the crawler can spend waiting for the HTML of a page.
  globalThis.PAGE_CRAWL_TIMEOUT = 180 * 1000; // 3min
  // How long the crawler can spend waiting for the HTML and screenshot of an ad.
  // must be greater than |AD_SLEEP_TIME|
  globalThis.AD_CRAWL_TIMEOUT = 20 * 1000; // 20s
  // How long the crawler should sleep before scraping/screenshotting an ad
  globalThis.AD_SLEEP_TIME = 5 * 1000; // 5s
  // How long the crawler should sleep before crawling a page
  globalThis.PAGE_SLEEP_TIME = 10 * 1000; // 10s
  // Size of the viewport
  globalThis.VIEWPORT = {
    width: 1366,
    height: 768
  };
}
function crawl(_x) {
  return _crawl2.apply(this, arguments);
}
/**
 *
 * @param url URL to visit in the page
 * @param page Tab/Page that the URL should be visited in
 * @param metadata Crawl metadata
 * @returns The page ID of the crawled page in the database
 */
function _crawl2() {
  _crawl2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(flags) {
    var db, crawlList, crawlListAdIds, i, _iterator, _step, url, OVERALL_TIMEOUT, crawlListStartingIndex, prevCrawl, version, _loop, _i;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // Initialize global variables and clients
          // console.log(flags);
          setupGlobals(flags);
          // Validate arguments
          if (!_fs["default"].existsSync(flags.outputDir)) {
            console.log("".concat(flags.outputDir, " is not a valid directory"));
            process.exit(1);
          }
          _context4.next = 4;
          return _db2["default"].initialize(flags.pgConf);
        case 4:
          db = _context4.sent;
          crawlList = [];
          crawlListAdIds = [];
          if (!_fs["default"].existsSync(flags.crawlListFile)) {
            console.log("".concat(flags.crawlListFile, " does not exist."));
            process.exit(1);
          }
          if (!flags.crawlListHasReferrerAds) {
            _context4.next = 15;
            break;
          }
          _context4.next = 11;
          return new Promise(function (resolve, reject) {
            _fs["default"].createReadStream(flags.crawlListFile).pipe((0, _csvParser["default"])()).on('data', function (data) {
              crawlList.push(data.url);
              crawlListAdIds.push(data.ad_id);
            }).on('end', function () {
              resolve();
            });
          });
        case 11:
          console.log(crawlList);
          console.log(crawlListAdIds);
          _context4.next = 16;
          break;
        case 15:
          crawlList = _fs["default"].readFileSync(flags.crawlListFile).toString().trimEnd().split('\n');
        case 16:
          i = 1;
          _iterator = _createForOfIteratorHelper(crawlList);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              url = _step.value;
              try {
                new URL(url);
              } catch (e) {
                log.strError("Invalid URL in ".concat(flags.crawlListFile, ", line ").concat(i, ": ").concat(url));
                process.exit(1);
              }
            }
            // Now that the length of the crawl list is known, set the global timeout
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          OVERALL_TIMEOUT = crawlList.length * 15 * 60 * 1000; // Set up crawl entry, or resume from previous.
          // let crawlId: number;
          crawlListStartingIndex = 0;
          if (FLAGS.crawlId) {
            _context4.next = 40;
            break;
          }
          _context4.t0 = db;
          _context4.t1 = FLAGS.jobId;
          _context4.t2 = FLAGS.name;
          _context4.t3 = new Date();
          _context4.t4 = FLAGS.crawlListFile;
          _context4.t5 = crawlList.length;
          _context4.t6 = FLAGS.chromeOptions.profileDir;
          _context4.t7 = FLAGS.crawlerHostname;
          _context4.next = 32;
          return getPublicIp();
        case 32:
          _context4.t8 = _context4.sent;
          _context4.t9 = {
            job_id: _context4.t1,
            name: _context4.t2,
            start_time: _context4.t3,
            completed: false,
            crawl_list: _context4.t4,
            crawl_list_current_index: 0,
            crawl_list_length: _context4.t5,
            profile_dir: _context4.t6,
            crawler_hostname: _context4.t7,
            crawler_ip: _context4.t8
          };
          _context4.t10 = {
            table: 'crawl',
            returning: 'id',
            data: _context4.t9
          };
          _context4.next = 37;
          return _context4.t0.insert.call(_context4.t0, _context4.t10);
        case 37:
          globalThis.CRAWL_ID = _context4.sent;
          _context4.next = 48;
          break;
        case 40:
          _context4.next = 42;
          return db.postgres.query('SELECT * FROM crawl WHERE id=$1', [FLAGS.crawlId]);
        case 42:
          prevCrawl = _context4.sent;
          if (prevCrawl.rowCount !== 1) {
            console.log("Invalid crawl_id: ".concat(FLAGS.crawlId));
            process.exit(1);
          }
          if (_path["default"].basename(prevCrawl.rows[0].crawl_list) != _path["default"].basename(FLAGS.crawlListFile)) {
            console.log("Crawl list file provided does not the have same name as the original crawl. Expected: ".concat(_path["default"].basename(prevCrawl.rows[0].crawl_list), ", actual: ").concat(_path["default"].basename(FLAGS.crawlListFile)));
            process.exit(1);
          }
          if (prevCrawl.rows[0].crawl_list_length != crawlList.length) {
            console.log("Crawl list file provided does not the have same number of URLs as the original crawl. Expected: ".concat(prevCrawl.rows[0].crawl_list_length, ", actual: ").concat(crawlList.length));
            process.exit(1);
          }
          globalThis.CRAWL_ID = FLAGS.crawlId;
          crawlListStartingIndex = prevCrawl.rows[0].crawl_list_current_index;
        case 48:
          // Open browser
          log.info('Launching browser...');
          _puppeteerExtra["default"]["default"].use((0, _puppeteerExtraPluginStealth["default"])());
          _context4.next = 52;
          return _puppeteerExtra["default"]["default"].launch({
            args: ['--disable-dev-shm-usage'],
            defaultViewport: VIEWPORT,
            headless: FLAGS.chromeOptions.headless,
            handleSIGINT: false,
            userDataDir: FLAGS.chromeOptions.profileDir,
            executablePath: FLAGS.chromeOptions.executablePath
          });
        case 52:
          globalThis.BROWSER = _context4.sent;
          process.on('SIGINT', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log('SIGINT received, closing browser...');
                  _context.next = 3;
                  return BROWSER.close();
                case 3:
                  process.exit();
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
          _context4.next = 56;
          return BROWSER.version();
        case 56:
          version = _context4.sent;
          log.info('Running ' + version);
          _context4.prev = 58;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var url, url_key, pattern, match, prevAdId, _createAsyncTimeout, _createAsyncTimeout2, urlTimeout, urlTimeoutId, seedPage, _crawl;
            return _regeneratorRuntime().wrap(function _loop$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  url = crawlList[_i]; // Ritik
                  url_key = ""; // extract url_key to name screenshot folders 
                  pattern = /:\/\/(ww[\w\d]\.?)/;
                  match = url.match(pattern);
                  if (match) {
                    url.split(match[0])[1], _readOnlyError("url_key");
                  } else {
                    url.split('://')[1], _readOnlyError("url_key");
                  }
                  if (!(url_key == "")) {
                    _context3.next = 7;
                    break;
                  }
                  return _context3.abrupt("return", 1);
                case 7:
                  prevAdId = FLAGS.crawlListHasReferrerAds ? crawlListAdIds[_i] : -1; // Set overall timeout for this crawl list item
                  _createAsyncTimeout = (0, _timeout.createAsyncTimeout)("".concat(url, ": overall site timeout reached"), OVERALL_TIMEOUT), _createAsyncTimeout2 = _slicedToArray(_createAsyncTimeout, 2), urlTimeout = _createAsyncTimeout2[0], urlTimeoutId = _createAsyncTimeout2[1];
                  _context3.next = 11;
                  return BROWSER.newPage();
                case 11:
                  seedPage = _context3.sent;
                  _context3.prev = 12;
                  _crawl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                    var pageId, articleUrl, articlePage, urlWithAds, adsPage;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          if (!FLAGS.crawlListHasReferrerAds) {
                            _context2.next = 7;
                            break;
                          }
                          _context2.next = 4;
                          return loadAndHandlePage(url, seedPage, {
                            pageType: _pageScraper.PageType.LANDING,
                            referrerAd: prevAdId
                          });
                        case 4:
                          pageId = _context2.sent;
                          _context2.next = 10;
                          break;
                        case 7:
                          _context2.next = 9;
                          return loadAndHandlePage(url, seedPage, {
                            pageType: _pageScraper.PageType.MAIN
                          });
                        case 9:
                          pageId = _context2.sent;
                        case 10:
                          if (!FLAGS.crawlOptions.crawlAdditionalArticlePage) {
                            _context2.next = 25;
                            break;
                          }
                          _context2.next = 13;
                          return (0, _findPage.findArticle)(seedPage);
                        case 13:
                          articleUrl = _context2.sent;
                          if (!articleUrl) {
                            _context2.next = 24;
                            break;
                          }
                          _context2.next = 17;
                          return BROWSER.newPage();
                        case 17:
                          articlePage = _context2.sent;
                          _context2.next = 20;
                          return loadAndHandlePage(articleUrl, articlePage, {
                            pageType: _pageScraper.PageType.SUBPAGE,
                            referrerPageId: pageId,
                            referrerPageUrl: seedPage.url()
                          });
                        case 20:
                          _context2.next = 22;
                          return articlePage.close();
                        case 22:
                          _context2.next = 25;
                          break;
                        case 24:
                          log.strError("".concat(url, ": Couldn't find article"));
                        case 25:
                          if (!FLAGS.crawlOptions.crawlAdditionalPageWithAds) {
                            _context2.next = 40;
                            break;
                          }
                          _context2.next = 28;
                          return (0, _findPage.findPageWithAds)(seedPage);
                        case 28:
                          urlWithAds = _context2.sent;
                          if (!urlWithAds) {
                            _context2.next = 39;
                            break;
                          }
                          _context2.next = 32;
                          return BROWSER.newPage();
                        case 32:
                          adsPage = _context2.sent;
                          _context2.next = 35;
                          return loadAndHandlePage(urlWithAds, adsPage, {
                            pageType: _pageScraper.PageType.SUBPAGE,
                            referrerPageId: pageId,
                            referrerPageUrl: seedPage.url()
                          });
                        case 35:
                          _context2.next = 37;
                          return adsPage.close();
                        case 37:
                          _context2.next = 40;
                          break;
                        case 39:
                          log.strError("".concat(url, ": Couldn't find article"));
                        case 40:
                          _context2.next = 46;
                          break;
                        case 42:
                          _context2.prev = 42;
                          _context2.t0 = _context2["catch"](0);
                          log.error(_context2.t0);
                          throw _context2.t0;
                        case 46:
                          _context2.prev = 46;
                          clearTimeout(urlTimeoutId);
                          return _context2.finish(46);
                        case 49:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2, null, [[0, 42, 46, 49]]);
                  }))();
                  _context3.next = 16;
                  return Promise.race([_crawl, urlTimeout]);
                case 16:
                  _context3.next = 21;
                  break;
                case 18:
                  _context3.prev = 18;
                  _context3.t0 = _context3["catch"](12);
                  log.error(_context3.t0);
                case 21:
                  _context3.prev = 21;
                  _context3.next = 24;
                  return seedPage.close();
                case 24:
                  _context3.next = 26;
                  return db.postgres.query('UPDATE crawl SET crawl_list_current_index=$1 WHERE id=$2', [_i + 1, CRAWL_ID]);
                case 26:
                  return _context3.finish(21);
                case 27:
                case "end":
                  return _context3.stop();
              }
            }, _loop, null, [[12, 18, 21, 27]]);
          });
          _i = crawlListStartingIndex;
        case 61:
          if (!(_i < crawlList.length)) {
            _context4.next = 68;
            break;
          }
          return _context4.delegateYield(_loop(), "t11", 63);
        case 63:
          if (!_context4.t11) {
            _context4.next = 65;
            break;
          }
          return _context4.abrupt("continue", 65);
        case 65:
          _i++;
          _context4.next = 61;
          break;
        case 68:
          _context4.next = 70;
          return BROWSER.close();
        case 70:
          _context4.next = 72;
          return db.postgres.query('UPDATE crawl SET completed=TRUE, completed_time=$1 WHERE id=$2', [new Date(), CRAWL_ID]);
        case 72:
          _context4.next = 79;
          break;
        case 74:
          _context4.prev = 74;
          _context4.t12 = _context4["catch"](58);
          _context4.next = 78;
          return BROWSER.close();
        case 78:
          throw _context4.t12;
        case 79:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[58, 74]]);
  }));
  return _crawl2.apply(this, arguments);
}
function loadAndHandlePage(_x2, _x3, _x4) {
  return _loadAndHandlePage.apply(this, arguments);
}
function _loadAndHandlePage() {
  _loadAndHandlePage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(url, page, metadata) {
    var requests, captureThirdPartyRequests, pageId, db, _db, _iterator2, _step2, request;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          log.info("".concat(url, ": Loading page"));
          // if (FLAGS.scrapeOptions.scrapeAds) {
          //   await domMonitor.injectDOMListener(page);
          // }
          // Set up request interception for capturing third party requests
          _context6.next = 3;
          return page.setRequestInterception(true);
        case 3:
          requests = [];
          captureThirdPartyRequests = /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(request) {
              return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    if (FLAGS.scrapeOptions.captureThirdPartyRequests) {
                      _context5.next = 3;
                      break;
                    }
                    request["continue"](undefined, 0);
                    return _context5.abrupt("return");
                  case 3:
                    if (!(request.isNavigationRequest() && request.frame() === page.mainFrame())) {
                      _context5.next = 6;
                      break;
                    }
                    request["continue"](undefined, 0);
                    return _context5.abrupt("return");
                  case 6:
                    if (!(new URL(request.url()).origin == new URL(page.url()).origin)) {
                      _context5.next = 9;
                      break;
                    }
                    request["continue"](undefined, 0);
                    return _context5.abrupt("return");
                  case 9:
                    requests.push({
                      timestamp: new Date(),
                      parent_page: -1,
                      initiator: page.url(),
                      target_url: request.url(),
                      resource_type: request.resourceType()
                    });
                    request["continue"](undefined, 0);
                  case 11:
                  case "end":
                    return _context5.stop();
                }
              }, _callee4);
            }));
            return function captureThirdPartyRequests(_x6) {
              return _ref3.apply(this, arguments);
            };
          }();
          page.on('request', captureThirdPartyRequests);
          _context6.next = 8;
          return page["goto"](url, {
            timeout: 120000
          });
        case 8:
          _context6.next = 10;
          return (0, _timeout.sleep)(PAGE_SLEEP_TIME);
        case 10:
          log.info("".concat(url, ": Page finished loading"));
          _context6.next = 13;
          return scrollDownPage(page);
        case 13:
          if (!FLAGS.scrapeOptions.scrapeSite) {
            _context6.next = 19;
            break;
          }
          _context6.next = 16;
          return (0, _pageScraper.scrapePage)(page, {
            crawlListUrl: url,
            pageType: metadata.pageType,
            referrerAd: metadata.referrerAd
          });
        case 16:
          pageId = _context6.sent;
          _context6.next = 23;
          break;
        case 19:
          // If we're not scraping page, still create a database entry (without)
          // any of the scraped contents
          db = _db2["default"].getInstance();
          _context6.next = 22;
          return db.archivePage({
            job_id: FLAGS.jobId,
            crawl_id: CRAWL_ID,
            timestamp: new Date(),
            url: page.url(),
            crawl_list_url: url,
            page_type: metadata.pageType,
            referrer_ad: metadata.referrerAd,
            referrer_page: metadata.referrerPageId,
            referrer_page_url: metadata.referrerPageUrl
          });
        case 22:
          pageId = _context6.sent;
        case 23:
          if (!FLAGS.scrapeOptions.scrapeAds) {
            _context6.next = 26;
            break;
          }
          _context6.next = 26;
          return (0, _adScraper.scrapeAdsOnPage)(page, {
            crawlListUrl: url,
            pageType: metadata.pageType,
            parentPageId: pageId
          });
        case 26:
          if (!FLAGS.scrapeOptions.captureThirdPartyRequests) {
            _context6.next = 47;
            break;
          }
          log.info("".concat(url, ": Saving same-site and cross-site requests"));
          _db = _db2["default"].getInstance();
          _iterator2 = _createForOfIteratorHelper(requests);
          _context6.prev = 30;
          _iterator2.s();
        case 32:
          if ((_step2 = _iterator2.n()).done) {
            _context6.next = 39;
            break;
          }
          request = _step2.value;
          request.parent_page = pageId;
          _context6.next = 37;
          return _db.archiveRequest(request);
        case 37:
          _context6.next = 32;
          break;
        case 39:
          _context6.next = 44;
          break;
        case 41:
          _context6.prev = 41;
          _context6.t0 = _context6["catch"](30);
          _iterator2.e(_context6.t0);
        case 44:
          _context6.prev = 44;
          _iterator2.f();
          return _context6.finish(44);
        case 47:
          // Clean up event listeners
          page.removeAllListeners('request');
          _context6.next = 50;
          return page.setRequestInterception(false);
        case 50:
          return _context6.abrupt("return", pageId);
        case 51:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[30, 41, 44, 47]]);
  }));
  return _loadAndHandlePage.apply(this, arguments);
}
function scrollDownPage(_x5) {
  return _scrollDownPage.apply(this, arguments);
}
function _scrollDownPage() {
  _scrollDownPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(page) {
    var innerHeight, scrollY, scrollHeight, i, xloc, yloc, ydelta;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          log.info("".concat(page.url(), ": Scrolling page from top to bottom"));
          _context7.next = 3;
          return page.evaluate(function () {
            return window.innerHeight;
          });
        case 3:
          innerHeight = _context7.sent;
          _context7.next = 6;
          return page.evaluate(function () {
            return window.scrollY;
          });
        case 6:
          scrollY = _context7.sent;
          _context7.next = 9;
          return page.evaluate(function () {
            return document.body.scrollHeight;
          });
        case 9:
          scrollHeight = _context7.sent;
          i = 0; // Scroll until at the bottom of the page or 30 iterations pass
        case 11:
          if (!(scrollY + innerHeight < scrollHeight && i < 30)) {
            _context7.next = 27;
            break;
          }
          // set a screen position to scroll from
          xloc = randrange(50, 100);
          yloc = randrange(50, 100); // Scroll a random amount
          ydelta = randrange(200, 400); // puppeteer provides current mouse position to wheel mouse event
          _context7.next = 17;
          return page.mouse.move(xloc, yloc);
        case 17:
          _context7.next = 19;
          return page.mouse.wheel({
            deltaY: ydelta
          });
        case 19:
          _context7.next = 21;
          return (0, _timeout.sleep)(1000);
        case 21:
          _context7.next = 23;
          return page.evaluate(function () {
            return window.scrollY;
          });
        case 23:
          scrollY = _context7.sent;
          // scrollHeight = await page.evaluate(() => document.body.scrollHeight);
          i += 1;
          _context7.next = 11;
          break;
        case 27:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  }));
  return _scrollDownPage.apply(this, arguments);
}
function randrange(low, high) {
  return Math.random() * (high - low) + low;
}
function getPublicIp() {
  return _getPublicIp.apply(this, arguments);
}
function _getPublicIp() {
  _getPublicIp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var v4, v6;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _publicIp.publicIpv4)();
        case 3:
          v4 = _context8.sent;
          if (!v4) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", v4);
        case 6:
          _context8.next = 23;
          break;
        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          _context8.prev = 11;
          _context8.next = 14;
          return (0, _publicIp.publicIpv6)();
        case 14:
          v6 = _context8.sent;
          if (!v6) {
            _context8.next = 17;
            break;
          }
          return _context8.abrupt("return", v6);
        case 17:
          _context8.next = 23;
          break;
        case 19:
          _context8.prev = 19;
          _context8.t1 = _context8["catch"](11);
          console.log(_context8.t1);
          return _context8.abrupt("return", null);
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 8], [11, 19]]);
  }));
  return _getPublicIp.apply(this, arguments);
}