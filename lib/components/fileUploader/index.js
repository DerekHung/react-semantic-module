'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _fileUpload = require('../../utils/fileUpload.js');

var _IDMaker = require('../../utils/IDMaker.js');

var _IDMaker2 = _interopRequireDefault(_IDMaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof regeneratorRuntime === 'undefined') require('babel-polyfill');

var FileUploader = function (_get__2) {
    _inherits(FileUploader, _get__2);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this.counter = 0;
        _this.fileList = {};

        var tagArrMap = {};
        for (var key in props.mediaInfo) {
            if (typeof tagArrMap[key] === 'undefined') tagArrMap[key] = [];
            for (var i in props.mediaInfo[key].multiAction) {
                tagArrMap[key].push(props.mediaInfo[key].multiAction[i].tag);
            }
        }
        _this.handleClick = function (e) {
            if (_this.props.onTriggerUpload) _this.props.onTriggerUpload(e);
            _this.refs.fileInput.click();
        };
        _this.cleanInput = function () {
            if (_this.refs.fileInput) _this.refs.fileInput.value = null;
        };

        _this.handleFileInput = function (e) {
            return _this._handleFileInput(e);
        };

        _this.logObject = function (object) {
            return Object.assign({}, object);
        };

        _this.generatorProcess = regeneratorRuntime.mark(function _callee(ID, signatureData) {
            var signature, uploadS3;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.fileList[ID]) {
                                _context.next = 20;
                                break;
                            }

                            _context.next = 3;
                            return _get__('getSignature')(this.fileList[ID].originFile, signatureData);

                        case 3:
                            signature = _context.sent;

                            this.fileList[ID].signature = signature;
                            this.fileList[ID].status = 'uploading';
                            //this.fileList[ID].snapTag = snap;
                            if (this.props.getSignatureDone) this.props.getSignatureDone(this.logObject(this.fileList[ID]));

                            _context.next = 9;
                            return _get__('uploadToS3')(this.fileList[ID].originFile, signature);

                        case 9:
                            uploadS3 = _context.sent;

                            this.fileList[ID].status = 'uploadDone';
                            if (this.props.uploadToS3Done) this.props.uploadToS3Done(this.logObject(this.fileList[ID]));

                            if (this.props.dontWaitSuccess) {
                                _context.next = 19;
                                break;
                            }

                            this.fileList[ID].status = 'transforming';
                            _context.next = 16;
                            return _get__('waitUrlSuccess')(signature.fileId, this.fileList[ID].type, tagArrMap[this.fileList[ID].type]);

                        case 16:
                            this.fileList[ID].transformedFile = _context.sent;

                            this.fileList[ID].status = 'transformDone';
                            if (this.props.urlTransformDone) this.props.urlTransformDone(this.logObject(this.fileList[ID]));

                        case 19:

                            this.cleanInput();

                        case 20:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });

        _this.runGenerator = function (gen) {

            function go(result) {
                if (result.done) return;
                result.value.then(function (r) {
                    go(gen.next(r));
                });
            }
            go(gen.next());
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: '_handleFileInput',
        value: function _handleFileInput(e) {
            var _this2 = this;

            var files = Array.prototype.slice.call(e.target.files, 0);
            var signatureData = {
                apnum: this.props.apnum,
                pid: this.props.pid
            };
            //let snap ='';
            var that = this;

            files.forEach(function (f) {
                if (typeof _get__('MIMEMap')[f.type] !== 'undefined') {

                    var ID = _get__('IDMaker')(3, _this2.counter);
                    _this2.counter++;

                    that.fileList[ID] = {
                        id: ID,
                        type: _get__('MIMEMap')[f.type],
                        originFile: f,
                        status: 'initial',
                        transformedFile: null
                    };

                    if (that.props.getFileInfo) that.props.getFileInfo(that.fileList[ID]);
                    signatureData.extra = that.props.mediaInfo[_get__('MIMEMap')[f.type]];
                    var gen = that.generatorProcess(ID, signatureData);
                    that.runGenerator(gen);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _get__('React').createElement(
                'span',
                { styleName: 'fileUpload', onClick: this.handleClick, className: this.props.className },
                this.props.children,
                _get__('React').createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
                    onChange: this.handleFileInput })
            );
        }
    }]);

    return FileUploader;
}(_get__('Component'));

var _DefaultExportValue = _get__('CSSModules')(_get__('FileUploader'), _get__('css'));

exports.default = _DefaultExportValue;

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
        case 'getSignature':
            return _fileUpload.getSignature;

        case 'uploadToS3':
            return _fileUpload.uploadToS3;

        case 'waitUrlSuccess':
            return _fileUpload.waitUrlSuccess;

        case 'MIMEMap':
            return _fileUpload.MIMEMap;

        case 'IDMaker':
            return _IDMaker2.default;

        case 'Component':
            return _react.Component;

        case 'CSSModules':
            return _reactCssModules2.default;

        case 'FileUploader':
            return FileUploader;

        case 'css':
            return _style2.default;

        case 'React':
            return _react2.default;
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
    switch (variableName) {}

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

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(_DefaultExportValue, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
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