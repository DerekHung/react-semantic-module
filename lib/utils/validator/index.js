'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

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
					res = _get__('Method')[objKey](value, patternArr[i][objKey]);
				}
			} else {
				res = _get__('Method')[patternArr[i]](value);
			}
			if (!res.status) {
				_assign__('validStatus', false);
				_get__('error')[key] = res.errorMessage;
				break;
			} else {
				_assign__('validStatus', true);
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
				_get__('Method')[key] = this.customValidator[key];
			}
		}
	}

	_createClass(Validators, [{
		key: 'validate',
		value: function validate(inputObject) {

			for (var key in inputObject) {
				if (typeof this.pattern[key] === 'undefined') console.log(key + '沒有對應的pattern');else _get__('usePattern')(this.pattern[key], inputObject[key], key);
			}

			return {
				status: _get__('validStatus'),
				errorMessage: _get__('error'),
				input: inputObject
			};
		}
	}, {
		key: 'editMessage',
		value: function editMessage(inputObject) {
			for (var key in inputObject) {
				_get__('Message')[key] = inputObject[key];
			}
		}
	}]);

	return Validators;
}();

exports.default = _get__('Validators');

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = _RewiredData__[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'Method':
			return _validMethod.Method;

		case 'validStatus':
			return validStatus;

		case 'error':
			return error;

		case 'usePattern':
			return usePattern;

		case 'Message':
			return _validMethod.Message;

		case 'Validators':
			return Validators;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {
		case 'validStatus':
			return validStatus = _value;
	}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
		Object.keys(variableName).forEach(function (name) {
			_RewiredData__[name] = variableName[name];
		});
	} else {
		if (value === undefined) {
			_RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			_RewiredData__[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		var result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

var _typeOfOriginalExport = typeof Validators === 'undefined' ? 'undefined' : _typeof(Validators);

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(Validators, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(Validators)) {
	addNonEnumerableProperty('__get__', _get__);
	addNonEnumerableProperty('__GetDependency__', _get__);
	addNonEnumerableProperty('__Rewire__', _set__);
	addNonEnumerableProperty('__set__', _set__);
	addNonEnumerableProperty('__reset__', _reset__);
	addNonEnumerableProperty('__ResetDependency__', _reset__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;