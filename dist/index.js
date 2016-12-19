(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ObservableStateStore"] = factory();
	else
		root["ObservableStateStore"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Subject = function () {
	  function Subject() {
	    _classCallCheck(this, Subject);
	
	    this._observers = new Set();
	  }
	
	  _createClass(Subject, [{
	    key: "subscribe",
	    value: function subscribe(observer) {
	      var _this = this;
	
	      this._observers.add(observer);
	      return {
	        stop: function stop() {
	          return _this._observers.delete(observer);
	        }
	      };
	    }
	  }, {
	    key: "publish",
	    value: function publish() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this._observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var observer = _step.value;
	
	          observer.apply(undefined, arguments);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }]);
	
	  return Subject;
	}();
	
	var Store = function () {
	  function Store(_ref) {
	    var state = _ref.state,
	        actions = _ref.actions;
	
	    _classCallCheck(this, Store);
	
	    this._state = state;
	    this._subject = new Subject();
	    this.actions = {};
	    this._addActions(actions);
	  }
	
	  _createClass(Store, [{
	    key: "getState",
	    value: function getState() {
	      return this._state;
	    }
	  }, {
	    key: "subscribe",
	    value: function subscribe(observer) {
	      return this._subject.subscribe(observer);
	    }
	  }, {
	    key: "_addAction",
	    value: function _addAction(name, action) {
	      var _this2 = this;
	
	      this.actions[name] = function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        var oldState = _this2._state;
	        var newState = action.apply(undefined, [oldState].concat(args));
	        _this2._state = newState;
	        _this2._subject.publish(newState, oldState);
	      };
	    }
	  }, {
	    key: "_addActions",
	    value: function _addActions() {
	      var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	      for (var name in actions) {
	        var action = actions[name];
	        this._addAction(name, action);
	      }
	    }
	  }]);
	
	  return Store;
	}();
	
	exports.default = Store;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map