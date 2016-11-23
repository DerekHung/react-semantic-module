'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validMethod = require('./validMethod');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validStatus = true,
    error = {};
var customPattern = {};

var usePattern = function usePattern(patternArr, value, key) {

	var i = 0,
	    res = void 0;
	while (i < patternArr.length) {
		try {

			if (_typeof(patternArr[i]) === 'object') {
				for (var objKey in patternArr[i]) {
					res = _validMethod.Method[objKey](value, patternArr[i][objKey]);
				}
			} else {
				res = _validMethod.Method[patternArr[i]](value);
			}
			if (!res.status) {
				validStatus = false;
				error[key] = res.errorMessage;
				break;
			} else {
				validStatus = true;
			}
		} catch (e) {
			console.log(e);
		}

		i++;
	}
};

var Validators = function () {
	function Validators(options) {
		_classCallCheck(this, Validators);

		this.pattern = options.data || {};
		this.customValidator = options.customValidator || {};

		if (this.customValidator !== {}) {
			for (var key in this.customValidator) {
				_validMethod.Method[key] = this.customValidator[key];
			}
		}
	}

	_createClass(Validators, [{
		key: 'validate',
		value: function validate(inputObject) {

			for (var key in inputObject) {
				if (typeof this.pattern[key] === 'undefined') console.log(key + '沒有對應的pattern');else usePattern(this.pattern[key], inputObject[key], key);
			}

			return {
				status: validStatus,
				errorMessage: error,
				input: inputObject
			};
		}
	}, {
		key: 'editMessage',
		value: function editMessage(inputObject) {
			for (var key in inputObject) {
				_validMethod.Message[key] = inputObject[key];
			}
		}
	}]);

	return Validators;
}();

exports.default = Validators;