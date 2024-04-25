"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickAd = clickAd;
var log = _interopRequireWildcard(require("../util/log.js"));
var _pageScraper = require("../pages/page-scraper.js");
var _db = _interopRequireDefault(require("../util/db.js"));
var _timeout = require("../util/timeout.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Clicks on an ad, and starts a crawl on the page that it links to.
 * @param ad A handle to the ad to click on.
 * @param page The page the ad appears on.
 * @param parentDepth The depth of the parent page of the ad.
 * @param crawlId The database id of this crawl job.
 * @param adId The database id of the ad.
 * @param pageId The database id of the page.
 * @returns Promise that resolves when crawling is complete for the linked page,
 * and any sub pages opened by clicking on ads in the linked page.
 */
function clickAd(ad, page, adId, pageId, crawlListUrl) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var interceptNavigations, interceptPopups, cleanUp, ctPage, cdp, timeout, clickTimeout;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            // Create a function to clean up everything we're about to add
            cleanUp = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return cdp.send('Target.setAutoAttach', {
                        waitForDebuggerOnStart: false,
                        autoAttach: false,
                        flatten: true
                      });
                    case 2:
                      if (interceptNavigations) {
                        page.off('request', interceptNavigations);
                      }
                      if (interceptPopups) {
                        page.off('popup', interceptPopups);
                      }
                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function cleanUp() {
                return _ref2.apply(this, arguments);
              };
            }(); // Create timeout for processing overall clickthrough (including the landing page).
            // If it takes longer than this, abort handling this ad.
            // Reference to any new tab that is opened, that can be called in the
            // following timeout if necessary.
            _context8.next = 4;
            return BROWSER.target().createCDPSession();
          case 4:
            cdp = _context8.sent;
            timeout = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var _ctPage;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(ctPage && !ctPage.isClosed())) {
                      _context2.next = 3;
                      break;
                    }
                    _context2.next = 3;
                    return (_ctPage = ctPage) === null || _ctPage === void 0 ? void 0 : _ctPage.close();
                  case 3:
                    _context2.next = 5;
                    return cleanUp();
                  case 5:
                    reject(new Error("".concat(page.url(), ": Clickthrough timed out - ").concat(CLICKTHROUGH_TIMEOUT, "ms")));
                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            })), CLICKTHROUGH_TIMEOUT); // Create timeout for the click. If the click fails to do anything,
            // abort handing this ad.
            clickTimeout = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              var _ctPage2;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(ctPage && !ctPage.isClosed())) {
                      _context3.next = 3;
                      break;
                    }
                    _context3.next = 3;
                    return (_ctPage2 = ctPage) === null || _ctPage2 === void 0 ? void 0 : _ctPage2.close();
                  case 3:
                    _context3.next = 5;
                    return cleanUp();
                  case 5:
                    reject(new Error("".concat(page.url(), ": Ad click timed out - ").concat(AD_CLICK_TIMEOUT, "ms")));
                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            })), AD_CLICK_TIMEOUT); // This listener handles the case where the ad tries to navigate the
            // current tab to the ad's landing page. If this happens,
            // block the navigation, and then decide what to do based on what
            // the crawl job config says.
            // Note: request interception is already enabled for all pages crawled,
            // set in src/crawler.ts.
            interceptNavigations = function interceptNavigations(req) {
              _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                var db, newPage;
                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!(req.isNavigationRequest() && req.frame() === page.mainFrame())) {
                        _context4.next = 49;
                        break;
                      }
                      _context4.next = 3;
                      return req.abort('aborted', 1);
                    case 3:
                      clearTimeout(clickTimeout);
                      // Save the ad URL in the database.
                      db = _db["default"].getInstance();
                      _context4.next = 7;
                      return db.postgres.query('UPDATE ad SET url=$2 WHERE id=$1', [adId, req.url()]);
                    case 7:
                      if (!(FLAGS.scrapeOptions.clickAds == 'clickAndBlockLoad')) {
                        _context4.next = 15;
                        break;
                      }
                      // If blocking ads from loading, clean up the tab and continue.
                      log.verbose("".concat(page.url(), " Intercepted and blocked ad (navigation): ").concat(req.url()));
                      _context4.next = 11;
                      return cleanUp();
                    case 11:
                      resolve();
                      return _context4.abrupt("return");
                    case 15:
                      if (!(FLAGS.scrapeOptions.clickAds == 'clickAndScrapeLandingPage')) {
                        _context4.next = 44;
                        break;
                      }
                      // Open the blocked URL in a new tab, so that we can keep the previous
                      // one open.
                      log.verbose("".concat(page.url(), " Blocked attempted navigation to ").concat(req.url()));
                      _context4.next = 19;
                      return BROWSER.newPage();
                    case 19:
                      newPage = _context4.sent;
                      _context4.prev = 20;
                      ctPage = newPage;
                      log.debug("".concat(newPage.url(), ": Loading and scraping popup page"));
                      _context4.next = 25;
                      return newPage["goto"](req.url(), {
                        referer: req.headers().referer
                      });
                    case 25:
                      _context4.next = 27;
                      return (0, _timeout.sleep)(PAGE_SLEEP_TIME);
                    case 27:
                      _context4.next = 29;
                      return (0, _pageScraper.scrapePage)(newPage, {
                        pageType: _pageScraper.PageType.LANDING,
                        referrerPage: pageId,
                        referrerPageUrl: page.url(),
                        crawlListUrl: crawlListUrl,
                        referrerAd: adId
                      });
                    case 29:
                      clearTimeout(timeout);
                      resolve();
                      _context4.next = 36;
                      break;
                    case 33:
                      _context4.prev = 33;
                      _context4.t0 = _context4["catch"](20);
                      reject(_context4.t0);
                    case 36:
                      _context4.prev = 36;
                      _context4.next = 39;
                      return newPage.close();
                    case 39:
                      _context4.next = 41;
                      return cleanUp();
                    case 41:
                      return _context4.finish(36);
                    case 42:
                      _context4.next = 47;
                      break;
                    case 44:
                      log.warning("".concat(page.url(), " Should not reach this point in interceptNavigations()"));
                      _context4.next = 47;
                      return req["continue"]({}, 0);
                    case 47:
                      _context4.next = 57;
                      break;
                    case 49:
                      _context4.prev = 49;
                      _context4.next = 52;
                      return req["continue"]({}, 0);
                    case 52:
                      _context4.next = 57;
                      break;
                    case 54:
                      _context4.prev = 54;
                      _context4.t1 = _context4["catch"](49);
                      log.error(_context4.t1);
                    case 57:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4, null, [[20, 33, 36, 42], [49, 54]]);
              }))();
            };
            page.on('request', interceptNavigations);
            // Next, handle the case where the ad opens a popup. We have two methods
            // for handling this, depending on the desired click behavior.
            // If we want to see the initial navigation request to get the ad URL,
            // and if we want to block the popup from loading, we need to use the
            // the Chrome DevTools protocol to auto-attach to the popup when it opens,
            // and intercept the request.
            // Enable auto-attaching the devtools debugger to new targets (i.e. popups)
            _context8.next = 11;
            return cdp.send('Target.setAutoAttach', {
              waitForDebuggerOnStart: true,
              autoAttach: true,
              flatten: true,
              filter: [{
                type: 'page',
                exclude: false
              }]
            });
          case 11:
            cdp.on('Target.attachedToTarget', /*#__PURE__*/function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(_ref6) {
                var sessionId, targetInfo, connection, popupCdp;
                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      sessionId = _ref6.sessionId, targetInfo = _ref6.targetInfo;
                      _context6.prev = 1;
                      // Get the CDP session corresponding to the popup
                      connection = cdp.connection();
                      if (connection) {
                        _context6.next = 8;
                        break;
                      }
                      reject(new Error('Could not get puppeteer\'s CDP connection'));
                      _context6.next = 7;
                      return cleanUp();
                    case 7:
                      return _context6.abrupt("return");
                    case 8:
                      popupCdp = connection.session(sessionId);
                      if (popupCdp) {
                        _context6.next = 14;
                        break;
                      }
                      reject(new Error('Could not get CDP session of caught popup'));
                      _context6.next = 13;
                      return cleanUp();
                    case 13:
                      return _context6.abrupt("return");
                    case 14:
                      _context6.next = 16;
                      return popupCdp.send('Fetch.enable');
                    case 16:
                      // Set up a listener to catch and block the initial navigation request
                      popupCdp.on('Fetch.requestPaused', /*#__PURE__*/function () {
                        var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref8) {
                          var requestId, request, db;
                          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                            while (1) switch (_context5.prev = _context5.next) {
                              case 0:
                                requestId = _ref8.requestId, request = _ref8.request;
                                // TODO: save this URL somewhere
                                log.verbose("".concat(page.url(), ": Intercepted popup URL: ").concat(request.url));
                                // Save the ad URL in the database.
                                db = _db["default"].getInstance();
                                _context5.next = 5;
                                return db.postgres.query('UPDATE ad SET url=$2 WHERE id=$1', [adId, request.url]);
                              case 5:
                                log.debug("".concat(page.url(), ": Saved ad URL for ad ").concat(adId));
                                if (!(FLAGS.scrapeOptions.clickAds == 'clickAndBlockLoad')) {
                                  _context5.next = 18;
                                  break;
                                }
                                clearTimeout(clickTimeout);
                                log.verbose("".concat(page.url(), ": Aborting popup request..."));
                                // If we're blocking the popup, prevent navigation from running
                                _context5.next = 11;
                                return popupCdp === null || popupCdp === void 0 ? void 0 : popupCdp.send('Fetch.failRequest', {
                                  requestId: requestId,
                                  errorReason: 'Aborted'
                                });
                              case 11:
                                _context5.next = 13;
                                return popupCdp === null || popupCdp === void 0 ? void 0 : popupCdp.send('Target.closeTarget', {
                                  targetId: targetInfo.targetId
                                });
                              case 13:
                                _context5.next = 15;
                                return cleanUp();
                              case 15:
                                resolve();
                                _context5.next = 23;
                                break;
                              case 18:
                                log.verbose("".concat(page.url(), " Allowing popup requests to continue, letting page.on(popup) handle it..."));
                                // Otherwise, disable request interception and continue.
                                _context5.next = 21;
                                return popupCdp === null || popupCdp === void 0 ? void 0 : popupCdp.send('Fetch.continueRequest', {
                                  requestId: requestId
                                });
                              case 21:
                                _context5.next = 23;
                                return popupCdp === null || popupCdp === void 0 ? void 0 : popupCdp.send('Fetch.disable');
                              case 23:
                              case "end":
                                return _context5.stop();
                            }
                          }, _callee5);
                        }));
                        return function (_x4) {
                          return _ref9.apply(this, arguments);
                        };
                      }());
                      // Allow the popup to continue executing and make the navigation request
                      _context6.prev = 17;
                      _context6.next = 20;
                      return popupCdp.send('Runtime.runIfWaitingForDebugger');
                    case 20:
                      _context6.next = 25;
                      break;
                    case 22:
                      _context6.prev = 22;
                      _context6.t0 = _context6["catch"](17);
                      // Sometimes this fails because the request is intercepted before
                      // this request is sent, and the target is already closed. However,
                      // in that case we successfully got the data (somehow) so we can
                      // safely do nothing here.
                      log.verbose("".concat(page.url(), ": Popup navigation request caught in CDP before resuming tab. Continuing..."));
                    case 25:
                      _context6.next = 32;
                      break;
                    case 27:
                      _context6.prev = 27;
                      _context6.t1 = _context6["catch"](1);
                      log.error(_context6.t1);
                      _context6.next = 32;
                      return cleanUp();
                    case 32:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6, null, [[1, 27], [17, 22]]);
              }));
              return function (_x3) {
                return _ref7.apply(this, arguments);
              };
            }());
            // If we want to allow the popup to load, we can listen for the popup
            // event in puppeteer and use that page.
            if (FLAGS.scrapeOptions.clickAds == 'clickAndScrapeLandingPage') {
              interceptPopups = function interceptPopups(newPage) {
                if (!newPage) {
                  return;
                }
                clearTimeout(clickTimeout);
                // If the ad click opened a new tab/popup, start crawling in the new tab.
                ctPage = newPage;
                log.debug("".concat(newPage.url(), ": Loading and scraping popup page"));
                // injectDOMListener(newPage);
                newPage.on('load', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        _context7.next = 3;
                        return (0, _timeout.sleep)(PAGE_SLEEP_TIME);
                      case 3:
                        _context7.next = 5;
                        return (0, _pageScraper.scrapePage)(newPage, {
                          pageType: _pageScraper.PageType.LANDING,
                          referrerPage: pageId,
                          referrerPageUrl: page.url(),
                          crawlListUrl: crawlListUrl,
                          referrerAd: adId
                        });
                      case 5:
                        clearTimeout(timeout);
                        resolve();
                        _context7.next = 12;
                        break;
                      case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7["catch"](0);
                        reject(_context7.t0);
                      case 12:
                        _context7.prev = 12;
                        if (newPage.isClosed()) {
                          _context7.next = 16;
                          break;
                        }
                        _context7.next = 16;
                        return newPage.close();
                      case 16:
                        _context7.next = 18;
                        return cleanUp();
                      case 18:
                        return _context7.finish(12);
                      case 19:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7, null, [[0, 9, 12, 19]]);
                })));
              };
              page.on('popup', interceptPopups);
            }
            // Finally click the ad
            log.info("".concat(page.url(), ": Clicking on ad ").concat(adId));
            // Attempt to use the built-in puppeteer click.
            _context8.next = 16;
            return ad.click({
              delay: 10
            });
          case 16:
            _context8.next = 24;
            break;
          case 18:
            _context8.prev = 18;
            _context8.t0 = _context8["catch"](0);
            log.error(_context8.t0);
            reject(_context8.t0);
            if (interceptNavigations) {
              page.off('request', interceptNavigations);
            }
            if (interceptPopups) {
              page.off('popup', interceptPopups);
            }
          case 24:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 18]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}