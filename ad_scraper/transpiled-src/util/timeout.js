"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAsyncTimeout = createAsyncTimeout;
exports.sleep = sleep;
// Asynchronous timeout function. Returns a Promise, which throws an Error
// with the given |message| if |ms| milliseconds passes. Also returns a
// timeout id, can be used to cancel the timeout.
function createAsyncTimeout(message, ms) {
  var timeoutId;
  var timeout = new Promise(function (_, reject) {
    timeoutId = setTimeout(function () {
      reject(new Error("".concat(message, " - ").concat(ms, "ms")));
    }, ms);
  });
  // @ts-ignore
  return [timeout, timeoutId];
}
// Asynchronous sleep function. Returns a Promise that resolves after |ms|
// milliseconds.
function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}