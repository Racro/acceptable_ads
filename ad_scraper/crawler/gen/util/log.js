import chalk from 'chalk';
import fs from 'fs';
import dayjs from 'dayjs';
import path from 'path';
// Declared here, set when writeLog is called for the first time
// (after global vars are initialized)
let logPath;
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
    LogLevel[LogLevel["VERBOSE"] = 5] = "VERBOSE";
})(LogLevel || (LogLevel = {}));
export function error(e) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'ERROR',
        message: e.message,
        stack: e.stack
    };
    if (FLAGS.logLevel >= LogLevel.ERROR) {
        printLog(jsonLog, chalk.red);
    }
    writeLog(jsonLog);
}
export function strError(message) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'ERROR',
        message: message
    };
    if (FLAGS.logLevel >= LogLevel.ERROR) {
        printLog(jsonLog, chalk.red);
    }
    writeLog(jsonLog);
}
export function warning(message) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'WARNING',
        message: message
    };
    if (FLAGS.logLevel >= LogLevel.WARNING) {
        printLog(jsonLog, chalk.yellow);
    }
    writeLog(jsonLog);
}
export function info(message) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'INFO',
        message: message
    };
    if (FLAGS.logLevel >= LogLevel.INFO) {
        printLog(jsonLog, chalk.whiteBright);
    }
    writeLog(jsonLog);
}
export function debug(message) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'DEBUG',
        message: message
    };
    if (FLAGS.logLevel >= LogLevel.DEBUG) {
        printLog(jsonLog, chalk.whiteBright.dim);
        writeLog(jsonLog);
    }
}
export function verbose(message) {
    let jsonLog = {
        ts: dayjs().format(),
        level: 'VERBOSE',
        message: message
    };
    if (FLAGS.logLevel >= LogLevel.VERBOSE) {
        printLog(jsonLog, chalk.white.dim);
        writeLog(jsonLog);
    }
}
function writeLog(l) {
    if (!logPath) {
        let logDir = path.resolve(FLAGS.outputDir, 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        let dateStr = dayjs().format();
        logPath = path.resolve(logDir, `crawl_${dateStr}_${FLAGS.name}.txt`);
    }
    const log = formatLog(l);
    fs.writeFile(logPath, log + '\n', { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
function formatLog(l) {
    return `[${l.level} ${l.ts}] ${l.message}${l.stack ? '\n' + l.stack : ''}`;
}
function printLog(l, color) {
    console.log(color(formatLog(l)));
}
//# sourceMappingURL=log.js.map