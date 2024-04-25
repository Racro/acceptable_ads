"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Blocking queue using Javascript promises.
// https://stackoverflow.com/a/47157945
var AsyncBlockingQueue = exports["default"] = /*#__PURE__*/function () {
  function AsyncBlockingQueue() {
    _classCallCheck(this, AsyncBlockingQueue);
    this._resolvers = [];
    this._promises = [];
  }
  return _createClass(AsyncBlockingQueue, [{
    key: "_add",
    value: function _add() {
      var _this = this;
      this._promises.push(new Promise(function (resolve) {
        _this._resolvers.push(resolve);
      }));
    }
  }, {
    key: "enqueue",
    value: function enqueue(t) {
      if (!this._resolvers.length) this._add();
      var resolve = this._resolvers.shift();
      if (!resolve) {
        // can never happen
        throw new Error('resolve function was null or undefined when attempting to enqueue.');
      }
      ;
      resolve(t);
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (!this._promises.length) this._add();
      var promise = this._promises.shift();
      if (!promise) {
        // can never happen
        throw new Error('promise was null or undefined when attempting to dequeue.');
      }
      return promise;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return !this._promises.length;
    }
  }, {
    key: "isBlocked",
    value: function isBlocked() {
      return !!this._resolvers.length;
    }
  }, {
    key: "length",
    get: function get() {
      return this._promises.length - this._resolvers.length;
    }
  }]);
}();