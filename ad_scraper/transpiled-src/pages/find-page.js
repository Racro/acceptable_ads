"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findArticle = findArticle;
exports.findPageWithAds = findPageWithAds;
exports.randomGuessPage = randomGuessPage;
var adDetection = _interopRequireWildcard(require("../ads/ad-detection.js"));
var _getRssArticle = _interopRequireDefault(require("./get-rss-article.js"));
var log = _interopRequireWildcard(require("../util/log.js"));
var _timeout = require("../util/timeout.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
/**
 * Randomly picks links from a page, opens them in a new tab, and checks if it
 * meets the criteria.
 * Returns the first link meeting the criteria
 * @param page Page to look at links from
 * @param guessCriteria Function to be evaluated on a candidate page
 * @param maxGuesses Maximum number of links to explore
 * @returns URL for the first matching page, or undefined if no page was found.
 */
function randomGuessPage(_x, _x2, _x3) {
  return _randomGuessPage.apply(this, arguments);
}
/**
 * Finds an article linked from the given page. First tries to locate an
 * RSS feed, falls back to randomly picking links.
 * When randomly picking, uses the readability library to determine if a page
 * is an article (same util used by Firefox for reader mode).
 * @param page Page to look for articles on
 * @returns Article URL, or undefined if no article was found.
 */
function _randomGuessPage() {
  _randomGuessPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(page, maxGuesses, guessCriteria) {
    var sameDomainLinks, guessPage, currentGuess, idx, url;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return page.evaluate(function () {
            return Array.from(document.querySelectorAll('a')).map(function (a) {
              return a.href;
            }).filter(function (href) {
              try {
                return new URL(href).hostname == window.location.hostname;
              } catch (e) {
                return false;
              }
            });
          });
        case 2:
          sameDomainLinks = _context.sent;
          if (!(sameDomainLinks.length === 0)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return");
        case 5:
          _context.next = 7;
          return page.browser().newPage();
        case 7:
          guessPage = _context.sent;
          currentGuess = 0;
        case 9:
          if (!(sameDomainLinks.length > 0 && currentGuess < maxGuesses)) {
            _context.next = 35;
            break;
          }
          idx = getRandomInt(0, sameDomainLinks.length);
          url = sameDomainLinks.splice(idx, 1)[0]; // log.info(`${page.url()}: Trying link ${url}`);
          _context.prev = 12;
          _context.next = 15;
          return guessPage["goto"](url);
        case 15:
          _context.next = 17;
          return (0, _timeout.sleep)(1500);
        case 17:
          _context.next = 19;
          return guessCriteria(guessPage);
        case 19:
          if (!_context.sent) {
            _context.next = 23;
            break;
          }
          _context.next = 22;
          return guessPage.close();
        case 22:
          return _context.abrupt("return", url);
        case 23:
          _context.next = 32;
          break;
        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](12);
          if (!(_context.t0.name === 'TimeoutError')) {
            _context.next = 31;
            break;
          }
          return _context.abrupt("continue", 9);
        case 31:
          throw _context.t0;
        case 32:
          // log.info(`${page.url()}: Did not find a page meeting the criteria at ${url}`);
          currentGuess++;
          _context.next = 9;
          break;
        case 35:
          if (currentGuess !== maxGuesses) {
            // log.warning(`${page.url()}: Did not find a page meeting the criteria in ${maxGuesses} guesses`);
          } else {
            // log.warning(`${page.url()}: None of the links on the page met the criteria`);
          }
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[12, 25]]);
  }));
  return _randomGuessPage.apply(this, arguments);
}
function findArticle(_x4) {
  return _findArticle.apply(this, arguments);
}
function _findArticle() {
  _findArticle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(page) {
    var articleUrl, guessUrl;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          log.info("".concat(page.url(), ": Looking for article via RSS"));
          _context3.next = 3;
          return (0, _getRssArticle["default"])(page);
        case 3:
          articleUrl = _context3.sent;
          if (!articleUrl) {
            _context3.next = 7;
            break;
          }
          log.info("".concat(page.url(), ": Successfully found page with ads: ").concat(articleUrl));
          return _context3.abrupt("return", articleUrl);
        case 7:
          log.info("".concat(page.url(), ": No RSS feed available, for article by randomly guessing links"));
          _context3.next = 10;
          return randomGuessPage(page, 20, /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(page) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return page.evaluate(isReaderableScript);
                  case 2:
                    return _context2.abrupt("return", page.evaluate(function () {
                      // @ts-ignore
                      return isProbablyReaderable(document);
                    }));
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x6) {
              return _ref.apply(this, arguments);
            };
          }());
        case 10:
          guessUrl = _context3.sent;
          log.info("".concat(page.url(), ": Guessing that this page is an article: ").concat(articleUrl));
          return _context3.abrupt("return", guessUrl);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _findArticle.apply(this, arguments);
}
function findPageWithAds(_x5) {
  return _findPageWithAds.apply(this, arguments);
}
function _findPageWithAds() {
  _findPageWithAds = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(page) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          log.info("".concat(page.url(), ": Finding random page with ads on it"));
          return _context5.abrupt("return", randomGuessPage(page, 20, /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(page) {
              var ads;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return adDetection.identifyAdsInDOM(page);
                  case 2:
                    ads = _context4.sent;
                    return _context4.abrupt("return", ads.size > 0);
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x7) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _findPageWithAds.apply(this, arguments);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
var isReaderableScript = "\n    /* eslint-env es6:false */\n    /* globals exports */\n    /*\n    * Copyright (c) 2010 Arc90 Inc\n    *\n    * Licensed under the Apache License, Version 2.0 (the \"License\");\n    * you may not use this file except in compliance with the License.\n    * You may obtain a copy of the License at\n    *\n    *     http://www.apache.org/licenses/LICENSE-2.0\n    *\n    * Unless required by applicable law or agreed to in writing, software\n    * distributed under the License is distributed on an \"AS IS\" BASIS,\n    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    * See the License for the specific language governing permissions and\n    * limitations under the License.\n    */\n\n    /*\n    * This code is heavily based on Arc90's readability.js (1.7.1) script\n    * available at: http://code.google.com/p/arc90labs-readability\n    */\n\n    var REGEXPS = {\n      // NOTE: These two regular expressions are duplicated in\n      // Readability.js. Please keep both copies in sync.\n      unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,\n      okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,\n    };\n\n    function isNodeVisible(node) {\n      // Have to null-check node.style to deal with SVG and MathML nodes.\n      return (!node.style || node.style.display != \"none\") && !node.hasAttribute(\"hidden\")\n        && (!node.hasAttribute(\"aria-hidden\") || node.getAttribute(\"aria-hidden\") != \"true\");\n    }\n\n    /**\n     * Decides whether or not the document is reader-able without parsing the whole thing.\n     *\n     * @return boolean Whether or not we suspect Readability.parse() will suceeed at returning an article object.\n     */\n    function isProbablyReaderable(doc, isVisible) {\n      if (!isVisible) {\n        isVisible = isNodeVisible;\n      }\n\n      var nodes = doc.querySelectorAll(\"p, pre\");\n\n      // Get <div> nodes which have <br> node(s) and append them into the 'nodes' variable.\n      // Some articles' DOM structures might look like\n      // <div>\n      //   Sentences<br>\n      //   <br>\n      //   Sentences<br>\n      // </div>\n      var brNodes = doc.querySelectorAll(\"div > br\");\n      if (brNodes.length) {\n        var set = new Set(nodes);\n        [].forEach.call(brNodes, function(node) {\n          set.add(node.parentNode);\n        });\n        nodes = Array.from(set);\n      }\n\n      var score = 0;\n      // This is a little cheeky, we use the accumulator 'score' to decide what to return from\n      // this callback:\n      return [].some.call(nodes, function(node) {\n        if (!isVisible(node))\n          return false;\n\n        var matchString = node.className + \" \" + node.id;\n        if (REGEXPS.unlikelyCandidates.test(matchString) &&\n            !REGEXPS.okMaybeItsACandidate.test(matchString)) {\n          return false;\n        }\n\n        if (node.matches(\"li p\")) {\n          return false;\n        }\n\n        var textContentLength = node.textContent.trim().length;\n        if (textContentLength < 140) {\n          return false;\n        }\n\n        score += Math.sqrt(textContentLength - 140);\n\n        if (score > 20) {\n          return true;\n        }\n        return false;\n      });\n    }\n\n    if (typeof exports === \"object\") {\n      exports.isProbablyReaderable = isProbablyReaderable;\n    }\n    ";