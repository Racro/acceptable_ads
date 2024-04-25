"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = urlToPathSafeStr;
function urlToPathSafeStr(url) {
  var parsed = new URL(url);
  if (parsed.pathname == '/') {
    return parsed.hostname;
  }
  return parsed.hostname + parsed.pathname.replace('/', '_').replace(/[^a-zA-Z0-9]+/g, "-");
}