"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _commandLineArgs = _interopRequireDefault(require("command-line-args"));
var _commandLineUsage = _interopRequireDefault(require("command-line-usage"));
var _fs = _interopRequireDefault(require("fs"));
var _os = _interopRequireDefault(require("os"));
var _sourceMapSupport = _interopRequireDefault(require("source-map-support"));
var crawler = _interopRequireWildcard(require("./crawler.js"));
var _log = require("./util/log.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
console.log(process.argv);
_sourceMapSupport["default"].install();
var optionsDefinitions = [{
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'Display this usage guide.',
  group: 'main'
}, {
  name: 'crawl_list',
  type: String,
  description: 'A text file containing URLs to crawl, one URL per line',
  group: 'main'
}, {
  name: 'crawl_list_with_referrer_ads',
  type: String,
  description: 'A CSV with the columns (url, ad_id) containing URLs to crawl, and the ad_id of the referrer ad. Use this option instead of --crawl_list if scraping ad landing pages separately from ads, to avoid profile pollution.',
  group: 'main'
}, {
  name: 'output_dir',
  type: String,
  description: 'Directory where screenshot, HTML, and MHTML files will be saved.',
  group: 'main'
}, {
  name: 'name',
  type: String,
  description: 'Name of this crawl, for your reference. (Optional)',
  group: 'main'
}, {
  name: 'crawl_id',
  type: Number,
  description: 'If resuming a previous crawl, the id of the previous crawl (Optional).',
  group: 'main'
}, {
  name: 'job_id',
  alias: 'j',
  type: Number,
  description: 'ID of the job that is managing this crawl (Optional, required if run via the crawl coordinator)',
  group: 'main'
}, {
  name: 'crawler_hostname',
  type: String,
  description: 'The hostname of this crawler (Optional). Defaults to "os.hostname()", but if this crawler is being run in a Docker container, you must manually supply the hostname of the Docker host to correctly tag screenshots.',
  defaultValue: _os["default"].hostname(),
  group: 'main'
}, {
  name: 'log_level',
  type: String,
  description: 'Sets the level of logging verbosity. Choose one of the following: error > warning > info > debug > verbose. Defaults to "info"',
  defaultValue: 'info',
  group: 'main'
}, {
  name: 'pg_conf_file',
  type: String,
  description: 'JSON file with the Postgres connection parameters: host, port, database, user, password. If no file is supplied, these can also be passed in the below command line flags.',
  group: 'pg'
}, {
  name: 'pg_host',
  type: String,
  description: 'Hostname of the postgres instance to connect to. (Default: localhost)',
  defaultValue: 'localhost',
  group: 'pg'
}, {
  name: 'pg_port',
  type: Number,
  description: 'Port of the postgres instance to connect to. (Default: 5432) ',
  defaultValue: 5432,
  group: 'pg'
}, {
  name: 'pg_database',
  type: String,
  description: 'Name of postgres database. (Default: adscraper)',
  defaultValue: 'adscraper',
  group: 'pg'
}, {
  name: 'pg_user',
  type: String,
  description: 'Name of postgres user',
  group: 'pg'
}, {
  name: 'pg_password',
  type: String,
  description: 'Password for postgres user',
  group: 'pg'
}, {
  name: 'headless',
  type: String,
  description: 'Which Puppeteer headless mode the crawler should run in. Either "true", "false", or "new". (Default: new)',
  defaultValue: "new",
  group: 'chromeOptions'
}, {
  name: 'profile_dir',
  type: String,
  description: 'Directory of the profile (user data directory) that Puppeteer should use for this crawl (Optional). Provide this if you want a profile that can be reused between crawls. If not provided (for stateless crawls), uses a new, empty profile.',
  group: 'chromeOptions'
}, {
  name: 'executable_path',
  type: String,
  description: 'Path to the Chrome executable to use for this crawl (Optional). If not provided, uses the default Puppeteer executable.',
  group: 'chromeOptions'
}, {
  name: 'shuffle_crawl_list',
  type: Boolean,
  description: 'Include this arg to randomize the order the URLs in the crawl list are visited.',
  group: 'crawlOptions'
}, {
  name: 'crawl_article',
  type: Boolean,
  description: 'Crawl in article mode: if included, in addition to crawling the home page, crawl the first article in the site\'s RSS feed.',
  group: 'crawlOptions'
}, {
  name: 'crawl_page_with_ads',
  type: Boolean,
  description: 'Crawl page with ads: if included, in addition to crawling the home page, crawl a page on this domain that has ads.',
  group: 'crawlOptions'
}, {
  name: 'scrape_site',
  type: Boolean,
  description: 'If included, the crawler will scrape the content of the sites in the crawl list.',
  group: 'scrapeOptions'
}, {
  name: 'scrape_ads',
  type: Boolean,
  description: 'If included, the crawler will scrape the content of ads on the sites in the crawl list.',
  group: 'scrapeOptions'
}, {
  name: 'capture_third_party_request_urls',
  type: Boolean,
  description: 'If included, the crawler will capture the URLs of any third-party requests made by websites (can be used for measuring tracking in conjunction with a tracker URL list).',
  group: 'scrapeOptions'
}, {
  name: 'click_ads',
  type: String,
  description: 'Specify whether to click on ads. Must be one of: noClick, clickAndBlockLoad, or clickAndScrapeLandingPage. If noClick, no ads will be clicked. If "clickAndBlockLoad", the ads will be clicked, but prevented from loading, and the initial URL of the ad will be stored in the database. If "clickAdAndScrapeLandingPage", ads will be clicked, and the landing page content will be scraped. The --scrape_ads arg must also be used. Default: "noClick"',
  defaultValue: 'noClick',
  group: 'scrapeOptions'
}, {
  name: 'screenshot_ads_with_context',
  type: Boolean,
  description: 'If included, when screenshotting ads, includes a 150px margin around the ad to provide context of where it is on the page.',
  defaultValue: false,
  group: 'scrapeOptions'
}];
var options = (0, _commandLineArgs["default"])(optionsDefinitions)._all;
var usage = [{
  header: 'AdScraper Crawl Worker',
  content: 'Crawls pages and ads in a Puppeteer instance.'
}, {
  header: 'Main Options',
  group: 'main',
  optionList: optionsDefinitions
}, {
  header: 'Database Configuration',
  optionList: optionsDefinitions,
  group: 'pg'
}, {
  header: 'Puppeteer Options',
  optionList: optionsDefinitions,
  group: 'chromeOptions'
}, {
  header: 'Crawl Options',
  group: 'crawlOptions',
  optionList: optionsDefinitions
}, {
  header: 'Scrape Options',
  group: 'scrapeOptions',
  optionList: optionsDefinitions
}];
if (options.help) {
  console.log((0, _commandLineUsage["default"])(usage));
  process.exit(0);
}
// if (!options.crawl_list) {
//   console.log('Missing required parameter: --crawl_list');
//   console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
//   process.exit(1);
// }
if (!options.crawl_list && !options.crawl_list_with_referrer_ads) {
  console.log('Missing required parameter: --crawl_list OR --crawl_list_with_referrer_ads');
  console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
  process.exit(1);
}
if (options.crawl_list && options.crawl_list_with_referrer_ads) {
  console.log('Cannot provide both --crawl_list and --crawl_list_with_referrer_ads flags');
  console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
  process.exit(1);
}
if (!options.output_dir) {
  console.log('Missing required parameter: --output_dir');
  console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
  process.exit(1);
}
if (options.click_ads !== 'noClick' && options.click_ads !== 'clickAndBlockLoad' && options.click_ads !== 'clickAndScrapeLandingPage') {
  console.log('--clickAds must be one of "noClick", "clickAndBlockLoad", or "clickAndScrapeLandingPage"');
  console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
  process.exit(1);
}
var headless;
if (options.headless == 'true') {
  headless = true;
} else if (options.headless == 'false') {
  headless = false;
} else if (options.headless == 'new' || options.headless == undefined) {
  headless = 'new';
} else {
  console.log('Value of --headless must be either "true", "false", or "new"');
  console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
  process.exit(1);
}
var logLevel;
switch (options.log_level) {
  case 'error':
    logLevel = _log.LogLevel.ERROR;
    break;
  case 'warning':
    logLevel = _log.LogLevel.WARNING;
    break;
  case 'info':
    logLevel = _log.LogLevel.INFO;
    break;
  case 'debug':
    logLevel = _log.LogLevel.DEBUG;
    break;
  case 'verbose':
    logLevel = _log.LogLevel.VERBOSE;
    break;
  default:
    console.log("Invalid log level: ".concat(options.log_level));
    console.log('Run "node gen/crawler-cli.js --help" to view usage guide');
    process.exit(1);
}
var pgConf;
if (options.pg_conf_file && _fs["default"].existsSync(options.pg_conf_file)) {
  pgConf = JSON.parse(_fs["default"].readFileSync(options.pg_conf_file).toString());
} else {
  pgConf = {
    host: options.pg_host,
    port: options.pg_port,
    user: options.pg_user,
    password: options.pg_password,
    database: options.pg_database
  };
}
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        _context.next = 3;
        return crawler.crawl({
          name: options.name,
          jobId: options.job_id,
          outputDir: options.output_dir,
          pgConf: pgConf,
          crawlerHostname: options.crawler_hostname,
          crawlListFile: options.crawl_list ? options.crawl_list : options.crawl_list_with_referrer_ads,
          crawlListHasReferrerAds: options.crawl_list_with_referrer_ads != undefined,
          crawlId: options.crawl_id,
          logLevel: logLevel,
          chromeOptions: {
            headless: headless,
            profileDir: options.profile_dir,
            executablePath: options.executable_path
          },
          crawlOptions: {
            shuffleCrawlList: Boolean(options.shuffleCrawlList),
            crawlAdditionalArticlePage: Boolean(options.crawl_article),
            crawlAdditionalPageWithAds: Boolean(options.crawl_page_with_ads)
          },
          scrapeOptions: {
            scrapeSite: Boolean(options.scrape_site),
            scrapeAds: Boolean(options.scrape_ads),
            clickAds: options.click_ads,
            screenshotAdsWithContext: Boolean(options.screenshot_ads_with_context),
            captureThirdPartyRequests: Boolean(options.capture_third_party_request_urls)
          }
        });
      case 3:
        console.log('Crawl succeeded');
        process.exit(0);
        _context.next = 12;
        break;
      case 7:
        _context.prev = 7;
        _context.t0 = _context["catch"](0);
        console.log(_context.t0);
        console.log('Crawl failed');
        process.exit(1);
      case 12:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 7]]);
}))();