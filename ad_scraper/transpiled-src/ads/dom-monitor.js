"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectDOMListener = injectDOMListener;
exports.matchDOMUpdateToAd = matchDOMUpdateToAd;
exports.trackDOMUpdate = trackDOMUpdate;
var log = _interopRequireWildcard(require("../util/log.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
// These functions are used to instrument a page to monitor DOM mutations.
// - |injectDOMListener| should be injected into the page context on load, and
//   tracks all mutations to the DOM.
// - |trackDOMUpdate| receives the mutation events from the listener, and stores
//   temporary metadata about which page and element the mutation occurred on
// - |matchDOMUpdateToAd| matches mutation events to a list of provided known
//   ads.
var pageToHandleToDOMMutatorUrls = new Map();
/**
* Injects MutationEvent listeners into the page to detect DOM changes
* (potentially) made by 3rd party scripts. DOM updates are relayed to puppeteer
* context by exposing the trackDOMUpdate function to the page.
* @param page Page to listen for DOM changes in.
*/
function injectDOMListener(_x) {
  return _injectDOMListener.apply(this, arguments);
}
/**
 * Puppeteer-side handler for receiving DOM mutation updates, for tracking
 * third party scripts that change the DOM.
 * Takes a browser-side stack trace and DOM element ID from a MutationEvent,
 * extracts the JS resource URLs from the stack trace, and stores a mapping
 * of ElementHandle to URLs in the globally scoped DOM update map.
 * @param page           Page the DOM update occurred on
 * @param data.eventType Type of the detected MutationEvent
 * @param data.elementId ID of the mutated element or its parent
 * @param data.stack     Stack trace of the mutation event
 */
function _injectDOMListener() {
  _injectDOMListener = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(page) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          log.debug("".concat(page.url(), ": Injecting DOM listeners"));
          _context.next = 3;
          return page.exposeFunction('sendToPuppeteer', function (data) {
            trackDOMUpdate(page, data);
          });
        case 3:
          _context.next = 5;
          return page.evaluateOnNewDocument(function () {
            if (window.top !== window.self) {
              return;
            }
            var idCounter = 1;
            function reportDOMMutation(type, target, stack) {
              if (!stack) {
                return; // Update data is useless if we don't have a stack.
              }
              // Get the new Element, or the new Node's parent Element.
              var element;
              if (target instanceof Element) {
                element = target;
              } else {
                var node = target;
                if (!node.parentElement) {
                  return;
                }
                element = node.parentElement;
              }
              // Label the element with an id if necessary so that puppeteer can get a
              // handle to it.
              element.setAttribute('mutatedelement', idCounter.toString());
              // @ts-ignore
              sendToPuppeteer({
                eventType: type,
                elementId: idCounter,
                stack: stack
              });
              idCounter++;
            }
            document.addEventListener('DOMNodeInserted', function (e) {
              var stack = new Error().stack; // Record stack trace of modifying code
              var event = e;
              if (!event.target) {
                return;
              }
              reportDOMMutation('DOMNodeInserted', event.target, stack);
            });
            document.addEventListener('DOMNodeRemoved', function (e) {
              var stack = new Error().stack;
              var event = e;
              reportDOMMutation('DOMNodeRemoved', event.relatedNode, stack);
            });
            document.addEventListener('DOMCharacterDataModified', function (e) {
              var stack = new Error().stack;
              var event = e;
              reportDOMMutation('DOMCharacterDataModified', event.relatedNode, stack);
            });
          });
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _injectDOMListener.apply(this, arguments);
}
function trackDOMUpdate(_x2, _x3) {
  return _trackDOMUpdate.apply(this, arguments);
}
/**
 * Given a list of element handles to ads, returns a list of DOM mutations
 * to those elements.
 * @param page The page the ad(s) appeared on
 * @param adHandleToAdId Handles to ads
 */
function _trackDOMUpdate() {
  _trackDOMUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(page, data) {
    var handle, lines, urls, urlSet, handleToURLs, prevUrls;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return page.$("[mutatedelement=\"".concat(data.elementId, "\"]"));
        case 3:
          handle = _context2.sent;
          if (handle) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return");
        case 6:
          // Extract URLs from stack trace
          lines = data.stack.split('\n').slice(1);
          urls = lines.map(function (line) {
            return line.substring(7);
          }) // Remove 'at' text at beginning of each line
          .filter(function (line) {
            return line.includes('http://') || line.includes('https://');
          }) // URL lines only
          .map(function (line) {
            if (line.includes('(') && line.includes(')')) {
              // Extract URL from inside parentheses
              var parensContentRegEx = /\(([^()]*)\)/g;
              var regexResult = parensContentRegEx.exec(line);
              if (regexResult && regexResult[1].startsWith('http')) {
                return regexResult[1];
              } else {
                return null;
              }
            } else if (line.startsWith('http')) {
              // Or just grab it from the start of the line
              return line;
            } else {
              return null;
            }
          }).filter(function (line) {
            return line !== null;
          }).map(function (line) {
            return line.split(':').slice(0, 2).join(':');
          }) // Remove line numbers
          .filter(function (url) {
            return new URL(url).hostname !== new URL(page.url()).hostname;
          }); // Filter 1st party scripts
          urlSet = new Set(urls); // Look up this page's DOM update map
          handleToURLs = pageToHandleToDOMMutatorUrls.get(page);
          if (!handleToURLs) {
            handleToURLs = new Map();
            pageToHandleToDOMMutatorUrls.set(page, handleToURLs);
          }
          // Store elementHandle->URLs mapping, merge with existing URLs if they exist
          prevUrls = handleToURLs.get(handle);
          if (!prevUrls) {
            handleToURLs.set(handle, urlSet);
          } else {
            handleToURLs.set(handle, new Set([].concat(_toConsumableArray(prevUrls), _toConsumableArray(urlSet))));
          }
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          log.error(_context2.t0);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _trackDOMUpdate.apply(this, arguments);
}
function matchDOMUpdateToAd(_x4, _x5) {
  return _matchDOMUpdateToAd.apply(this, arguments);
}
function _matchDOMUpdateToAd() {
  _matchDOMUpdateToAd = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(page, adHandleToAdId) {
    var adHandleToDOMMutatorUrls, handleToDOMMutatorUrls, _iterator, _step, _step$value, mutatedHandle, mutatorUrls, _iterator3, _step3, _step3$value, adHandle, match, adHandleUrlSet, mutations, _iterator2, _step2, _step2$value, _adHandle, _mutatorUrls, adId, _iterator4, _step4, url;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          adHandleToDOMMutatorUrls = new Map();
          handleToDOMMutatorUrls = pageToHandleToDOMMutatorUrls.get(page);
          if (handleToDOMMutatorUrls) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", []);
        case 4:
          // Iterate through mutations
          _iterator = _createForOfIteratorHelper(handleToDOMMutatorUrls);
          _context3.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context3.next = 33;
            break;
          }
          _step$value = _slicedToArray(_step.value, 2), mutatedHandle = _step$value[0], mutatorUrls = _step$value[1];
          // Check if ad handle matches mutated element handle
          _iterator3 = _createForOfIteratorHelper(adHandleToAdId);
          _context3.prev = 10;
          _iterator3.s();
        case 12:
          if ((_step3 = _iterator3.n()).done) {
            _context3.next = 23;
            break;
          }
          _step3$value = _slicedToArray(_step3.value, 1), adHandle = _step3$value[0];
          _context3.next = 16;
          return page.evaluate(function (mutated, detectedAd) {
            var current = mutated;
            while (current !== document.body && current.parentElement !== null) {
              if (current === detectedAd) {
                return true;
              }
              current = current.parentElement;
            }
            return false;
          }, mutatedHandle, adHandle);
        case 16:
          match = _context3.sent;
          if (!match) {
            _context3.next = 21;
            break;
          }
          adHandleUrlSet = adHandleToDOMMutatorUrls.get(adHandle);
          if (!adHandleUrlSet) {
            adHandleToDOMMutatorUrls.set(adHandle, mutatorUrls);
          } else {
            adHandleToDOMMutatorUrls.set(adHandle, new Set([].concat(_toConsumableArray(adHandleUrlSet), _toConsumableArray(mutatorUrls))));
          }
          return _context3.abrupt("break", 23);
        case 21:
          _context3.next = 12;
          break;
        case 23:
          _context3.next = 28;
          break;
        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](10);
          _iterator3.e(_context3.t0);
        case 28:
          _context3.prev = 28;
          _iterator3.f();
          return _context3.finish(28);
        case 31:
          _context3.next = 7;
          break;
        case 33:
          _context3.next = 38;
          break;
        case 35:
          _context3.prev = 35;
          _context3.t1 = _context3["catch"](5);
          _iterator.e(_context3.t1);
        case 38:
          _context3.prev = 38;
          _iterator.f();
          return _context3.finish(38);
        case 41:
          mutations = []; // Export list of mutations
          _iterator2 = _createForOfIteratorHelper(adHandleToDOMMutatorUrls);
          _context3.prev = 43;
          _iterator2.s();
        case 45:
          if ((_step2 = _iterator2.n()).done) {
            _context3.next = 54;
            break;
          }
          _step2$value = _slicedToArray(_step2.value, 2), _adHandle = _step2$value[0], _mutatorUrls = _step2$value[1];
          adId = adHandleToAdId.get(_adHandle);
          if (adId) {
            _context3.next = 50;
            break;
          }
          return _context3.abrupt("continue", 52);
        case 50:
          _iterator4 = _createForOfIteratorHelper(_mutatorUrls);
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              url = _step4.value;
              log.debug("Ad ".concat(adId, " was mutated by ").concat(url));
              mutations.push({
                ad_id: adId,
                url: url,
                hostname: new URL(url).hostname,
                type: 'DOM_mutation'
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        case 52:
          _context3.next = 45;
          break;
        case 54:
          _context3.next = 59;
          break;
        case 56:
          _context3.prev = 56;
          _context3.t2 = _context3["catch"](43);
          _iterator2.e(_context3.t2);
        case 59:
          _context3.prev = 59;
          _iterator2.f();
          return _context3.finish(59);
        case 62:
          return _context3.abrupt("return", mutations);
        case 63:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 35, 38, 41], [10, 25, 28, 31], [43, 56, 59, 62]]);
  }));
  return _matchDOMUpdateToAd.apply(this, arguments);
}