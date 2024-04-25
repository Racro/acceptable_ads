"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLevel = void 0;
exports.debug = debug;
exports.error = error;
exports.info = info;
exports.strError = strError;
exports.verbose = verbose;
exports.warning = warning;
var _chalk = _interopRequireDefault(require("chalk"));
var _fs = _interopRequireDefault(require("fs"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Declared here, set when writeLog is called for the first time
// (after global vars are initialized)
var logPath;
var LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
  LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
  LogLevel[LogLevel["INFO"] = 3] = "INFO";
  LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 5] = "VERBOSE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
function error(e) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'ERROR',
    message: e.message,
    stack: e.stack
  };
  if (FLAGS.logLevel >= LogLevel.ERROR) {
    printLog(jsonLog, _chalk["default"].red);
  }
  writeLog(jsonLog);
}
function strError(message) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'ERROR',
    message: message
  };
  if (FLAGS.logLevel >= LogLevel.ERROR) {
    printLog(jsonLog, _chalk["default"].red);
  }
  writeLog(jsonLog);
}
function warning(message) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'WARNING',
    message: message
  };
  if (FLAGS.logLevel >= LogLevel.WARNING) {
    printLog(jsonLog, _chalk["default"].yellow);
  }
  writeLog(jsonLog);
}
function info(message) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'INFO',
    message: message
  };
  if (FLAGS.logLevel >= LogLevel.INFO) {
    printLog(jsonLog, _chalk["default"].whiteBright);
  }
  writeLog(jsonLog);
}
function debug(message) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'DEBUG',
    message: message
  };
  if (FLAGS.logLevel >= LogLevel.DEBUG) {
    printLog(jsonLog, _chalk["default"].whiteBright.dim);
    writeLog(jsonLog);
  }
}
function verbose(message) {
  var jsonLog = {
    ts: (0, _dayjs["default"])().format(),
    level: 'VERBOSE',
    message: message
  };
  if (FLAGS.logLevel >= LogLevel.VERBOSE) {
    printLog(jsonLog, _chalk["default"].white.dim);
    writeLog(jsonLog);
  }
}
function writeLog(l) {
  if (!logPath) {
    var logDir = _path["default"].resolve(FLAGS.outputDir, 'logs');
    if (!_fs["default"].existsSync(logDir)) {
      _fs["default"].mkdirSync(logDir, {
        recursive: true
      });
    }
    var dateStr = (0, _dayjs["default"])().format();
    logPath = _path["default"].resolve(logDir, "crawl_".concat(dateStr, "_").concat(FLAGS.name, ".txt"));
  }
  var log = formatLog(l);
  _fs["default"].writeFile(logPath, log + '\n', {
    flag: 'a'
  }, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
function formatLog(l) {
  return "[".concat(l.level, " ").concat(l.ts, "] ").concat(l.message).concat(l.stack ? '\n' + l.stack : '');
}
function printLog(l, color) {
  console.log(color(formatLog(l)));
}