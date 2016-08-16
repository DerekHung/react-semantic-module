'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _fileUpload = require('../../utils/fileUpload.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('babel-polyfill');

var FileUploader = function (_Component) {
    _inherits(FileUploader, _Component);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FileUploader).call(this, props));

        _this.handleClick = function (e) {
            if (_this.props.onTriggerUpload) _this.props.onTriggerUpload(e);
            _this.refs.fileInput.click();
        };
        _this.cleanInput = function () {
            _this.refs.fileInput.value = null;
        };

        _this.handleFileInput = function (e) {
            return _this._handleFileInput(e);
        };

        _this.generatorProcess = regeneratorRuntime.mark(function _callee(f, signatureData) {
            var signature, uploadS3, fileData;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _fileUpload.getSignature)(f, signatureData);

                        case 2:
                            signature = _context.sent;

                            if (this.props.getSignatureDone) this.props.getSignatureDone(signature);

                            _context.next = 6;
                            return (0, _fileUpload.uploadToS3)(f, signature);

                        case 6:
                            uploadS3 = _context.sent;

                            if (this.props.uploadToS3Done) this.props.uploadToS3Done();

                            _context.next = 10;
                            return (0, _fileUpload.waitUrlSuccess)(signature.fileId);

                        case 10:
                            fileData = _context.sent;

                            if (this.props.urlTransformDone) this.props.urlTransformDone(fileData[0]);

                            this.cleanInput();

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });

        _this.runGenerator = function (gen) {

            function go(result) {
                if (result.done) return;
                console.log(result.value);
                result.value.then(function (r) {
                    console.log(r);
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
            console.log(this.props);
            var files = Array.prototype.slice.call(e.target.files, 0);
            var signatureData = {
                apnum: this.props.apnum,
                pid: this.props.pid
            };
            var that = this;

            files.forEach(function (f) {
                if (typeof _fileUpload.MIMEMap[f.type] !== 'undefined') {
                    if (that.props.getFileInfo) that.props.getFileInfo(f, _fileUpload.MIMEMap[f.type]);
                    signatureData.extra = that.props.mediaInfo[_fileUpload.MIMEMap[f.type]];
                    var gen = that.generatorProcess(f, signatureData);
                    that.runGenerator(gen);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { styleName: 'fileUpload', onClick: this.handleClick, className: this.props.className },
                this.props.children,
                _react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
                    onChange: this.handleFileInput })
            );
        }
    }]);

    return FileUploader;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(FileUploader, _style2.default);